<script lang="ts">
  import type { PageData } from './$types';
  import { Section } from '$ui/components';
  import { NewsCard } from '$ui/domain';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  // Props
  let { data }: { data: PageData } = $props();

  // State
  let readingProgress = $state(0);
  let showBackToTop = $state(false);
  let nextArticleRef: HTMLDivElement | null = $state(null);
  let isLoadingNext = $state(false);

  // 格式化日期
  const formattedDate = $derived(new Date(data.news.published_date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  // 获取下一篇文章
  const nextArticle = $derived(
    data.relatedNews.length > 0 ? data.relatedNews[0] : null
  );

  // 分享功能
  function shareOnWeChat() {
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

  // 返回顶部
  function scrollToTop() {
    if (browser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // 监听滚动 - 更新阅读进度和返回顶部按钮
  function handleScroll() {
    if (!browser) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    // 计算阅读进度
    const maxScroll = documentHeight - windowHeight;
    const progress = (scrollTop / maxScroll) * 100;
    readingProgress = Math.min(100, Math.max(0, progress));

    // 显示/隐藏返回顶部按钮
    showBackToTop = scrollTop > 300;
  }

  // 自动加载下一篇
  function setupAutoLoad() {
    if (!browser || !nextArticleRef || !nextArticle) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoadingNext) {
            isLoadingNext = true;
            // 延迟加载，给用户时间看到"下一篇"提示
            setTimeout(() => {
              goto(`/news/${nextArticle.id}`, {
                replaceState: false,
                noScroll: false,
                keepFocus: false
              });
            }, 1500);
          }
        });
      },
      {
        rootMargin: '0px 0px 200px 0px',
        threshold: 0.1
      }
    );

    observer.observe(nextArticleRef);

    return () => observer.disconnect();
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      const cleanup = setupAutoLoad();

      return () => {
        window.removeEventListener('scroll', handleScroll);
        cleanup?.();
      };
    }
  });
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

<!-- Reading Progress Bar -->
<div class="reading-progress">
  <div class="reading-progress__bar" style="width: {readingProgress}%"></div>
