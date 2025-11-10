<script lang="ts">
  /**
   * Hero 组件 - Pages.Revox.io 全屏视差轮播
   *
   * 特点：
   * - 全屏背景（100vh）
   * - 视差滚动效果
   * - 自动轮播 + 手动控制
   * - 响应式设计
   * - 平滑过渡动画
   *
   * @example
   * <Hero
   *   slides={[
   *     {
   *       id: '1',
   *       imageUrl: '/images/hero-1.jpg',
   *       title: '专业法律服务',
   *       subtitle: '华诚律师事务所',
   *       ctaText: '了解更多',
   *       ctaLink: '/about'
   *     }
   *   ]}
   *   autoplay={true}
   *   parallax={true}
   * />
   */

  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { HeroSlide } from './Hero.types';

  export let slides: HeroSlide[] = [];
  export let autoplay: boolean = true;
  export let autoplayDelay: number = 5000;
  export let loop: boolean = true;
  export let showNavigation: boolean = true;
  export let showPagination: boolean = true;
  export let parallax: boolean = true;
  export let parallaxSpeed: number = 0.5;
  export let height: string = '100vh';
  export let className: string = '';

  const dispatch = createEventDispatcher();

  let currentIndex = 0;
  let autoplayInterval: number | null = null;
  let heroElement: HTMLElement;
  let parallaxOffset = 0;

  // 切换到指定幻灯片
  function goToSlide(index: number) {
    if (index < 0) {
      currentIndex = loop ? slides.length - 1 : 0;
    } else if (index >= slides.length) {
      currentIndex = loop ? 0 : slides.length - 1;
    } else {
      currentIndex = index;
    }

    dispatch('slideChange', {
      currentIndex,
      currentSlide: slides[currentIndex]
    });
  }

  // 下一张
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  // 上一张
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // 启动自动播放
  function startAutoplay() {
    if (autoplay && slides.length > 1) {
      autoplayInterval = window.setInterval(() => {
        nextSlide();
      }, autoplayDelay);
    }
  }

  // 停止自动播放
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  // 重启自动播放
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // 视差滚动效果
  function handleScroll() {
    if (!parallax || !heroElement) return;

    const scrollY = window.scrollY;
    const heroHeight = heroElement.offsetHeight;

    // 只在 Hero 可见时应用视差
    if (scrollY < heroHeight) {
      parallaxOffset = scrollY * parallaxSpeed;
    }
  }

  // 处理 CTA 点击
  function handleCtaClick(slide: HeroSlide) {
    dispatch('ctaClick', { slide });
  }

  onMount(() => {
    startAutoplay();

    if (parallax) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // 初始检查
    }
  });

  onDestroy(() => {
    stopAutoplay();

    if (parallax) {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  $: classes = ['hero', className].filter(Boolean).join(' ');
  $: currentSlide = slides[currentIndex];
</script>

<section
  bind:this={heroElement}
  class={classes}
  style="height: {height};"
  on:mouseenter={stopAutoplay}
  on:mouseleave={restartAutoplay}
>
  <!-- 幻灯片容器 -->
  <div class="hero__slides">
    {#each slides as slide, index (slide.id)}
      <div
        class="hero__slide {index === currentIndex ? 'hero__slide--active' : ''}"
        style="transform: translateY({parallax ? parallaxOffset : 0}px);"
      >
        <!-- 背景图片 -->
        <div
          class="hero__background"
          style="background-image: url('{slide.imageUrl}');"
        ></div>

        <!-- 内容遮罩 -->
        <div class="hero__overlay"></div>

        <!-- 幻灯片内容 -->
        {#if index === currentIndex}
          <div
            class="hero__content hero__content--{slide.textAlign || 'center'} hero__content--{slide.contentPosition || 'center'}"
          >
            <div class="container">
              <div class="hero__content-inner">
                {#if $$slots.slide}
                  <slot name="slide" {slide} {index} />
                {:else}
                  {#if slide.subtitle}
                    <p
                      class="hero__subtitle {slide.textColor === 'dark' ? 'hero__subtitle--dark' : ''}"
                    >
                      {slide.subtitle}
                    </p>
                  {/if}

                  <h1
                    class="hero__title {slide.textColor === 'dark' ? 'hero__title--dark' : ''}"
                  >
                    {slide.title}
                  </h1>

                  {#if slide.description}
                    <p
                      class="hero__description {slide.textColor === 'dark' ? 'hero__description--dark' : ''}"
                    >
                      {slide.description}
                    </p>
                  {/if}

                  {#if slide.ctaText && slide.ctaLink}
                    <div class="hero__cta">
                      <a
                        href={slide.ctaLink}
                        class="hero__cta-button"
                        on:click={() => handleCtaClick(slide)}
                      >
                        {slide.ctaText}
                      </a>
                    </div>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- 导航箭头 -->
  {#if showNavigation && slides.length > 1}
    <div class="hero__navigation">
      {#if $$slots.navigation}
        <slot name="navigation" />
      {:else}
        <button
          class="hero__nav-button hero__nav-button--prev"
          aria-label="Previous slide"
          on:click={prevSlide}
        >
          <span class="hero__nav-icon">‹</span>
        </button>
        <button
          class="hero__nav-button hero__nav-button--next"
          aria-label="Next slide"
          on:click={nextSlide}
        >
          <span class="hero__nav-icon">›</span>
        </button>
      {/if}
    </div>
  {/if}

  <!-- 分页器 -->
  {#if showPagination && slides.length > 1}
    <div class="hero__pagination">
      {#if $$slots.pagination}
        <slot name="pagination" />
      {:else}
        {#each slides as slide, index}
          <button
            class="hero__pagination-dot {index === currentIndex ? 'hero__pagination-dot--active' : ''}"
            aria-label="Go to slide {index + 1}"
            on:click={() => goToSlide(index)}
          ></button>
        {/each}
      {/if}
    </div>
  {/if}
</section>

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  // ========================================
  // Hero 基础样式（Pages 标准）
  // ========================================
  .hero {
    position: relative;
    width: 100%;
    overflow: hidden;

    // ========================================
    // 幻灯片容器
    // ========================================
    &__slides {
      position: relative;
      width: 100%;
      height: 100%;
    }

    &__slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      visibility: hidden;
      transition: opacity $transition-smooth ease, visibility $transition-smooth ease;
      will-change: transform; // 硬件加速

      &--active {
        opacity: 1;
        visibility: visible;
        z-index: 1;
      }
    }

    // ========================================
    // 背景图片
    // ========================================
    &__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transform: scale(1.1); // 略微放大，为视差留出空间
    }

    // ========================================
    // 内容遮罩（增强文字可读性）
    // ========================================
    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      z-index: 1;
    }

    // ========================================
    // 幻灯片内容
    // ========================================
    &__content {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      z-index: 2;

      // 垂直位置
      &--top {
        align-items: flex-start;
        padding-top: $spacing-section-top + $header-default-height; // 75px + 60px
      }

      &--center {
        align-items: center;
      }

      &--bottom {
        align-items: flex-end;
        padding-bottom: $spacing-section-bottom; // 85px
      }
    }

    &__content-inner {
      width: 100%;
      // 水平对齐由父级 .hero__content 的 modifier 控制
    }

    // 文字对齐
    .hero__content--left .hero__content-inner {
      text-align: left;
    }

    .hero__content--center .hero__content-inner {
      text-align: center;
    }

    .hero__content--right .hero__content-inner {
      text-align: right;
    }

    // ========================================
    // 文字样式
    // ========================================
    &__subtitle {
      font-family: $font-family-heading;
      font-size: $font-size-h6; // 16px
      font-weight: $font-weight-normal; // 400
      color: rgba($color-white, 0.9);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: $spacing-md; // 20px
      animation: fadeInUp 0.8s ease;

      &--dark {
        color: rgba($color-master-dark, 0.8);
      }
    }

    &__title {
      font-family: $font-family-heading;
      font-size: $font-size-h1-mega; // 110px
      line-height: 1.1;
      font-weight: $font-weight-light; // 300
      color: $color-white;
      letter-spacing: $letter-spacing-tight; // -0.009em
      margin-bottom: $spacing-lg; // 40px
      animation: fadeInUp 0.8s ease 0.2s both;

      &--dark {
        color: $color-master-dark;
      }

      @include respond-to(md) {
        font-size: 60px; // 移动端缩小
      }

      @include respond-to(xs) {
        font-size: 44px;
      }
    }

    &__description {
      font-size: $font-size-h5; // 18px
      line-height: $line-height-h5; // 26px
      font-weight: $font-weight-light; // 300
      color: rgba($color-white, 0.85);
      max-width: 600px;
      margin: 0 auto $spacing-xl auto; // 60px bottom
      animation: fadeInUp 0.8s ease 0.4s both;

      &--dark {
        color: rgba($color-master, 0.9);
      }

      @include respond-to(xs) {
        font-size: $font-size-p; // 16px 移动端
      }
    }

    // ========================================
    // CTA 按钮
    // ========================================
    &__cta {
      animation: fadeInUp 0.8s ease 0.6s both;
    }

    &__cta-button {
      display: inline-block;
      padding: $btn-padding-y $btn-padding-x-lg; // 17px 28px
      background-color: $color-primary;
      color: $color-white;
      font-size: $btn-font-size; // 14px
      font-weight: $font-weight-normal; // 400
      text-decoration: none;
      border-radius: $btn-border-radius; // 3px
      border: $btn-border-width solid $color-primary;
      transition: all $transition-base;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      &:hover {
        background-color: transparent;
        color: $color-white;
        border-color: $color-white;
      }
    }

    // ========================================
    // 导航箭头
    // ========================================
    &__navigation {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      z-index: 3;
      pointer-events: none; // 让容器本身不捕获点击
    }

    &__nav-button {
      position: absolute;
      top: 0;
      width: 50px;
      height: 50px;
      background-color: rgba($color-white, 0.2);
      border: none;
      border-radius: 50%;
      color: $color-white;
      font-size: 32px;
      cursor: pointer;
      transition: background-color $transition-base;
      pointer-events: auto; // 按钮本身捕获点击

      &:hover {
        background-color: rgba($color-white, 0.3);
      }

      &--prev {
        left: $spacing-lg; // 40px

        @include respond-to(xs) {
          left: $spacing-md; // 20px
        }
      }

      &--next {
        right: $spacing-lg; // 40px

        @include respond-to(xs) {
          right: $spacing-md; // 20px
        }
      }
    }

    &__nav-icon {
      display: block;
      line-height: 1;
    }

    // ========================================
    // 分页器（小圆点）
    // ========================================
    &__pagination {
      position: absolute;
      bottom: $spacing-xl; // 60px
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: $spacing-sm; // 10px
      z-index: 3;

      @include respond-to(xs) {
        bottom: $spacing-lg; // 40px
      }
    }

    &__pagination-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: rgba($color-white, 0.4);
      border: none;
      cursor: pointer;
      transition: background-color $transition-base, transform $transition-base;

      &:hover {
        background-color: rgba($color-white, 0.6);
      }

      &--active {
        background-color: $color-white;
        transform: scale(1.2);
      }
    }
  }

  // ========================================
  // 淡入向上动画（Pages 标准）
  // ========================================
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
