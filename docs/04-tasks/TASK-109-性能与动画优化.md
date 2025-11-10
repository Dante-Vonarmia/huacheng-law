# TASK-109: 首页性能与动画优化

## 状态
- [ ] 待设计确认
- 优先级: P1
- 预计工时: 8小时 (1.0天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: -

## 背景
首页作为用户进入网站的第一入口，性能和用户体验至关重要。需要对首页进行全面的性能优化和动画优化，确保快速加载、流畅交互，提升用户体验和 SEO 排名。

## 目标
对首页进行全面优化，达到以下目标：
1. **性能优化**：Lighthouse 性能评分 > 90
2. **首屏加载**：FCP < 1.5s，LCP < 2.5s
3. **图片优化**：WebP 格式、懒加载、响应式图片
4. **代码优化**：代码分割、Tree Shaking、压缩
5. **动画优化**：流畅的过渡动画、滚动动画
6. **SEO 优化**：结构化数据、Meta 标签
7. **可访问性**：WCAG 2.1 AA 标准

## 优化要点（待确认）

### 性能优化策略
- [ ] 首屏内容优先级：Banner、核心服务优先加载
- [ ] 非首屏内容懒加载：视频、案例、活动等
- [ ] 图片优化策略：WebP + JPEG fallback、尺寸优化
- [ ] 字体优化：字体子集化、preload 关键字体
- [ ] 第三方脚本：defer/async 加载、移除非必要脚本
- [ ] 缓存策略：静态资源长期缓存、HTML 协商缓存

### 动画优化策略
- [ ] 滚动动画：元素进入视口时淡入/上浮
- [ ] 悬停动画：卡片、按钮的微交互
- [ ] 过渡动画：页面切换、内容切换
- [ ] 性能考虑：使用 CSS transform/opacity、避免 layout thrashing
- [ ] 可选性：用户偏好 prefers-reduced-motion

### SEO 优化策略
- [ ] 结构化数据：Organization、BreadcrumbList
- [ ] Meta 标签：title、description、og:image
- [ ] 语义化 HTML：使用正确的标签（header、nav、main、article）
- [ ] 内链优化：合理的内部链接结构
- [ ] XML Sitemap：生成站点地图
- [ ] Robots.txt：配置爬虫规则

## 技术实现

### 1. 涉及文件
- `src/routes/+page.svelte` - 首页主文件（优化）
- `src/routes/+page.server.ts` - 服务端数据预加载（新建）
- `src/lib/components/LazyImage.svelte` - 懒加载图片组件（新建）
- `src/lib/components/ScrollReveal.svelte` - 滚动动画组件（新建）
- `src/lib/utils/performance.ts` - 性能工具函数（新建）
- `svelte.config.js` - Vite 构建优化（修改）

### 2. 实现步骤

#### 步骤1：图片懒加载组件
创建 `src/lib/components/LazyImage.svelte`：
```svelte
<script lang=\"ts\">
  export let src: string;
  export let alt: string;
  export let width: number;
  export let height: number;
  export let srcset: string = '';
  export let sizes: string = '';
  export let loading: 'lazy' | 'eager' = 'lazy';

  let imageLoaded = $state(false);
  let imageError = $state(false);

  function handleLoad() {
    imageLoaded = true;
  }

  function handleError() {
    imageError = true;
  }
</script>

<div class=\"lazy-image\" style=\"aspect-ratio: {width}/{height}\">
  {#if !imageError}
    <img
      {src}
      {alt}
      {width}
      {height}
      {srcset}
      {sizes}
      {loading}
      class:loaded={imageLoaded}
      on:load={handleLoad}
      on:error={handleError}
    />
  {:else}
    <div class=\"lazy-image__placeholder\">
      <span>图片加载失败</span>
    </div>
  {/if}

  {#if !imageLoaded && !imageError}
    <div class=\"lazy-image__skeleton\" />
  {/if}
</div>

<style lang=\"scss\">
  .lazy-image {
    position: relative;
    overflow: hidden;
    background: var(--color-bg-light);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.3s ease;

      &.loaded {
        opacity: 1;
      }
    }
  }

  .lazy-image__skeleton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      #f0f0f0 0%,
      #e0e0e0 50%,
      #f0f0f0 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .lazy-image__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--color-text-tertiary);
  }
</style>
```

#### 步骤2：滚动动画组件
创建 `src/lib/components/ScrollReveal.svelte`：
```svelte
<script lang=\"ts\">
  import { onMount } from 'svelte';

  export let threshold: number = 0.1;
  export let delay: number = 0;
  export let duration: number = 600;

  let isVisible = $state(false);
  let element: HTMLElement;

  onMount(() => {
    // 检查用户是否偏好减少动画
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      isVisible = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              isVisible = true;
            }, delay);
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  });
</script>

<div
  bind:this={element}
  class=\"scroll-reveal\"
  class:visible={isVisible}
  style=\"--duration: {duration}ms; --delay: {delay}ms;\"
>
  <slot />
</div>

<style lang=\"scss\">
  .scroll-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity var(--duration) ease, transform var(--duration) ease;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scroll-reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
```

#### 步骤3：首页优化
在 `src/routes/+page.svelte` 中应用优化：
```svelte
<script lang=\"ts\">
import LazyImage from '$lib/components/LazyImage.svelte';
import ScrollReveal from '$lib/components/ScrollReveal.svelte';
import { Carousel, Button } from '$ui/components';
import { VideoCard, CaseCard } from '$ui/domain';

// 服务端预加载数据
export let data;

// 首屏数据（Banner）立即渲染
const { bannerSlides } = data;

// 非首屏数据（视频、案例、活动）懒加载
let showVideos = $state(false);
let showCases = $state(false);
let showEvents = $state(false);

// Intersection Observer 延迟加载非首屏内容
import { onMount } from 'svelte';
onMount(() => {
  const options = { rootMargin: '200px' };

  const videosObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      showVideos = true;
      videosObserver.disconnect();
    }
  }, options);

  const casesObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      showCases = true;
      casesObserver.disconnect();
    }
  }, options);

  const eventsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      showEvents = true;
      eventsObserver.disconnect();
    }
  }, options);

  // 观察各区域
  const videosSection = document.getElementById('videos-section');
  const casesSection = document.getElementById('cases-section');
  const eventsSection = document.getElementById('events-section');

  if (videosSection) videosObserver.observe(videosSection);
  if (casesSection) casesObserver.observe(casesSection);
  if (eventsSection) eventsObserver.observe(eventsSection);
});
</script>

<svelte:head>
  <title>华诚律师事务所 - 专业法律服务</title>
  <meta name=\"description\" content=\"华诚律师事务所提供专业的法律服务，涵盖知识产权、跨境并购、公司法务等领域。\" />
  <meta property=\"og:title\" content=\"华诚律师事务所\" />
  <meta property=\"og:description\" content=\"专业法律服务，值得信赖\" />
  <meta property=\"og:image\" content=\"/images/og-image.jpg\" />
  <link rel=\"preload\" as=\"image\" href=\"/images/banner/banner-1.webp\" />
</svelte:head>

<!-- Banner 轮播（首屏，立即加载） -->
<section class=\"home-banner\">
  <Carousel items={bannerSlides} autoplay={true} />
</section>

<!-- 精选视频区（懒加载） -->
<section id=\"videos-section\" class=\"featured-videos\">
  <ScrollReveal>
    {#if showVideos}
      <!-- 视频内容 -->
    {:else}
      <div class=\"skeleton-loader\" style=\"height: 400px\" />
    {/if}
  </ScrollReveal>
</section>

<!-- 精选案例区（懒加载） -->
<section id=\"cases-section\" class=\"featured-cases\">
  <ScrollReveal delay={100}>
    {#if showCases}
      <!-- 案例内容 -->
    {:else}
      <div class=\"skeleton-loader\" style=\"height: 500px\" />
    {/if}
  </ScrollReveal>
</section>

<!-- 活动讲座区（懒加载） -->
<section id=\"events-section\" class=\"events\">
  <ScrollReveal delay={200}>
    {#if showEvents}
      <!-- 活动内容 -->
    {:else}
      <div class=\"skeleton-loader\" style=\"height: 400px\" />
    {/if}
  </ScrollReveal>
</section>
```

#### 步骤4：服务端数据预加载
创建 `src/routes/+page.server.ts`：
```typescript
import type { PageServerLoad } from './$types';
import { bannerSlides } from '$lib/data/banner-slides';

export const load: PageServerLoad = async () => {
  // 只预加载首屏必需数据（Banner）
  return {
    bannerSlides
  };

  // 非首屏数据通过客户端懒加载
  // 不在此处加载 videos、cases、events
};
```

#### 步骤5：Vite 构建优化
在 `svelte.config.js` 中：
```javascript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          'ui-kit': [
            './ui-kit/components/index.ts',
            './ui-kit/domain/index.ts'
          ]
        }
      }
    },
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 生产环境移除 console
        drop_debugger: true
      }
    }
  },
  // 图片优化
  assetsInclude: ['**/*.webp'],
  // 预加载关键资源
  optimizeDeps: {
    include: ['svelte', 'svelte/transition']
  }
});
```

#### 步骤6：响应式图片
使用 srcset 和 sizes：
```svelte
<LazyImage
  src=\"/images/banner/banner-1-800w.webp\"
  srcset=\"
    /images/banner/banner-1-400w.webp 400w,
    /images/banner/banner-1-800w.webp 800w,
    /images/banner/banner-1-1200w.webp 1200w,
    /images/banner/banner-1-1920w.webp 1920w
  \"
  sizes=\"
    (max-width: 600px) 100vw,
    (max-width: 1200px) 100vw,
    1920px
  \"
  alt=\"Banner 图片\"
  width={1920}
  height={700}
/>
```

#### 步骤7：结构化数据
在 `src/routes/+layout.svelte` 中添加：
```svelte
<svelte:head>
  <script type=\"application/ld+json\">
    {
      \"@context\": \"https://schema.org\",
      \"@type\": \"LegalService\",
      \"name\": \"华诚律师事务所\",
      \"alternateName\": \"Watson & Band Law Firm\",
      \"url\": \"https://www.watson-band.com\",
      \"logo\": \"https://www.watson-band.com/images/logo.png\",
      \"description\": \"专业的法律服务机构，提供知识产权、跨境并购等法律服务\",
      \"address\": {
        \"@type\": \"PostalAddress\",
        \"streetAddress\": \"XXX路XXX号\",
        \"addressLocality\": \"上海\",
        \"addressCountry\": \"CN\"
      },
      \"telephone\": \"+86-21-XXXX-XXXX\",
      \"email\": \"contact@watson-band.com\"
    }
  </script>
</svelte:head>
```

### 3. 性能指标监控

创建 `src/lib/utils/performance.ts`：
```typescript
// Web Vitals 监控
export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  // FCP (First Contentful Paint)
  const fcpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('FCP:', entry.startTime);
      // 上报到分析服务
    }
  });
  fcpObserver.observe({ type: 'paint', buffered: true });

  // LCP (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
    // 上报到分析服务
  });
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

  // CLS (Cumulative Layout Shift)
  let clsScore = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsScore += (entry as any).value;
      }
    }
    console.log('CLS:', clsScore);
    // 上报到分析服务
  });
  clsObserver.observe({ type: 'layout-shift', buffered: true });
}
```

## 验收标准

### 性能验收
- [ ] Lighthouse 性能评分 > 90
- [ ] FCP (First Contentful Paint) < 1.5s
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] TTI (Time to Interactive) < 3.5s
- [ ] 首屏加载时间 < 2s（3G 网络）
- [ ] 非首屏内容懒加载正常

