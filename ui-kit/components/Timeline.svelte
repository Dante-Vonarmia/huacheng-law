<script lang="ts">
  /**
   * Timeline 组件 - 时间轴展示
   * 适用于展示律所发展历程、里程碑事件
   */

  export let items: Array<{
    year: string;
    title: string;
    description: string;
    image?: string;
    highlight?: boolean;
  }>;
  export let variant: 'vertical' | 'horizontal' = 'vertical';
  export let className: string = '';

  $: classes = [
    'timeline',
    `timeline--${variant}`,
    className
  ].filter(Boolean).join(' ');
</script>

<div class={classes}>
  {#each items as item, index}
    <div class="timeline__item" class:timeline__item--highlight={item.highlight}>
      <div class="timeline__marker">
        <div class="timeline__dot" />
        {#if index < items.length - 1}
          <div class="timeline__line" />
        {/if}
      </div>

      <div class="timeline__content">
        <div class="timeline__year">{item.year}</div>
        <h3 class="timeline__title">{item.title}</h3>
        <p class="timeline__description">{item.description}</p>
        {#if item.image}
          <div class="timeline__image">
            <img src={item.image} alt={item.title} />
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .timeline {
    position: relative;

    // 垂直布局
    &--vertical {
      display: flex;
      flex-direction: column;
      gap: $spacing-2xl;

      @include respond-from(tablet) {
        padding-left: $spacing-3xl;
      }
    }

    // 水平布局
    &--horizontal {
      display: flex;
      gap: $spacing-xl;
      overflow-x: auto;
      padding: $spacing-xl 0;

      @include respond-to(tablet) {
        flex-direction: column;
      }

      .timeline__item {
        flex-direction: column;
        min-width: 300px;

        @include respond-to(tablet) {
          min-width: auto;
        }
      }

      .timeline__marker {
        position: static;
        flex-direction: row;
        align-items: center;
        margin-bottom: $spacing-md;

        @include respond-to(tablet) {
          flex-direction: column;
        }
      }

      .timeline__line {
        width: 100%;
        height: 2px;

        @include respond-to(tablet) {
          width: 2px;
          height: 100%;
        }
      }
    }

    // 时间线项
    &__item {
      position: relative;
      display: flex;
      gap: $spacing-lg;
      animation: fadeInUp 0.6s ease-out backwards;

      @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
          animation-delay: #{$i * 0.1}s;
        }
      }

      &--highlight {
        .timeline__dot {
          background: $color-secondary;
          width: 20px;
          height: 20px;
          box-shadow: 0 0 0 6px rgba($color-secondary, 0.2);
        }

        .timeline__year {
          color: $color-secondary;
          font-size: $font-size-xl;
        }
      }
    }

    // 标记
    &__marker {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      @include respond-to(mobile) {
        position: relative;
        margin-bottom: $spacing-md;
      }
    }

    &__dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: $color-primary;
      border: 3px solid $color-white;
      box-shadow: 0 0 0 4px rgba($color-primary, 0.2);
      z-index: 2;
      transition: all $transition-base $transition-ease;
    }

    &__item:hover &__dot {
      transform: scale(1.3);
      box-shadow: 0 0 0 6px rgba($color-secondary, 0.3);
    }

    &__line {
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, $color-primary 0%, rgba($color-primary, 0.2) 100%);
      margin-top: 8px;
    }

    // 内容
    &__content {
      flex: 1;
      padding: $spacing-lg;
      background: $color-white;
      border-radius: $radius-md;
      box-shadow: $shadow-base;
      transition: all $transition-base $transition-ease;

      .timeline__item:hover & {
        box-shadow: $shadow-lg;
        transform: translateX(8px);

        @include respond-to(mobile) {
          transform: translateY(-4px);
        }
      }
    }

    &__year {
      @include text-accent;
      font-size: $font-size-lg;
      font-weight: 700;
      margin-bottom: $spacing-xs;
      letter-spacing: 0.05em;
    }

    &__title {
      @include heading(xl);
      font-weight: 600;
      margin-bottom: $spacing-sm;
      color: $color-primary;
    }

    &__description {
      @include body-text;
      color: $color-text-light;
      margin: 0;
      line-height: $line-height-relaxed;
    }

    &__image {
      margin-top: $spacing-md;
      border-radius: $radius-base;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
        display: block;
        transition: transform $transition-slow $transition-ease;
      }

      .timeline__item:hover & img {
        transform: scale(1.05);
      }
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
