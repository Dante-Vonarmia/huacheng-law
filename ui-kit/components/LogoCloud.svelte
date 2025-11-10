<script lang="ts">
  /**
   * LogoCloud 组件 - 客户Logo墙
   * 展示合作客户、合作伙伴Logo
   * 支持滚动动画和网格布局
   */

  export let logos: Array<{
    src: string;
    alt: string;
    link?: string;
  }>;
  export let variant: 'grid' | 'scroll' = 'grid';
  export let columns: 3 | 4 | 5 | 6 = 5;
  export let grayscale: boolean = true;
  export let className: string = '';

  $: classes = [
    'logo-cloud',
    `logo-cloud--${variant}`,
    `logo-cloud--cols-${columns}`,
    grayscale && 'logo-cloud--grayscale',
    className
  ].filter(Boolean).join(' ');
</script>

<div class={classes}>
  {#if variant === 'scroll'}
    <div class="logo-cloud__scroll-container">
      <div class="logo-cloud__scroll-track">
        <!-- 双倍渲染实现无缝循环 -->
        {#each [...logos, ...logos] as logo}
          <div class="logo-cloud__item">
            {#if logo.link}
              <a href={logo.link} target="_blank" rel="noopener noreferrer" class="logo-cloud__link">
                <img src={logo.src} alt={logo.alt} class="logo-cloud__image" />
              </a>
            {:else}
              <img src={logo.src} alt={logo.alt} class="logo-cloud__image" />
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="logo-cloud__grid">
      {#each logos as logo}
        <div class="logo-cloud__item">
          {#if logo.link}
            <a href={logo.link} target="_blank" rel="noopener noreferrer" class="logo-cloud__link">
              <img src={logo.src} alt={logo.alt} class="logo-cloud__image" />
            </a>
          {:else}
            <img src={logo.src} alt={logo.alt} class="logo-cloud__image" />
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .logo-cloud {
    width: 100%;
    padding: $spacing-xl 0;

    // 网格布局
    &__grid {
      display: grid;
      gap: $spacing-xl;
      align-items: center;
      justify-items: center;
    }

    &--cols-3 &__grid {
      grid-template-columns: repeat(3, 1fr);

      @include respond-to(mobile) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &--cols-4 &__grid {
      grid-template-columns: repeat(4, 1fr);

      @include respond-to(tablet) {
        grid-template-columns: repeat(3, 1fr);
      }

      @include respond-to(mobile) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &--cols-5 &__grid {
      grid-template-columns: repeat(5, 1fr);

      @include respond-to(tablet) {
        grid-template-columns: repeat(3, 1fr);
      }

      @include respond-to(mobile) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &--cols-6 &__grid {
      grid-template-columns: repeat(6, 1fr);

      @include respond-to(desktop) {
        grid-template-columns: repeat(4, 1fr);
      }

      @include respond-to(tablet) {
        grid-template-columns: repeat(3, 1fr);
      }

      @include respond-to(mobile) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    // 滚动布局
    &__scroll-container {
      overflow: hidden;
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100px;
        z-index: 2;
        pointer-events: none;
      }

      &::before {
        left: 0;
        background: linear-gradient(90deg, $color-white 0%, transparent 100%);
      }

      &::after {
        right: 0;
        background: linear-gradient(270deg, $color-white 0%, transparent 100%);
      }
    }

    &__scroll-track {
      display: flex;
      gap: $spacing-2xl;
      animation: scroll 40s linear infinite;
      width: fit-content;

      &:hover {
        animation-play-state: paused;
      }
    }

    // Logo项
    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: $spacing-md;
      min-width: 180px;
      min-height: 100px;

      .logo-cloud--scroll & {
        flex-shrink: 0;
      }
    }

    &__link {
      display: block;
      transition: transform $transition-base $transition-ease;

      &:hover {
        transform: scale(1.1);
      }

      &:focus-visible {
        outline: 2px solid $color-secondary;
        outline-offset: 4px;
        border-radius: $radius-sm;
      }
    }

    &__image {
      max-width: 150px;
      max-height: 60px;
      width: auto;
      height: auto;
      object-fit: contain;
      transition: all $transition-base $transition-ease;
    }

    // 灰度滤镜
    &--grayscale &__image {
      filter: grayscale(100%) opacity(0.6);

      .logo-cloud__item:hover & {
        filter: grayscale(0%) opacity(1);
      }
    }
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
