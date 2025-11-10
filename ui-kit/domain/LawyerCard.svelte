<script lang="ts">
  /**
   * LawyerCard 组件 - 律师卡片
   * 展示律师照片、姓名、职位、业务领域
   */

  export let lawyer: {
    id: string;
    name_zh: string;
    name_en: string;
    title_zh: string;
    title_en: string;
    photo: string;
    office: string;
    practice_ids: string[];
  };
  export let locale: 'zh' | 'en' = 'zh';
  export let practices: Array<{ id: string; name_zh: string; name_en: string }> = [];
  export let variant: 'default' | 'compact' = 'default';
  export let className: string = '';

  $: name = locale === 'zh' ? lawyer.name_zh : lawyer.name_en;
  $: title = locale === 'zh' ? lawyer.title_zh : lawyer.title_en;
  $: lawyerPractices = practices.filter(p => lawyer.practice_ids.includes(p.id));

  $: classes = [
    'lawyer-card',
    `lawyer-card--${variant}`,
    className
  ].filter(Boolean).join(' ');
</script>

<a href="/team/{lawyer.id}" class={classes}>
  <div class="lawyer-card__image">
    <img src={lawyer.photo} alt={name} />
    <div class="lawyer-card__overlay">
      <span class="lawyer-card__view-profile">查看详情</span>
    </div>
  </div>

  <div class="lawyer-card__content">
    <h3 class="lawyer-card__name">{name}</h3>
    <p class="lawyer-card__title">{title}</p>

    {#if variant === 'default' && lawyerPractices.length > 0}
      <div class="lawyer-card__practices">
        {#each lawyerPractices.slice(0, 3) as practice}
          <span class="lawyer-card__badge">
            {locale === 'zh' ? practice.name_zh : practice.name_en}
          </span>
        {/each}
      </div>
    {/if}
  </div>
</a>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .lawyer-card {
    @include card;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    padding: 0;
    overflow: hidden;

    // 默认样式
    &--default {
      // Standard layout
    }

    // 紧凑样式
    &--compact {
      .lawyer-card__content {
        padding: $spacing-md;
      }

      .lawyer-card__practices {
        display: none;
      }
    }

    // 图片容器
    &__image {
      position: relative;
      width: 100%;
      aspect-ratio: 3 / 4;
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
      transform: scale(1.08);
    }

    // 悬停遮罩
    &__overlay {
      @include absolute-center;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba($color-primary, 0) 0%, rgba($color-primary, 0.9) 100%);
      opacity: 0;
      transition: opacity $transition-base $transition-ease;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: $spacing-lg;
    }

    &:hover &__overlay {
      opacity: 1;
    }

    &__view-profile {
      color: $color-white;
      font-weight: 500;
      font-size: $font-size-base;
      padding: $spacing-xs $spacing-md;
      border: 2px solid $color-secondary;
      border-radius: $radius-base;
      background: transparent;
      transition: all $transition-base $transition-ease;
    }

    &:hover &__view-profile {
      background: $color-secondary;
      color: $color-primary;
      transform: translateY(-4px);
    }

    // 内容区域
    &__content {
      padding: $spacing-lg;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    &__name {
      @include heading(lg);
      font-weight: 600;
      margin-bottom: $spacing-xs;
      transition: color $transition-base $transition-ease;
    }

    &:hover &__name {
      color: $color-secondary;
    }

    &__title {
      @include text-accent;
      font-size: $font-size-sm;
      margin-bottom: $spacing-md;
    }

    // 业务领域标签
    &__practices {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-xs;
      margin-top: auto;
    }

    &__badge {
      display: inline-block;
      padding: 4px $spacing-sm;
      background: rgba($color-primary, 0.05);
      color: $color-primary;
      font-size: $font-size-xs;
      border-radius: $radius-full;
      border: 1px solid rgba($color-primary, 0.1);
      transition: all $transition-base $transition-ease;
    }

    &:hover &__badge {
      background: rgba($color-secondary, 0.1);
      border-color: $color-secondary;
      color: $color-secondary;
    }
  }
</style>
