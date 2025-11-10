<script lang="ts">
  /**
   * Stats 组件 - 数据统计展示
   * 适用于展示律所实力数据：成立年份、客户数量、律师团队、成功率等
   * 支持数字滚动动画
   */

  import { onMount } from 'svelte';
  import { inview } from 'svelte-inview';

  export let stats: Array<{
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    description?: string;
  }>;
  export let variant: 'default' | 'minimal' | 'card' = 'default';
  export let columns: 2 | 3 | 4 = 4;
  export let animated: boolean = true;
  export let className: string = '';

  let displayValues: number[] = [];
  let isInView = false;

  $: classes = [
    'stats',
    `stats--${variant}`,
    `stats--cols-${columns}`,
    className
  ].filter(Boolean).join(' ');

  // 初始化显示值
  onMount(() => {
    displayValues = stats.map(() => 0);
  });

  // 数字滚动动画
  function animateCounter(index: number, target: number, duration: number = 2000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 缓动函数：easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      displayValues[index] = Math.floor(start + (target - start) * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        displayValues[index] = target;
      }
    }

    requestAnimationFrame(update);
  }

  function handleInView(event: CustomEvent<{ inView: boolean }>) {
    if (event.detail.inView && !isInView && animated) {
      isInView = true;
      stats.forEach((stat, index) => {
        setTimeout(() => {
          animateCounter(index, stat.value);
        }, index * 100);
      });
    }
  }
</script>

<div
  class={classes}
  use:inview
  on:inview_change={handleInView}
>
  {#each stats as stat, index}
    <div class="stats__item">
      <div class="stats__value">
        {#if stat.prefix}
          <span class="stats__prefix">{stat.prefix}</span>
        {/if}
        <span class="stats__number">
          {animated ? displayValues[index]?.toLocaleString() : stat.value.toLocaleString()}
        </span>
        {#if stat.suffix}
          <span class="stats__suffix">{stat.suffix}</span>
        {/if}
      </div>
      <div class="stats__label">{stat.label}</div>
      {#if stat.description}
        <p class="stats__description">{stat.description}</p>
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .stats {
    display: grid;
    gap: $spacing-xl;
    width: 100%;

    // 列数变体
    &--cols-2 {
      grid-template-columns: repeat(2, 1fr);

      @include respond-to(mobile) {
        grid-template-columns: 1fr;
      }
    }

    &--cols-3 {
      grid-template-columns: repeat(3, 1fr);

      @include respond-to(tablet) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include respond-to(mobile) {
        grid-template-columns: 1fr;
      }
    }

    &--cols-4 {
      grid-template-columns: repeat(4, 1fr);

      @include respond-to(tablet) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include respond-to(mobile) {
        grid-template-columns: 1fr;
      }
    }

    // 默认样式
    &--default {
      .stats__item {
        text-align: center;
        padding: $spacing-xl;
        border-right: 1px solid rgba($color-primary, 0.1);

        &:last-child {
          border-right: none;
        }

        @include respond-to(tablet) {
          &:nth-child(2n) {
            border-right: none;
          }
        }

        @include respond-to(mobile) {
          border-right: none;
          border-bottom: 1px solid rgba($color-primary, 0.1);

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }

    // 极简样式
    &--minimal {
      gap: $spacing-lg;

      .stats__item {
        text-align: center;
      }

      .stats__value {
        font-size: $font-size-3xl;
      }
    }

    // 卡片样式
    &--card {
      gap: $spacing-lg;

      .stats__item {
        @include card;
        text-align: center;
        padding: $spacing-xl;
        transition: all $transition-base $transition-ease;

        &:hover {
          transform: translateY(-8px);
          box-shadow: $shadow-xl;
          border-color: $color-secondary;
        }
      }
    }

    // 统计项
    &__item {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;
    }

    &__value {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 4px;
      font-weight: 700;
      color: $color-primary;
      line-height: 1;
    }

    &__prefix,
    &__suffix {
      font-size: $font-size-xl;
      color: $color-secondary;
      font-weight: 600;
    }

    &__number {
      font-size: $font-size-4xl;
      letter-spacing: -0.02em;

      @include respond-from(tablet) {
        font-size: 48px;
      }

      @include respond-from(desktop) {
        font-size: 56px;
      }
    }

    &__label {
      @include text-accent;
      font-size: $font-size-base;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    &__description {
      @include caption;
      color: $color-text-light;
      margin: 0;
    }
  }
</style>
