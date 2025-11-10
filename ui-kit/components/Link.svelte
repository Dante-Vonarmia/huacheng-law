<script lang="ts">
  /**
   * Link 组件 - 国际律所专业链接
   * 支持内部路由和外部链接，带有优雅的下划线动画
   */

  export let href: string;
  export let variant: 'default' | 'underline' | 'button' = 'default';
  export let color: 'primary' | 'secondary' | 'text' | 'white' = 'text';
  export let external: boolean = false;
  export let className: string = '';

  $: classes = [
    'link',
    `link--${variant}`,
    `link--${color}`,
    className
  ].filter(Boolean).join(' ');

  $: externalProps = external ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};
</script>

<a {href} class={classes} {...externalProps} on:click>
  <slot />
  {#if external}
    <svg
      class="link__icon"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10.5 1.5L1.5 10.5M10.5 1.5H4.5M10.5 1.5V7.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {/if}
</a>

<style lang="scss">
  @use 'sass:color';
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    text-decoration: none;
    transition: color $transition-base $transition-ease;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid $color-secondary;
      outline-offset: 2px;
      border-radius: 2px;
    }

    // 颜色变体
    &--primary {
      color: $color-primary;

      &:hover {
        color: $color-secondary;
      }
    }

    &--secondary {
      color: $color-secondary;

      &:hover {
        color: color.scale($color-secondary, $lightness: -18.8191881919%);
      }
    }

    &--text {
      color: $color-text;

      &:hover {
        color: $color-secondary;
      }
    }

    &--white {
      color: $color-white;

      &:hover {
        color: $color-secondary;
      }
    }

    // 默认样式
    &--default {
      // 继承颜色样式
    }

    // 下划线动画样式 - 国际律所专业感
    &--underline {
      @include link-underline;
    }

    // 按钮样式
    &--button {
      padding: $spacing-xs $spacing-md;
      background: transparent;
      border: 1px solid currentColor;
      border-radius: $radius-base;
      transition: all $transition-base $transition-ease;

      &:hover {
        background: currentColor;
        color: $color-white;
      }
    }

    &__icon {
      flex-shrink: 0;
      transition: transform $transition-base $transition-ease;
    }

    &:hover &__icon {
      transform: translate(2px, -2px);
    }
  }
</style>
