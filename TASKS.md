# 华诚律师事务所门户改版 - 任务注册表

**项目**: Watson & Band Law Firm Portal Revamp
**负责人**: Fan Feng
**创建日期**: 2025-11-03
**最后更新**: 2025-11-03

---

## 任务总览

| Phase | 任务数 | 负责 Agent | 状态 | 完成度 |
|-------|--------|------------|------|--------|
| Phase 0 | 6 | PM Agent | ✅ 已完成 | 100% |
| Phase 1 | 12 | PM Agent | 🔄 准备启动 | 0% |
| Phase 2 | 12 | Design Agent | ⏳ 待启动 | 0% |
| Phase 3 | 15 | Frontend Agent | ⏳ 待启动 | 0% |
| Phase 4 | 8 | Frontend Agent | ⏳ 待启动 | 0% |
| Phase 5 | 10 | QA Agent | ⏳ 待启动 | 0% |

---

## Phase 0: 工程流框架建立 ✅

**目标**: 建立项目协作框架与规范
**状态**: ✅ 已完成（2025-11-04）

| ID | 任务 | 负责人 | 状态 | 优先级 |
|----|------|--------|------|--------|
| 0.1 | 创建 CLAUDE.md 项目定义文件 | PM Agent | ✅ 完成 | P0 |
| 0.2 | 创建 AGENTS.md 配置文件 | PM Agent | ✅ 完成 | P0 |
| 0.3 | 创建 TASKS.md 任务注册表 | PM Agent | ✅ 完成 | P0 |
| 0.4 | 确认技术栈与依赖 (package.json) | PM Agent | ✅ 完成 | P0 |
| 0.5 | 生成项目结构规范文档 | PM Agent | ✅ 完成 | P1 |
| 0.6 | 创建技术栈说明文档 | PM Agent | ✅ 完成 | P0 |

**输出文件**:
- [x] CLAUDE.md
- [x] AGENTS.md
- [x] TASKS.md
- [x] package.json（已更新完整依赖）
- [x] docs/architecture.md
- [x] docs/tech-stack.md
- [x] docs/project-progress.md

**关键决策**:
- ✅ 确认前端框架：SvelteKit
- ✅ 确认样式方案：SCSS（自定义变量体系）
- ✅ 确认类型系统：TypeScript
- ✅ 确认多语言：svelte-i18n
- ✅ 确认表单校验：Yup
- ✅ 确认富文本安全：DOMPurify
- ✅ 确认部署方式：adapter-static + Nginx

---

## Phase 1: 项目初始化 🔄

**目标**: 建立完整项目结构与配置
**状态**: 🔄 准备启动（2025-11-04）

| ID | 任务 | 负责人 | 状态 | 优先级 | 预计时长 |
|----|------|--------|------|--------|---------|
| 1.1 | 初始化 SvelteKit 项目（npm create svelte@latest） | PM Agent | ⏳ 待启动 | P0 | 15min |
| 1.2 | 配置 TypeScript（tsconfig.json + 路径别名） | PM Agent | ⏳ 待启动 | P0 | 20min |
| 1.3 | 配置 SCSS 预处理器（sass + vite config） | PM Agent | ⏳ 待启动 | P0 | 15min |
| 1.4 | 配置 ESLint + Prettier（代码规范） | PM Agent | ⏳ 待启动 | P1 | 20min |
| 1.5 | 配置 svelte-i18n（多语言基础设置） | PM Agent | ⏳ 待启动 | P0 | 30min |
| 1.6 | 配置 adapter-static（静态部署适配器） | PM Agent | ⏳ 待启动 | P0 | 15min |
| 1.7 | 安装并配置 DOMPurify（富文本安全） | PM Agent | ⏳ 待启动 | P0 | 10min |
| 1.8 | 安装并配置 Yup（表单校验） | PM Agent | ⏳ 待启动 | P0 | 10min |
| 1.9 | 创建完整目录结构（ui-kit/ adapter/ qa/ hooks/） | PM Agent | ⏳ 待启动 | P0 | 20min |
| 1.10 | 创建页面映射文件（page-map.json） | PM Agent | ⏳ 待启动 | P0 | 15min |
| 1.11 | 创建实体关系映射（entity-relations.json） | PM Agent | ⏳ 待启动 | P0 | 20min |
| 1.12 | 创建多语言配置文件（locales/zh.json, en.json） | PM Agent | ⏳ 待启动 | P0 | 30min |

**总预计时长**: 约 3.5 小时

