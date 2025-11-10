<script lang="ts">
  /**
   * LawyerCard 组件 - 律师卡片
   *
   * 特点：
   * - 扁平化设计（无阴影）
   * - 悬停效果（图片缩放）
   * - 3 种变体（default/compact/detailed）
   * - 响应式布局
   *
   * @example
   * <LawyerCard
   *   lawyer={{
   *     id: '1',
   *     nameCn: '张三',
   *     nameEn: 'Zhang San',
   *     title: '高级合伙人',
   *     avatarUrl: '/images/lawyer-1.jpg',
   *     practiceAreas: ['公司法', '并购重组'],
   *     bio: '专注于公司法律事务...',
   *     email: 'zhangsan@example.com',
   *     detailUrl: '/team/1'
   *   }}
   *   variant="default"
   *   showContact={true}
   * />
   */

  import { createEventDispatcher } from 'svelte';
  import type { Lawyer } from './LawyerCard.types';

  export let lawyer: Lawyer;
  export let variant: 'default' | 'compact' | 'detailed' = 'default';
  export let showContact: boolean = false;
  export let clickable: boolean = true;
  export let className: string = '';

  const dispatch = createEventDispatcher();

  function handleClick() {
    if (!clickable) return;

    if (lawyer.detailUrl) {
      window.location.href = lawyer.detailUrl;
    }

    dispatch('click', { lawyer });
  }

  function handleContact(type: 'email' | 'phone') {
    dispatch('contact', { lawyer, type });
  }

  $: classes = [
    'lawyer-card',
    `lawyer-card--${variant}`,
    clickable ? 'lawyer-card--clickable' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');
</script>

<div class={classes} on:click={handleClick} on:keydown={(e) => e.key === 'Enter' && handleClick()} role={clickable ? 'button' : 'article'} tabindex={clickable ? 0 : -1}>
  <!-- 头像/图片区域 -->
  <div class="lawyer-card__image-wrapper">
    <img
      src={lawyer.avatarUrl}
      alt="{lawyer.nameCn} - {lawyer.title}"
      class="lawyer-card__image"
    />
  </div>

  <!-- 信息区域 -->
  <div class="lawyer-card__content">
    <!-- 姓名 -->
    <h3 class="lawyer-card__name">
      {lawyer.nameCn}
      {#if lawyer.nameEn && variant !== 'compact'}
        <span class="lawyer-card__name-en">{lawyer.nameEn}</span>
      {/if}
    </h3>

    <!-- 职位 -->
    <p class="lawyer-card__title">{lawyer.title}</p>

    <!-- 专业领域（仅 default 和 detailed 变体） -->
    {#if variant !== 'compact' && lawyer.practiceAreas && lawyer.practiceAreas.length > 0}
      <div class="lawyer-card__areas">
        {#each lawyer.practiceAreas.slice(0, 3) as area}
          <span class="lawyer-card__area-tag">{area}</span>
        {/each}
      </div>
    {/if}

    <!-- 简介（仅 detailed 变体） -->
    {#if variant === 'detailed' && lawyer.bio}
      <p class="lawyer-card__bio">{lawyer.bio}</p>
    {/if}

    <!-- 联系方式 -->
    {#if showContact && (lawyer.email || lawyer.phone)}
      <div class="lawyer-card__contact">
        {#if lawyer.email}
          <button
            class="lawyer-card__contact-button"
            on:click|stopPropagation={() => handleContact('email')}
          >
            <span class="lawyer-card__contact-icon">✉</span>
            {lawyer.email}
          </button>
        {/if}
        {#if lawyer.phone}
          <button
            class="lawyer-card__contact-button"
            on:click|stopPropagation={() => handleContact('phone')}
          >
            <span class="lawyer-card__contact-icon">☎</span>
            {lawyer.phone}
          </button>
        {/if}
      </div>
    {/if}

    <!-- 底部插槽 -->
    {#if $$slots.footer}
      <div class="lawyer-card__footer">
        <slot name="footer" {lawyer} />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  // ========================================
  // LawyerCard 基础样式（Pages 扁平化设计）
  // ========================================
  .lawyer-card {
    position: relative;
    background-color: $color-white;
    border: 1px solid rgba($color-master, 0.1);
    border-radius: $radius-base; // 3px
    overflow: hidden;
    transition: border-color $transition-base;

    // 无阴影（Pages 扁平化标准）
    box-shadow: none;

    // ========================================
    // 可点击样式
    // ========================================
    &--clickable {
      cursor: pointer;

      &:hover {
        border-color: rgba($color-primary, 0.3);

        .lawyer-card__image {
          transform: scale(1.05); // 悬停图片缩放
        }
      }
    }

    // ========================================
    // 图片区域
    // ========================================
    &__image-wrapper {
      position: relative;
      width: 100%;
      padding-top: 100%; // 1:1 比例
      overflow: hidden;
      background-color: $color-master-lightest; // #fafafa
    }

    &__image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $transition-smooth; // 0.3s
    }

    // ========================================
    // 内容区域
    // ========================================
    &__content {
      padding: $spacing-lg; // 40px

      @include respond-to(xs) {
        padding: $spacing-md; // 20px 移动端
      }
    }

    // ========================================
    // 姓名
    // ========================================
    &__name {
      font-family: $font-family-heading;
      font-size: $font-size-h4; // 22px
      font-weight: $font-weight-medium; // 500
      color: $color-master-dark;
      margin: 0 0 $spacing-xs 0;
      line-height: $line-height-h4; // 32px
    }

    &__name-en {
      display: block;
      font-size: $font-size-base; // 14px
      font-weight: $font-weight-normal; // 400
      color: $color-master;
      margin-top: $spacing-xs; // 5px
    }

    // ========================================
    // 职位
    // ========================================
    &__title {
      font-size: $font-size-base; // 14px
      font-weight: $font-weight-normal; // 400
      color: $color-secondary; // 金色
      margin: 0 0 $spacing-md 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    // ========================================
    // 专业领域标签
    // ========================================
    &__areas {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-xs; // 5px
      margin-bottom: $spacing-md;
    }

    &__area-tag {
      display: inline-block;
      padding: $spacing-xs $spacing-sm; // 5px 10px
      background-color: rgba($color-primary, 0.08);
      color: $color-primary;
      font-size: $font-size-xs; // 11px
      font-weight: $font-weight-normal; // 400
      border-radius: $radius-base; // 3px
      white-space: nowrap;
    }

    // ========================================
    // 简介
    // ========================================
    &__bio {
      font-size: $font-size-small; // 12px
      line-height: $line-height-small; // 18px
      color: $color-master;
      margin: 0 0 $spacing-md 0;
      display: -webkit-box;
      -webkit-line-clamp: 3; // 限制 3 行
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    // ========================================
    // 联系方式
    // ========================================
    &__contact {
      display: flex;
      flex-direction: column;
      gap: $spacing-xs; // 5px
      margin-top: $spacing-md;
    }

    &__contact-button {
      display: flex;
      align-items: center;
      gap: $spacing-xs; // 5px
      padding: $spacing-xs 0;
      background: none;
      border: none;
      color: $color-master;
      font-size: $font-size-xs; // 11px
      text-align: left;
      cursor: pointer;
      transition: color $transition-fast;

      &:hover {
        color: $color-primary;
      }
    }

    &__contact-icon {
      display: inline-block;
      width: 16px;
      text-align: center;
    }

    // ========================================
    // 底部插槽
    // ========================================
    &__footer {
      margin-top: $spacing-md;
      padding-top: $spacing-md;
      border-top: 1px solid rgba($color-master, 0.1);
    }

    // ========================================
    // 变体样式
    // ========================================

    // 紧凑变体（仅头像 + 姓名）
    &--compact {
      .lawyer-card__image-wrapper {
        padding-top: 75%; // 4:3 比例
      }

      .lawyer-card__content {
        padding: $spacing-md; // 20px
      }

      .lawyer-card__name {
        font-size: $font-size-h5; // 18px
        margin-bottom: $spacing-xs;
      }

      .lawyer-card__title {
        font-size: $font-size-xs; // 11px
        margin: 0;
      }
    }

    // 详细变体
    &--detailed {
      .lawyer-card__content {
        padding: $spacing-xl; // 60px

        @include respond-to(xs) {
          padding: $spacing-lg; // 40px 移动端
        }
      }
    }
  }
</style>
