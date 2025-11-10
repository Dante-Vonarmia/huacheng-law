<script lang="ts">
  /**
   * MinimalNav - 简约高端导航栏
   * 专为华诚律所设计的轻量级导航
   * Mobile First 优先
   */

  import { onMount, onDestroy } from 'svelte';

  export let transparent: boolean = true;
  export let variant: 'onepage' | 'multipage' = 'onepage';
  export let activeSection: string = 'home';

  let scrolled = false;
  let mobileMenuOpen = false;

  // 核心导航项（简化版）
  const navItems = [
    { id: 'home', label: '首页', href: variant === 'onepage' ? '#home' : '/' },
    { id: 'about', label: '关于', href: variant === 'onepage' ? '#about' : '/about' },
    { id: 'practices', label: '业务', href: variant === 'onepage' ? '#practices' : '/practices' },
    { id: 'team', label: '团队', href: variant === 'onepage' ? '#team' : '/team' },
    { id: 'news', label: '动态', href: variant === 'onepage' ? '#news' : '/news' },
    { id: 'contact', label: '联系', href: variant === 'onepage' ? '#contact' : '/contact' }
  ];

  function handleScroll() {
    if (typeof window !== 'undefined') {
      scrolled = window.scrollY > 50;
    }
  }

  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMenu() {
    mobileMenuOpen = false;
  }

  function scrollToSection(id: string) {
    if (variant === 'onepage' && typeof document !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
      }
    }
  }

  onMount(() => {
    if (transparent && typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }
  });

  onDestroy(() => {
    if (transparent && typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  $: navClass = [
    'minimal-nav',
    transparent && !scrolled ? 'minimal-nav--transparent' : '',
    scrolled ? 'minimal-nav--scrolled' : '',
    mobileMenuOpen ? 'minimal-nav--menu-open' : ''
  ].filter(Boolean).join(' ');
</script>

<nav class={navClass}>
  <div class="minimal-nav__container">
    <!-- Logo -->
    <a
      href={variant === 'onepage' ? '#home' : '/'}
      class="minimal-nav__logo"
      on:click|preventDefault={() => variant === 'onepage' && scrollToSection('home')}
    >
      <span class="minimal-nav__logo-zh">华诚</span>
      <span class="minimal-nav__logo-divider"></span>
      <span class="minimal-nav__logo-en">Watson & Band</span>
    </a>

    <!-- Desktop Navigation -->
    <ul class="minimal-nav__menu">
      {#each navItems as item}
        <li class="minimal-nav__item">
          <a
            href={item.href}
            class="minimal-nav__link"
            class:minimal-nav__link--active={activeSection === item.id}
            on:click|preventDefault={() => scrollToSection(item.id)}
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Language Switcher (简洁版) -->
    <div class="minimal-nav__actions">
      <button class="minimal-nav__lang" aria-label="Switch language">
        <span class="minimal-nav__lang-text">EN</span>
      </button>
    </div>

    <!-- Mobile Menu Toggle -->
    <button
      class="minimal-nav__toggle"
      aria-label="Toggle menu"
      aria-expanded={mobileMenuOpen}
      on:click={toggleMenu}
    >
      <span class="minimal-nav__toggle-line"></span>
      <span class="minimal-nav__toggle-line"></span>
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div class="minimal-nav__mobile-menu">
      <ul class="minimal-nav__mobile-list">
        {#each navItems as item}
          <li class="minimal-nav__mobile-item">
            <a
              href={item.href}
              class="minimal-nav__mobile-link"
              class:minimal-nav__mobile-link--active={activeSection === item.id}
              on:click|preventDefault={() => scrollToSection(item.id)}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
      <div class="minimal-nav__mobile-actions">
        <button class="minimal-nav__mobile-lang">English</button>
      </div>
    </div>
    <div class="minimal-nav__overlay" on:click={closeMenu}></div>
  {/if}
</nav>

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;

  // ========================================
  // 简约导航栏 - 高端设计
  // ========================================
  .minimal-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: $z-index-sticky;
    transition: all 0.3s ease;

    // 透明状态
    &--transparent {
      background: transparent;

      .minimal-nav__logo-zh,
      .minimal-nav__logo-en,
      .minimal-nav__link,
      .minimal-nav__lang-text {
        color: $color-white;
      }

      .minimal-nav__logo-divider {
        background: rgba(255, 255, 255, 0.3);
      }

      .minimal-nav__toggle-line {
        background: $color-white;
      }
    }

    // 滚动后状态
    &--scrolled {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);

      .minimal-nav__logo-zh,
      .minimal-nav__logo-en,
      .minimal-nav__link,
      .minimal-nav__lang-text {
        color: $color-primary;
      }

      .minimal-nav__logo-divider {
        background: rgba($color-primary, 0.2);
      }

      .minimal-nav__toggle-line {
        background: $color-primary;
      }
    }

    // ========================================
    // 容器布局
    // ========================================
    &__container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 32px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 48px;

      @media (max-width: $breakpoint-md) {
        height: 60px;
        padding: 0 20px;
        gap: 24px;
      }
    }

    // ========================================
    // Logo 设计（中英文组合）
    // ========================================
    &__logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      transition: opacity 0.2s;
      flex-shrink: 0;

      &:hover {
        opacity: 0.85;
      }
    }

    &__logo-zh {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0.05em;
      transition: color 0.3s;

      @media (max-width: $breakpoint-md) {
        font-size: 18px;
      }
    }

    &__logo-divider {
      width: 1px;
      height: 16px;
      transition: background 0.3s;
    }

    &__logo-en {
      font-family: $font-family-en;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.02em;
      transition: color 0.3s;
      opacity: 0.9;

      @media (max-width: $breakpoint-md) {
        font-size: 12px;
      }
    }

    // ========================================
    // 桌面端导航菜单（极简）
    // ========================================
    &__menu {
      display: flex;
      align-items: center;
      gap: 36px;
      list-style: none;
      margin: 0;
      padding: 0;
      flex: 1;
      justify-content: center;

      @media (max-width: $breakpoint-md) {
        display: none;
      }
    }

    &__item {
      position: relative;
    }

    &__link {
      display: block;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.02em;
      text-decoration: none;
      transition: all 0.2s;
      position: relative;
      padding: 4px 0;

      // 下划线动画
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 1px;
        background: currentColor;
        transition: all 0.3s ease;
        transform: translateX(-50%);
      }

      &:hover,
      &--active {
        &::after {
          width: 100%;
        }
      }

      &--active {
        font-weight: 500;
      }
    }

    // ========================================
    // 右侧操作区（语言切换）
    // ========================================
    &__actions {
      display: flex;
      align-items: center;
      gap: 16px;

      @media (max-width: $breakpoint-md) {
        display: none;
      }
    }

    &__lang {
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        background: rgba($color-secondary, 0.1);
      }
    }

    &__lang-text {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.05em;
      transition: color 0.3s;
    }

    // ========================================
    // 移动端菜单按钮（极简两条线）
    // ========================================
    &__toggle {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 24px;
      height: 14px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;

      @media (max-width: $breakpoint-md) {
        display: flex;
      }
    }

    &__toggle-line {
      width: 100%;
      height: 2px;
      transition: all 0.3s ease;
      border-radius: 2px;
    }

    // 菜单打开时的动画
    &--menu-open &__toggle-line {
      &:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }
      &:nth-child(2) {
        transform: translateY(-6px) rotate(-45deg);
      }
    }

    // ========================================
    // 移动端菜单（全屏）
    // ========================================
    &__mobile-menu {
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      background: $color-white;
      z-index: $z-index-sticky - 1;
      padding: 32px 20px;
      overflow-y: auto;
      animation: slideDown 0.3s ease;
    }

    &__mobile-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__mobile-item {
      border-bottom: 1px solid rgba($color-primary, 0.08);
    }

    &__mobile-link {
      display: block;
      padding: 18px 0;
      font-size: 16px;
      font-weight: 400;
      color: $color-primary;
      text-decoration: none;
      transition: all 0.2s;

      &:hover,
      &--active {
        color: $color-secondary;
        padding-left: 12px;
      }

      &--active {
        font-weight: 500;
      }
    }

    &__mobile-actions {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 1px solid rgba($color-primary, 0.08);
    }

    &__mobile-lang {
      width: 100%;
      padding: 14px;
      background: rgba($color-secondary, 0.08);
      border: none;
      border-radius: 6px;
      font-size: 15px;
      font-weight: 500;
      color: $color-primary;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: rgba($color-secondary, 0.15);
      }
    }

    // 遮罩层
    &__overlay {
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba($color-black, 0.4);
      backdrop-filter: blur(2px);
      z-index: $z-index-sticky - 2;
      animation: fadeIn 0.3s ease;
    }
  }

  // ========================================
  // 动画
  // ========================================
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
