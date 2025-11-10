<script lang="ts">
  /**
   * Section 组件 - Pages.Revox.io 标准容器
   *
   * 特点：
   * - 统一的 Section 间距（Pages 标准：75px/85px）
   * - 紧凑变体（55px/65px）
   * - 背景颜色变体
   * - 可选 container 包裹
   *
   * @example
   * <Section>
   *   <BlockTitle>About Us</BlockTitle>
   *   <Typography tag="p">Content here...</Typography>
   * </Section>
   *
   * <Section variant="compact" bgColor="lightest">
   *   <h2>Compact Section</h2>
   * </Section>
   */

  export let variant: 'default' | 'compact' = 'default';
  export let bgColor: 'white' | 'lightest' | 'alt' = 'white';
  export let useContainer: boolean = true;
  export let className: string = '';

  $: classes = [
    'section',
    `section--${variant}`,
    `section--bg-${bgColor}`,
    className
  ]
    .filter(Boolean)
    .join(' ');
</script>

<section class={classes}>
  {#if useContainer}
    <div class="container">
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</section>

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  // ========================================
  // Section 基础样式（Pages 标准）
  // ========================================
  .section {
    position: relative;
    width: 100%;

    // ========================================
    // 间距变体（Pages 标准值）
    // ========================================

    // 默认间距（75px/85px）
    &--default {
      padding-top: $spacing-section-top; // 75px
      padding-bottom: $spacing-section-bottom; // 85px
    }

    // 紧凑间距（55px/65px）
    &--compact {
      padding-top: $spacing-section-compact-top; // 55px
      padding-bottom: $spacing-section-compact-bottom; // 65px
    }

    // ========================================
    // 背景颜色变体
    // ========================================

    // 白色背景（默认）
    &--bg-white {
      background-color: $color-white;
    }

    // 浅灰背景（#fafafa，Pages 标准）
    &--bg-lightest {
      background-color: $color-master-lightest; // mix($color-master, #fff, 3%)
    }

    // 备用背景色
    &--bg-alt {
      background-color: $color-background-alt; // #f5f5f5
    }

    // ========================================
    // Container 嵌套样式
    // ========================================
    .container {
      // container 样式由 mixins.scss 的 @include container 提供
      // 已在全局样式中定义，此处无需重复
    }
  }

  // ========================================
  // 响应式调整（移动端缩小间距）
  // ========================================
  @include respond-to(xs) {
    .section {
      &--default {
        padding-top: 50px; // 移动端缩小
        padding-bottom: 60px;
      }

      &--compact {
        padding-top: 35px;
        padding-bottom: 45px;
      }
    }
  }
</style>