### 图片优化验收
- [ ] 所有图片使用 WebP 格式（带 fallback）
- [ ] 图片经过压缩优化（质量 80-85%）
- [ ] 使用响应式图片（srcset + sizes）
- [ ] 非首屏图片懒加载（loading=\"lazy\"）
- [ ] 图片尺寸适配不同设备
- [ ] 图片加载失败时显示占位符

### 动画优化验收
- [ ] 滚动动画流畅（60fps）
- [ ] 使用 CSS transform/opacity（避免 reflow）
- [ ] 支持 prefers-reduced-motion
- [ ] 动画时长合理（300-600ms）
- [ ] 没有 layout thrashing
- [ ] 悬停动画响应及时

### SEO 验收
- [ ] 结构化数据正确（JSON-LD）
- [ ] Meta 标签完整（title、description、og:image）
- [ ] 语义化 HTML 正确
- [ ] 内链结构合理
- [ ] XML Sitemap 生成
- [ ] Robots.txt 配置正确

### 可访问性验收
- [ ] Lighthouse 可访问性评分 > 90
- [ ] 键盘导航正常
- [ ] 屏幕阅读器支持
- [ ] 色彩对比度符合 WCAG AA 标准
- [ ] ARIA 标签正确使用

## 优化清单

### 图片优化
- [ ] 使用 WebP 格式（带 JPEG fallback）
- [ ] 图片压缩（质量 80-85%）
- [ ] 响应式图片（srcset + sizes）
- [ ] 懒加载（loading=\"lazy\"）
- [ ] 占位符/骨架屏

