<script lang="ts">
  import type { PageData } from './$types';
  import { Section } from '$ui/components';
  import { NewsCard } from '$ui/domain';

  let { data }: { data: PageData } = $props();

  let searchQuery = $state('');
  let currentPage = $state(1);
  const itemsPerPage = 9;

  const filteredNews = $derived(data.news.filter((item) => {
    const matchesSearch = searchQuery === '' ||
      item.title_zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary_zh.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }));

  const totalPages = $derived(Math.ceil(filteredNews.length / itemsPerPage));
  const paginatedNews = $derived(filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ));

  function handleSearch() {
    currentPage = 1;
  }
</script>

<svelte:head>
  <title>华诚最新动态 - 华诚律师事务所</title>
  <meta name="description" content="华诚律师事务所最新动态与资讯" />
</svelte:head>

<Section variant="primary" padding="lg">
  <div class="hero-content">
    <p class="hero-label">LATEST ON WATSON & BAND</p>
    <h1 class="hero-title">华诚最新动态</h1>
    <p class="hero-subtitle">共 {data.news.length} 条资讯</p>
  </div>
</Section>

<Section variant="white" padding="xl">
  <div class="search-container">
    <input
      type="text"
      bind:value={searchQuery}
      oninput={handleSearch}
      placeholder="搜索新闻..."
      class="search-input"
    />
  </div>

  {#if paginatedNews.length > 0}
    <div class="news-grid">
      {#each paginatedNews as newsItem}
        <NewsCard news={newsItem} />
      {/each}
    </div>

    {#if totalPages > 1}
      <div class="pagination">
        <button
          class="pagination-btn"
          disabled={currentPage === 1}
          onclick={() => currentPage--}
        >
          上一页
        </button>
        <span class="pagination-info">
          第 {currentPage} / {totalPages} 页
        </span>
        <button
          class="pagination-btn"
          disabled={currentPage === totalPages}
          onclick={() => currentPage++}
        >
          下一页
        </button>
      </div>
    {/if}
  {:else}
    <div class="empty-state">
      <p>暂无相关新闻</p>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  .hero-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-label {
    font-size: $font-size-small;
    font-weight: $font-weight-semibold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: $spacing-sm;
  }

  .hero-title {
    font-size: $font-size-h1;
    font-weight: $font-weight-medium;
    color: $color-white;
    margin-bottom: $spacing-md;
    letter-spacing: -0.02em;

    @include respond-to(mobile) {
      font-size: $font-size-h2;
    }
  }

  .hero-subtitle {
    font-size: $font-size-base;
    color: rgba(255, 255, 255, 0.8);
  }

  .search-container {
    max-width: 600px;
    margin: 0 auto $spacing-2xl;
  }

  .search-input {
    width: 100%;
    padding: $spacing-md $spacing-lg;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    font-size: $font-size-base;
    transition: all $transition-base;

    &:focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
    }
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $spacing-2xl;
    margin-bottom: $spacing-2xl;

    @include respond-to(tablet) {
      grid-template-columns: 1fr;
      gap: $spacing-xl;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $spacing-lg;
    margin-top: $spacing-2xl;
  }

  .pagination-btn {
    padding: $spacing-sm $spacing-lg;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    background: $color-white;
    color: $color-text-primary;
    font-size: $font-size-base;
    cursor: pointer;
    transition: all $transition-base;

    &:hover:not(:disabled) {
      background: $color-primary;
      color: $color-white;
      border-color: $color-primary;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .pagination-info {
    font-size: $font-size-base;
    color: $color-text-secondary;
  }

  .empty-state {
    text-align: center;
    padding: $spacing-3xl;
    color: $color-text-secondary;
    font-size: $font-size-lg;
  }
</style>
