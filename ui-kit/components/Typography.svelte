<script lang="ts">
  /**
   * Typography 组件 - 基于 Pages.Revox.io 设计语言
   *
   * 特点：
   * - 轻字重（默认 font-weight: 300）
   * - Pages 标准字号层级（44px → 14px）
   * - 系统字体栈（跨平台优化）
   * - 抗锯齿渲染
   *
   * @example
   * <Typography tag="h1" variant="h1">主标题</Typography>
   * <Typography tag="p" variant="p">段落文字</Typography>
   * <Typography tag="span" variant="small" color="light">小字提示</Typography>
   */

  export let tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' = 'p';
  export let variant:
    | 'h1'
    | 'h1-mega'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'small'
    | 'xs' = 'p';
  export let weight: '300' | '400' | '500' | '600' | '700' = '300';
  export let color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'master-dark'
    | 'master'
    | 'light'
    | 'white' = 'default';
  export let align: 'left' | 'center' | 'right' = 'left';
  export let className: string = '';

  $: classes = [
    'typography',
    `typography--${variant}`,
    `typography--color-${color}`,
    `typography--weight-${weight}`,
    `typography--align-${align}`,
    className
  ]
    .filter(Boolean)
    .join(' ');
</script>

<svelte:element this={tag} class={classes}>
  <slot />
</svelte:element>

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  // ========================================
  // Typography 基础样式（Pages 标准）
  // ========================================
  .typography {
    margin: 10px 0;
    font-family: $font-family-body;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-font-feature-settings: 'kern' 1;
    -moz-font-feature-settings: 'kern' 1;

    // ========================================
    // 字号变体（Pages 标准层级）
    // ========================================

    // H1 - 超大标题（110px，用于 Hero）
    &--h1-mega {
      font-family: $font-family-heading;
      font-size: $font-size-h1-mega; // 110px
      line-height: 89px;
      font-weight: 300;
      letter-spacing: $letter-spacing-tight; // -0.009em
      color: $color-master-dark;

      @include respond-to(xs) {
        font-size: 60px;
        line-height: 70px;
      }
    }

    // H1 - 大标题（44px）
    &--h1 {
      font-family: $font-family-heading;
      font-size: $font-size-h1; // 44px
      line-height: $line-height-h1; // 55px
      font-weight: 300;
      letter-spacing: $letter-spacing-tight; // -0.009em
      color: $color-master-dark;

      @include respond-to(xs) {
        font-size: 32px;
        line-height: 40px;
      }
    }

    // H2（31px）
    &--h2 {
      font-family: $font-family-heading;
      font-size: $font-size-h2; // 31px
      line-height: $line-height-h2; // 42px
      font-weight: 300;
      color: $color-master-dark;

      @include respond-to(xs) {
        font-size: 26px;
        line-height: 34px;
      }
    }

    // H3（27px）
    &--h3 {
      font-family: $font-family-heading;
      font-size: $font-size-h3; // 27px
      line-height: $line-height-h3; // 40px
      font-weight: 300;
      color: $color-master-dark;

      @include respond-to(xs) {
        font-size: 22px;
        line-height: 30px;
      }
    }

    // H4（22px）
    &--h4 {
      font-family: $font-family-heading;
      font-size: $font-size-h4; // 22px
      line-height: $line-height-h4; // 32px
      font-weight: 300;
      letter-spacing: $letter-spacing-heading; // -0.0045em
      color: $color-master-dark;

      @include respond-to(xs) {
        font-size: 20px;
        line-height: 28px;
      }
    }

    // H5（18px）
    &--h5 {
      font-family: $font-family-heading;
      font-size: $font-size-h5; // 18px
      line-height: $line-height-h5; // 26px
      font-weight: 300;
      color: $color-master-dark;
    }

    // H6（16px）
    &--h6 {
      font-family: $font-family-heading;
      font-size: $font-size-h6; // 16px
      line-height: $line-height-h5; // 26px
      font-weight: 300;
      color: $color-master-dark;
    }

    // 段落（16px）
    &--p {
      font-size: $font-size-p; // 16px
      line-height: $line-height-p; // 25px
      font-weight: 300;
      letter-spacing: $letter-spacing-base; // 0.01em
      color: $color-master;
    }

    // 小文本（12px）
    &--small {
      font-size: $font-size-small; // 12px
      line-height: $line-height-small; // 18px
      font-weight: 300;
      color: $color-master;
    }

    // 超小文本（11px）
    &--xs {
      font-size: $font-size-xs; // 11px
      line-height: $line-height-small; // 18px
      font-weight: 300;
      color: $color-master;
    }

    // ========================================
    // 字重变体
    // ========================================

    &--weight-300 {
      font-weight: $font-weight-light;
    }
    &--weight-400 {
      font-weight: $font-weight-normal;
    }
    &--weight-500 {
      font-weight: $font-weight-medium;
    }
    &--weight-600 {
      font-weight: $font-weight-semibold;
    }
    &--weight-700 {
      font-weight: $font-weight-bold;
    }

    // ========================================
    // 颜色变体
    // ========================================

    &--color-default {
      // 由各 variant 决定默认颜色
    }

    &--color-primary {
      color: $color-primary;
    }

    &--color-secondary {
      color: $color-secondary;
    }

    &--color-master-dark {
      color: $color-master-dark; // #2c3e50 深灰（标题）
    }

    &--color-master {
      color: $color-master; // #626262 中灰（正文）
    }

    &--color-light {
      color: $color-text-light; // 浅灰
    }

    &--color-white {
      color: $color-white;
    }

    // ========================================
    // 对齐方式
    // ========================================

    &--align-left {
      text-align: left;
    }
    &--align-center {
      text-align: center;
    }
    &--align-right {
      text-align: right;
    }
  }

  // ========================================
  // 响应式文本对齐（Pages 工具类）
  // ========================================

  @include respond-to(xs) {
    .sm-text-center {
      text-align: center;
    }
    .sm-text-left {
      text-align: left;
    }
  }
</style>
