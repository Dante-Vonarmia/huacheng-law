<script lang="ts">
  /**
   * OptimizedImage - 优化的图片组件
   * 功能：懒加载、响应式、现代格式支持
   */
  import { onMount } from 'svelte';

  export let src: string;
  export let alt: string;
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
  export let loading: 'lazy' | 'eager' = 'lazy';
  export let className: string = '';
  export let sizes: string = '100vw';

  let imgElement: HTMLImageElement;
  let isLoaded = $state(false);
  let hasError = $state(false);

  // 生成响应式图片源
  function getResponsiveSrc(baseSrc: string): string {
    // 如果是外部URL，直接返回
    if (baseSrc.startsWith('http')) return baseSrc;

    // 对于本地图片，返回原始路径
    // 生产环境应该使用图片CDN或构建时优化
    return baseSrc;
  }

  onMount(() => {
    // 使用 Intersection Observer 实现懒加载
    if (loading === 'lazy' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isLoaded = true;
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '50px' // 提前50px开始加载
        }
      );

      if (imgElement) {
        observer.observe(imgElement);
      }

      return () => observer.disconnect();
    } else {
      isLoaded = true;
    }
  });

  function handleLoad() {
    isLoaded = true;
  }

  function handleError() {
    hasError = true;
  }
</script>

<img
  bind:this={imgElement}
  src={isLoaded || loading === 'eager' ? getResponsiveSrc(src) : undefined}
  {alt}
  {width}
  {height}
  {sizes}
  loading={loading}
  decoding="async"
  class="{className} optimized-image"
  class:loaded={isLoaded}
  class:error={hasError}
  on:load={handleLoad}
  on:error={handleError}
/>

<style lang="scss">
  .optimized-image {
    opacity: 0;
    transition: opacity 0.3s ease;

    &.loaded {
      opacity: 1;
    }

    &.error {
      opacity: 0.5;
      filter: grayscale(100%);
    }
  }
</style>
