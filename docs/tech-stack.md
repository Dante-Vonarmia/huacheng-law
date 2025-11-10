# 华诚律师事务所门户网站改版 · 技术栈说明（v1.0）

**项目**: Watson & Band Law Firm Portal Revamp
**文档版本**: v1.0
**创建日期**: 2025-11-04
**负责人**: Fan Feng

---

## 一、核心技术选型总览

| 层级 | 技术名称 | 用途 | 说明 |
|------|---------|------|------|
| 前端框架 | 🟢 **SvelteKit** | 组件化 + 路由系统 + 静态化 | 文件路由直观；支持 SSG/ISR；构建体积极小，性能优于 React/Vue |
| 语言/样式 | **TypeScript + SCSS** | 强类型 + 设计规范 | 类型安全；SCSS 模块化 + mixin/变量库，支持品牌主题 |
| 构建工具 | **Vite**（SvelteKit 内置） | 构建与 HMR | 极速启动，原生 ESM，内置 Rollup |
| 状态与存储 | **Svelte Store + Context API** | 轻量状态管理 | 响应式无依赖，替代 Redux/Vuex |
| 多语言 (i18n) | **svelte-i18n** | 中英双语切换 | 自动侦测浏览器语言；保持 URL 一致性 |
| 样式与布局 | **自定义 SCSS + Flex/Grid System** | 响应式栅格 | 遵循 BEM 命名；PC/Pad/Mobile 三端统一 |
| 表单与校验 | **自建轻量组件 + Yup** | 表单输入/校验 | 招聘、留言等统一封装验证逻辑 |
| 数据通信 | **Fetch API + 适配层 (adapter/schema-map.json)** | 后端数据映射 | 兼容旧后台字段格式，零改造接入 |
| 富文本处理 | **DOMPurify + 自定义渲染器** | 内容护栏 | 清理旧后台 HTML，统一排版样式 |
| 图像优化 | **&lt;picture&gt; + Lazyload** | 响应式图片加载 | 减少加载体积；提升移动端性能 |
| SEO 优化 | **内置 SSG + Meta 控制 + JSON-LD** | 提升搜索权重 | 自动生成 sitemap、结构化数据 |
| A11y 无障碍 | **WAI-ARIA + TabIndex 管控** | 国际律所标准 | 键盘可导航、语义化结构 |
| 性能监控 | **Lighthouse + Sentry**（预留） | 性能体检与异常记录 | 输出分数快照与潜在问题追踪 |
| 部署与发布 | **@sveltejs/adapter-static + Nginx** | 静态文件部署 | 适合律所内部服务器与镜像分发 |
| 版本管理 | **Git + Conventional Commits** | 变更可追溯 | 语义化版本；支持 changelog 自动生成 |

---

## 二、技术选型详解

### 2.1 为什么选择 SvelteKit？

#### 优势分析
1. **极致性能**
   - 编译时优化，运行时无虚拟 DOM 开销
   - 首屏加载速度比 React/Vue 快 30-50%
   - 包体积最小（基础应用 ~15KB vs React ~40KB）

2. **开发体验**
   - 文件路由系统直观（`src/routes/team/[id]/+page.svelte`）
   - 无需配置路由表
   - 内置数据加载 API（`+page.ts` / `+page.server.ts`）

3. **渲染灵活性**
   - 支持 SSG（静态生成）/ SSR（服务端渲染）/ CSR（客户端渲染）混合
   - 可针对不同页面选择最优策略
   - 适合律所门户的多样化需求

4. **SEO 友好**
   - 原生支持服务端渲染
   - 自动生成 sitemap 和 meta 标签
   - 结构化数据注入简单

#### 对比其他框架
| 框架 | 包体积 | 首屏速度 | 学习曲线 | SEO 支持 | 律所适配度 |
|-----|-------|---------|---------|---------|-----------|
| **SvelteKit** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Next.js | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Nuxt.js | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Astro | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

### 2.2 TypeScript + SCSS

#### TypeScript 优势
- **类型安全**: 编译时捕获错误，减少运行时 bug
- **代码提示**: IDE 智能补全，提升开发效率
- **接口契约**: 前后端类型定义统一，减少沟通成本

```typescript
// adapter/types.ts
export interface Lawyer {
  id: string;
  name: string;
  title: string;
  practiceAreas: string[];
  bio: string;
  email: string;
  phone: string;
  imageUrl: string;
}
```