**输出文件**:
- [ ] 完整目录结构（src/ ui-kit/ adapter/ locales/ qa/ hooks/）
- [ ] svelte.config.js（配置 adapter-static + prerender）
- [ ] vite.config.ts（配置 SCSS + 路径别名）
- [ ] tsconfig.json（严格模式 + 路径别名）
- [ ] .eslintrc.js（ESLint 规则）
- [ ] .prettierrc（Prettier 配置）
- [ ] package.json（完整依赖，包含 svelte-i18n, DOMPurify, Yup）
- [ ] docs/page-map.json（页面路由映射）
- [ ] docs/entity-relations.json（实体关系映射）
- [ ] locales/zh.json（中文翻译）
- [ ] locales/en.json（英文翻译）
- [ ] hooks/mirror.ts（国际镜像占位）
- [ ] hooks/seo-report.ts（SEO 报告占位）
- [ ] hooks/monitor.ts（性能监控占位）

**关键配置要点**:

### 1.2 TypeScript 配置
- 启用严格模式（`strict: true`）
- 路径别名：`$lib`, `$ui-kit`, `$adapter`, `$locales`
- 类型检查：确保所有 `.ts` 文件无错误

### 1.3 SCSS 配置
- 安装 `sass` 依赖
- 配置 Vite 预处理器
- 创建全局 SCSS 变量文件（`ui-kit/styles/variables.scss`）

### 1.5 svelte-i18n 配置
- 初始化语言侦测（浏览器语言 + localStorage）
- 配置语言切换逻辑
- 支持动态导入翻译文件

### 1.6 adapter-static 配置
- 配置 SSG 预渲染路径
- 配置 fallback 页面（404.html）
- 启用 precompress（gzip）

### 1.9 目录结构
```
huacheng-law/
├── src/
│   ├── routes/              # 页面路由
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
    ├── mirror.ts            # 国际镜像
    ├── seo-report.ts        # SEO 报告
    └── monitor.ts           # 性能监控
```

---

## Phase 2: UI Kit 建立

**目标**: 建立法律行业风格 UI 组件库

| ID | 任务 | 负责人 | 状态 | 优先级 | 依赖 |
|----|------|--------|------|--------|------|
| 2.1 | 创建 SCSS 变量体系 (variables.scss) | Design Agent | ⏳ 待启动 | P0 | 1.1 |
| 2.2 | 创建 SCSS 混入 (mixins.scss) | Design Agent | ⏳ 待启动 | P1 | 2.1 |
| 2.3 | 创建全局样式 (global.scss) | Design Agent | ⏳ 待启动 | P0 | 2.1 |
| 2.4 | 实现 Typography 组件 | Design Agent | ⏳ 待启动 | P0 | 2.1 |
| 2.5 | 实现 Button 组件 | Design Agent | ⏳ 待启动 | P0 | 2.1 |
| 2.6 | 实现 Card 组件 | Design Agent | ⏳ 待启动 | P0 | 2.1 |
| 2.7 | 实现 Input 组件 | Design Agent | ⏳ 待启动 | P1 | 2.1 |
| 2.8 | 实现 Link 组件 | Design Agent | ⏳ 待启动 | P1 | 2.1 |
| 2.9 | 实现 Hero 组件 | Design Agent | ⏳ 待启动 | P0 | 2.1 |
| 2.10 | 实现 Footer 组件 | Design Agent | ⏳ 待启动 | P0 | 2.1 |
| 2.11 | 实现 Navigation 组件 | Design Agent | ⏳ 待启动 | P0 | 2.1 |
| 2.12 | 编写视觉规范文档 (visual-guidelines.md) | Design Agent | ⏳ 待启动 | P1 | 2.1-2.11 |

**输出文件**:
- [ ] ui-kit/styles/variables.scss
- [ ] ui-kit/styles/mixins.scss
- [ ] ui-kit/styles/global.scss
- [ ] ui-kit/components/base/Typography.svelte
- [ ] ui-kit/components/base/Button.svelte
- [ ] ui-kit/components/base/Card.svelte
- [ ] ui-kit/components/base/Input.svelte
- [ ] ui-kit/components/base/Link.svelte
- [ ] ui-kit/components/layout/Hero.svelte
- [ ] ui-kit/components/layout/Footer.svelte
- [ ] ui-kit/components/layout/Navigation.svelte
- [ ] docs/visual-guidelines.md

---

## Phase 3: 模板实现

**目标**: 实现所有页面模板与路由

