<script lang="ts">
  /**
   * Hero 组件 - 国际律所首页英雄区
   * 支持全屏背景、视频背景、深色遮罩、优雅动画
   */

  import { onMount } from 'svelte';

  export let title: string;
  export let subtitle: string = '';
  export let backgroundImage: string = '';
  export let backgroundVideo: string = '';
  export let videoPoster: string = '';
  export let height: 'sm' | 'md' | 'lg' | 'full' = 'lg';
  export let align: 'left' | 'center' = 'center';
  export let overlay: boolean = true;
  export let overlayOpacity: number = 0.6;
  export let parallax: boolean = false;
  export let className: string = '';

  let videoElement: HTMLVideoElement;
  let scrollY = 0;

  $: classes = [
    'hero',
    `hero--${height}`,
    `hero--align-${align}`,
    parallax && 'hero--parallax',
    className
  ].filter(Boolean).join(' ');

  $: overlayStyle = overlay ? `opacity: ${overlayOpacity}` : 'display: none';

  onMount(() => {
    // 视频自动播放
    if (videoElement) {
      videoElement.play().catch(() => {
        // 自动播放失败时静音重试
        videoElement.muted = true;
        videoElement.play();
      });
    }

    // 视差滚动效果
    if (parallax) {
      const handleScroll = () => {
        scrollY = window.scrollY;
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });

  $: parallaxTransform = parallax ? `translateY(${scrollY * 0.5}px)` : 'none';
</script>

<section class={classes}>
  {#if backgroundVideo}
    <video
      bind:this={videoElement}
      class="hero__video"
      poster={videoPoster}
      autoplay
      muted
      loop
      playsinline
      style="transform: {parallaxTransform}"
    >
      <source src={backgroundVideo} type="video/mp4" />
      <source src={backgroundVideo.replace('.mp4', '.webm')} type="video/webm" />
    </video>
    <div class="hero__overlay" style={overlayStyle} />
  {:else if backgroundImage}
    <div class="hero__background" style="background-image: url({backgroundImage}); transform: {parallaxTransform}" />
    <div class="hero__overlay" style={overlayStyle} />
  {/if}

  <div class="hero__content container">
    <h1 class="hero__title slide-up">{title}</h1>
    {#if subtitle}
      <p class="hero__subtitle slide-up animation-delay-1">{subtitle}</p>
    {/if}
    {#if $$slots.actions}
      <div class="hero__actions slide-up animation-delay-2">
        <slot name="actions" />
      </div>
    {/if}
  </div>

  {#if $$slots.default}
    <div class="hero__extra">
      <slot />
    </div>
  {/if}
</section>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .hero {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: $color-primary;

    // 高度变体
    &--sm {
      min-height: 400px;
    }

    &--md {
      min-height: 500px;

      @include respond-from(tablet) {
        min-height: 600px;
      }
    }

    &--lg {
      min-height: 600px;

      @include respond-from(tablet) {
        min-height: 700px;
      }

      @include respond-from(desktop) {
        min-height: 80vh;
      }
    }

    &--full {
      min-height: 100vh;
    }

    // 背景图片
    &__background {
      @include bg-cover;
      @include absolute-center;
      width: 100%;
      height: 100%;
      z-index: 0;
      transform: scale(1);
      transition: transform 10s $transition-ease;

      .hero:hover & {
        transform: scale(1.05);
      }
    }

    // 视频背景
    &__video {
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      transform: translate(-50%, -50%);
      z-index: 0;
      object-fit: cover;
      transition: transform 0.1s linear;
    }

    // 视差效果
    &--parallax {
      .hero__background,
      .hero__video {
        height: 120%;
        top: -10%;
      }
    }

    // 遮罩层
    &__overlay {
      @include absolute-center;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba($color-primary, 0.85) 0%, rgba($color-black, 0.7) 100%);
      z-index: 1;
    }

    // 内容区域
    &__content {
      position: relative;
      z-index: 2;
      color: $color-white;
      text-align: center;
      padding: $spacing-xl 0;

      @include respond-from(tablet) {
        padding: $spacing-3xl 0;
      }
    }

    &--align-left &__content {
      text-align: left;
      max-width: 800px;
      margin-left: 0;
    }

    // 标题
    &__title {
      @include heading(4xl);
      font-weight: 700;
      color: $color-white;
      margin-bottom: $spacing-lg;
      text-shadow: 0 2px 8px rgba($color-black, 0.3);

      @include respond-to(mobile) {
        font-size: 32px;
      }

      @include respond-from(tablet) {
        font-size: 48px;
      }

      @include respond-from(desktop) {
        font-size: 64px;
        letter-spacing: -0.03em;
      }
    }

    // 副标题
    &__subtitle {
      @include body-text;
      color: rgba($color-white, 0.95);
      font-size: $font-size-lg;
      max-width: 720px;
      margin: 0 auto $spacing-xl;
      text-shadow: 0 1px 4px rgba($color-black, 0.2);

      @include respond-from(tablet) {
        font-size: $font-size-xl;
      }
    }

    &--align-left &__subtitle {
      margin-left: 0;
    }

    // 操作按钮区
    &__actions {
      display: flex;
      gap: $spacing-md;
      justify-content: center;
      flex-wrap: wrap;

      @include respond-to(mobile) {
        flex-direction: column;
        align-items: stretch;
      }
    }

    &--align-left &__actions {
      justify-content: flex-start;
    }

    // 额外内容
    &__extra {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }
  }
</style>
