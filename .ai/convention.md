# 约定（Convention）

**项目**: Watson & Band Law Firm Portal
**版本**: v1.0
**创建时间**: 2025-11-11
**维护者**: Product Manager Agent

---

## 目的

本文档定义项目中的命名、目录、接口、文档格式、提交与发布规则，确保跨团队的一致性与可维护性。

---

## 1. 命名规范

### 1.1 数据表与字段
- **数据表**: 使用 `snake_case`
  - 示例: `lawyers`, `practice_areas`, `news_articles`
- **字段**: 使用 `snake_case`
  - 示例: `created_at`, `updated_at`, `name_zh`, `description_en`
- **索引**: `idx_{table}_{column}`
  - 示例: `idx_lawyers_practice_area`, `idx_news_published_at`

### 1.2 API 路径与方法
- **路径**: `/api/v1/{资源}`（名词复数）
  - 示例: `/api/v1/practices`, `/api/v1/lawyers`
- **方法**: HTTP 动词表达动作
  - `GET /api/v1/practices` - 获取列表
  - `GET /api/v1/practices/:id` - 获取详情
  - `POST /api/v1/practices` - 创建
  - `PUT /api/v1/practices/:id` - 更新
  - `DELETE /api/v1/practices/:id` - 删除
- **错误码**: `Hxxx` 格式
  - `H400` - 请求参数错误
  - `H401` - 未授权
  - `H404` - 资源未找到
  - `H500` - 服务器错误

### 1.3 组件与类
- **组件**: `PascalCase`
  - 示例: `Picker.svelte`, `LawyerCard.svelte`, `PracticeDetail.svelte`
- **类**: `PascalCase`
  - 示例: `ApiClient`, `SchemaValidator`, `ContentRenderer`
- **变量/函数**: `camelCase`
  - 示例: `fetchPractices`, `currentIndex`, `activeTabIndex`
- **常量**: `UPPER_SNAKE_CASE`
  - 示例: `MAX_ITEMS`, `DEFAULT_LOCALE`, `API_BASE_URL`

### 1.4 文件命名
- **Svelte 组件**: `PascalCase.svelte`
  - 示例: `Picker.svelte`, `HeroBanner.svelte`
- **TypeScript 文件**: `camelCase.ts` 或 `kebab-case.ts`
  - 示例: `apiClient.ts`, `schema-validator.ts`
- **SCSS 文件**: `kebab-case.scss`
  - 示例: `variables.scss`, `rich-content.scss`
- **路由文件**: `lowercase-with-hyphens`
  - 示例: `practice-areas/`, `about-us/`

### 1.5 Schema 字段命名
- **多语言字段**: `{field}_zh` / `{field}_en`
  - 示例: `name_zh`, `name_en`, `description_zh`, `description_en`
- **富文本字段**: `richContent` (camelCase)
- **元数据字段**:
  - `id`: 唯一标识
  - `slug`: URL 友好标识
  - `createdAt`: 创建时间（ISO 8601）
  - `updatedAt`: 更新时间（ISO 8601）

---

## 2. 目录结构

### 2.1 项目根目录
```
huacheng-law/
├── .ai/                    # PM Agent 内部文档
├── docs/                   # 对外文档
├── src/                    # 前端源码
├── ui-kit/                 # UI 组件库
├── adapter/                # 后台适配层
├── locales/                # 多语言配置
├── qa/                     # 质量保障
└── static/                 # 静态资源
```

### 2.2 `.ai/` 目录（PM Agent 专属）
```
.ai/
├── README.md                  # 索引文件
├── prd.md                     # 产品需求文档
├── flows.md                   # 页面/交互/数据流
├── acceptance.md              # 验收标准
├── dictionary.md              # 字段字典
├── kpi.md                     # 指标与口径
├── convention.md              # 约定（本文件）
├── progress.md                # 跨 Agent 交接记录
└── changelog/                 # 变更记录
    └── CHANGELOG-YYYYMMDD.md
```