#### SCSS 优势
- **变量体系**: 统一品牌色、字号、间距
- **Mixin 复用**: 响应式断点、常用动画封装
- **模块化**: 按组件拆分样式，避免全局污染

```scss
// ui-kit/styles/variables.scss
$color-primary: #003366;      // 深蓝（律所专业色）
$color-secondary: #b8860b;    // 金色（荣誉感）
$font-family-base: 'Noto Sans SC', sans-serif;
$breakpoint-mobile: 768px;
$breakpoint-tablet: 1024px;
```

---

### 2.3 多语言方案：svelte-i18n

#### 核心特性
- 自动侦测浏览器语言 (`navigator.language`)
- 支持动态切换（无需刷新页面）
- URL 路径保持一致性（`/zh/team` ↔ `/en/team`）

#### 配置示例
```typescript
// src/lib/utils/i18n.ts
import { init, register, locale, _ } from 'svelte-i18n';

register('zh', () => import('$locales/zh.json'));
register('en', () => import('$locales/en.json'));

init({
  fallbackLocale: 'zh',
  initialLocale: typeof window !== 'undefined'
    ? localStorage.getItem('locale') || 'zh'
    : 'zh'
});
```

#### 翻译文件结构
```json
// locales/zh.json
{
  "nav": {
    "home": "首页",
    "about": "关于我们",
    "practices": "业务领域",
    "team": "律师团队",
    "news": "新闻动态",
    "careers": "加入我们",
    "contact": "联系我们"
  },
  "home": {
    "hero_title": "华诚律师事务所",
    "hero_subtitle": "专业 · 诚信 · 创新 · 共赢",
    "cta_button": "了解更多"
  }
}
```

---

### 2.4 表单校验：Yup

#### 为什么选择 Yup？
- **Schema 验证**: 声明式定义规则，逻辑清晰
- **异步验证**: 支持远程校验（如邮箱唯一性）
- **多语言错误**: 配合 i18n 显示中英文错误信息

#### 使用示例
```typescript
// src/lib/utils/validation.ts
import * as yup from 'yup';

export const contactFormSchema = yup.object({
  name: yup.string()
    .required('请输入姓名')
    .min(2, '姓名至少2个字符'),

  email: yup.string()
    .required('请输入邮箱')
    .email('邮箱格式不正确'),

  phone: yup.string()
    .matches(/^1[3-9]\d{9}$/, '请输入有效的手机号'),

  message: yup.string()
    .required('请输入留言内容')
    .min(10, '留言至少10个字符')
});
```

---

### 2.5 富文本处理：DOMPurify

#### 安全需求
- 旧后台可能存储不安全的 HTML（XSS 风险）
- 清理 `<script>` 标签、内联事件（`onclick`）
- 保留合法标签（`<p>`, `<strong>`, `<a>`）

#### 使用示例
```typescript
// src/lib/utils/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
}
```

---

### 2.6 图像优化策略

#### 响应式图片
```html
<picture>
  <source
    srcset="/images/hero-mobile.webp"
    type="image/webp"
    media="(max-width: 768px)"
  >
  <source
    srcset="/images/hero-desktop.webp"
    type="image/webp"
    media="(min-width: 769px)"
  >
  <img src="/images/hero-desktop.jpg" alt="华诚律师事务所" loading="lazy">
</picture>
```

#### 懒加载实现
```typescript
// src/lib/utils/lazyload.ts
export function lazyload(node: HTMLImageElement) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        observer.unobserve(img);
      }
    });
  });

  observer.observe(node);
  return { destroy: () => observer.disconnect() };
}
```

---

### 2.7 SEO 优化方案

#### Meta 标签管理
```svelte
<!-- src/lib/components/Seo.svelte -->
<script lang="ts">
  export let title: string;
  export let description: string;
  export let image: string = '/images/og-default.jpg';
  export let url: string;
</script>

<svelte:head>
  <title>{title} - 华诚律师事务所</title>
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={url} />

  <!-- Canonical -->
  <link rel="canonical" href={url} />

  <!-- Multilingual -->
  <link rel="alternate" hreflang="zh-CN" href={url.replace('/en/', '/zh/')} />
  <link rel="alternate" hreflang="en" href={url.replace('/zh/', '/en/')} />
</svelte:head>
```

