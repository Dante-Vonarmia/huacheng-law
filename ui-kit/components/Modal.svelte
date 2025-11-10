<script lang="ts">
  /**
   * Modal 组件 - 模态对话框
   * 支持多种尺寸、关闭方式、动画效果
   */

  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  export let open: boolean = false;
  export let size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  export let closeOnEscape: boolean = true;
  export let closeOnBackdrop: boolean = true;
  export let showCloseButton: boolean = true;
  export let title: string = '';
  export let className: string = '';

  const dispatch = createEventDispatcher();

  $: classes = [
    'modal',
    `modal--${size}`,
    className
  ].filter(Boolean).join(' ');

  onMount(() => {
    if (closeOnEscape) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && open) {
          close();
        }
      };
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  });

  function close() {
    open = false;
    dispatch('close');
  }

  function handleBackdropClick() {
    if (closeOnBackdrop) {
      close();
    }
  }

  // 防止滚动穿透
  $: if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
</script>

{#if open}
  <div class="modal-wrapper" transition:fade={{ duration: 200 }}>
    <!-- Backdrop -->
    <div
      class="modal__backdrop"
      on:click={handleBackdropClick}
      on:keydown={(e) => e.key === 'Enter' && handleBackdropClick()}
      role="button"
      tabindex="-1"
    />

    <!-- Modal Dialog -->
    <div
      class={classes}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      transition:scale={{ duration: 300, start: 0.95 }}
    >
      <!-- Header -->
      {#if title || showCloseButton}
        <div class="modal__header">
          {#if title}
            <h2 class="modal__title" id="modal-title">{title}</h2>
          {/if}
          {#if showCloseButton}
            <button
              class="modal__close"
              on:click={close}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          {/if}
        </div>
      {/if}

      <!-- Body -->
      <div class="modal__body">
        <slot />
      </div>

      <!-- Footer -->
      {#if $$slots.footer}
        <div class="modal__footer">
          <slot name="footer" />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .modal-wrapper {
    @include full-overlay;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-lg;
    overflow-y: auto;

    @include respond-to(mobile) {
      padding: $spacing-md;
    }
  }

  .modal {
    position: relative;
    z-index: $z-index-modal;
    background: $color-white;
    border-radius: $radius-lg;
    box-shadow: $shadow-xl;
    max-height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: column;

    // 尺寸变体
    &--sm {
      max-width: 400px;
    }

    &--md {
      max-width: 600px;
    }

    &--lg {
      max-width: 800px;
    }

    &--xl {
      max-width: 1200px;
    }

    &--full {
      max-width: none;
      width: 100%;
      height: 100%;
      max-height: 100vh;
      border-radius: 0;

      @include respond-from(tablet) {
        margin: $spacing-xl;
        width: calc(100% - #{$spacing-xl * 2});
        height: calc(100% - #{$spacing-xl * 2});
        max-height: calc(100vh - #{$spacing-xl * 2});
        border-radius: $radius-lg;
      }
    }

    // 背景遮罩
    &__backdrop {
      @include full-overlay;
      background: rgba($color-black, 0.6);
      backdrop-filter: blur(4px);
      z-index: $z-index-modal-backdrop;
      cursor: pointer;
    }

    // 头部
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: $spacing-lg $spacing-xl;
      border-bottom: 1px solid rgba($color-primary, 0.1);
      flex-shrink: 0;

      @include respond-to(mobile) {
        padding: $spacing-md $spacing-lg;
      }
    }

    &__title {
      @include heading(xl);
      font-weight: 600;
      color: $color-primary;
      margin: 0;
    }

    &__close {
      @include button-reset;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-text-light;
      transition: all $transition-base $transition-ease;

      &:hover {
        background: rgba($color-primary, 0.05);
        color: $color-primary;
      }

      &:focus-visible {
        outline: 2px solid $color-secondary;
        outline-offset: 2px;
      }
    }

    // 内容
    &__body {
      padding: $spacing-xl;
      overflow-y: auto;
      flex: 1;

      @include respond-to(mobile) {
        padding: $spacing-lg;
      }

      @include scrollbar;
    }

    // 底部
    &__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: $spacing-md;
      padding: $spacing-lg $spacing-xl;
      border-top: 1px solid rgba($color-primary, 0.1);
      flex-shrink: 0;

      @include respond-to(mobile) {
        padding: $spacing-md $spacing-lg;
        flex-direction: column-reverse;

        :global(button) {
          width: 100%;
        }
      }
    }
  }
</style>
