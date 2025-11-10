<script lang="ts">
  /**
   * PracticeCard 组件 - 业务领域卡片
   * 展示业务领域名称、描述、主办律师数量
   */

  export let practice: {
    id: string;
    slug: string;
    name_zh: string;
    name_en: string;
    description_zh: string;
    description_en: string;
    icon?: string;
    lawyer_ids: string[];
  };
  export let locale: 'zh' | 'en' = 'zh';
  export let variant: 'default' | 'minimal' = 'default';
  export let className: string = '';

  $: name = locale === 'zh' ? practice.name_zh : practice.name_en;
  $: description = locale === 'zh' ? practice.description_zh : practice.description_en;
  $: lawyerCount = practice.lawyer_ids.length;

  $: classes = [
    'practice-card',
    `practice-card--${variant}`,
    className
  ].filter(Boolean).join(' ');
</script>

<a href="/practices/{practice.slug}" class={classes}>
  {#if practice.icon && variant === 'default'}
    <div class="practice-card__icon">
      <img src={practice.icon} alt="" aria-hidden="true" />
    </div>
  {/if}

  <div class="practice-card__content">
    <h3 class="practice-card__title">{name}</h3>
    <p class="practice-card__description">{description}</p>

    <div class="practice-card__footer">
      <span class="practice-card__count">
        {lawyerCount} {locale === 'zh' ? '位律师' : 'Lawyers'}
      </span>
      <span class="practice-card__arrow">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 10H15M15 10L11 6M15 10L11 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
  </div>
</a>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .practice-card {
    @include card;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    transition: all $transition-base $transition-ease;
    border: 2px solid transparent;

    // 默认样式
    &--default {
      gap: $spacing-md;
    }

    // 极简样式
    &--minimal {
      padding: $spacing-md;
      box-shadow: none;
      border: 1px solid rgba($color-primary, 0.1);

      .practice-card__icon {
        display: none;
      }

      .practice-card__title {
        font-size: $font-size-base;
      }

      .practice-card__description {
        -webkit-line-clamp: 2;
      }
    }

    &:hover {
      border-color: $color-secondary;
      transform: translateY(-8px);
      box-shadow: $shadow-xl;
    }

    // 图标
    &__icon {
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba($color-secondary, 0.1) 0%, rgba($color-primary, 0.05) 100%);
      border-radius: $radius-md;
      transition: all $transition-base $transition-ease;

      img {
        width: 32px;
        height: 32px;
        object-fit: contain;
      }
    }

    &:hover &__icon {
      background: linear-gradient(135deg, rgba($color-secondary, 0.2) 0%, rgba($color-primary, 0.1) 100%);
      transform: scale(1.1);
    }

    // 内容区域
    &__content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    &__title {
      @include heading(xl);
      font-weight: 600;
      margin-bottom: $spacing-sm;
      transition: color $transition-base $transition-ease;
    }

    &:hover &__title {
      color: $color-secondary;
    }

    &__description {
      @include body-text;
      color: $color-text-light;
      margin-bottom: $spacing-md;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: $line-height-relaxed;
    }

    // 底部信息
    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: $spacing-md;
      border-top: 1px solid rgba($color-primary, 0.1);
      margin-top: auto;
    }

    &__count {
      @include text-accent;
      font-size: $font-size-sm;
      font-weight: 600;
    }

    &__arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba($color-secondary, 0.1);
      color: $color-secondary;
      transition: all $transition-base $transition-ease;

      svg {
        transition: transform $transition-base $transition-ease;
      }
    }

    &:hover &__arrow {
      background: $color-secondary;
      color: $color-white;

      svg {
        transform: translateX(4px);
      }
    }
  }
</style>