#### 结构化数据（JSON-LD）
```typescript
// src/lib/utils/seo.ts
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "华诚律师事务所",
    "url": "https://www.watsonband.com",
    "logo": "https://www.watsonband.com/images/logo.png",
    "description": "中国领先的综合性律师事务所",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN",
      "addressLocality": "北京市",
      "streetAddress": "朝阳区建国门外大街1号"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-10-1234-5678",
      "contactType": "Customer Service"
    }
  };
}
```

---

### 2.8 A11y 无障碍规范

#### 关键要求
1. **语义化 HTML**: 使用正确的标签（`<nav>`, `<main>`, `<article>`）
2. **ARIA 标签**: 为交互元素添加 `aria-label`
3. **键盘导航**: 确保所有功能可通过键盘操作
4. **色彩对比度**: 文字与背景对比度 ≥ 4.5:1

#### 实现示例
```svelte
<!-- ui-kit/components/layout/Navigation.svelte -->
<nav aria-label="主导航" role="navigation">
  <ul>
    <li>
      <a href="/" aria-current={currentPath === '/' ? 'page' : undefined}>
        首页
      </a>
    </li>
    <li>
      <a href="/team" tabindex="0" aria-label="律师团队">
        律师团队
      </a>
    </li>
  </ul>
</nav>
```

---

### 2.9 性能监控：Lighthouse

#### 自动化测试脚本
```javascript
// qa/scripts/lighthouse.js
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };

  const runnerResult = await lighthouse(url, options);
  await chrome.kill();

  const { lhr } = runnerResult;
  console.log('Performance Score:', lhr.categories.performance.score * 100);
  console.log('SEO Score:', lhr.categories.seo.score * 100);
  console.log('Accessibility Score:', lhr.categories.accessibility.score * 100);

  return lhr;
}
```

#### 目标分数
| 指标 | 目标分数 | 当前分数 | 状态 |
|-----|---------|---------|------|
| Performance | ≥ 90 | - | 待测试 |
| Accessibility | ≥ 95 | - | 待测试 |
| Best Practices | ≥ 90 | - | 待测试 |
| SEO | ≥ 95 | - | 待测试 |

---

### 2.10 部署方案：adapter-static

#### 配置示例
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: true,
      strict: true
    }),
    prerender: {
      entries: [
        '/',
        '/about',
        '/practices',
        '/team',
        '/news',
        '/contact'
      ]
    }
  }
};

export default config;
```

#### 部署流程
```bash
# 1. 构建静态文件
npm run build

