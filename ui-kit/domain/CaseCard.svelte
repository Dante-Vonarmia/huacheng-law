<script lang="ts">
  // Props接口定义
  export let caseItem: Case;
  export let variant: 'default' | 'featured' = 'default';

  // 类型定义
  interface Case {
    id: string;
    title_zh: string;
    title_en: string;
    summary_zh: string;
    summary_en: string;
    practice_area: string;
    result_zh: string;
    result_en: string;
    amount?: string;
    year: string;
    image?: string;
    featured?: boolean;
    tags?: string[];
  }

  // 响应式变量
  $: isFeatured = variant === 'featured' || caseItem.featured;
</script>

<div class="case-card case-card--{variant}">
  <!-- 图片区域 -->
  {#if caseItem.image}
    <div class="case-card__image">
      <img
        src={caseItem.image}
        alt={caseItem.title_zh}
        loading="lazy"
      />
      {#if isFeatured}
        <div class="case-card__badge">精选案例</div>
      {/if}
    </div>
  {/if}

  <!-- 内容区域 -->
  <div class="case-card__content">
    <!-- 业务领域 -->
    <div class="case-card__practice">{caseItem.practice_area}</div>

    <!-- 标题 -->
    <h3 class="case-card__title">{caseItem.title_zh}</h3>

    <!-- 摘要 -->
    <p class="case-card__summary">{caseItem.summary_zh}</p>

    <!-- 处理结果 -->
    <div class="case-card__result">
      <div class="case-card__result-label">处理结果</div>
      <div class="case-card__result-text">{caseItem.result_zh}</div>
    </div>

    <!-- 元信息 -->
    <div class="case-card__meta">
      <div class="case-card__year">{caseItem.year}</div>
      {#if caseItem.amount}
        <div class="case-card__amount">{caseItem.amount}</div>
      {/if}
    </div>

    <!-- 标签 -->
    {#if caseItem.tags && caseItem.tags.length > 0}
      <div class="case-card__tags">
        {#each caseItem.tags as tag}
          <span class="case-card__tag">{tag}</span>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .case-card {
    border-radius: 8px;
    overflow: hidden;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;

    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      transform: translateY(-4px);

      .case-card__image img {
        transform: scale(1.05);
      }
    }

    // Featured 样式（金色边框）
    &--featured {
      border: 2px solid $color-secondary;

      .case-card__badge {
        background: $color-secondary;
      }
    }

    // 图片区域
    &__image {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: $color-background-alt;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease;
      }
    }

    // 精选标签
    &__badge {
      position: absolute;
      top: 16px;
      left: 16px;
      background: $color-primary;
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      z-index: 1;

      @include respond-to('mobile') {
        top: 12px;
        left: 12px;
        font-size: 12px;
        padding: 4px 10px;
      }
    }

    // 内容区域
    &__content {
      padding: 24px;
      flex: 1;
      display: flex;
      flex-direction: column;

      @include respond-to('mobile') {
        padding: 16px;
      }
    }

    // 业务领域
    &__practice {
      font-size: 14px;
      color: $color-primary;
      font-weight: 600;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    // 标题
    &__title {
      font-size: 20px;
      font-weight: 700;
      color: $color-text-primary;
      margin: 0 0 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      @include respond-to('mobile') {
        font-size: 18px;
        margin-bottom: 10px;
      }
    }

    // 摘要
    &__summary {
      font-size: 15px;
      line-height: 1.6;
      color: $color-text-secondary;
      margin: 0 0 16px;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;

      @include respond-to('mobile') {
        font-size: 14px;
        margin-bottom: 12px;
      }
    }

    // 处理结果框
    &__result {
      background: $color-background-light;
      padding: 12px 16px;
      border-radius: 4px;
      border-left: 3px solid $color-accent;
      margin-bottom: 16px;

      @include respond-to('mobile') {
        padding: 10px 12px;
        margin-bottom: 12px;
      }

      &-label {
        font-size: 12px;
        color: $color-text-tertiary;
        margin-bottom: 4px;
        text-transform: uppercase;
      }

      &-text {
        font-size: 15px;
        font-weight: 600;
        color: $color-accent;
        line-height: 1.4;

        @include respond-to('mobile') {
          font-size: 14px;
        }
      }
    }

    // 元信息
    &__meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: $color-text-tertiary;
      margin-bottom: 12px;

      @include respond-to('mobile') {
        font-size: 13px;
      }
    }

    &__year {
      font-weight: 500;
    }

    &__amount {
      font-weight: 600;
      color: $color-text-secondary;
    }

    // 标签
    &__tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    &__tag {
      display: inline-block;
      padding: 4px 10px;
      background: $color-background-light;
      color: $color-text-secondary;
      font-size: 13px;
      border-radius: 4px;
      border: 1px solid $color-border;

      @include respond-to('mobile') {
        font-size: 12px;
        padding: 3px 8px;
      }
    }
  }
</style>
