<script lang="ts">
  /**
   * Tabs 组件 - 标签页切换
   * 适用于内容分类展示
   */

  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let tabs: Array<{
    id: string;
    label: string;
    content?: string;
    disabled?: boolean;
  }>;
  export let activeTab: string = tabs[0]?.id || '';
  export let variant: 'default' | 'pills' | 'underline' = 'default';
  export let fullWidth: boolean = false;
  export let className: string = '';

  const dispatch = createEventDispatcher();

  $: classes = [
    'tabs',
    `tabs--${variant}`,
    fullWidth && 'tabs--full-width',
    className
  ].filter(Boolean).join(' ');

  function selectTab(tabId: string) {
    const tab = tabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      activeTab = tabId;
      dispatch('change', { tabId });
    }
  }
</script>

<div class={classes}>
  <!-- Tab List -->
  <div class="tabs__list" role="tablist">
    {#each tabs as tab}
      <button
        class="tabs__tab"
        class:tabs__tab--active={activeTab === tab.id}
        class:tabs__tab--disabled={tab.disabled}
        role="tab"
        aria-selected={activeTab === tab.id}
        aria-controls="panel-{tab.id}"
        id="tab-{tab.id}"
        disabled={tab.disabled}
        on:click={() => selectTab(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <!-- Tab Panels -->
  <div class="tabs__panels">
    {#each tabs as tab}
      {#if activeTab === tab.id}
        <div
          class="tabs__panel"
          role="tabpanel"
          aria-labelledby="tab-{tab.id}"
          id="panel-{tab.id}"
          transition:fade={{ duration: 200 }}
        >
          {#if tab.content}
            {@html tab.content}
          {:else}
            <slot />
          {/if}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .tabs {
    width: 100%;

    // Tab列表
    &__list {
      display: flex;
      gap: $spacing-sm;
      border-bottom: 2px solid rgba($color-primary, 0.1);
      overflow-x: auto;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }

      @include respond-to(mobile) {
        gap: $spacing-xs;
      }
    }

    &--full-width &__list {
      .tabs__tab {
        flex: 1;
      }
    }

    // 药丸样式
    &--pills &__list {
      border-bottom: none;
      background: rgba($color-primary, 0.05);
      padding: 4px;
      border-radius: $radius-md;
    }

    // 下划线样式
    &--underline &__list {
      gap: $spacing-lg;
      border-bottom: 1px solid rgba($color-primary, 0.1);
    }

    // Tab按钮
    &__tab {
      @include button-reset;
      padding: $spacing-md $spacing-lg;
      font-size: $font-size-base;
      font-weight: 500;
      color: $color-text-light;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      white-space: nowrap;
      transition: all $transition-base $transition-ease;
      position: relative;

      @include respond-to(mobile) {
        padding: $spacing-sm $spacing-md;
        font-size: $font-size-sm;
      }

      &:hover:not(&--disabled) {
        color: $color-primary;
        background: rgba($color-primary, 0.02);
      }

      &:focus-visible {
        outline: 2px solid $color-secondary;
        outline-offset: 2px;
        border-radius: $radius-sm;
      }

      &--active {
        color: $color-secondary;
        border-bottom-color: $color-secondary;
      }

      &--disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    // 药丸样式Tab
    &--pills &__tab {
      border-radius: $radius-base;
      border-bottom: none;

      &--active {
        background: $color-white;
        color: $color-primary;
        box-shadow: $shadow-sm;
      }
    }

    // 下划线样式Tab
    &--underline &__tab {
      padding-bottom: $spacing-md;
      border-bottom-width: 3px;

      &--active {
        border-bottom-color: $color-secondary;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        right: 0;
        height: 3px;
        background: $color-secondary;
        transform: scaleX(0);
        transition: transform $transition-base $transition-ease;
      }

      &--active::after {
        transform: scaleX(1);
      }
    }

    // Tab面板
    &__panels {
      padding: $spacing-xl 0;

      @include respond-to(mobile) {
        padding: $spacing-lg 0;
      }
    }

    &__panel {
      animation: fadeIn $transition-base $transition-ease;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
