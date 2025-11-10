<script lang="ts">
  /**
   * Button 组件 - 基于 Pages.Revox.io 设计语言
   *
   * 特点：
   * - 扁平化设计（无阴影）
   * - 轻字重（font-weight: 300/400）
   * - 3px 圆角
   * - 快速过渡（0.1s）
   * - 5 种变体：primary/secondary/outline/link/black
   * - 3 种尺寸：sm/md/lg
   *
   * @example
   * <Button variant="primary" size="md">提交</Button>
   * <Button variant="outline" href="/about">了解更多</Button>
   */

  export let variant: 'primary' | 'secondary' | 'outline' | 'link' | 'black' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let isDisabled: boolean = false;
  export let isLoading: boolean = false;
  export let fullWidth: boolean = false;
  export let href: string | undefined = undefined;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let className: string = '';

  // 计算 CSS 类名
  $: classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full',
    isLoading && 'is-loading',
    isDisabled && 'is-disabled',
    className
  ].filter(Boolean).join(' ');

  // 禁用状态（加载时也禁用）
  $: disabled = isDisabled || isLoading;
</script>

<!-- 如果有 href 且未禁用，渲染为链接 -->
{#if href && !disabled}
  <a {href} class={classes} on:click>
    {#if isLoading}
      <span class="btn__spinner" aria-hidden="true"></span>
    {/if}
    <span class="btn__content">
      <slot />
    </span>
  </a>
{:else}
  <button {type} class={classes} disabled={disabled} on:click>
    {#if isLoading}
      <span class="btn__spinner" aria-hidden="true"></span>
    {/if}
    <span class="btn__content">
      <slot />
    </span>
  </button>
{/if}

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  // ========================================
  // Button 基础样式（Pages 标准）
  // ========================================
  .btn {
    // 使用 Pages 标准 mixin
    @include btn-base;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
    text-decoration: none;
    position: relative;

    // 焦点样式（可访问性）
    &:focus-visible {
      outline: $focus-ring-width solid $focus-ring-color;
      outline-offset: $focus-ring-offset;
    }

    // ========================================
    // 尺寸变体（Pages 标准）
    // ========================================

    &--sm {
      @include btn-sm;
    }

    &--lg {
      @include btn-lg;
    }

    // md 尺寸使用默认样式（btn-base 已定义）

    // ========================================
    // 颜色变体（Pages 标准）
    // ========================================

    // 主按钮（海军蓝）
    &--primary {
      @include button($color-white, $color-primary, $color-primary);
    }

    // 次要按钮（金色）
    &--secondary {
      @include button($color-primary, $color-secondary, $color-secondary);
    }

    // 轮廓按钮
    &--outline {
      @include button($color-primary, transparent, $color-primary);

      &:hover {
        background-color: $color-primary;
        color: $color-white;
      }
    }

    // 链接按钮（无边框，类似 btn-link）
    &--link {
      color: $color-complete-dark;
      background-color: transparent;
      border: none;
      padding-left: 0;
      padding-right: 0;

      &:hover {
        color: $color-complete;
        background-color: transparent;
        border: none;
        text-decoration: none;
      }

      &:focus,
      &:active {
        background-color: transparent;
        border: none;
      }
    }

    // 黑色按钮（Pages 标准变体）
    &--black {
      @include button($color-white, $color-black, $color-black);
    }

    // ========================================
    // 状态样式
    // ========================================

    // 全宽
    &--full {
      width: 100%;
    }

    // 禁用状态
    &.is-disabled,
    &:disabled {
      opacity: $opacity-disabled;
      cursor: not-allowed;
    }

    // 加载状态
    &.is-loading {
      pointer-events: none;
      position: relative;

      .btn__content {
        opacity: 0.6;
      }
    }

    // ========================================
    // 子元素样式
    // ========================================

    // 加载动画（居中显示）
    &__spinner {
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-radius: 50%;
      border-top-color: transparent;
      animation: btn-spin 0.6s linear infinite;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    // 按钮内容容器
    &__content {
      display: flex;
      align-items: center;
      gap: $spacing-xs;
      transition: opacity $transition-base;
    }
  }

  // ========================================
  // 动画定义
  // ========================================

  @keyframes btn-spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  // ========================================
  // 响应式调整（可选）
  // ========================================

  @include respond-to(xs) {
    .btn {
      // 移动端按钮可以稍大一些（易点击）
      &--sm {
        padding-left: $padding-base-horizontal;
        padding-right: $padding-base-horizontal;
      }
    }
  }
</style>
