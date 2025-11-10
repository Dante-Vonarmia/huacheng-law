# Init 命令 - Phase 1 项目初始化

执行华诚律师事务所门户网站改版项目的 **Phase 1: 项目初始化**。

## 📋 Phase 1 任务清单

根据 `TASKS.md` Phase 1，完成以下 12 个初始化任务：

### 1. 初始化 SvelteKit 项目
```bash
npm create svelte@latest .
# 选择: Skeleton project + TypeScript + ESLint + Prettier
```

### 2. 配置 TypeScript
- 创建 `tsconfig.json`
- 启用严格模式（`strict: true`）
- 配置路径别名：
  - `$lib` → `src/lib`
  - `$ui-kit` → `ui-kit`
  - `$adapter` → `adapter`
  - `$locales` → `locales`

### 3. 配置 SCSS 预处理器
- 安装 `sass` 依赖（已在 package.json 中）
- 配置 Vite 预处理器（vite.config.ts）
- 创建全局 SCSS 变量文件（`ui-kit/styles/variables.scss`）

### 4. 配置 ESLint + Prettier
- 创建 `.eslintrc.js` - ESLint 规则
- 创建 `.prettierrc` - Prettier 配置
- 配置忽略文件（`.eslintignore`, `.prettierignore`）

### 5. 配置 svelte-i18n（多语言）
- 安装 `svelte-i18n`（已在 package.json 中）
- 创建 i18n 初始化文件（`src/lib/utils/i18n.ts`）
- 配置语言侦测（浏览器语言 + localStorage）
- 支持动态导入翻译文件

### 6. 配置 adapter-static（静态部署）
- 安装 `@sveltejs/adapter-static`（已在 package.json 中）
- 创建 `svelte.config.js`
- 配置 SSG 预渲染路径
- 配置 fallback 页面（404.html）
- 启用 precompress（gzip）

### 7. 配置 DOMPurify（富文本安全）
- 安装 `dompurify` 和 `isomorphic-dompurify`（已在 package.json 中）
- 创建 DOMPurify 工具函数（`src/lib/utils/sanitize.ts`）
- 配置白名单标签与属性

### 8. 配置 Yup（表单校验）
- 安装 `yup`（已在 package.json 中）
- 创建通用校验规则（`src/lib/utils/validation.ts`）
- 配置多语言错误消息

### 9. 创建完整目录结构
```
huacheng-law/
├── src/
│   ├── routes/              # 页面路由（SvelteKit 文件路由）
│   ├── lib/
│   │   ├── components/      # 通用组件
│   │   ├── utils/           # 工具函数
│   │   └── types/           # TypeScript 类型
│   ├── app.html             # HTML 模板
│   └── app.css              # 全局样式入口
├── ui-kit/
│   ├── components/
│   │   ├── base/            # 基础组件
│   │   ├── layout/          # 布局组件
│   │   └── domain/          # 业务组件
│   └── styles/
│       ├── variables.scss   # SCSS 变量
│       ├── mixins.scss      # SCSS 混入
│       ├── global.scss      # 全局样式
│       └── reset.scss       # CSS Reset
├── adapter/
│   ├── schema-map.json      # 字段映射表
│   ├── api-client.ts        # API 客户端
│   ├── types.ts             # 后台数据类型
│   └── mock-data/           # Mock 数据
├── locales/
│   ├── zh.json              # 中文翻译
│   └── en.json              # 英文翻译
├── qa/
│   ├── scripts/             # 测试脚本
│   └── reports/             # 测试报告
└── hooks/
    ├── mirror.ts            # 国际镜像（预留）
    ├── seo-report.ts        # SEO 报告（预留）
    └── monitor.ts           # 性能监控（预留）
```

