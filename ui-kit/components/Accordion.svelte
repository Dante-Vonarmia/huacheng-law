<script lang="ts">
  /**
   * Accordion 组件 - 折叠面板
   * 适用于FAQ、服务说明等内容展示
   */

  import { slide } from 'svelte/transition';

  export let items: Array<{
    title: string;
    content: string;
    open?: boolean;
  }>;
  export let multiple: boolean = false;
  export let variant: 'default' | 'bordered' | 'separated' = 'default';
  export let className: string = '';

  let openIndexes: Set<number> = new Set(
    items.map((item, index) => item.open ? index : -1).filter(i => i >= 0)
  );

  $: classes = [
    'accordion',
    `accordion--${variant}`,
    className
  ].filter(Boolean).join(' ');

  function toggle(index: number) {
    if (multiple) {
      if (openIndexes.has(index)) {
        openIndexes.delete(index);
      } else {
        openIndexes.add(index);
      }
      openIndexes = new Set(openIndexes);
    } else {
      openIndexes = openIndexes.has(index) ? new Set() : new Set([index]);
    }
  }
</script>

<div class={classes}>
  {#each items as item, index}
    <div class="accordion__item" class:accordion__item--open={openIndexes.has(index)}>
      <button
        class="accordion__trigger"
        on:click={() => toggle(index)}
        aria-expanded={openIndexes.has(index)}
      >
        <span class="accordion__title">{item.title}</span>
        <svg
          class="accordion__icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      {#if openIndexes.has(index)}
        <div class="accordion__content" transition:slide={{ duration: 300 }}>
          <div class="accordion__body">
            {@html item.content}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  @use 'sass:color';
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .accordion {
    width: 100%;

    // 默认样式
    &--default {
      .accordion__item {
        border-bottom: 1px solid rgba($color-primary, 0.1);

        &:first-child {
          border-top: 1px solid rgba($color-primary, 0.1);
        }
      }
    }

    // 边框样式
    &--bordered {
      border: 1px solid rgba($color-primary, 0.1);
      border-radius: $radius-md;
      overflow: hidden;

      .accordion__item {
        border-bottom: 1px solid rgba($color-primary, 0.1);

        &:last-child {
          border-bottom: none;
        }
      }
    }

    // 分隔样式
    &--separated {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;

      .accordion__item {
        border: 1px solid rgba($color-primary, 0.1);
        border-radius: $radius-md;
        overflow: hidden;
      }
    }

    // 折叠项
    &__item {
      background: $color-white;
      transition: all $transition-base $transition-ease;

      &--open {
        background: rgba($color-secondary, 0.02);
      }
    }

    &__trigger {
      @include button-reset;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: $spacing-lg $spacing-xl;
      text-align: left;
      cursor: pointer;
      transition: all $transition-base $transition-ease;

      @include respond-to(mobile) {
        padding: $spacing-md $spacing-lg;
      }

      &:hover {
        background: rgba($color-secondary, 0.05);
      }

      &:focus-visible {
        outline: 2px solid $color-secondary;
        outline-offset: -2px;
      }
    }

    &__title {
      @include heading(base);
      font-weight: 600;
      color: $color-primary;
      flex: 1;
      margin-right: $spacing-md;
      transition: color $transition-base $transition-ease;

      .accordion__item--open & {
        color: $color-secondary;
      }
    }

    &__icon {
      flex-shrink: 0;
      color: $color-text-light;
      transition: transform $transition-base $transition-ease, color $transition-base $transition-ease;

      .accordion__item--open & {
        transform: rotate(180deg);
        color: $color-secondary;
      }
    }

    &__content {
      overflow: hidden;
    }

    &__body {
      padding: 0 $spacing-xl $spacing-lg;

      @include respond-to(mobile) {
        padding: 0 $spacing-lg $spacing-md;
      }

      @include body-text;
      color: $color-text-light;
      line-height: $line-height-relaxed;

      :global(p) {
        margin-bottom: $spacing-md;

        &:last-child {
          margin-bottom: 0;
        }
      }

      :global(ul),
      :global(ol) {
        margin-left: $spacing-lg;
        margin-bottom: $spacing-md;
      }

      :global(li) {
        margin-bottom: $spacing-xs;
      }

      :global(strong) {
        color: $color-primary;
        font-weight: 600;
      }

      :global(a) {
        color: $color-secondary;
        text-decoration: underline;

        &:hover {
          color: color.scale($color-secondary, $lightness: -18.8191881919%);
        }
      }
    }
  }
</style>
