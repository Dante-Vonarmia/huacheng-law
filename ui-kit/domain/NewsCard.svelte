<script lang="ts">
  /**
   * NewsCard 组件 - 新闻卡片
   * 展示新闻封面、标题、摘要、发布日期
   */

  export let news: {
    id: string;
    title_zh: string;
    title_en: string;
    summary_zh: string;
    summary_en: string;
    cover_image?: string;
    category: string;
    published_date: string;
    author_ids?: string[];
  };
  export let locale: 'zh' | 'en' = 'zh';
  export let variant: 'default' | 'horizontal' | 'compact' = 'default';
  export let className: string = '';

  $: title = locale === 'zh' ? news.title_zh : news.title_en;
  $: summary = locale === 'zh' ? news.summary_zh : news.summary_en;
  $: formattedDate = new Date(news.published_date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  $: classes = [
    'news-card',
    `news-card--${variant}`,
    className
  ].filter(Boolean).join(' ');
</script>

<a href="/news/{news.id}" class={classes}>
  {#if news.cover_image && variant !== 'compact'}
    <div class="news-card__image">
      <img src={news.cover_image} alt={title} />
      <div class="news-card__category">{news.category}</div>
    </div>
  {/if}

  <div class="news-card__content">
    <div class="news-card__meta">
      <time class="news-card__date" datetime={news.published_date}>
        {formattedDate}
      </time>
      {#if variant === 'compact' || !news.cover_image}
        <span class="news-card__category-inline">{news.category}</span>
      {/if}
    </div>

    <h3 class="news-card__title">{title}</h3>

    {#if variant !== 'compact'}
      <p class="news-card__summary">{summary}</p>
    {/if}

    <span class="news-card__read-more">
      {locale === 'zh' ? '阅读更多' : 'Read More'}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </div>
</a>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .news-card {
    @include card;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    padding: 0;
    overflow: hidden;

    // 默认纵向布局
    &--default {
      // Standard vertical layout
    }

    // 横向布局
    &--horizontal {
      flex-direction: row;

      @include respond-to(mobile) {
        flex-direction: column;
      }

      .news-card__image {
        width: 40%;
        aspect-ratio: 4 / 3;

        @include respond-to(mobile) {
          width: 100%;
        }
      }

      .news-card__content {
        flex: 1;
      }
    }

    // 紧凑布局
    &--compact {
      padding: $spacing-md;

      .news-card__content {
        padding: 0;
      }

      .news-card__title {
        font-size: $font-size-base;
        -webkit-line-clamp: 2;
      }
    }

    // 图片容器
    &__image {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: $color-background;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform $transition-slow $transition-ease;
      }
    }

    &:hover &__image img {
      transform: scale(1.05);
    }

    &__category {
      position: absolute;
      top: $spacing-md;
      right: $spacing-md;
      padding: $spacing-xs $spacing-md;
      background: $color-secondary;
      color: $color-primary;
      font-size: $font-size-xs;
      font-weight: 600;
      border-radius: $radius-full;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    // 内容区域
    &__content {
      padding: $spacing-lg;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    &__meta {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      margin-bottom: $spacing-sm;
    }

    &__date {
      @include caption;
      color: $color-text-light;
    }

    &__category-inline {
      padding: 2px $spacing-xs;
      background: rgba($color-secondary, 0.1);
      color: $color-secondary;
      font-size: $font-size-xs;
      font-weight: 600;
      border-radius: $radius-sm;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    &__title {
      @include heading(lg);
      font-weight: 600;
      margin-bottom: $spacing-md;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      transition: color $transition-base $transition-ease;
    }

    &:hover &__title {
      color: $color-secondary;
    }

    &__summary {
      @include body-text;
      color: $color-text-light;
      margin-bottom: $spacing-md;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &__read-more {
      display: inline-flex;
      align-items: center;
      gap: $spacing-xs;
      color: $color-secondary;
      font-weight: 500;
      font-size: $font-size-sm;
      margin-top: auto;
      transition: all $transition-base $transition-ease;

      svg {
        transition: transform $transition-base $transition-ease;
      }
    }

    &:hover &__read-more {
      gap: $spacing-sm;

      svg {
        transform: translateX(4px);
      }
    }
  }
</style>
