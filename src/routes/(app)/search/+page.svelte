<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
    import { Card, Badge, Button, Typography, Input } from '$ui/components';
  import { _ } from 'svelte-i18n';

  // 模拟搜索数据库
  const searchDatabase = {
    lawyers: [
      { id: '1', type: 'lawyer', name: '张明华', title: '合伙人', area: '知识产权', url: '/team#zhang-minghua' },
      { id: '2', type: 'lawyer', name: '王建国', title: '合伙人', area: '公司并购', url: '/team#wang-jianguo' },
      { id: '3', type: 'lawyer', name: '陈莉', title: '合伙人', area: '跨境投资', url: '/team#chen-li' }
    ],
    news: [
      { id: '1', type: 'news', title: '华诚律所成功代理某知名科技公司专利侵权案', excerpt: '在经过长达两年的诉讼程序后，我所知识产权团队成功为客户争取到合理赔偿...', date: '2024-11-15', url: '/news/1' },
      { id: '2', type: 'news', title: '跨境并购新趋势：华诚律所举办专题研讨会', excerpt: '11月8日，我所在上海总部举办了"2024年跨境并购法律实务"专题研讨会...', date: '2024-11-08', url: '/news/2' }
    ],
    practices: [
      { id: '1', type: 'practice', title: '知识产权', description: '专注于专利、商标、著作权等知识产权法律服务', url: '/practices#ip' },
      { id: '2', type: 'practice', title: '公司并购', description: '提供并购重组、股权投资等全方位法律支持', url: '/practices#ma' },
      { id: '3', type: 'practice', title: '诉讼仲裁', description: '代理各类民商事诉讼及国际仲裁案件', url: '/practices#litigation' }
    ],
    publications: [
      { id: '1', type: 'publication', title: '中国知识产权法律实务指南 2024', author: '张明华', year: 2024, url: '/publications#pub-1' },
      { id: '2', type: 'publication', title: '公司并购重组法律实务', author: '王建国', year: 2024, url: '/publications#pub-2' }
    ],
    events: [
      { id: '1', type: 'event', title: '2024年知识产权保护新趋势研讨会', date: '2024-12-15', location: '上海', url: '/events#event-1' },
      { id: '2', type: 'event', title: '企业合规管理实务培训', date: '2024-12-20', location: '线上', url: '/events#event-2' }
    ]
  };

  let query = '';
  let searchResults = [];
  let searching = false;
  let hasSearched = false;
  let selectedType = 'all';

  // 从URL获取查询参数
  onMount(() => {
    const urlQuery = $page.url.searchParams.get('q');
    if (urlQuery) {
      query = urlQuery;
      performSearch();
    }
  });

  function performSearch() {
    if (!query.trim()) return;

    searching = true;
    hasSearched = false;

    // 模拟搜索延迟
    setTimeout(() => {
      const results = [];
      const lowerQuery = query.toLowerCase();

      // 搜索律师
      searchDatabase.lawyers.forEach(lawyer => {
        if (lawyer.name.includes(query) || lawyer.area.toLowerCase().includes(lowerQuery)) {
          results.push({
            ...lawyer,
            highlight: highlightText(lawyer.name + ' - ' + lawyer.area, query)
          });
        }
      });

      // 搜索新闻
      searchDatabase.news.forEach(news => {
        if (news.title.toLowerCase().includes(lowerQuery) || news.excerpt.toLowerCase().includes(lowerQuery)) {
          results.push({
            ...news,
            highlight: highlightText(news.title, query)
          });
        }
      });

      // 搜索业务领域
      searchDatabase.practices.forEach(practice => {
        if (practice.title.toLowerCase().includes(lowerQuery) || practice.description.toLowerCase().includes(lowerQuery)) {
          results.push({
            ...practice,
            highlight: highlightText(practice.title + ' - ' + practice.description, query)
          });
        }
      });

      // 搜索出版物
      searchDatabase.publications.forEach(pub => {
        if (pub.title.toLowerCase().includes(lowerQuery) || pub.author.includes(query)) {
          results.push({
            ...pub,
            highlight: highlightText(pub.title, query)
          });
        }
      });

      // 搜索活动
      searchDatabase.events.forEach(event => {
        if (event.title.toLowerCase().includes(lowerQuery) || event.location.includes(query)) {
          results.push({
            ...event,
            highlight: highlightText(event.title, query)
          });
        }
      });

      searchResults = results;
      searching = false;
      hasSearched = true;
    }, 500);
  }

  function highlightText(text: string, query: string): string {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function handleSearch(e: Event) {
    e.preventDefault();
    performSearch();
  }

  const filteredResults = $derived(selectedType === 'all'
    ? searchResults
    : searchResults.filter(r => r.type === selectedType));

  const resultCounts = $derived({
    all: searchResults.length,
    lawyer: searchResults.filter(r => r.type === 'lawyer').length,
    news: searchResults.filter(r => r.type === 'news').length,
    practice: searchResults.filter(r => r.type === 'practice').length,
    publication: searchResults.filter(r => r.type === 'publication').length,
    event: searchResults.filter(r => r.type === 'event').length
  });

  function getTypeLabel(type: string): string {
    const labels = {
      lawyer: '律师',
      news: '新闻',
      practice: '业务',
      publication: '出版物',
      event: '活动'
    };
    return labels[type] || type;
  }

  function getTypeBadgeVariant(type: string): string {
    const variants = {
      lawyer: 'primary',
      news: 'secondary',
      practice: 'success',
      publication: 'warning',
      event: 'info'
    };
    return variants[type] || 'default';
  }
</script>


<Section variant="primary" padding="lg">
  <div class="search-header">
    <Typography tag="h1" variant="4xl" color="white" align="center" weight="300" style="margin-bottom: 32px;">
      搜索结果
    </Typography>

    <form on:submit={handleSearch} class="search-form">
      <div class="search-input-wrapper">
        <Input
          type="text"
          placeholder="搜索律师、新闻、业务领域..."
          bind:value={query}
          style="font-size: 18px; padding: 16px 20px;"
        />
        <Button type="submit" variant="secondary" size="lg" disabled={searching}>
          {searching ? '搜索中...' : '搜索'}
        </Button>
      </div>
    </form>
  </div>
</Section>

{#if hasSearched}
  <Section variant="light" padding="md">
    <div class="results-summary">
      <Typography tag="p" variant="base" color="secondary">
        找到 <strong>{searchResults.length}</strong> 个与 "<strong>{query}</strong>" 相关的结果
      </Typography>
    </div>

    <div class="filter-tabs">
      <button
        class="filter-tab {selectedType === 'all' ? 'active' : ''}"
        on:click={() => selectedType = 'all'}
      >
        全部 ({resultCounts.all})
      </button>
      {#if resultCounts.lawyer > 0}
        <button
          class="filter-tab {selectedType === 'lawyer' ? 'active' : ''}"
          on:click={() => selectedType = 'lawyer'}
        >
          律师 ({resultCounts.lawyer})
        </button>
      {/if}
      {#if resultCounts.news > 0}
        <button
          class="filter-tab {selectedType === 'news' ? 'active' : ''}"
          on:click={() => selectedType = 'news'}
        >
          新闻 ({resultCounts.news})
        </button>
      {/if}
      {#if resultCounts.practice > 0}
        <button
          class="filter-tab {selectedType === 'practice' ? 'active' : ''}"
          on:click={() => selectedType = 'practice'}
        >
          业务 ({resultCounts.practice})
        </button>
      {/if}
      {#if resultCounts.publication > 0}
        <button
          class="filter-tab {selectedType === 'publication' ? 'active' : ''}"
          on:click={() => selectedType = 'publication'}
        >
          出版物 ({resultCounts.publication})
        </button>
      {/if}
      {#if resultCounts.event > 0}
        <button
          class="filter-tab {selectedType === 'event' ? 'active' : ''}"
          on:click={() => selectedType = 'event'}
        >
          活动 ({resultCounts.event})
        </button>
      {/if}
    </div>
  </Section>

  <Section variant="white" padding="xl">
    {#if filteredResults.length > 0}
      <div class="results-list">
        {#each filteredResults as result}
          <Card variant="default" hoverable={true}>
            <a href={result.url} class="result-item">
              <div class="result-header">
                <Badge variant={getTypeBadgeVariant(result.type)}>
                  {getTypeLabel(result.type)}
                </Badge>
              </div>

              <div class="result-content">
                {#if result.type === 'lawyer'}
                  <Typography tag="h3" variant="lg" weight="500" style="margin-bottom: 8px;">
                    {@html result.highlight}
                  </Typography>
                  <Typography tag="p" variant="sm" color="secondary">
                    {result.title}
                  </Typography>
                {:else if result.type === 'news'}
                  <Typography tag="h3" variant="lg" weight="500" style="margin-bottom: 8px;">
                    {@html result.highlight}
                  </Typography>
                  <Typography tag="p" variant="sm" color="secondary" style="margin-top: 8px;">
                    {result.excerpt.substring(0, 150)}...
                  </Typography>
                  <Typography tag="p" variant="xs" color="light" style="margin-top: 8px;">
                    {result.date}
                  </Typography>
                {:else if result.type === 'practice'}
                  <Typography tag="h3" variant="lg" weight="500" style="margin-bottom: 8px;">
                    {@html result.highlight}
                  </Typography>
                  <Typography tag="p" variant="sm" color="secondary">
                    {result.description}
                  </Typography>
                {:else if result.type === 'publication'}
                  <Typography tag="h3" variant="lg" weight="500" style="margin-bottom: 8px;">
                    {@html result.highlight}
                  </Typography>
                  <Typography tag="p" variant="sm" color="secondary">
                    作者: {result.author} · {result.year}
                  </Typography>
                {:else if result.type === 'event'}
                  <Typography tag="h3" variant="lg" weight="500" style="margin-bottom: 8px;">
                    {@html result.highlight}
                  </Typography>
                  <Typography tag="p" variant="sm" color="secondary">
                    {result.date} · {result.location}
                  </Typography>
                {/if}
              </div>

              <div class="result-footer">
                <span class="result-link">查看详情 →</span>
              </div>
            </a>
          </Card>
        {/each}
      </div>
    {:else}
      <div class="empty-state">
        <Typography tag="p" variant="xl" color="light" align="center">
          未找到相关结果
        </Typography>
        <Typography tag="p" variant="base" color="secondary" align="center" style="margin-top: 16px;">
          请尝试使用其他关键词或筛选条件
        </Typography>
      </div>
    {/if}
  </Section>
{:else if !query}
  <Section variant="white" padding="xl">
    <div class="empty-state">
      <Typography tag="p" variant="xl" color="light" align="center">
        请输入搜索关键词
      </Typography>
      <Typography tag="p" variant="base" color="secondary" align="center" style="margin-top: 16px;">
        可以搜索律师、新闻、业务领域、出版物或活动
      </Typography>
    </div>
  </Section>
{/if}


<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .search-header {
    max-width: 800px;
    margin: 0 auto;
  }

  .search-form {
    width: 100%;
  }

  .search-input-wrapper {
    display: flex;
    gap: 12px;
    align-items: stretch;

    :global(.input-wrapper) {
      flex: 1;
    }

    @include respond-to(mobile) {
      flex-direction: column;
    }
  }

  .results-summary {
    text-align: center;
    margin-bottom: 24px;

    strong {
      color: $color-primary;
    }
  }

  .filter-tabs {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 0 auto;
  }

  .filter-tab {
    padding: 10px 20px;
    border: 1px solid $color-border;
    background: white;
    color: $color-text-primary;
    border-radius: $radius-sm;
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;
    transition: all $transition-base;

    &:hover {
      border-color: $color-primary;
      color: $color-primary;
    }

    &.active {
      background: $color-primary;
      border-color: $color-primary;
      color: white;
    }
  }

  .results-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .result-item {
    display: block;
    padding: 24px;
    text-decoration: none;
    color: inherit;
    transition: background-color $transition-base;

    &:hover {
      background-color: $color-background-light;
    }

    @include respond-to(mobile) {
      padding: 20px;
    }
  }

  .result-header {
    margin-bottom: 12px;
  }

  .result-content {
    margin-bottom: 16px;

    :global(mark) {
      background-color: $color-accent;
      color: white;
      padding: 2px 4px;
      border-radius: 3px;
      font-weight: 500;
    }
  }

  .result-footer {
    display: flex;
    justify-content: flex-end;
  }

  .result-link {
    color: $color-primary;
    font-size: 14px;
    font-weight: 500;
    transition: color $transition-base;

    .result-item:hover & {
      color: $color-accent;
    }
  }

  .empty-state {
    padding: 80px 20px;
    text-align: center;
  }
</style>
