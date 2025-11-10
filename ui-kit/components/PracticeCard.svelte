<script lang="ts">
  /**
   * PracticeCard 组件 - 业务领域卡片
   *
   * 特点：
   * - 扁平化设计（无阴影）
   * - 图标/图片 + 标题 + 描述
   * - 悬停效果（边框颜色变化）
   * - 3 种变体（default/horizontal/minimal）
   * - 响应式布局
   *
   * @example
   * <PracticeCard
   *   practice={{
   *     id: '1',
   *     nameCn: '公司法',
   *     nameEn: 'Corporate Law',
   *     icon: '🏢',
   *     description: '提供公司设立、治理、并购重组等全方位法律服务',
   *     lawyerCount: 15,
   *     caseCount: 320,
   *     detailUrl: '/practice-areas/corporate-law'
   *   }}
   *   variant="default"
   *   showStats={true}
   * />
   */

  import { createEventDispatcher } from 'svelte';
  import type { PracticeArea } from './PracticeCard.types';

  export let practice: PracticeArea;
  export let variant: 'default' | 'horizontal' | 'minimal' = 'default';
  export let showStats: boolean = true;
  export let clickable: boolean = true;
  export let className: string = '';

  const dispatch = createEventDispatcher();

  function handleClick() {
    if (!clickable) return;

    if (practice.detailUrl) {
      window.location.href = practice.detailUrl;
    }

    dispatch('click', { practice });
  }

  $: classes = [
    'practice-card',
    `practice-card--${variant}`,
    clickable ? 'practice-card--clickable' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');
</script>

<div
  class={classes}
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  role={clickable ? 'button' : 'article'}
  tabindex={clickable ? 0 : -1}
>
  <!-- 图标/图片区域 -->
  <div class="practice-card__icon-wrapper">
    {#if $$slots.icon}
      <slot name="icon" {practice} />
    {:else if practice.imageUrl}
      <img
        src={practice.imageUrl}
        alt={practice.nameCn}
        class="practice-card__image"
      />
    {:else if practice.icon}
      <div class="practice-card__icon">{practice.icon}</div>
    {:else}
      <!-- 默认占位图标 -->
      <div class="practice-card__icon">⚖️</div>
    {/if}
  </div>

  <!-- 内容区域 -->
  <div class="practice-card__content">
    <!-- 标题 -->
    <h3 class="practice-card__name">
      {practice.nameCn}
      {#if practice.nameEn && variant !== 'minimal'}
        <span class="practice-card__name-en">{practice.nameEn}</span>
      {/if}
    </h3>

    <!-- 描述（仅 default 和 horizontal 变体） -->
    {#if variant !== 'minimal' && practice.description}
      <p class="practice-card__description">{practice.description}</p>
    {/if}

    <!-- 统计信息 -->
    {#if showStats && variant !== 'minimal' && (practice.lawyerCount || practice.caseCount)}
      <div class="practice-card__stats">
        {#if practice.lawyerCount}
          <div class="practice-card__stat">
            <span class="practice-card__stat-value">{practice.lawyerCount}</span>
            <span class="practice-card__stat-label">位律师</span>
          </div>
        {/if}
        {#if practice.caseCount}
          <div class="practice-card__stat">
            <span class="practice-card__stat-value">{practice.caseCount}</span>
            <span class="practice-card__stat-label">个案例</span>
          </div>
        {/if}
      </div>
    {/if}

    <!-- 底部插槽 -->
    {#if $$slots.footer}
      <div class="practice-card__footer">
        <slot name="footer" {practice} />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  // ========================================
  // PracticeCard 基础样式（Pages 扁平化设计）
  // ========================================
  .practice-card {
    position: relative;
    background-color: $color-white;
    border: 1px solid rgba($color-master, 0.1);
    border-radius: $radius-base; // 3px
    padding: $spacing-xl; // 60px
    transition: border-color $transition-base, background-color $transition-base;

    // 无阴影（Pages 扁平化标准）
    box-shadow: none;

    @include respond-to(xs) {
      padding: $spacing-lg; // 40px 移动端
    }

    // ========================================
    // 可点击样式
    // ========================================
    &--clickable {
      cursor: pointer;

      &:hover {
        border-color: rgba($color-primary, 0.3);
        background-color: rgba($color-primary, 0.02);
      }
    }

    // ========================================
    // 图标/图片区域
    // ========================================
    &__icon-wrapper {
      margin-bottom: $spacing-lg; // 40px
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      font-size: 48px;
      background-color: rgba($color-primary, 0.08);
      border-radius: $radius-base; // 3px
    }

    &__image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: $radius-base;
    }

    // ========================================
    // 内容区域
    // ========================================
    &__content {
      // 内容区域
    }

    // ========================================
    // 标题
    // ========================================
    &__name {
      font-family: $font-family-heading;
      font-size: $font-size-h4; // 22px
      font-weight: $font-weight-medium; // 500
      color: $color-master-dark;
      margin: 0 0 $spacing-sm 0;
      line-height: $line-height-h4; // 32px
    }

    &__name-en {
      display: block;
      font-size: $font-size-small; // 12px
      font-weight: $font-weight-normal; // 400
      color: $color-master;
      margin-top: $spacing-xs; // 5px
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    // ========================================
    // 描述
    // ========================================
    &__description {
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
    // 统计信息
    // ========================================
    &__stats {
      display: flex;
      gap: $spacing-lg; // 40px
      margin-top: $spacing-md;
      padding-top: $spacing-md;
      border-top: 1px solid rgba($color-master, 0.1);
    }

    &__stat {
      display: flex;
      flex-direction: column;
    }

    &__stat-value {
      font-family: $font-family-heading;
      font-size: $font-size-h3; // 27px
      font-weight: $font-weight-light; // 300
      color: $color-primary;
      line-height: 1;
    }

    &__stat-label {
      font-size: $font-size-xs; // 11px
      color: $color-master;
      margin-top: $spacing-xs; // 5px
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

    // 水平布局变体
    &--horizontal {
      display: flex;
      align-items: flex-start;
      gap: $spacing-lg; // 40px
      padding: $spacing-lg; // 40px

      .practice-card__icon-wrapper {
        flex-shrink: 0;
        margin-bottom: 0;
      }

      .practice-card__icon,
      .practice-card__image {
        width: 60px;
        height: 60px;
        font-size: 36px;
      }

      .practice-card__content {
        flex: 1;
      }

      @include respond-to(xs) {
        flex-direction: column; // 移动端变为垂直布局
        gap: $spacing-md;

        .practice-card__icon-wrapper {
          margin-bottom: $spacing-md;
        }
      }
    }

    // 极简变体（仅图标 + 标题）
    &--minimal {
      padding: $spacing-lg; // 40px
      text-align: center;

      .practice-card__icon-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: $spacing-md; // 20px
      }

      .practice-card__icon,
      .practice-card__image {
        width: 60px;
        height: 60px;
        font-size: 36px;
      }

      .practice-card__name {
        font-size: $font-size-h5; // 18px
        margin: 0;
      }
    }
  }
</style>