### 2.3 `adapter/` 目录
```
adapter/
├── schema-map.json            # 后台字段映射表
├── api-client.ts              # API 客户端封装
├── types.ts                   # 后台数据类型
├── schema/                    # Schema 定义
│   ├── practice.ts
│   ├── lawyer.ts
│   ├── news.ts
│   └── event.ts
└── mock-data/                 # 模拟数据
    ├── practices.json
    ├── lawyers.json
    └── news.json
```

### 2.4 `ui-kit/` 目录
```
ui-kit/
├── components/
│   ├── base/                  # 基础组件（Button, Input, Card）
│   ├── layout/                # 布局组件（Hero, Footer, Navigation）
│   └── domain/                # 业务组件（LawyerCard, NewsCard）
└── styles/
    ├── variables.scss         # SCSS 变量
    ├── mixins.scss            # SCSS 混入
    └── global.scss            # 全局样式
```

---

## 3. 文档格式规范

### 3.1 Markdown 标题体系
- **H1 (`#`)**: 文档标题（每个文件只有一个）
- **H2 (`##`)**: 主要章节
- **H3 (`###`)**: 子章节
- **H4 (`####`)**: 详细说明

示例:
```markdown
# 产品需求文档

## 1. 概述

### 1.1 产品定位

#### 背景
```

### 3.2 表格规范
- 必须包含表头
- 使用管道符 `|` 分隔列
- 对齐方式: 左对齐（默认）

示例:
```markdown
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | ✅ | 唯一标识 |
| name_zh | string | ✅ | 中文名称 |
```

### 3.3 代码块规范
- 必须指定语言
- 使用三个反引号包裹

示例:
````markdown
```typescript
interface PracticeSchema {
  id: string;
  name_zh: string;
}
```
````

### 3.4 变更记录格式
使用日期前缀，按时间倒序排列：

```markdown
## 变更记录

| 日期 | 版本 | 变更内容 | 影响范围 |
|------|------|----------|----------|
| 2025-11-11 | v2.0 | 引入 Schema-Driven Architecture | 整体架构 |
| 2025-11-03 | v1.0 | 初始版本 | 全部 |
```

---

## 4. Schema 设计约定

### 4.1 Schema 文件位置
- 所有 Schema 定义在 `adapter/schema/` 目录
- 每个资源类型一个文件
- 使用 TypeScript 定义接口

### 4.2 Schema 必备字段
所有 Schema 必须包含：
```typescript
interface BaseSchema {
  id: string;           // 唯一标识
  slug: string;         // URL 友好标识
  createdAt: string;    // 创建时间（ISO 8601）
  updatedAt: string;    // 更新时间（ISO 8601）
}
```

### 4.3 多语言字段规范
- 中文字段: `{field}_zh`
- 英文字段: `{field}_en`
- 不使用嵌套对象（如 `name: { zh: '', en: '' }`）

示例:
```typescript
interface PracticeSchema extends BaseSchema {
  name_zh: string;
  name_en: string;
  description_zh: string;
  description_en: string;
}
```

### 4.4 富文本字段规范
- 字段名: `richContent` (camelCase)
- 类型: `string`（HTML 字符串）
- 可选: 使用 `?` 标记

示例:
```typescript
interface PracticeSchema {
  richContent?: string;  // 后台编辑器输出的 HTML
}
```

### 4.5 枚举字段规范
使用 TypeScript 枚举或字面量类型：

```typescript
type PracticeCategory = '核心业务' | '行业专长' | '专业服务';

interface PracticeSchema {
  category: PracticeCategory;
}
```

---

## 5. 富文本渲染约定

### 5.1 渲染方式
使用 Svelte 的 `{@html}` 指令：

```svelte
<div class="rich-content">
  {@html schema.richContent}
</div>
```

### 5.2 样式类名
- 容器类名: `.rich-content`
- 所有富文本内容必须包裹在此类名下
- 统一样式定义在 `ui-kit/styles/rich-content.scss`

### 5.3 支持的 HTML 元素
- 标题: `<h3>`, `<h4>`, `<h5>`
- 段落: `<p>`
- 列表: `<ul>`, `<ol>`, `<li>`
- 强调: `<strong>`, `<em>`
- 链接: `<a>`
- 图片: `<img>` (支持 `.align-left`, `.align-right`, `.align-center` 类)
- 表格: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- 引用: `<blockquote>`
- 代码: `<code>`, `<pre>`