| ID | 任务 | 负责人 | 状态 | 优先级 | 依赖 |
|----|------|--------|------|--------|------|
| 3.1 | 实现首页模板 (Home) | Frontend Agent | ⏳ 待启动 | P0 | 2.9, 2.10 |
| 3.2 | 实现关于我们页面 (About) | Frontend Agent | ⏳ 待启动 | P1 | 2.4, 2.6 |
| 3.3 | 实现业务领域列表页 (PracticeList) | Frontend Agent | ⏳ 待启动 | P0 | 2.6 |
| 3.4 | 实现业务领域详情页 (PracticeDetail) | Frontend Agent | ⏳ 待启动 | P0 | 2.6 |
| 3.5 | 实现律师列表页 (LawyerList) | Frontend Agent | ⏳ 待启动 | P0 | 2.6 |
| 3.6 | 实现律师详情页 (LawyerDetail) | Frontend Agent | ⏳ 待启动 | P0 | 2.6 |
| 3.7 | 实现新闻列表页 (NewsList) | Frontend Agent | ⏳ 待启动 | P0 | 2.6 |
| 3.8 | 实现新闻详情页 (NewsDetail) | Frontend Agent | ⏳ 待启动 | P0 | 2.6 |
| 3.9 | 实现活动列表页 (EventList) | Frontend Agent | ⏳ 待启动 | P1 | 2.6 |
| 3.10 | 实现活动详情页 (EventDetail) | Frontend Agent | ⏳ 待启动 | P1 | 2.6 |
| 3.11 | 实现招聘页面 (Career) | Frontend Agent | ⏳ 待启动 | P1 | 2.6, 2.7 |
| 3.12 | 实现联系我们页面 (Contact) | Frontend Agent | ⏳ 待启动 | P0 | 2.6, 2.7 |
| 3.13 | 实现搜索结果页 (SearchResult) | Frontend Agent | ⏳ 待启动 | P1 | 2.6 |
| 3.14 | 配置路由与数据加载逻辑 | Frontend Agent | ⏳ 待启动 | P0 | 3.1-3.13 |
| 3.15 | 实现交叉引用链接 (律师↔新闻↔业务领域) | Frontend Agent | ⏳ 待启动 | P0 | 3.4, 3.6, 3.8 |

**输出文件**:
- [ ] src/routes/+page.svelte (首页)
- [ ] src/routes/about/+page.svelte
- [ ] src/routes/practices/+page.svelte
- [ ] src/routes/practices/[slug]/+page.svelte
- [ ] src/routes/team/+page.svelte
- [ ] src/routes/team/[id]/+page.svelte
- [ ] src/routes/news/+page.svelte
- [ ] src/routes/news/[id]/+page.svelte
- [ ] src/routes/events/+page.svelte
- [ ] src/routes/events/[id]/+page.svelte
- [ ] src/routes/careers/+page.svelte
- [ ] src/routes/contact/+page.svelte
- [ ] src/routes/search/+page.svelte

---

## Phase 4: 后台适配

**目标**: 建立后台接口适配层与数据流

| ID | 任务 | 负责人 | 状态 | 优先级 | 依赖 |
|----|------|--------|------|--------|------|
| 4.1 | 编写 schema-map.json 字段映射表 | Frontend Agent | ⏳ 待启动 | P0 | 1.6 |
| 4.2 | 定义 TypeScript 类型 (adapter/types.ts) | Frontend Agent | ⏳ 待启动 | P0 | 4.1 |
| 4.3 | 实现 API 客户端 (adapter/api-client.ts) | Frontend Agent | ⏳ 待启动 | P0 | 4.2 |
| 4.4 | 创建律师 Mock 数据 (mock-data/lawyers.json) | Frontend Agent | ⏳ 待启动 | P0 | 4.2 |
| 4.5 | 创建新闻 Mock 数据 (mock-data/news.json) | Frontend Agent | ⏳ 待启动 | P0 | 4.2 |
| 4.6 | 创建业务领域 Mock 数据 (mock-data/practices.json) | Frontend Agent | ⏳ 待启动 | P0 | 4.2 |
| 4.7 | 创建活动 Mock 数据 (mock-data/events.json) | Frontend Agent | ⏳ 待启动 | P1 | 4.2 |
| 4.8 | 测试数据流与模板渲染 | Frontend Agent | ⏳ 待启动 | P0 | 4.3-4.7 |

**输出文件**:
- [ ] adapter/schema-map.json
- [ ] adapter/types.ts
- [ ] adapter/api-client.ts
- [ ] adapter/mock-data/lawyers.json
- [ ] adapter/mock-data/news.json
- [ ] adapter/mock-data/practices.json
- [ ] adapter/mock-data/events.json

