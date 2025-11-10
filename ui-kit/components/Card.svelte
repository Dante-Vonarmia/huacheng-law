<script lang="ts">
  /**
   * Card 组件 - 国际律所专业卡片
   * 用于展示律师、新闻、业务领域等内容
   */

  export let variant: 'default' | 'elevated' | 'outlined' | 'flat' = 'default';
  export let hoverable: boolean = true;
  export let padding: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
  export let clickable: boolean = false;
  export let href: string | undefined = undefined;
  export let className: string = '';

  $: classes = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    hoverable && 'card--hoverable',
    clickable && 'card--clickable',
    className
  ].filter(Boolean).join(' ');
</script>

{#if href}
  <a {href} class={classes} on:click>
    <slot />
  </a>
{:else if clickable}
  <button class={classes} on:click>
    <slot />
  </button>
{:else}
  <div class={classes}>
    <slot />
  </div>
{/if}

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .card {
    background: $color-white;
    border-radius: $radius-md;
    transition: all $transition-base $transition-ease;
    display: block;
    text-decoration: none;
    color: inherit;

    // 变体样式
    &--default {
      box-shadow: $shadow-base;
    }

    &--elevated {
      box-shadow: $shadow-lg;
    }

    &--outlined {
      border: 1px solid rgba($color-primary, 0.1);
      box-shadow: none;
    }

    &--flat {
      box-shadow: none;
      background: $color-background;
    }

    // 内边距
    &--padding-sm {
      padding: $spacing-sm;
    }

    &--padding-md {
      padding: $spacing-md;
    }

    &--padding-lg {
      padding: $spacing-lg;
    }

    &--padding-xl {
      padding: $spacing-xl;
    }

    // 悬停效果
    &--hoverable:hover {
      box-shadow: $shadow-lg;
      transform: translateY(-4px);
    }

    // 可点击样式
    &--clickable {
      @include button-reset;
      width: 100%;
      text-align: left;
      cursor: pointer;

      &:focus-visible {
        outline: 2px solid $color-secondary;
        outline-offset: 2px;
      }
    }

  }

  // 卡片图片容器
  :global(.card__image) {
    width: 100%;
    border-radius: $radius-base;
    overflow: hidden;
    margin-bottom: $spacing-md;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform $transition-slow $transition-ease;
    }
  }

  // Hover 效果 - 图片缩放
  :global(.card--hoverable:hover .card__image img) {
    transform: scale(1.05);
  }

  // 卡片标题
  :global(.card__title) {
    @include heading(lg);
    margin-bottom: $spacing-sm;
    transition: color $transition-base $transition-ease;
  }

  // Hover 效果 - 标题颜色变化
  :global(.card--hoverable:hover .card__title) {
    color: $color-secondary;
  }

  // 卡片描述
  :global(.card__description) {
    @include body-text;
    color: $color-text-light;
    margin-bottom: $spacing-md;
  }

  // 卡片底部
  :global(.card__footer) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-sm;
    margin-top: auto;
    padding-top: $spacing-md;
    border-top: 1px solid rgba($color-primary, 0.1);
  }

</style>