### 10. 创建页面映射文件（page-map.json）
定义所有页面的路由结构、模板类型、渲染策略：
```json
{
  "home": { "route": "/", "template": "Home", "render": "SSG" },
  "about": { "route": "/about", "template": "About", "render": "SSG" },
  "practices": {
    "list": { "route": "/practices", "template": "PracticeList", "render": "SSG" },
    "detail": { "route": "/practices/[slug]", "template": "PracticeDetail", "render": "SSG" }
  },
  ...
}
```

### 11. 创建实体关系映射（entity-relations.json）
定义律师、新闻、业务领域之间的交叉引用关系：
```json
{
  "lawyer": {
    "relatedTo": ["practice", "news", "publication", "event"],
    "fields": {
      "practice_ids": "array",
      "publications": "array",
      "news": "array"
    }
  },
  ...
}
```

### 12. 创建多语言配置文件
- `locales/zh.json` - 中文翻译
- `locales/en.json` - 英文翻译

包含导航、页面标题、表单标签等所有文案。

## 🎯 关键配置要点

### TypeScript 配置（tsconfig.json）
```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "$lib": ["src/lib"],
      "$lib/*": ["src/lib/*"],
      "$ui-kit": ["ui-kit"],
      "$ui-kit/*": ["ui-kit/*"],
      "$adapter": ["adapter"],
      "$adapter/*": ["adapter/*"],
      "$locales": ["locales"],
      "$locales/*": ["locales/*"]
    }
  }
}
```

### SCSS 配置（vite.config.ts）
```typescript
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '$ui-kit/styles/variables.scss';`
      }
    }
  }
});
```

### svelte-i18n 配置
```typescript
import { init, register, locale } from 'svelte-i18n';

register('zh', () => import('$locales/zh.json'));
register('en', () => import('$locales/en.json'));

init({
  fallbackLocale: 'zh',
  initialLocale: getBrowserLocale()
});
```

### adapter-static 配置（svelte.config.js）
```javascript
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: true
    })
  }
};
```

## 📊 完成标准

- [ ] SvelteKit 项目初始化完成
- [ ] TypeScript 配置完成（路径别名可用）
- [ ] SCSS 预处理器配置完成
- [ ] ESLint + Prettier 配置完成
- [ ] svelte-i18n 配置完成
- [ ] adapter-static 配置完成
- [ ] DOMPurify 配置完成
- [ ] Yup 配置完成
- [ ] 完整目录结构创建完成
- [ ] page-map.json 创建完成
- [ ] entity-relations.json 创建完成
- [ ] 多语言配置文件创建完成
- [ ] 开发服务器可正常启动（`npm run dev`）
- [ ] 类型检查通过（`npm run check`）
- [ ] 代码规范检查通过（`npm run lint`）

## 🚀 执行流程

### Step 1: 安装依赖
```bash
npm install
```

### Step 2: 初始化 SvelteKit
```bash
npm create svelte@latest .
```

### Step 3: 创建所有配置文件
- tsconfig.json
- vite.config.ts
- svelte.config.js
- .eslintrc.js
- .prettierrc

### Step 4: 创建目录结构
```bash
mkdir -p src/{routes,lib/{components,utils,types}}
mkdir -p ui-kit/{components/{base,layout,domain},styles}
mkdir -p adapter/mock-data
mkdir -p locales
mkdir -p qa/{scripts,reports}
mkdir -p hooks
```

### Step 5: 创建基础文件
- 所有配置文件
- page-map.json
- entity-relations.json
- locales/zh.json, locales/en.json
- hooks 预留文件

### Step 6: 验证配置
```bash
npm run dev          # 启动开发服务器
npm run check        # TypeScript 类型检查
npm run lint         # ESLint 代码检查
```

## ⚠️ 重要提示

1. **不要跳过任何步骤** - 所有配置都是后续开发的基础
2. **路径别名必须正确** - 否则无法正确 import 组件
3. **多语言配置必须完整** - 所有文案都需要中英文版本
4. **目录结构必须严格按照规范** - 与 AGENTS.md 保持一致

**预计完成时间**: 约 3.5 小时

**现在开始执行 Phase 1 项目初始化！**
