<script lang="ts">
  /**
   * Navigation 组件 - 国际律所导航栏
   * 支持滚动固定、透明背景、移动端菜单
   */

  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';

  export let logo: string = '';
  export let transparent: boolean = false;
  export let sticky: boolean = true;
  export let className: string = '';

  let scrolled = false;
  let mobileMenuOpen = false;

  $: classes = [
    'nav',
    transparent && !scrolled && 'nav--transparent',
    sticky && 'nav--sticky',
    scrolled && 'nav--scrolled',
    className
  ].filter(Boolean).join(' ');

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<nav class={classes}>
  <div class="nav__container container">
    <!-- Logo -->
    <a href="/" class="nav__logo" on:click={closeMobileMenu}>
      {#if logo}
        <img src={logo} alt="Watson & Band" />
      {:else}
        <span class="nav__logo-text">Watson & Band</span>
      {/if}
    </a>

    <!-- Desktop Navigation -->
    <div class="nav__menu" class:nav__menu--open={mobileMenuOpen}>
      <ul class="nav__list">
        <li class="nav__item">
          <a href="/" class="nav__link" on:click={closeMobileMenu}>
            {$_('nav.home')}
          </a>
        </li>
        <li class="nav__item">
          <a href="/about" class="nav__link" on:click={closeMobileMenu}>
            {$_('nav.about')}
          </a>
        </li>
        <li class="nav__item">
          <a href="/practices" class="nav__link" on:click={closeMobileMenu}>
            {$_('nav.practices')}
          </a>
        </li>
        <li class="nav__item">
          <a href="/team" class="nav__link" on:click={closeMobileMenu}>
            {$_('nav.team')}
          </a>
        </li>
        <li class="nav__item">
          <a href="/news" class="nav__link" on:click={closeMobileMenu}>
            {$_('nav.news')}
          </a>
        </li>
        <li class="nav__item">
          <a href="/contact" class="nav__link" on:click={closeMobileMenu}>
            {$_('nav.contact')}
          </a>
        </li>
        <li class="nav__item">
          <a href="/showcase" class="nav__link" on:click={closeMobileMenu}>
            {$_('nav.showcase')}
          </a>
        </li>
      </ul>

      <!-- Language Switcher & Actions -->
      <div class="nav__actions">
        <slot name="actions" />
      </div>
    </div>

    <!-- Mobile Menu Toggle -->
    <button
      class="nav__toggle"
      aria-label="Toggle menu"
      aria-expanded={mobileMenuOpen}
      on:click={toggleMobileMenu}
    >
      <span class="nav__toggle-line" />
      <span class="nav__toggle-line" />
      <span class="nav__toggle-line" />
    </button>
  </div>

  <!-- Mobile Menu Overlay -->
  {#if mobileMenuOpen}
    <div class="nav__overlay" on:click={closeMobileMenu} />
  {/if}
</nav>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .nav {
    width: 100%;
    background: $color-white;
    box-shadow: $shadow-sm;
    transition: all $transition-base $transition-ease;
    z-index: $z-index-sticky;

    // 固定导航
    &--sticky {
      position: sticky;
      top: 0;
    }

    // 透明导航
    &--transparent {
      background: transparent;
      box-shadow: none;

      .nav__logo-text,
      .nav__link {
        color: $color-white;
      }
    }

    // 滚动后状态
    &--scrolled {
      background: $color-white;
      box-shadow: $shadow-md;

      .nav__logo-text,
      .nav__link {
        color: $color-primary;
      }
    }

    &__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: $spacing-md;
      padding-bottom: $spacing-md;
      gap: $spacing-lg;
    }

    // Logo
    &__logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      z-index: $z-index-sticky + 1;

      img {
        height: 48px;
        width: auto;

        @include respond-from(tablet) {
          height: 56px;
        }
      }
    }

    &__logo-text {
      @include heading(xl);
      font-weight: 500; // 更优雅的字重
      color: $color-primary;
      transition: color $transition-base $transition-ease;
      letter-spacing: -0.01em; // 稍微宽松
    }

    // Desktop Menu
    &__menu {
      display: flex;
      align-items: center;
      gap: $spacing-xl;
      flex: 1;
      justify-content: flex-end;
      z-index: 1;

      @include respond-to(tablet) {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 280px;
        max-width: 80%;
        flex-direction: column;
        background: $color-white;
        padding: $spacing-3xl $spacing-lg;
        box-shadow: $shadow-xl;
        transform: translateX(100%);
        transition: transform $transition-slow $transition-ease;
        overflow-y: auto;
        z-index: $z-index-sticky;
        justify-content: flex-start;
        gap: 0;
      }

      &--open {
        @include respond-to(tablet) {
          transform: translateX(0);
        }
      }
    }

    &__list {
      display: flex;
      align-items: center;
      gap: $spacing-lg;
      list-style: none;

      @include respond-to(tablet) {
        flex-direction: column;
        width: 100%;
        gap: 0;
      }
    }

    &__item {
      @include respond-to(tablet) {
        width: 100%;
        border-bottom: 1px solid rgba($color-primary, 0.1);
      }
    }

    &__link {
      @include link-underline;
      display: block;
      padding: $spacing-xs 0;
      font-size: $font-size-base;
      font-weight: 400; // 改为 400，更轻盈优雅
      color: $color-primary;
      text-decoration: none;
      transition: color $transition-base $transition-ease;
      letter-spacing: 0.01em; // 增加可读性

      @include respond-to(tablet) {
        padding: $spacing-md 0;
        font-size: $font-size-lg;
      }

      &:hover,
      &.active {
        color: $color-secondary;
      }
    }

    // Actions (Language Switcher, Search, etc.)
    &__actions {
      display: flex;
      align-items: center;
      gap: $spacing-md;

      @include respond-to(tablet) {
        width: 100%;
        margin-top: $spacing-xl;
        padding-top: $spacing-xl;
        border-top: 1px solid rgba($color-primary, 0.1);
        flex-direction: column;
      }
    }

    // Mobile Menu Toggle
    &__toggle {
      @include button-reset;
      display: none;
      flex-direction: column;
      gap: 6px;
      padding: $spacing-xs;
      z-index: $z-index-sticky + 1;

      @include respond-to(tablet) {
        display: flex;
      }

      &:focus-visible {
        outline: 2px solid $color-secondary;
        outline-offset: 2px;
        border-radius: $radius-sm;
      }
    }

    &__toggle-line {
      width: 24px;
      height: 2px;
      background: $color-primary;
      transition: all $transition-base $transition-ease;

      .nav--transparent:not(.nav--scrolled) & {
        background: $color-white;
      }

      .nav--scrolled & {
        background: $color-primary;
      }

      .nav__menu--open ~ .nav__toggle &:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }

      .nav__menu--open ~ .nav__toggle &:nth-child(2) {
        opacity: 0;
      }

      .nav__menu--open ~ .nav__toggle &:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }

    // Mobile Overlay
    &__overlay {
      @include full-overlay;
      background: rgba($color-black, 0.5);
      z-index: $z-index-sticky - 1;

      @include respond-from(tablet) {
        display: none;
      }
    }
  }
</style>
