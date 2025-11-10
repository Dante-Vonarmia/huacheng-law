<script lang="ts">
  /**
   * MegaMenu 组件 - 多列布局下拉菜单
   *
   * 特性：
   * - 支持多列布局（自动等宽分配）
   * - 响应式设计（桌面端多列，移动端单列）
   * - 平滑过渡动画
   * - 无障碍访问支持
   *
   * @example
   * <MegaMenu
   *   columns={menuColumns}
   *   isOpen={isMenuOpen}
   *   maxWidth="1200px"
   * />
   */

  import type { MegaMenuColumn } from './MegaMenu.types';

  export let columns: MegaMenuColumn[] = [];
  export let isOpen: boolean = false;
  export let maxWidth: string = '1200px';
  export let className: string = '';

  $: classes = [
    'mega-menu',
    isOpen ? 'mega-menu--open' : '',
    className
  ].filter(Boolean).join(' ');

  $: columnCount = columns.length;
</script>

<div class={classes} style="--max-width: {maxWidth}; --column-count: {columnCount}">
  <div class="mega-menu__container">
    <div class="mega-menu__grid">
      {#each columns as column (column.id)}
        <div class="mega-menu__column">
          {#if column.title}
            <h3 class="mega-menu__column-title">{column.title}</h3>
          {/if}
          <ul class="mega-menu__items">
            {#each column.items as item (item.id)}
              <li class="mega-menu__item">
                <a href={item.href} class="mega-menu__link">
                  {#if item.icon}
                    <span class="mega-menu__icon">{@html item.icon}</span>
                  {/if}
                  <div class="mega-menu__content">
                    <span class="mega-menu__label">{item.label}</span>
                    {#if item.description}
                      <span class="mega-menu__description">{item.description}</span>
                    {/if}
                  </div>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  // ========================================
  // MegaMenu 基础样式
  // ========================================
  .mega-menu {
    position: relative; // 改为relative，让wrapper控制定位
    width: 100%;
    max-width: var(--max-width, 1200px);
    margin: 0 auto; // 居中显示
    background: $color-white;
    border: 1px solid rgba($color-master, 0.08);
    border-radius: $radius-base;
    box-shadow: 0 8px 24px rgba($color-black, 0.08), 0 2px 8px rgba($color-black, 0.04);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all $transition-base cubic-bezier(0.4, 0, 0.2, 1);
    margin-top: $spacing-sm;

    // 打开状态
    &--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    // 小三角指示器 - 移除，因为mega menu是全宽显示
    // &::before {
    //   content: '';
    //   position: absolute;
    //   top: -8px;
    //   left: 50%;
    //   transform: translateX(-50%);
    //   width: 0;
    //   height: 0;
    //   border-left: 8px solid transparent;
    //   border-right: 8px solid transparent;
    //   border-bottom: 8px solid $color-white;
    //   filter: drop-shadow(0 -2px 2px rgba($color-black, 0.04));
    // }

    // ========================================
    // 容器与网格布局
    // ========================================
    &__container {
      padding: $spacing-xl $spacing-2xl;

      @include respond-to(md) {
        padding: $spacing-lg;
      }
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(var(--column-count, 4), 1fr);
      gap: $spacing-2xl; // 增加间距防止重叠
      align-items: start; // 顶部对齐

      @include respond-to(lg) {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: $spacing-xl;
      }

      @include respond-to(md) {
        grid-template-columns: 1fr;
        gap: $spacing-lg;
      }
    }

    // ========================================
    // 列样式
    // ========================================
    &__column {
      min-width: 0; // 防止内容溢出

      // 列之间的分隔线（仅桌面端）
      &:not(:last-child) {
        border-right: 1px solid rgba($color-master, 0.08);
        padding-right: $spacing-xl;

        @include respond-to(lg) {
          border-right: none;
          padding-right: 0;
        }
      }
    }

    &__column-title {
      font-family: $font-family-heading;
      font-size: $font-size-p; // 16px
      font-weight: $font-weight-semibold; // 600
      color: $color-primary;
      letter-spacing: 0.03em;
      margin: 0 0 $spacing-lg; // 增加下边距
      padding-bottom: $spacing-md;
      border-bottom: 1px solid rgba($color-secondary, 0.2); // 更细腻的分隔线
      position: relative;

      // 装饰性左侧条纹
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: $spacing-md;
        width: 3px;
        background: linear-gradient(to bottom, $color-secondary, transparent);
        border-radius: 2px;
      }

      padding-left: $spacing-md; // 为条纹留出空间

      @include respond-to(md) {
        font-size: $font-size-h6; // 18px
        margin-bottom: $spacing-md;
      }
    }

    // ========================================
    // 菜单项列表
    // ========================================
    &__items {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 4px; // 增加项目之间的间距
    }

    &__item {
      margin: 0;
    }

    &__link {
      display: flex;
      align-items: flex-start;
      gap: $spacing-sm;
      padding: $spacing-md $spacing-md;
      text-decoration: none;
      border-radius: $radius-sm;
      transition: all $transition-base;
      position: relative;

      // 左侧装饰条
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 60%;
        background: $color-secondary;
        border-radius: 0 2px 2px 0;
        transition: width $transition-fast;
      }

      &:hover {
        background: rgba($color-secondary, 0.05);
        padding-left: calc($spacing-md + 8px); // 为装饰条留出空间

        &::before {
          width: 3px;
        }

        .mega-menu__label {
          color: $color-secondary;
        }
      }

      &:focus-visible {
        outline: 2px solid $color-secondary;
        outline-offset: 2px;
      }

      @include respond-to(md) {
        padding: $spacing-md $spacing-lg;
      }
    }

    // ========================================
    // 图标与内容
    // ========================================
    &__icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      color: $color-secondary;

      :global(svg) {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
      min-width: 0;
    }

    &__label {
      font-size: $font-size-base; // 14px
      font-weight: $font-weight-normal; // 400
      color: $color-primary;
      transition: color $transition-fast;
      line-height: 1.6; // 更好的行高
      white-space: normal; // 允许换行
      word-break: break-word; // 防止长单词溢出

      @include respond-to(md) {
        font-size: $font-size-p; // 16px
      }
    }

    &__description {
      font-size: 11px;
      color: $color-master;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      @include respond-to(md) {
        font-size: $font-size-small; // 12px
      }
    }
  }
</style>
