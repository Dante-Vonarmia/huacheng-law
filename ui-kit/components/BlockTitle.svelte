<script lang="ts">
  /**
   * BlockTitle 组件 - Pages.Revox.io 特色标题组件
   *
   * 特点：
   * - Montserrat 字体
   * - 全大写（text-transform: uppercase）
   * - 字母间距 0.03em
   * - font-weight: 400
   * - font-size: 15px
   *
   * 用途：用于 Section 区块标题，提供视觉层次感
   *
   * @example
   * <BlockTitle>Explore</BlockTitle>
   * <BlockTitle variant="light">Menu Clipping</BlockTitle>
   */

  export let variant: 'default' | 'light' | 'dark' = 'default';
  export let className: string = '';

  $: classes = ['block-title', `block-title--${variant}`, className]
    .filter(Boolean)
    .join(' ');
</script>

<h5 class={classes}>
  <slot />
</h5>

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  // ========================================
  // BlockTitle 基础样式（Pages 标准）
  // ========================================
  .block-title {
    // 使用 Pages block-title mixin
    @include block-title;

    // 默认颜色为 hint-text（灰色）
    color: mix($color-master, #fff, 50%);
    margin: 0;

    // ========================================
    // 变体样式
    // ========================================

    // 默认变体（灰色文字）
    &--default {
      color: mix($color-master, #fff, 50%);
    }

    // 浅色变体（白色文字，用于深色背景）
    &--light {
      color: $color-white;
    }

    // 深色变体（深灰文字，用于浅色背景）
    &--dark {
      color: $color-master-dark;
    }
  }
</style>