---

## Phase 5: 性能验证与优化

**目标**: 执行质量检测与生成报告

| ID | 任务 | 负责人 | 状态 | 优先级 | 依赖 |
|----|------|--------|------|--------|------|
| 5.1 | 编写 Lighthouse 测试脚本 (qa/scripts/lighthouse.js) | QA Agent | ⏳ 待启动 | P0 | 3.14 |
| 5.2 | 编写 A11y 检测脚本 (qa/scripts/a11y-check.js) | QA Agent | ⏳ 待启动 | P0 | 3.14 |
| 5.3 | 编写 SEO 验证脚本 (qa/scripts/seo-check.js) | QA Agent | ⏳ 待启动 | P0 | 3.14 |
| 5.4 | 执行 Lighthouse 性能测试 | QA Agent | ⏳ 待启动 | P0 | 5.1 |
| 5.5 | 执行 A11y 可访问性测试 | QA Agent | ⏳ 待启动 | P0 | 5.2 |
| 5.6 | 执行 SEO 优化验证 | QA Agent | ⏳ 待启动 | P0 | 5.3 |
| 5.7 | 测试中英文切换功能 | QA Agent | ⏳ 待启动 | P0 | 3.14 |
| 5.8 | 测试国际访问速度 | QA Agent | ⏳ 待启动 | P1 | 5.4 |
| 5.9 | 生成综合测试报告 (final-qa-report.md) | QA Agent | ⏳ 待启动 | P0 | 5.4-5.8 |
| 5.10 | 提出优化建议并跟进修复 | QA Agent | ⏳ 待启动 | P0 | 5.9 |

**输出文件**:
- [ ] qa/scripts/lighthouse.js
- [ ] qa/scripts/a11y-check.js
- [ ] qa/scripts/seo-check.js
- [ ] qa/reports/lighthouse-summary.json
- [ ] qa/reports/a11y-report.json
- [ ] qa/reports/seo-report.json
- [ ] qa/reports/final-qa-report.md

---

## 优先级说明

- **P0**: 关键任务，必须完成
- **P1**: 重要任务，应该完成
- **P2**: 次要任务，可选完成

---

## 状态说明

- ✅ 完成
- 🔄 进行中
- ⏳ 待启动
- ❌ 已阻塞
- ⏸️ 已暂停

---

## 里程碑

| 里程碑 | 目标日期 | 状态 | 完成标准 | 实际完成 |
|--------|---------|------|----------|---------|
| M0: 工程框架建立 | Day 1 | ✅ 已完成 | CLAUDE.md + AGENTS.md + TASKS.md + 技术栈文档完成 | 2025-11-04 |
| M1: 项目初始化完成 | Day 2 | 🔄 准备启动 | 目录结构 + 配置文件 + 映射文件完成 | - |
| M2: UI Kit 完成 | Day 3 | ⏳ 待启动 | 所有基础组件 + 样式体系完成 | - |
| M3: 模板实现完成 | Day 5 | ⏳ 待启动 | 所有页面模板 + 路由配置完成 | - |
| M4: 后台适配完成 | Day 6 | ⏳ 待启动 | schema-map + API 客户端 + Mock 数据完成 | - |
| M5: QA 验证完成 | Day 7 | ⏳ 待启动 | 所有测试通过 + 报告生成 | - |
| M6: 项目交付 | Day 8 | ⏳ 待启动 | 所有交付物完成 + 文档齐全 | - |

---

## 风险与依赖

### 技术风险
- ⚠️ 后台接口字段可能与预期不符 → 需确认 schema-map.json
- ⚠️ Lighthouse 评分可能不达标 → 需预留优化时间

### 外部依赖
- 🔗 需要后台提供真实 API 文档
- 🔗 需要提供品牌 Logo / 图片素材
- 🔗 需要确认律师照片与简介内容

---

## 更新日志

| 日期 | 更新内容 | 更新人 |
|------|---------|--------|
| 2025-11-03 | 创建任务注册表，定义 Phase 0-5 | PM Agent |
| 2025-11-04 | Phase 0 完成，添加技术栈文档，更新 Phase 1 详细任务 | PM Agent |
| 2025-11-04 | 更新 package.json 添加完整依赖（svelte-i18n, DOMPurify, Yup） | PM Agent |
| 2025-11-04 | 创建项目进度跟踪文档（project-progress.md） | PM Agent |

---

**最后更新**: 2025-11-04
**文档版本**: v1.1