### 代码优化
- [ ] 代码分割（Code Splitting）
- [ ] Tree Shaking（移除未使用代码）
- [ ] 压缩混淆（Minify）
- [ ] 移除 console.log（生产环境）
- [ ] Gzip/Brotli 压缩

### 加载优化
- [ ] 首屏内容优先加载
- [ ] 非首屏内容懒加载
- [ ] 预加载关键资源（preload）
- [ ] DNS 预解析（dns-prefetch）
- [ ] 第三方脚本 defer/async

### 字体优化
- [ ] 字体子集化（只包含使用的字符）
- [ ] 字体预加载（preload）
- [ ] font-display: swap
- [ ] WOFF2 格式

### 缓存优化
- [ ] 静态资源长期缓存（1 年）
- [ ] HTML 协商缓存
- [ ] Service Worker（PWA）
- [ ] CDN 加速

## 依赖关系
- 前置任务: TASK-102~107（首页各区域）
- 依赖资源: 优化后的图片、字体文件
- 后续任务: 全站性能优化（TASK-1003）

## 文件变更清单
- [ ] `src/routes/+page.svelte` - 首页优化
- [ ] `src/routes/+page.server.ts` - 新建服务端数据预加载
- [ ] `src/lib/components/LazyImage.svelte` - 新建懒加载图片组件
- [ ] `src/lib/components/ScrollReveal.svelte` - 新建滚动动画组件
- [ ] `src/lib/utils/performance.ts` - 新建性能监控工具
- [ ] `svelte.config.js` - Vite 构建优化

## 备注
- 优化工作应在首页内容开发完成后进行
- 需要真实环境测试（3G/4G 网络）
- 使用 Lighthouse 和 WebPageTest 进行性能测试
- 考虑使用 CDN 加速静态资源
- 考虑实施 PWA（Service Worker、离线缓存）
- 持续监控 Web Vitals 指标
- 定期进行性能审计和优化
