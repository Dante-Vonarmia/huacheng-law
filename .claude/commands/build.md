# Frontend Agent 命令

你现在是 **Frontend Agent**，负责华诚律师事务所门户网站的页面模板实现与后台适配。

## 当前任务：Phase 3 + Phase 4

### Phase 3: 模板实现
根据 `TASKS.md` Phase 3，实现所有页面模板：

#### 📋 页面模板清单

**核心页面（P0 优先级）**:
1. `src/routes/+page.svelte` - 首页
2. `src/routes/practices/+page.svelte` - 业务领域列表
3. `src/routes/practices/[slug]/+page.svelte` - 业务领域详情
4. `src/routes/team/+page.svelte` - 律师列表
5. `src/routes/team/[id]/+page.svelte` - 律师详情
6. `src/routes/news/+page.svelte` - 新闻列表
7. `src/routes/news/[id]/+page.svelte` - 新闻详情
8. `src/routes/contact/+page.svelte` - 联系我们

**次要页面（P1 优先级）**:
9. `src/routes/about/+page.svelte` - 关于我们
10. `src/routes/events/+page.svelte` - 活动列表
11. `src/routes/events/[id]/+page.svelte` - 活动详情
12. `src/routes/careers/+page.svelte` - 招聘页面
13. `src/routes/search/+page.svelte` - 搜索结果

#### 📋 通用组件清单

**SEO 与工具组件**:
- `src/lib/components/Seo.svelte` - SEO Meta 组件
- `src/lib/components/LanguageSwitcher.svelte` - 语言切换
- `src/lib/components/Breadcrumb.svelte` - 面包屑导航

**工具函数**:
- `src/lib/utils/i18n.ts` - 多语言工具
- `src/lib/utils/format.ts` - 格式化工具
- `src/lib/utils/seo.ts` - SEO 工具

**类型定义**:
- `src/lib/types/lawyer.ts` - 律师类型
- `src/lib/types/news.ts` - 新闻类型
- `src/lib/types/practice.ts` - 业务领域类型
- `src/lib/types/event.ts` - 活动类型

### Phase 4: 后台适配层

#### 📋 适配层文件清单

1. `adapter/schema-map.json` - 字段映射表
   - 定义后台字段 → 前端类型的映射关系
   - 支持 lawyers / news / practices / events

2. `adapter/types.ts` - 后台数据类型
   - 定义原始后台数据的 TypeScript 接口

3. `adapter/api-client.ts` - API 客户端
   - 封装所有 API 请求
   - 自动进行字段转换（使用 schema-map）
   - 包含错误处理

4. `adapter/mock-data/` - Mock 数据
   - `lawyers.json` - 律师 Mock 数据（至少 10 条）
   - `news.json` - 新闻 Mock 数据（至少 15 条）
   - `practices.json` - 业务领域 Mock 数据（至少 8 条）
   - `events.json` - 活动 Mock 数据（至少 5 条）

## 🎯 关键要求

### 渲染策略
- **SSG（静态生成）**: 关于我们、业务领域列表
- **SSR（服务端渲染）**: 律师列表/详情、新闻列表/详情、活动
- **CSR（客户端渲染）**: 搜索结果、表单提交

### 数据加载
- 使用 `+page.ts` 或 `+page.server.ts` 加载数据
- 所有数据必须经过 `adapter/api-client.ts`
- 开发阶段使用 Mock 数据

### SEO 要求（每个页面）
- 唯一的 `<title>` 标签
- `<meta name="description">`
- Open Graph 标签（`og:title`, `og:description`, `og:image`）
- `<link rel="canonical">`
- 多语言标签（`hreflang="zh-CN"` 和 `hreflang="en"`）

### 交叉引用系统
- 律师详情页 → 显示所属业务领域
- 律师详情页 → 显示相关新闻/出版物
- 业务领域详情页 → 显示主办律师
- 新闻详情页 → 显示作者律师

## 📂 输出文件结构

```
src/
├── routes/
│   ├── +layout.svelte          # 全局布局
│   ├── +page.svelte            # 首页
│   ├── about/+page.svelte
│   ├── practices/
│   │   ├── +page.svelte
│   │   └── [slug]/+page.svelte
│   ├── team/
│   │   ├── +page.svelte
│   │   └── [id]/+page.svelte
│   ├── news/
│   │   ├── +page.svelte
│   │   └── [id]/+page.svelte
│   ├── events/
│   │   ├── +page.svelte
│   │   └── [id]/+page.svelte
│   ├── careers/+page.svelte
│   ├── contact/+page.svelte
│   └── search/+page.svelte
├── lib/
│   ├── components/
│   │   ├── Seo.svelte
│   │   ├── LanguageSwitcher.svelte
│   │   └── Breadcrumb.svelte
│   ├── utils/
│   │   ├── i18n.ts
│   │   ├── format.ts
│   │   └── seo.ts
│   └── types/
│       ├── lawyer.ts
│       ├── news.ts
│       ├── practice.ts
│       └── event.ts
adapter/
├── schema-map.json
├── types.ts
├── api-client.ts
└── mock-data/
    ├── lawyers.json
    ├── news.json
    ├── practices.json
    └── events.json
```

## 📊 完成标准

**Phase 3**:
- [ ] 所有页面模板创建完成
- [ ] 所有页面包含 SEO Meta 信息
- [ ] 所有页面支持多语言
- [ ] 交叉引用系统实现完成
- [ ] 数据加载逻辑正确（+page.ts）

**Phase 4**:
- [ ] schema-map.json 完整定义
- [ ] API 客户端实现完成
- [ ] 所有 Mock 数据创建完成
- [ ] 数据流测试通过

## 🚀 开始执行

**优先级顺序**:
1. 先完成 Phase 4（适配层） - 确保数据流通畅
2. 再完成 Phase 3（模板实现） - 使用适配层加载数据

**现在开始执行 Phase 3 + Phase 4 任务！**
