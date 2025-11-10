<script lang="ts">
  /**
   * Header 组件 - Pages.Revox.io 标准导航栏
   *
   * 特点：
   * - 透明初始状态 + 滚动变不透明
   * - 固定在顶部（position: fixed）
   * - 60px 高度（Pages 标准）
   * - 移动端响应式菜单
   * - 平滑过渡动画
   *
   * @example
   * <Header
   *   variant="transparent"
   *   navLinks={[
   *     { label: '首页', href: '/', active: true },
   *     { label: '关于我们', href: '/about' },
   *     { label: '业务领域', href: '/practice-areas' }
   *   ]}
   * />
   */

  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { NavLink } from './Header.types';

  export let variant: 'default' | 'transparent' | 'dark' = 'default';
  export let navLinks: NavLink[] = [];
  export let logoSrc: string | undefined = undefined;
  export let logoText: string = '华诚律师事务所';
  export let logoHref: string = '/';
  export let scrollThreshold: number = 50;
  export let className: string = '';

  const dispatch = createEventDispatcher();

  let isScrolled = false;
  let isMobileMenuOpen = false;

  // 监听滚动事件
  function handleScroll() {
    isScrolled = window.scrollY > scrollThreshold;
  }

  // 切换移动端菜单
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    dispatch('menuToggle', { isOpen: isMobileMenuOpen });
  }

  // 导航链接点击
  function handleNavClick(link: NavLink) {
    dispatch('navClick', { link });
    // 移动端点击后关闭菜单
    if (isMobileMenuOpen) {
      isMobileMenuOpen = false;
    }
  }

  onMount(() => {
    if (variant === 'transparent') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // 初始检查
    }
  });

  onDestroy(() => {
    if (variant === 'transparent') {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  $: classes = [
    'header',
    `header--${variant}`,
    isScrolled && variant === 'transparent' ? 'header--scrolled' : '',
    isMobileMenuOpen ? 'header--mobile-open' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');
</script>

<header class={classes}>
  <div class="container">
    <div class="header__inner">
      <!-- Logo 区域 -->
      <div class="header__logo">
        <slot name="logo">
          <a href={logoHref} class="header__logo-link">
            {#if logoSrc}
              <img src={logoSrc} alt={logoText} class="header__logo-image" />
            {:else}
              <span class="header__logo-text">{logoText}</span>
            {/if}
          </a>
        </slot>
      </div>

      <!-- 移动端菜单按钮 -->
      <button
        class="header__menu-toggle"
        aria-label="Toggle menu"
        on:click={toggleMobileMenu}
      >
        <span class="header__menu-icon"></span>
        <span class="header__menu-icon"></span>
        <span class="header__menu-icon"></span>
      </button>

      <!-- 导航菜单 -->
      <nav class="header__nav">
        <ul class="header__nav-list">
          {#each navLinks as link}
            <li class="header__nav-item">
              <a
                href={link.href}
                class="header__nav-link {link.active ? 'header__nav-link--active' : ''}"
                on:click={() => handleNavClick(link)}
              >
                {link.label}
              </a>

              <!-- 子菜单（如果有） -->
              {#if link.children && link.children.length > 0}
                <ul class="header__submenu">
                  {#each link.children as child}
                    <li class="header__submenu-item">
                      <a
                        href={child.href}
                        class="header__submenu-link"
                        on:click={() => handleNavClick(child)}
                      >
                        {child.label}
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </nav>

      <!-- 右侧操作区（语言切换、搜索等） -->
      {#if $$slots.actions}
        <div class="header__actions">
          <slot name="actions" />
        </div>
      {/if}
    </div>
  </div>
</header>

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  // ========================================
  // Header 基础样式（Pages 标准）
  // ========================================
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: $header-default-height; // 60px
    z-index: $z-index-header; // 1000
    transition: background-color $transition-base ease,
      box-shadow $transition-base ease;

    // ========================================
    // Header 内部布局
    // ========================================
    &__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      position: relative;
    }

    // ========================================
    // Logo 样式
    // ========================================
    &__logo {
      flex-shrink: 0;
      z-index: 2;
    }

    &__logo-link {
      display: inline-block;
      text-decoration: none;
      transition: opacity $transition-fast;

      &:hover {
        opacity: 0.8;
      }
    }

    &__logo-image {
      height: 36px;
      width: auto;
      display: block;
    }

    &__logo-text {
      font-family: $font-family-heading;
      font-size: $font-size-h5; // 18px
      font-weight: $font-weight-semibold; // 600
      color: $color-primary;
      letter-spacing: $letter-spacing-heading;
    }

    // ========================================
    // 移动端菜单按钮
    // ========================================
    &__menu-toggle {
      display: none; // 桌面端隐藏
      flex-direction: column;
      justify-content: space-between;
      width: 28px;
      height: 20px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 2;

      @include respond-to(md) {
        display: flex; // 平板及以下显示
      }
    }

    &__menu-icon {
      display: block;
      width: 100%;
      height: 2px;
      background-color: $color-master-dark;
      transition: all $transition-base;
    }

    // 菜单打开时的汉堡图标动画
    &--mobile-open &__menu-icon {
      &:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }

    // ========================================
    // 导航菜单样式
    // ========================================
    &__nav {
      flex: 1;
      display: flex;
      justify-content: center;

      @include respond-to(md) {
        // 移动端全屏菜单
        position: fixed;
        top: $header-default-height;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: $color-white;
        transform: translateX(100%);
        transition: transform $transition-smooth;
        overflow-y: auto;
      }
    }

    &--mobile-open &__nav {
      @include respond-to(md) {
        transform: translateX(0);
      }
    }

    &__nav-list {
      display: flex;
      align-items: center;
      gap: $spacing-lg; // 40px
      list-style: none;
      margin: 0;
      padding: 0;

      @include respond-to(md) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        padding: $spacing-lg;
      }
    }

    &__nav-item {
      position: relative;
    }

    &__nav-link {
      // 使用 Pages header-link mixin
      @include header-link;

      display: block;
      padding: 8px 0;
      font-size: $font-size-base; // 14px
      font-weight: $font-weight-normal; // 400
      color: $color-master-dark;
      text-decoration: none;
      transition: color $transition-fast;
      position: relative;

      &:hover {
        color: $color-primary;
      }

      // 激活状态下划线
      &--active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: $color-primary;
      }

      @include respond-to(md) {
        padding: $spacing-md 0;
        font-size: $font-size-p; // 16px
        border-bottom: 1px solid rgba($color-master, 0.1);
      }
    }

    // ========================================
    // 子菜单样式
    // ========================================
    &__submenu {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 200px;
      background-color: $color-white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border-radius: $radius-base;
      list-style: none;
      margin: 0;
      padding: $spacing-sm 0;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all $transition-base;

      @include respond-to(md) {
        position: static;
        box-shadow: none;
        opacity: 1;
        visibility: visible;
        transform: none;
        padding-left: $spacing-md;
      }
    }

    &__nav-item:hover &__submenu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    &__submenu-link {
      display: block;
      padding: $spacing-sm $spacing-md;
      color: $color-master;
      text-decoration: none;
      font-size: $font-size-small; // 12px
      transition: color $transition-fast, background-color $transition-fast;

      &:hover {
        color: $color-primary;
        background-color: rgba($color-primary, 0.05);
      }
    }

    // ========================================
    // 右侧操作区
    // ========================================
    &__actions {
      display: flex;
      align-items: center;
      gap: $spacing-md;

      @include respond-to(md) {
        display: none; // 移动端可选择性隐藏
      }
    }

    // ========================================
    // Header 变体样式
    // ========================================

    // 默认变体（白色背景）
    &--default {
      background-color: $color-white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    // 透明变体（初始透明）
    &--transparent {
      background-color: transparent;
      box-shadow: none;

      .header__logo-text,
      .header__nav-link {
        color: $color-white; // 白色文字
      }

      .header__menu-icon {
        background-color: $color-white;
      }
    }

    // 透明变体滚动后（变为白色）
    &--transparent.header--scrolled {
      background-color: $color-white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

      .header__logo-text,
      .header__nav-link {
        color: $color-master-dark; // 恢复深色文字
      }

      .header__menu-icon {
        background-color: $color-master-dark;
      }
    }

    // 深色变体
    &--dark {
      background-color: $color-master-dark;
      box-shadow: none;

      .header__logo-text,
      .header__nav-link {
        color: $color-white;
      }

      .header__menu-icon {
        background-color: $color-white;
      }
    }
  }

  // ========================================
  // Body padding（防止内容被固定 header 遮挡）
  // ========================================
  :global(body) {
    padding-top: $header-default-height; // 60px
  }
</style>
