<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Props接口定义
  export let items: CarouselItem[] = [];
  export let autoplay: boolean = true;
  export let interval: number = 5000;
  export let showDots: boolean = true;
  export let showArrows: boolean = true;
  export let transition: 'fade' | 'slide' = 'fade';
  export let height: string = '600px';

  // 类型定义
  interface CarouselItem {
    id: string;
    image: string;
    title_zh: string;
    title_en: string;
    subtitle_zh?: string;
    subtitle_en?: string;
    cta?: {
      text_zh: string;
      text_en: string;
      link: string;
    };
  }

  // 状态管理
  let currentIndex = 0;
  let autoplayTimer: ReturnType<typeof setInterval> | null = null;

  // 自动播放
  function startAutoplay() {
    if (!autoplay || items.length <= 1) return;

    autoplayTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
    }, interval);
  }

  // 停止自动播放
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // 手动控制
  function goToSlide(index: number) {
    currentIndex = index;
    stopAutoplay();
    startAutoplay(); // 重启自动播放
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % items.length);
  }

  function prevSlide() {
    goToSlide((currentIndex - 1 + items.length) % items.length);
  }

  // 键盘控制
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      nextSlide();
    }
  }

  // 生命周期管理
  onMount(() => {
    // 预加载图片
    items.forEach(item => {
      const img = new Image();
      img.src = item.image;
    });

    // 启动自动播放
    startAutoplay();

    // 添加键盘事件监听
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  onDestroy(() => {
    stopAutoplay();
  });

  // 响应式变量
  $: isFade = transition === 'fade';
</script>

<div class="carousel" style="--carousel-height: {height}">
  {#if isFade}
    <!-- Fade 模式 -->
    <div class="carousel__container">
      {#each items as item, index (item.id)}
        <div
          class="carousel__slide"
          class:carousel__slide--active={index === currentIndex}
          style="background-image: url({item.image})"
        >
          <div class="carousel__slide-overlay"></div>
          <div class="carousel__slide-content">
            <h2 class="carousel__title">{item.title_zh}</h2>
            {#if item.subtitle_zh}
              <p class="carousel__subtitle">{item.subtitle_zh}</p>
            {/if}
            {#if item.cta}
              <a href={item.cta.link} class="carousel__cta">
                {item.cta.text_zh}
              </a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <!-- Slide 模式 -->
    <div class="carousel__track" style="transform: translateX(-{currentIndex * 100}%)">
      {#each items as item (item.id)}
        <div class="carousel__slide" style="background-image: url({item.image})">
          <div class="carousel__slide-overlay"></div>
          <div class="carousel__slide-content">
            <h2 class="carousel__title">{item.title_zh}</h2>
            {#if item.subtitle_zh}
              <p class="carousel__subtitle">{item.subtitle_zh}</p>
            {/if}
            {#if item.cta}
              <a href={item.cta.link} class="carousel__cta">
                {item.cta.text_zh}
              </a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- 左右箭头 -->
  {#if showArrows && items.length > 1}
    <button
      class="carousel__arrow carousel__arrow--prev"
      on:click={prevSlide}
      aria-label="上一张"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button
      class="carousel__arrow carousel__arrow--next"
      on:click={nextSlide}
      aria-label="下一张"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  {/if}

  <!-- 圆点导航 -->
  {#if showDots && items.length > 1}
    <div class="carousel__dots">
      {#each items as item, index (item.id)}
        <button
          class="carousel__dot"
          class:carousel__dot--active={index === currentIndex}
          on:click={() => goToSlide(index)}
          aria-label="跳转到第 {index + 1} 张"
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .carousel {
    position: relative;
    width: 100%;
    height: var(--carousel-height, 600px);
    overflow: hidden;
    background: #000;

    // Fade 模式容器
    &__container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    // Slide 模式轨道
    &__track {
      display: flex;
      width: 100%;
      height: 100%;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    // 幻灯片
    &__slide {
      position: relative;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      flex-shrink: 0;

      // Fade 模式特殊样式
      .carousel__container & {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 0.6s ease-in-out;
        pointer-events: none;

        &--active {
          opacity: 1;
          pointer-events: auto;
        }
      }
    }

    // 遮罩层
    &__slide-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.6) 100%
      );
      z-index: 1;
    }

    // 内容区
    &__slide-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      z-index: 2;
      width: 90%;
      max-width: 800px;
    }

    &__title {
      font-size: 48px;
      font-weight: 300;
      margin: 0 0 16px;
      color: white;
      letter-spacing: -0.02em;
      animation: fadeInUp 0.8s ease-out;

      @include respond-to('tablet') {
        font-size: 36px;
      }

      @include respond-to('mobile') {
        font-size: 28px;
      }
    }

    &__subtitle {
      font-size: 20px;
      font-weight: 300;
      margin: 0 0 32px;
      color: rgba(255, 255, 255, 0.9);
      animation: fadeInUp 0.8s ease-out 0.2s both;

      @include respond-to('mobile') {
        font-size: 16px;
        margin-bottom: 24px;
      }
    }

    &__cta {
      display: inline-block;
      padding: 14px 32px;
      background: $color-primary;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.3s;
      animation: fadeInUp 0.8s ease-out 0.4s both;

      &:hover {
        background: $color-accent;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      @include respond-to('mobile') {
        padding: 12px 24px;
        font-size: 14px;
      }
    }

    // 箭头按钮
    &__arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 3;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: rgba(0, 0, 0, 0.8);
        transform: translateY(-50%) scale(1.1);
      }

      &--prev {
        left: 24px;
      }

      &--next {
        right: 24px;
      }

      @include respond-to('mobile') {
        width: 36px;
        height: 36px;

        svg {
          width: 18px;
          height: 18px;
        }

        &--prev {
          left: 12px;
        }

        &--next {
          right: 12px;
        }
      }
    }

    // 圆点导航
    &__dots {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 3;

      @include respond-to('mobile') {
        bottom: 16px;
      }
    }

    &__dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      border: none;
      cursor: pointer;
      transition: all 0.3s;
      padding: 0;

      &:hover {
        background: rgba(255, 255, 255, 0.8);
      }

      &--active {
        background: white;
        width: 32px;
        border-radius: 6px;
      }
    }

    // 响应式高度
    @include respond-to('mobile') {
      height: 400px;
    }
  }

  // 动画定义
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
