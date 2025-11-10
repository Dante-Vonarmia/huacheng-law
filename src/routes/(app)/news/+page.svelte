<script lang="ts">
  import type { PageData } from './$types';
  import { Section } from '$ui/components';
  import { NewsCard } from '$ui/domain';

  // Props
  let { data }: { data: PageData } = $props();

  // State
  let selectedCategory = $state('全部');
  let searchQuery = $state('');
  let currentPage = $state(1);
  const itemsPerPage = 9;

  // 过滤新闻
  const filteredNews = $derived(data.news.filter((item) => {
    const matchesCategory = selectedCategory === '全部' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      item.title_zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary_zh.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }));

  // 分页
  const totalPages = $derived(Math.ceil(filteredNews.length / itemsPerPage));
  const paginatedNews = $derived(filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ));

  // 分类（添加"全部"）
  const categories = $derived(['全部', ...data.categories]);

  // 切换分类时重置页码
  function selectCategory(category: string) {
    selectedCategory = category;
    currentPage = 1;
  }

  // 搜索时重置页码
  function handleSearch() {
    currentPage = 1;
  }
</script>

<svelte:head>
  <title>新闻中心 - 华诚律师事务所</title>
  <meta name="description" content="华诚律师事务所最新动态、业务成果、专业观点和活动资讯" />
</svelte:head>

