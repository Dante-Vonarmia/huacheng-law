<script lang="ts">
  import type { PageData } from './$types';
  import { Section } from '$ui/components';
  import { NewsCard } from '$ui/domain';
    
  // Props
  let { data }: { data: PageData } = $props();

  // 格式化日期
  const formattedDate = $derived(new Date(data.news.published_date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  import { browser } from '$app/environment';

  // 分享功能
  function shareOnWeChat() {
    // 实际项目中需要调用微信分享API
    if (browser) alert('微信分享功能');
  }

  function shareOnWeibo() {
    if (!browser) return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(data.news.title_zh);
    window.open(`http://service.weibo.com/share/share.php?url=${url}&title=${title}`);
  }

  function copyLink() {
    if (!browser) return;
    navigator.clipboard.writeText(window.location.href);
    alert('链接已复制到剪贴板');
  }
</script>

<svelte:head>
  <title>{data.news.title_zh} - 华诚律师事务所</title>
  <meta name="description" content={data.news.summary_zh} />
  <meta property="og:title" content={data.news.title_zh} />
  <meta property="og:description" content={data.news.summary_zh} />
  {#if data.news.cover_image}
    <meta property="og:image" content={data.news.cover_image} />
  {/if}
</svelte:head>

<div class="news-detail">
  <!-- Breadcrumb -->
  <section class="breadcrumb">
    <div class="container">
      <nav class="breadcrumb__nav">
        <a href="/" class="breadcrumb__link">首页</a>
        <span class="breadcrumb__separator">/</span>
        <a href="/news" class="breadcrumb__link">新闻中心</a>
        <span class="breadcrumb__separator">/</span>
        <span class="breadcrumb__current">{data.news.title_zh}</span>
      </nav>
    </div>
  </section>

  <!-- Article Header -->
  <Section variant="compact">
    <article class="article">
      <header class="article__header">
        <div class="article__category">{data.news.category}</div>
        <h1 class="article__title">{data.news.title_zh}</h1>
        <div class="article__meta">
          <time class="article__date" datetime={data.news.published_date}>
            {formattedDate}
          </time>
          {#if data.news.author_ids && data.news.author_ids.length > 0}
            <span class="article__author">
              作者: {data.news.author_ids.join(', ')}
            </span>
          {/if}
        </div>
      </header>

      <!-- Cover Image -->
      {#if data.news.cover_image}
        <div class="article__cover">
          <img src={data.news.cover_image} alt={data.news.title_zh} />
        </div>
      {/if}

      <!-- Article Content -->
      <div class="article__content">
        <!-- Summary -->
        <div class="article__summary">
          {data.news.summary_zh}
        </div>

        <!-- Main Content -->
        {#if data.news.content_zh}
          <div class="article__body">
            {@html data.news.content_zh.replace(/\n/g, '<br>')}
          </div>
        {:else}
          <div class="article__body">
            <p>{data.news.summary_zh}</p>
            <p>完整内容敬请期待...</p>
          </div>
        {/if}
      </div>

      <!-- Share Buttons -->
      <div class="article__share">
        <div class="share-label">分享至:</div>
        <div class="share-buttons">
          <button class="share-btn share-btn--wechat" onclick={shareOnWeChat}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C5.58172 2 2 5.13401 2 9C2 11.0902 3.1099 12.9496 4.8418 14.1406L4 17L6.8125 15.5938C7.79883 15.8555 8.87305 16 10 16C14.4183 16 18 12.866 18 9C18 5.13401 14.4183 2 10 2Z" fill="currentColor"/>
            </svg>
            微信
          </button>
          <button class="share-btn share-btn--weibo" onclick={shareOnWeibo}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16 5C17.1046 5 18 4.10457 18 3C18 1.89543 17.1046 1 16 1C14.8954 1 14 1.89543 14 3C14 4.10457 14.8954 5 16 5Z" fill="currentColor"/>
              <path d="M8 19C12.4183 19 16 15.866 16 12C16 8.13401 12.4183 5 8 5C3.58172 5 0 8.13401 0 12C0 15.866 3.58172 19 8 19Z" fill="currentColor"/>
            </svg>
            微博
          </button>
          <button class="share-btn share-btn--link" onclick={copyLink}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10.5858 5.58579C11.3668 4.80474 12.6332 4.80474 13.4142 5.58579L14.4142 6.58579C15.1953 7.36683 15.1953 8.63316 14.4142 9.41421L12.4142 11.4142C11.6332 12.1953 10.3668 12.1953 9.58579 11.4142M9.41421 14.4142C8.63316 15.1953 7.36683 15.1953 6.58579 14.4142L5.58579 13.4142C4.80474 12.6332 4.80474 11.3668 5.58579 10.5858L7.58579 8.58579C8.36683 7.80474 9.63316 7.80474 10.4142 8.58579" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            复制链接
          </button>
        </div>
      </div>
    </article>
  </Section>

  <!-- Related News -->
  {#if data.relatedNews.length > 0}
    <Section bgColor="lightest">
      <h2 class="related-title">相关新闻</h2>
      <div class="related-grid">
        {#each data.relatedNews as newsItem (newsItem.id)}
          <NewsCard news={newsItem} locale="zh" variant="compact" />
        {/each}
      </div>
    </Section>
  {/if}
</div>


<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .news-detail {
    min-height: 100vh;
    background: $color-white;
  }

  // Breadcrumb
  .breadcrumb {
    padding: $spacing-lg 0;
    background: $color-background;
    border-bottom: 1px solid $color-border;

    &__nav {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      font-size: $font-size-sm;
    }

    &__link {
      color: $color-text-light;
      text-decoration: none;
      transition: color $transition-base $transition-ease;

      &:hover {
        color: $color-primary;
      }
    }

    &__separator {
      color: $color-text-light;
    }

    &__current {
      color: $color-text;
      font-weight: 500;
      @include truncate;
      max-width: 300px;
    }
  }

  // Article
  .article {
    max-width: 800px;
    margin: 0 auto;

    &__header {
      text-align: center;
      margin-bottom: $spacing-2xl;
    }

    &__category {
      display: inline-block;
      padding: $spacing-xs $spacing-md;
      background: rgba($color-primary, 0.1);
      color: $color-primary;
      font-size: $font-size-xs;
      font-weight: 600;
      border-radius: $radius-full;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: $spacing-md;
    }

    &__title {
      @include heading(xxl);
      font-weight: 700;
      color: $color-text;
      margin-bottom: $spacing-lg;
      line-height: 1.3;

      @include respond-to(mobile) {
        font-size: 28px;
      }
    }

    &__meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-lg;
      color: $color-text-light;
      font-size: $font-size-sm;

      @include respond-to(mobile) {
        flex-direction: column;
        gap: $spacing-xs;
      }
    }

    &__date {
      display: flex;
      align-items: center;
      gap: $spacing-xs;

      &::before {
        content: '📅';
      }
    }

    &__author {
      display: flex;
      align-items: center;
      gap: $spacing-xs;
    }

    &__cover {
      margin-bottom: $spacing-2xl;
      border-radius: $radius-lg;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    &__content {
      margin-bottom: $spacing-2xl;
    }

    &__summary {
      @include heading(md);
      font-weight: 400;
      color: $color-text-light;
      padding: $spacing-lg;
      background: rgba($color-secondary, 0.05);
      border-left: 4px solid $color-secondary;
      border-radius: $radius-md;
      margin-bottom: $spacing-2xl;
      line-height: 1.8;

      @include respond-to(mobile) {
        font-size: $font-size-base;
        padding: $spacing-md;
      }
    }

    &__body {
      @include body-text;
      color: $color-text;
      line-height: 1.8;

      :global(p) {
        margin-bottom: $spacing-lg;
      }

      :global(h2) {
        @include heading(xl);
        font-weight: 700;
        margin: $spacing-2xl 0 $spacing-lg;
      }

      :global(h3) {
        @include heading(lg);
        font-weight: 600;
        margin: $spacing-xl 0 $spacing-md;
      }

      :global(ul), :global(ol) {
        margin-bottom: $spacing-lg;
        padding-left: $spacing-xl;
      }

      :global(li) {
        margin-bottom: $spacing-sm;
      }

      :global(blockquote) {
        padding: $spacing-md $spacing-lg;
        background: $color-background;
        border-left: 4px solid $color-primary;
        margin: $spacing-lg 0;
        font-style: italic;
      }

      :global(img) {
        max-width: 100%;
        height: auto;
        border-radius: $radius-md;
        margin: $spacing-lg 0;
      }
    }

    &__share {
      padding-top: $spacing-2xl;
      border-top: 1px solid $color-border;
      display: flex;
      align-items: center;
      gap: $spacing-lg;

      @include respond-to(mobile) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  .share-label {
    font-weight: 600;
    color: $color-text;
  }

  .share-buttons {
    display: flex;
    gap: $spacing-md;
    flex-wrap: wrap;
  }

  .share-btn {
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

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &--wechat {
      &:hover {
        background: #07C160;
        color: $color-white;
        border-color: #07C160;
      }
    }

    &--weibo {
      &:hover {
        background: #E6162D;
        color: $color-white;
        border-color: #E6162D;
      }
    }

    &--link {
      &:hover {
        background: $color-primary;
        color: $color-white;
        border-color: $color-primary;
      }
    }
  }

  // Related News
  .related-title {
    @include heading(xl);
    font-weight: 700;
    text-align: center;
    margin-bottom: $spacing-xl;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $spacing-lg;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }
</style>