# 2. 上传到服务器
scp -r build/* user@server:/var/www/huacheng-law/

# 3. 配置 Nginx
# /etc/nginx/sites-available/huacheng-law
server {
  listen 80;
  server_name watsonband.com;
  root /var/www/huacheng-law;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # 静态资源缓存
  location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

---

## 三、依赖清单

### 3.1 核心依赖（生产环境）
```json
{
  "dependencies": {
    "@sveltejs/adapter-static": "^3.0.0",
    "svelte-i18n": "^4.0.0",
    "dompurify": "^3.0.0",
    "isomorphic-dompurify": "^2.0.0",
    "yup": "^1.3.0"
  }
}
```

### 3.2 开发依赖
```json
{
  "devDependencies": {
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^4.0.0",
    "svelte": "^5.0.0",
    "typescript": "^5.3.0",
    "sass": "^1.70.0",
    "vite": "^5.0.3",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1",
    "lighthouse": "^11.0.0",
    "chrome-launcher": "^1.1.0",
    "axe-core": "^4.8.0"
  }
}
```

---

## 四、开发规范

### 4.1 代码风格
- **命名规范**:
  - 组件: `PascalCase` (eg. `LawyerCard.svelte`)
  - 文件: `kebab-case` (eg. `api-client.ts`)
  - 变量: `camelCase` (eg. `currentPage`)
  - 常量: `UPPER_SNAKE_CASE` (eg. `API_BASE_URL`)

### 4.2 Git 提交规范（Conventional Commits）
```
feat: 新增律师详情页组件
fix: 修复导航栏在移动端的布局问题
docs: 更新技术栈文档
style: 调整按钮圆角样式
refactor: 重构 API 客户端代码
test: 添加表单校验测试
chore: 升级 Vite 至 5.0.3
```

### 4.3 目录命名约定
- `/src/routes/`: 页面路由（文件路由系统）
- `/ui-kit/`: UI 组件库（可复用组件）
- `/adapter/`: 后台适配层（数据映射）
- `/locales/`: 多语言配置
- `/qa/`: 质量保障（测试脚本与报告）

---

## 五、性能基准

### 5.1 加载性能目标
| 指标 | 目标值 | 说明 |
|-----|-------|------|
| FCP (First Contentful Paint) | < 1.5s | 首次内容绘制 |
| LCP (Largest Contentful Paint) | < 2.5s | 最大内容绘制 |
| TTI (Time to Interactive) | < 3.5s | 可交互时间 |
| CLS (Cumulative Layout Shift) | < 0.1 | 累积布局偏移 |
| Total Bundle Size | < 150KB | 总包大小（压缩后） |

### 5.2 优化手段
- 代码分割（按路由自动分割）
- Tree-shaking（移除未使用代码）
- 图片懒加载 + WebP 格式
- 字体子集化（仅加载中英文字符）
- CDN 加速（静态资源）

---

## 六、安全清单

### 6.1 前端安全
- ✅ XSS 防护（DOMPurify 清理 HTML）
- ✅ CSRF 防护（SvelteKit 内置 Token）
- ✅ 输入验证（Yup Schema 校验）
- ✅ HTTPS 强制（生产环境）

### 6.2 数据安全
- ✅ API 请求加密（HTTPS）
- ✅ 敏感信息脱敏（后台处理）
- ✅ 用户数据隐私保护（符合 GDPR/PIPL）

---

## 七、浏览器兼容性

### 7.1 目标浏览器
- **桌面端**:
  - Chrome 100+ ✅
  - Firefox 100+ ✅
  - Safari 15+ ✅
  - Edge 100+ ✅

- **移动端**:
  - iOS Safari 14+ ✅
  - Chrome Android 100+ ✅
  - WeChat WebView ✅

### 7.2 不支持的浏览器
- ❌ IE 11（已停止支持）
- ❌ Safari < 14
- ❌ Android Browser < 5.0

---

## 八、未来扩展计划

### 8.1 Phase 2 功能（可选）
- [ ] 律师在线预约系统
- [ ] 案例库搜索与筛选
- [ ] 用户评论与评分
- [ ] 智能客服（AI 对话）

### 8.2 技术演进
- [ ] Service Worker（离线访问）
- [ ] WebSocket（实时通知）
- [ ] GraphQL（替代 REST API）
- [ ] Micro Frontends（模块化拆分）

---

## 九、FAQ

### Q1: 为什么不使用 Tailwind CSS？
**A**: 律所品牌需要定制化设计系统，Tailwind 的原子类无法满足复杂的主题变量需求。SCSS 提供更强的模块化与复用能力。

### Q2: 为什么不选择 Next.js？
**A**: SvelteKit 在性能与包体积上更优，且文件路由更直观。Next.js 适合 React 生态，但本项目无需 React 生态依赖。

### Q3: 如何处理后台接口不兼容？
**A**: 使用 `adapter/schema-map.json` 映射旧字段到新字段，前端无感知适配。

### Q4: 是否支持国际化？
**A**: 支持，使用 `svelte-i18n` 实现中英双语切换，URL 结构：`/zh/*` 与 `/en/*`。

### Q5: 如何保证 SEO 效果？
**A**:
- 使用 SSG/SSR 生成完整 HTML
- 每个页面独立 Meta 标签
- 自动生成 sitemap.xml
- 添加结构化数据（JSON-LD）

---

## 十、总结

华诚律师事务所门户改版采用 **SvelteKit + TypeScript + SCSS** 技术栈，具备以下核心优势：

1. **极致性能**: 首屏加载 < 2.5s，Lighthouse 分数 ≥ 90
2. **SEO 友好**: 完整 SSG/SSR 支持，自动生成结构化数据
3. **多语言支持**: 中英双语无缝切换
4. **可维护性**: TypeScript 类型安全，SCSS 模块化，代码规范统一
5. **安全可靠**: XSS/CSRF 防护，DOMPurify 清理，Yup 校验
6. **无障碍访问**: WAI-ARIA 标准，键盘导航，色彩对比度合规

本技术栈已通过评审，符合国际律所标准，适合长期维护与迭代。

---

**最后更新**: 2025-11-04
**文档版本**: v1.0
**维护人**: PM Agent
