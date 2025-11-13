# 性能优化指南

根据 Lighthouse 测试结果（Performance: 45），以下是优化建议和实施步骤。

## 📊 当前问题

- **FCP (First Contentful Paint)**: 9.3s ❌ (目标: <1.8s)
- **LCP (Largest Contentful Paint)**: 213.3s ❌ (目标: <2.5s)
- **TBT (Total Blocking Time)**: 430ms ⚠️ (目标: <200ms)
- **Speed Index**: 13.5s ❌ (目标: <3.4s)

## 🎯 优化方案（按优先级）

### 1. 图片优化 ⭐⭐⭐⭐⭐ (可节省 962 KiB)

#### 立即执行：
```bash
# 1. 压缩现有图片
npm install -D imagemin imagemin-webp imagemin-mozjpeg

# 运行压缩脚本（需要创建）
node scripts/optimize-images.js
```

#### 手动压缩工具：
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/

#### 代码实施：
```svelte
<!-- 使用 OptimizedImage 组件 -->
<script>
  import OptimizedImage from '$lib/components/OptimizedImage.svelte';
</script>

<OptimizedImage
  src="/images/banner-1.jpg"
  alt="Banner"
  loading="lazy"
  width={1920}
  height={1080}
/>
```

#### 建议尺寸：
- Banner 图片: 1920x1080 → 压缩至 100-150KB
- Logo: 32KB → 已经合理
- 缩略图: 最大 50KB

---

### 2. JavaScript 优化 ⭐⭐⭐⭐

#### A. 代码分割（已在 vite.config.ts 配置）
```typescript
manualChunks: {
  'vendor-svelte': ['svelte', '@sveltejs/kit'],
  'vendor-ui': ['$ui/components']
}
```

#### B. 移除未使用的代码
```bash
# 分析打包体积
npm run build
npx vite-bundle-visualizer

# 检查未使用的导出
npx ts-prune
```

#### C. 动态导入
```typescript
// 替换静态导入
// import { HeavyComponent } from './heavy';

// 使用动态导入
const HeavyComponent = lazy(() => import('./heavy'));
```

---

### 3. CSS 优化 ⭐⭐⭐

#### 移除未使用的 CSS（13 KiB）
```bash
# 使用 PurgeCSS
npm install -D @fullhuman/postcss-purgecss
```

#### Vite 配置：
```typescript
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

plugins: [
  sveltekit(),
  purgeCss()
]
```

---

### 4. 缓存策略 ⭐⭐⭐⭐

#### 添加 Service Worker
```bash
npm install -D @sveltejs/adapter-static workbox-build
```

#### 创建 `static/service-worker.js`:
```javascript
const CACHE_NAME = 'huacheng-law-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/images/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

---

### 5. 字体优化 ⭐⭐

#### 预加载关键字体
```html
<!-- 在 app.html 中添加 -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
```

#### 使用 font-display
```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/main.woff2') format('woff2');
  font-display: swap; /* 立即显示回退字体 */
}
```

---

### 6. 减少主线程工作 ⭐⭐⭐

#### 使用 Web Workers
```typescript
// 将耗时计算移到 Worker
const worker = new Worker('/workers/heavy-task.js');
worker.postMessage(data);
```

#### 避免长任务
```typescript
// 使用 requestIdleCallback
requestIdleCallback(() => {
  // 非关键任务
  analyzeUserBehavior();
});
```

---

## 📈 预期改进

实施以上优化后，预期性能分数：

| 指标 | 当前 | 目标 | 改进 |
|------|------|------|------|
| Performance | 45 | 90+ | +45 |
| FCP | 9.3s | <1.8s | -80% |
| LCP | 213.3s | <2.5s | -99% |
| TBT | 430ms | <200ms | -54% |

---

## 🚀 快速实施步骤

### Phase 1: 立即见效（1-2小时）
1. ✅ 压缩所有图片（TinyPNG）
2. ✅ 替换为 OptimizedImage 组件
3. ✅ 启用 Vite 构建优化（已完成）

### Phase 2: 中期优化（半天）
4. ⬜ 实现代码分割
5. ⬜ 添加 Service Worker
6. ⬜ 优化字体加载

### Phase 3: 长期优化（1-2天）
7. ⬜ 使用 CDN 分发静态资源
8. ⬜ 实现 SSR 预渲染
9. ⬜ 添加性能监控

---

## 🔧 测试命令

```bash
# 本地 Lighthouse 测试
npm run build
npm run preview
npx lighthouse http://localhost:4173 --view

# CI/CD 集成
npm run test:lighthouse
```

---

## 📚 参考资源

- [Web.dev - Optimize Images](https://web.dev/fast/#optimize-your-images)
- [SvelteKit Performance](https://kit.svelte.dev/docs/performance)
- [Vite Build Optimizations](https://vitejs.dev/guide/build.html)
