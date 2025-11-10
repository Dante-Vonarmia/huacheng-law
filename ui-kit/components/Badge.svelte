<script lang="ts">
  /**
   * Badge 组件 - 徽章标签
   * 用于状态显示、分类标签、数量提示等
   */

  export let variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let rounded: boolean = false;
  export let dot: boolean = false;
  export let className: string = '';

  $: classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    rounded && 'badge--rounded',
    dot && 'badge--dot',
    className
  ].filter(Boolean).join(' ');
</script>

<span class={classes}>
  <slot />
</span>

<style lang="scss">
  @use 'sass:color';
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    transition: all $transition-base $transition-ease;

    // 尺寸变体
    &--sm {
      padding: 2px 8px;
      font-size: $font-size-xs;
      border-radius: $radius-sm;
    }

    &--md {
      padding: 4px 12px;
      font-size: $font-size-sm;
      border-radius: $radius-base;
    }

    &--lg {
      padding: 6px 16px;
      font-size: $font-size-base;
      border-radius: $radius-md;
    }

    // 圆形徽章
    &--rounded {
      border-radius: $radius-full;
    }

    // 点状徽章
    &--dot {
      padding: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      font-size: 0;

      &.badge--md {
        width: 10px;
        height: 10px;
      }

      &.badge--lg {
        width: 12px;
        height: 12px;
      }
    }

    // 颜色变体
    &--primary {
      background: rgba($color-primary, 0.1);
      color: $color-primary;
      border: 1px solid rgba($color-primary, 0.2);

      &.badge--dot {
        background: $color-primary;
        border-color: $color-primary;
      }
    }

    &--secondary {
      background: rgba($color-secondary, 0.1);
      color: color.scale($color-secondary, $lightness: -27.2727272727%);
      border: 1px solid rgba($color-secondary, 0.2);

      &.badge--dot {
        background: $color-secondary;
        border-color: $color-secondary;
      }
    }

    &--success {
      background: rgba($color-success, 0.1);
      color: color.scale($color-success, $lightness: -18.8191881919%);
      border: 1px solid rgba($color-success, 0.2);

      &.badge--dot {
        background: $color-success;
        border-color: $color-success;
      }
    }

    &--warning {
      background: rgba($color-warning, 0.1);
      color: color.scale($color-warning, $lightness: -35.4166666667%);
      border: 1px solid rgba($color-warning, 0.2);

      &.badge--dot {
        background: $color-warning;
        border-color: $color-warning;
      }
    }

    &--error {
      background: rgba($color-error, 0.1);
      color: $color-error;
      border: 1px solid rgba($color-error, 0.2);

      &.badge--dot {
        background: $color-error;
        border-color: $color-error;
      }
    }

    &--info {
      background: rgba($color-info, 0.1);
      color: color.scale($color-info, $lightness: -18.8191881919%);
      border: 1px solid rgba($color-info, 0.2);

      &.badge--dot {
        background: $color-info;
        border-color: $color-info;
      }
    }
  }
</style>
