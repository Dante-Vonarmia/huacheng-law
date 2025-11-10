<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // 类型定义
  interface NavItem {
    id: string;
    label_zh: string;
    label_en: string;
    anchor: string;  // 如: #intro
    icon?: string;
  }

  // Props接口定义
  let { items = [], activeId = '' }: {
    items?: NavItem[];
    activeId?: string;
  } = $props();

  // 状态管理
  let currentActiveId = $state(activeId);
  let isMobileOpen = $state(false);
  let observer: IntersectionObserver | null = null;

  // 平滑滚动到指定章节
  function scrollToSection(anchor: string, itemId: string) {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      currentActiveId = itemId;
    }
    // 移动端点击后关闭抽屉
    if (isMobileOpen) {
      isMobileOpen = false;
    }
  }

  // 切换移动端抽屉
  function toggleMobileMenu() {
    isMobileOpen = !isMobileOpen;
  }

  // 生命周期管理
  onMount(() => {
    // 配置 Intersection Observer
    const options = {
      root: null,
      rootMargin: '-100px 0px -60% 0px', // 章节进入视口上部40%时激活
      threshold: 0
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentActiveId = entry.target.id;
        }
      });
    }, options);

    // 观察所有章节元素
    items.forEach(item => {
      const anchor = item.anchor.startsWith('#') ? item.anchor : `#${item.anchor}`;
      const element = document.querySelector(anchor);
      if (element) {
        observer?.observe(element);
      }
    });
  });

  onDestroy(() => {
    // 清理 Observer
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });

  // 判断是否激活
  function isActive(itemId: string): boolean {
    return currentActiveId === itemId;
  }
</script>

<!-- 桌面端侧边导航 -->
<nav class="side-nav">
  <ul class="side-nav__list">
    {#each items as item (item.id)}
      <li class="side-nav__item">
        <button
          class="side-nav__link"
          class:side-nav__link--active={isActive(item.id)}
          on:click={() => scrollToSection(item.anchor, item.id)}
          aria-current={isActive(item.id) ? 'true' : undefined}
        >
          {#if item.icon}
            <span class="side-nav__icon">{item.icon}</span>
          {/if}
          <span class="side-nav__text">{item.label_zh}</span>
        </button>
      </li>
    {/each}
  </ul>
</nav>

<!-- 移动端浮动按钮 -->
<button
  class="side-nav__mobile-toggle"
  on:click={toggleMobileMenu}
  aria-label="打开导航菜单"
  aria-expanded={isMobileOpen}
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
</button>

<!-- 移动端抽屉菜单 -->
{#if isMobileOpen}
  <div
    class="side-nav__mobile-overlay"
    on:click={toggleMobileMenu}
    role="button"
    tabindex="-1"
  ></div>
  <div class="side-nav__mobile-drawer">
    <div class="side-nav__mobile-header">
      <h3 class="side-nav__mobile-title">页面导航</h3>
      <button
        class="side-nav__mobile-close"
        on:click={toggleMobileMenu}
        aria-label="关闭导航菜单"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <ul class="side-nav__mobile-list">
      {#each items as item (item.id)}
        <li class="side-nav__mobile-item">
          <button
            class="side-nav__mobile-link"
            class:side-nav__mobile-link--active={isActive(item.id)}
            on:click={() => scrollToSection(item.anchor, item.id)}
          >
            {#if item.icon}
              <span class="side-nav__icon">{item.icon}</span>
            {/if}
            <span class="side-nav__text">{item.label_zh}</span>
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  // 桌面端侧边导航
  .side-nav {
    position: sticky;
    top: 100px;
    width: 240px;
    padding: 24px 0;

    @include respond-to('tablet') {
      display: none; // 平板及以下隐藏桌面端导航
    }

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__item {
      margin: 0;
      padding: 0;
    }

    &__link {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 12px 20px;
      border: none;
      border-left: 3px solid transparent;
      background: transparent;
      color: $color-text-secondary;
      font-size: 15px;
      font-weight: 400;
      text-align: left;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba($color-primary, 0.05);
        color: $color-primary;
      }

      &--active {
        border-left-color: $color-primary;
        background: rgba($color-primary, 0.08);
        color: $color-primary;
        font-weight: 500;
      }
    }

    &__icon {
      margin-right: 8px;
      font-size: 18px;
    }

    &__text {
      flex: 1;
    }
  }

  // 移动端浮动按钮
  .side-nav__mobile-toggle {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 50%;
    background: $color-primary;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 100;
    display: none;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background: $color-accent;
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    @include respond-to('tablet') {
      display: flex; // 平板及以下显示浮动按钮
    }

    @include respond-to('mobile') {
      bottom: 16px;
      right: 16px;
      width: 48px;
      height: 48px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  // 移动端遮罩层
  .side-nav__mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    animation: fadeIn 0.3s ease;

    @include respond-to('desktop') {
      display: none;
    }
  }

  // 移动端抽屉菜单
  .side-nav__mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 320px;
    max-width: 85vw;
    background: white;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
    z-index: 201;
    overflow-y: auto;
    animation: slideInRight 0.3s ease;

    @include respond-to('desktop') {
      display: none;
    }
  }

  .side-nav__mobile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid $color-border;
  }

  .side-nav__mobile-title {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: $color-text-primary;
  }

  .side-nav__mobile-close {
    padding: 8px;
    border: none;
    background: transparent;
    color: $color-text-secondary;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: $color-primary;
    }
  }

  .side-nav__mobile-list {
    list-style: none;
    margin: 0;
    padding: 16px 0;
  }

  .side-nav__mobile-item {
    margin: 0;
    padding: 0;
  }

  .side-nav__mobile-link {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 14px 24px;
    border: none;
    border-left: 3px solid transparent;
    background: transparent;
    color: $color-text-secondary;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba($color-primary, 0.05);
      color: $color-primary;
    }

    &--active {
      border-left-color: $color-primary;
      background: rgba($color-primary, 0.08);
      color: $color-primary;
      font-weight: 500;
    }
  }

  // 动画定义
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
</style>