### 5.4 XSS 防护
- 生产环境必须使用 DOMPurify 净化 HTML
- 允许白名单标签和属性
- 移除 `<script>`, `<iframe>`, `<object>` 等危险标签

---

## 6. 提交与发布规范

### 6.1 Conventional Commits
所有 Git 提交必须遵循约定式提交规范：

格式:
```
<type>(<scope>): <subject>

<body>

<footer>
```

类型（type）:
- `feat`: 新功能
- `fix`: 修复 Bug
- `chore`: 构建/工具链变更
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `perf`: 性能优化

示例:
```
feat(practices): add schema-driven architecture

- Define PracticeSchema interface
- Implement Picker component as schema container
- Add rich-content rendering styles

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### 6.2 发布前检查清单
- [ ] `npm run lint` 通过
- [ ] `npm run check` 类型检查通过
- [ ] `npm run test:all` 所有测试通过
- [ ] OpenAPI 契约已同步（如有 API 变更）
- [ ] Changelog 已更新
- [ ] Schema 文档已更新

### 6.3 版本号规范
使用语义化版本（Semantic Versioning）:
- `MAJOR.MINOR.PATCH`
- `MAJOR`: 破坏性变更
- `MINOR`: 新增功能（向后兼容）
- `PATCH`: 修复 Bug

示例:
- `1.0.0` → `1.1.0` (新增 Schema-Driven Architecture)
- `1.1.0` → `1.1.1` (修复富文本渲染 Bug)
- `1.1.1` → `2.0.0` (重大架构变更)

---

## 7. Adapter 层约定

### 7.1 `schema-map.json` 格式
定义后台字段到前端字段的映射：

```json
{
  "practice": {
    "id": "id",
    "slug": "slug",
    "name.zh": "name_zh",
    "name.en": "name_en",
    "description.zh": "description_zh",
    "description.en": "description_en",
    "rich_content": "richContent"
  }
}
```

规则:
- 左侧: 后台字段路径（支持点分嵌套）
- 右侧: 前端 Schema 字段名

### 7.2 API Client 规范
- 所有 API 调用封装在 `adapter/api-client.ts`
- 函数命名: `fetch{Resource}` / `create{Resource}` / `update{Resource}` / `delete{Resource}`
- 返回类型: 前端 Schema 类型

示例:
```typescript
export async function fetchPractices(): Promise<PracticeSchema[]> {
  const rawData = await fetch('/api/v1/practices').then(r => r.json());
  return rawData.map(item => transformFields(item, schemaMap.practice));
}
```

### 7.3 错误处理
- 网络错误: 返回空数组 `[]` 或 `null`
- 字段缺失: 使用默认值
- 类型错误: 记录日志并跳过该条数据

示例:
```typescript
export async function fetchPractices(): Promise<PracticeSchema[]> {
  try {
    const rawData = await fetch('/api/v1/practices').then(r => r.json());
    return rawData.map(item => transformFields(item, schemaMap.practice));
  } catch (error) {
    console.error('Failed to fetch practices:', error);
    return [];  // 返回空数组，不中断页面渲染
  }
}
```

---

## 8. 多语言约定

### 8.1 语言代码
- 中文: `zh-CN` (ISO 639-1 + ISO 3166-1)
- 英文: `en-US`

### 8.2 URL 结构
- 中文路径: `/zh/{page}`
- 英文路径: `/en/{page}`

示例:
- `/zh/practices` - 中文业务领域页
- `/en/practices` - 英文业务领域页

### 8.3 语言切换逻辑
- 从 URL 读取当前语言
- 切换时替换 URL 路径中的语言代码
- 保留页面状态（如当前 Tab 索引）

示例:
```typescript
function switchLanguage(currentPath: string, targetLang: string): string {
  return currentPath.replace(/^\/(zh|en)\//, `/${targetLang}/`);
}

switchLanguage('/zh/practices', 'en');  // => '/en/practices'
```

### 8.4 SEO 多语言标签
每个页面必须包含 `hreflang` 标签：

```html
<link rel="alternate" hreflang="zh-CN" href="https://example.com/zh/practices" />
<link rel="alternate" hreflang="en-US" href="https://example.com/en/practices" />
<link rel="alternate" hreflang="x-default" href="https://example.com/zh/practices" />
```

---

## 9. 测试约定

### 9.1 测试文件命名
- 单元测试: `{file}.test.ts`
- 集成测试: `{file}.spec.ts`
- E2E 测试: `{file}.e2e.ts`

### 9.2 测试覆盖率要求
- Schema 验证: 100%
- API Client: ≥80%
- 组件: ≥70%

### 9.3 测试用例结构
使用 BDD 风格（Given-When-Then）:

```typescript
describe('PracticeSchema', () => {
  it('should validate required fields', () => {
    // Given
    const invalidData = { id: '1' };  // 缺少必填字段

    // When
    const result = validateSchema(invalidData, PracticeSchema);

    // Then
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('name_zh is required');
  });
});
```

---

## 10. 性能优化约定

### 10.1 图片优化
- 使用 WebP 格式（降级 JPG/PNG）
- 懒加载: Intersection Observer
- 响应式图片: `<img srcset="..." sizes="...">`

### 10.2 代码分割
- 按路由自动分割（SvelteKit 默认）
- 大型组件动态导入:
  ```typescript
  const LazyComponent = await import('./LazyComponent.svelte');
  ```

### 10.3 缓存策略
- 静态资源: 强缓存（`Cache-Control: max-age=31536000`）
- API 响应: 协商缓存（`ETag`）
- ISR 重新验证: 10 分钟

---

## 11. 安全约定

### 11.1 XSS 防护
- 富文本 HTML 必须净化（DOMPurify）
- 用户输入必须转义
- CSP 策略启用

### 11.2 CSRF 防护
- SvelteKit 内置 CSRF Token
- 所有 POST/PUT/DELETE 请求必须包含 Token

### 11.3 内容安全
- 后台编辑器有审核流程
- 敏感内容标记和过滤
- 定期安全扫描

---

## 12. 文档更新流程

### 12.1 更新触发条件
- 新增功能或模块
- 架构变更
- 字段或 API 变更
- 流程或规范调整

### 12.2 更新责任人
- **PM Agent**: `.ai/` 目录下所有文档
- **Frontend Agent**: `adapter/` 和 `src/` 技术文档
- **Design Agent**: `ui-kit/` 设计规范
- **QA Agent**: `qa/` 测试文档

### 12.3 审查周期
- 常规文档: 每月审查一次
- 核心文档（PRD/Convention）: 每季度审查一次
- Changelog: 每次发布后更新

---

## 13. 工具链约定

### 13.1 必备工具
- **Node.js**: ≥18.0.0
- **npm**: ≥9.0.0
- **Git**: ≥2.30.0
- **编辑器**: VS Code（推荐）

### 13.2 VS Code 扩展（推荐）
- Svelte for VS Code
- ESLint
- Prettier
- TypeScript Vue Plugin

### 13.3 代码格式化
- 使用 Prettier 自动格式化
- 配置文件: `.prettierrc`
- 保存时自动格式化

---

## 附录: 快速参考

### 常用命名示例

| 类型 | 示例 |
|------|------|
| 组件 | `Picker.svelte`, `LawyerCard.svelte` |
| 函数 | `fetchPractices`, `transformFields` |
| 变量 | `currentIndex`, `activeTabIndex` |
| 常量 | `MAX_ITEMS`, `API_BASE_URL` |
| Schema 字段 | `name_zh`, `description_en`, `richContent` |
| API 路径 | `/api/v1/practices`, `/api/v1/lawyers` |
| 文件 | `api-client.ts`, `variables.scss` |

### 常用命令

```bash
# 开发
npm run dev

# 类型检查
npm run check

# 代码检查
npm run lint

# 格式化
npm run format

# 测试
npm run test:all

# 构建
npm run build
```

---

**最后更新**: 2025-11-11
**维护者**: Product Manager Agent
**下次审查**: 2025-12-11