</div>

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
          <img src={data.news.cover_image} alt={data.news.title_zh} loading="lazy" />
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

      <!-- Next Article Preview -->
      {#if nextArticle}
        <div class="next-article" bind:this={nextArticleRef}>
          <div class="next-article__label">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>接下来阅读</span>
          </div>
          <a href="/news/{nextArticle.id}" class="next-article__card">
            {#if nextArticle.cover_image}
              <div class="next-article__image">
                <img src={nextArticle.cover_image} alt={nextArticle.title_zh} loading="lazy" />
              </div>
            {/if}
            <div class="next-article__content">
              <div class="next-article__category">{nextArticle.category}</div>
              <h3 class="next-article__title">{nextArticle.title_zh}</h3>
              <p class="next-article__summary">{nextArticle.summary_zh}</p>
              <div class="next-article__meta">
                <time datetime={nextArticle.published_date}>
                  {new Date(nextArticle.published_date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </a>
          {#if isLoadingNext}
            <div class="next-article__loading">
              <div class="loading-spinner"></div>
              <p>正在加载下一篇...</p>
            </div>
          {/if}
        </div>
      {/if}
    </article>
  </Section>

  <!-- Related News -->
  {#if data.relatedNews.length > 1}
    <Section bgColor="lightest">
      <h2 class="related-title">更多相关内容</h2>
      <div class="related-grid">
        {#each data.relatedNews.slice(1) as newsItem (newsItem.id)}
          <NewsCard news={newsItem} locale="zh" variant="compact" />
        {/each}
      </div>
    </Section>
  {/if}
</div>

<!-- Back to Top Button -->
{#if showBackToTop}
  <button
    class="back-to-top"
    onclick={scrollToTop}
    aria-label="返回顶部"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 19V5M12 5l-7 7M12 5l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
{/if}


<style lang="scss">
  @use 'sass:color';
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  // Reading Progress Bar
  .reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(0, 0, 0, 0.05);
    z-index: 9999;

    &__bar {
      height: 100%;
      background: linear-gradient(90deg, $color-primary 0%, $color-secondary 100%);
      transition: width 0.1s ease-out;
    }
  }

  .news-detail {
    min-height: 100vh;
    background: $color-white;
  }

  // Breadcrumb
  .breadcrumb {
    padding: $spacing-md 0;
    background: $color-background;
    border-bottom: 1px solid $color-border;

    @include respond-to(mobile) {
      padding: $spacing-sm 0;
    }

    &__nav {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      font-size: $font-size-sm;
      flex-wrap: wrap;
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
      max-width: 200px;

      @include respond-to(mobile) {
        max-width: 150px;
      }
    }
  }

  // Article - Mobile First Typography
  .article {
    // Mobile: 全宽 - 内边距
    width: 100%;
    padding: 0 $spacing-lg;

    // Tablet+: 限制最大宽度居中
    @media (min-width: 768px) {
      max-width: 680px;
      margin: 0 auto;
      padding: 0 $spacing-xl;
    }

    // Desktop: 更宽内容区
    @media (min-width: 1200px) {
      max-width: 800px;
    }

    &__header {
      text-align: center;
      margin-bottom: $spacing-xl;
      padding-top: $spacing-xl;

      @include respond-to(mobile) {
        margin-bottom: $spacing-lg;
        padding-top: $spacing-lg;
      }
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
      font-size: 2rem;
      font-weight: 700;
      color: $color-text;
      margin-bottom: $spacing-lg;
      line-height: 1.3;
      letter-spacing: -0.02em;

      @include respond-to(mobile) {
        font-size: 1.5rem;
        margin-bottom: $spacing-md;
      }

      @media (min-width: 768px) {
        font-size: 2.5rem;
      }
    }

    &__meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-md;
      color: $color-text-light;
      font-size: $font-size-sm;
      flex-wrap: wrap;

      @include respond-to(mobile) {
        gap: $spacing-sm;
        font-size: $font-size-xs;
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
      margin-bottom: $spacing-xl;
      border-radius: $radius-md;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

      @include respond-to(mobile) {
        margin-bottom: $spacing-lg;
        border-radius: $radius-sm;
        margin-left: -$spacing-lg;
        margin-right: -$spacing-lg;
      }

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
      font-size: 1.125rem;
      font-weight: 400;
      color: $color-text-light;
      padding: $spacing-lg;
      background: rgba($color-secondary, 0.05);
      border-left: 4px solid $color-secondary;
      border-radius: $radius-sm;
      margin-bottom: $spacing-xl;
      line-height: 1.8;

      @include respond-to(mobile) {
        font-size: 1rem;
        padding: $spacing-md;
        margin-bottom: $spacing-lg;
        line-height: 1.7;
      }
    }

    &__body {
      font-size: 1.0625rem;
      color: $color-text;
      line-height: 1.8;
      letter-spacing: 0.01em;

      @include respond-to(mobile) {
        font-size: 1rem;
        line-height: 1.75;
      }

      :global(p) {
        margin-bottom: $spacing-lg;

        @include respond-to(mobile) {
          margin-bottom: $spacing-md;
        }
      }

      :global(h2) {
        font-size: 1.75rem;
        font-weight: 700;
        margin: $spacing-2xl 0 $spacing-lg;
        color: $color-text;

        @include respond-to(mobile) {
          font-size: 1.375rem;
          margin: $spacing-xl 0 $spacing-md;
        }
      }

      :global(h3) {
        font-size: 1.375rem;
        font-weight: 600;
        margin: $spacing-xl 0 $spacing-md;
        color: $color-text;

        @include respond-to(mobile) {
          font-size: 1.125rem;
        }
      }

      :global(ul), :global(ol) {
        margin-bottom: $spacing-lg;
        padding-left: $spacing-xl;

        @include respond-to(mobile) {
          padding-left: $spacing-lg;
        }
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
        color: $color-text-light;

        @include respond-to(mobile) {
          padding: $spacing-sm $spacing-md;
          margin: $spacing-md 0;
        }
      }

      :global(img) {
        max-width: 100%;
        height: auto;
        border-radius: $radius-md;
        margin: $spacing-lg 0;

        @include respond-to(mobile) {
          border-radius: $radius-sm;
          margin: $spacing-md 0;
        }
      }
    }

    &__share {
      padding-top: $spacing-xl;
      margin-top: $spacing-xl;
      border-top: 1px solid $color-border;
      display: flex;
      align-items: center;
      gap: $spacing-lg;
      flex-wrap: wrap;

      @include respond-to(mobile) {
        padding-top: $spacing-lg;
        margin-top: $spacing-lg;
      }
    }
  }

  .share-label {
    font-weight: 600;
    color: $color-text;
    font-size: $font-size-sm;
  }

  .share-buttons {
    display: flex;
    gap: $spacing-sm;
    flex-wrap: wrap;
  }

  .share-btn {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-sm $spacing-md;
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

    @include respond-to(mobile) {
      padding: $spacing-xs $spacing-sm;
      font-size: $font-size-xs;
    }
  }

  // Next Article Preview
  .next-article {
    margin-top: $spacing-3xl;
    padding-top: $spacing-3xl;
    border-top: 2px solid $color-border;

    @include respond-to(mobile) {
      margin-top: $spacing-2xl;
      padding-top: $spacing-2xl;
    }

    &__label {
      display: flex;
      align-items: center;
      gap: $spacing-xs;
      color: $color-primary;
      font-size: $font-size-sm;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: $spacing-lg;

      svg {
        animation: bounce-right 2s ease-in-out infinite;
      }
    }

    &__card {
      display: block;
      padding: $spacing-xl;
      background: $color-background;
      border-radius: $radius-lg;
      text-decoration: none;
      transition: all $transition-base $transition-ease;
      border: 2px solid transparent;

      @include respond-to(mobile) {
        padding: $spacing-md;
      }

      &:hover {
        background: $color-white;
        border-color: $color-primary;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        transform: translateY(-4px);
      }
    }

    &__image {
      width: 100%;
      height: 200px;
      border-radius: $radius-md;
      overflow: hidden;
      margin-bottom: $spacing-md;

      @include respond-to(mobile) {
        height: 160px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__content {
      // Inherits full width
    }

    &__category {
      display: inline-block;
      padding: $spacing-xs $spacing-sm;
      background: rgba($color-primary, 0.1);
      color: $color-primary;
      font-size: $font-size-xs;
      font-weight: 600;
      border-radius: $radius-sm;
      margin-bottom: $spacing-sm;
    }

    &__title {
      font-size: 1.5rem;
      font-weight: 700;
      color: $color-text;
      margin-bottom: $spacing-sm;
      line-height: 1.3;

      @include respond-to(mobile) {
        font-size: 1.25rem;
      }
    }

    &__summary {
      font-size: $font-size-base;
      color: $color-text-light;
      line-height: 1.6;
      margin-bottom: $spacing-md;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      @include respond-to(mobile) {
        font-size: $font-size-sm;
      }
    }

    &__meta {
      font-size: $font-size-sm;
      color: $color-text-light;

      @include respond-to(mobile) {
        font-size: $font-size-xs;
      }
    }

    &__loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $spacing-md;
      padding: $spacing-xl;
      color: $color-text-light;
      font-size: $font-size-sm;
    }
  }

  @keyframes bounce-right {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(4px);
    }
  }

  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid rgba($color-primary, 0.2);
    border-top-color: $color-primary;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  // Back to Top Button
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: $color-primary;
    color: $color-white;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all $transition-base $transition-ease;
    z-index: 999;
    animation: fadeInUp 0.3s ease;

    @include respond-to(mobile) {
      bottom: 1.5rem;
      right: 1.5rem;
      width: 44px;
      height: 44px;
    }

    &:hover {
      background: color.adjust($color-primary, $lightness: -10%);
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: translateY(-2px);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Related News
  .related-title {
    font-size: 1.75rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: $spacing-xl;
    color: $color-text;

    @include respond-to(mobile) {
      font-size: 1.375rem;
      margin-bottom: $spacing-lg;
    }
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $spacing-lg;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-md;
    }
  }
</style>