<div class="news-page">
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <h1 class="hero__title">新闻中心</h1>
      <p class="hero__subtitle">
        关注华诚最新动态，了解行业前沿资讯
      </p>
    </div>
  </section>

  <!-- Breaking News Ticker -->
  <section class="ticker-section">
    <div class="ticker-container">
      <div class="ticker-label">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1v6l4 2M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        最新动态
      </div>
      <div class="ticker-wrapper">
        <div class="ticker-content">
          {#each [...data.news.slice(0, 8), ...data.news.slice(0, 8)] as item}
            <a href="/news/{item.id}" class="ticker-item">
              <span class="ticker-badge">{item.category}</span>
              <span class="ticker-text">{item.title_zh}</span>
              <span class="ticker-separator">•</span>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Filters Section -->
  <Section variant="compact" bgColor="lightest">
    <div class="filters">
      <!-- Search Bar -->
      <div class="search-bar">
        <svg class="search-bar__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input
          type="text"
          class="search-bar__input"
          placeholder="搜索新闻..."
          bind:value={searchQuery}
          oninput={handleSearch}
        />
      </div>

      <!-- Category Filters -->
      <div class="category-filters">
        {#each categories as category}
          <button
            class="category-filter"
            class:category-filter--active={selectedCategory === category}
            onclick={() => selectCategory(category)}
          >
            {category}
          </button>
        {/each}
      </div>
    </div>
  </Section>

  <!-- News Grid -->
  <Section>
    {#if paginatedNews.length > 0}
      <div class="news-grid">
        {#each paginatedNews as newsItem (newsItem.id)}
          <NewsCard news={newsItem} locale="zh" variant="default" />
        {/each}
      </div>

      <!-- Pagination -->
      {#if totalPages > 1}
        <div class="pagination">
          <button
            class="pagination__btn"
            disabled={currentPage === 1}
            onclick={() => currentPage--}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            上一页
          </button>

          <div class="pagination__numbers">
            {#each Array(totalPages) as _, i}
              <button
                class="pagination__number"
                class:pagination__number--active={currentPage === i + 1}
                onclick={() => currentPage = i + 1}
              >
                {i + 1}
              </button>
            {/each}
          </div>

          <button
            class="pagination__btn"
            disabled={currentPage === totalPages}
            onclick={() => currentPage++}
          >
            下一页
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      {/if}
    {:else}
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8ZM32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32C52 43.0457 43.0457 52 32 52ZM28 24H36V40H28V24Z" fill="currentColor" opacity="0.2"/>
        </svg>
        <h3 class="empty-state__title">暂无相关新闻</h3>
        <p class="empty-state__desc">请尝试其他分类或搜索关键词</p>
      </div>
    {/if}
  </Section>
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .news-page {
    min-height: 100vh;
    background: $color-white;
  }

  // Hero Section
  .hero {
    position: relative;
    padding: 120px 0 80px;
    background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
    color: $color-white;

    @include respond-to(mobile) {
      padding: 80px 0 60px;
    }

    &__title {
      @include heading(xl);
      font-weight: 700;
      margin-bottom: $spacing-md;
      text-align: center;

      @include respond-to(mobile) {
        font-size: 32px;
      }
    }

    &__subtitle {
      @include heading(md);
      font-weight: 400;
      text-align: center;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;

      @include respond-to(mobile) {
        font-size: 16px;
      }
    }
  }

  // Ticker Section
  .ticker-section {
    background: $color-white;
    border-bottom: 1px solid $color-border;
    overflow: hidden;
  }

  .ticker-container {
    display: flex;
    align-items: center;
    max-width: 100%;
    height: 52px;
  }

  .ticker-label {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 $spacing-lg;
    background: $color-secondary;
    color: $color-white;
    font-size: $font-size-sm;
    font-weight: 600;
    height: 100%;
    white-space: nowrap;
    flex-shrink: 0;

    svg {
      flex-shrink: 0;
    }

    @include respond-to(mobile) {
      padding: 0 $spacing-md;
      font-size: 12px;
    }
  }

  .ticker-wrapper {
    flex: 1;
    overflow: hidden;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 80px;
      z-index: 2;
      pointer-events: none;
    }

    &::before {
      left: 0;
      background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    }

    &::after {
      right: 0;
      background: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    }
  }

  .ticker-content {
    display: flex;
    animation: ticker-scroll 60s linear infinite;

    &:hover {
      animation-play-state: paused;
    }
  }

  @keyframes ticker-scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .ticker-item {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    padding: 0 $spacing-lg;
    white-space: nowrap;
    text-decoration: none;
    color: $color-text;
    transition: color $transition-base $transition-ease;

    &:hover {
      color: $color-primary;

      .ticker-badge {
        background: $color-primary;
        border-color: $color-primary;
      }
    }
  }

  .ticker-badge {
    display: inline-block;
    padding: 4px 10px;
    background: rgba($color-secondary, 0.1);
    border: 1px solid rgba($color-secondary, 0.2);
    border-radius: $radius-full;
    font-size: 11px;
    font-weight: 600;
    color: $color-secondary;
    transition: all $transition-base $transition-ease;
  }

  .ticker-text {
    font-size: $font-size-sm;
    font-weight: 500;
  }

  .ticker-separator {
    color: $color-border;
    font-size: 12px;
    margin: 0 $spacing-xs;
  }

  // Filters
  .filters {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
  }

  .search-bar {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;

    &__icon {
      position: absolute;
      left: $spacing-md;
      top: 50%;
      transform: translateY(-50%);
      color: $color-text-light;
      pointer-events: none;
    }

    &__input {
      width: 100%;
      padding: $spacing-md $spacing-md $spacing-md 48px;
      border: 1px solid $color-border;
      border-radius: $radius-lg;
      font-size: $font-size-base;
      transition: all $transition-base $transition-ease;

      &:focus {
        outline: none;
        border-color: $color-primary;
        box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
      }

      &::placeholder {
        color: $color-text-light;
      }
    }
  }

  .category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
    justify-content: center;
  }

  .category-filter {
    padding: $spacing-sm $spacing-lg;
    border: 1px solid $color-border;
    background: $color-white;
    color: $color-text;
    border-radius: $radius-full;
    font-size: $font-size-sm;
    font-weight: 500;
    cursor: pointer;
    transition: all $transition-base $transition-ease;

    &:hover {
      border-color: $color-primary;
      color: $color-primary;
      background: rgba($color-primary, 0.05);
    }

    &--active {
      background: $color-primary;
      color: $color-white;
      border-color: $color-primary;

      &:hover {
        background: $color-accent;
        border-color: $color-accent;
      }
    }
  }

  // News Grid
  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: $spacing-xl;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-lg;
    }
  }

  // Pagination
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $spacing-md;
    margin-top: $spacing-2xl;

    &__btn {
      display: inline-flex;
      align-items: center;
      gap: $spacing-xs;
      padding: $spacing-sm $spacing-lg;
      border: 1px solid $color-border;
      background: $color-white;
      color: $color-text;
      border-radius: $radius-md;
      font-size: $font-size-sm;
      font-weight: 500;
      cursor: pointer;
      transition: all $transition-base $transition-ease;

      &:hover:not(:disabled) {
        border-color: $color-primary;
        color: $color-primary;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    &__numbers {
      display: flex;
      gap: $spacing-xs;
    }

    &__number {
      width: 40px;
      height: 40px;
      border: 1px solid $color-border;
      background: $color-white;
      color: $color-text;
      border-radius: $radius-md;
      font-size: $font-size-sm;
      font-weight: 500;
      cursor: pointer;
      transition: all $transition-base $transition-ease;

      &:hover {
        border-color: $color-primary;
        color: $color-primary;
      }

      &--active {
        background: $color-primary;
        color: $color-white;
        border-color: $color-primary;

        &:hover {
          background: $color-accent;
          border-color: $color-accent;
        }
      }
    }
  }

  // Empty State
  .empty-state {
    text-align: center;
    padding: $spacing-2xl 0;

    svg {
      color: $color-text-light;
      margin-bottom: $spacing-lg;
    }

    &__title {
      @include heading(lg);
      font-weight: 600;
      color: $color-text;
      margin-bottom: $spacing-sm;
    }

    &__desc {
      @include body-text;
      color: $color-text-light;
    }
  }
</style>
