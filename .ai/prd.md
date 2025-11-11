# 产品需求文档 (PRD)

**项目**: Watson & Band Law Firm Portal - Schema-Driven Architecture
**版本**: v2.0
**负责人**: Product Manager Agent
**创建时间**: 2025-11-11
**更新时间**: 2025-11-11

---

## 1. 概述

### 1.1 产品定位
华诚律师事务所门户网站采用 **Schema-Driven Architecture（模式驱动架构）**，是一个内容管理型门户系统，所有动态内容通过 JSON Schema 定义，支持后台富文本编辑器管理、多语言展示和模块化 CRUD 操作。

### 1.2 核心理念
- **Schema First**: 数据结构即文档，所有动态内容由 JSON Schema 定义
- **Backend CMS Driven**: 后台富文本编辑器是内容来源，前端负责渲染
- **Locale-Native**: 多语言字段原生支持（`_zh`, `_en` 后缀）
- **CRUD-Friendly**: 增删改查操作直接作用于 Schema 对象数组

### 1.3 技术定位
- 前端渲染层：SvelteKit (SSG + SSR)
- 数据定义层：JSON Schema
- 内容管理层：后台富文本编辑器（HTML 输出）
- 适配转换层：Adapter Layer

---

## 2. 背景与目标

### 2.1 问题陈述
传统前端开发中，内容结构和展示逻辑耦合在组件代码中，导致：
- 内容更新需要修改代码和重新部署
- 多语言支持需要复杂的 i18n 逻辑
- 富文本内容难以标准化管理
- CRUD 操作需要前后端协同开发

### 2.2 目标
通过 Schema-Driven Architecture 实现：
- ✅ **零代码内容更新**：后台编辑器修改内容，前端自动渲染
- ✅ **原生多语言支持**：Schema 字段天然包含 `_zh`/`_en`
- ✅ **富文本标准化**：统一的 HTML 渲染样式系统
- ✅ **模块化 CRUD**：增删改查直接操作 Schema 数组

### 2.3 非目标
- ❌ 不构建全功能 CMS 系统（依赖现有后台）
- ❌ 不支持实时协作编辑（使用传统发布流程）
- ❌ 不替代现有后台 API（保持向后兼容）

### 2.4 成功度量
- **开发效率**: 新增内容页面时间 < 2小时
- **内容更新**: 无需代码修改，后台编辑即可
- **多语言一致性**: 字段命名统一，切换无缝
- **SEO 性能**: Lighthouse SEO ≥95

---

## 3. 角色与场景

### 3.1 用户角色

#### 3.1.1 内容管理员（Content Admin）
- **职责**: 通过后台富文本编辑器管理页面内容
- **权限**: 编辑所有动态内容（业务领域、新闻、律师信息等）
- **使用场景**:
  - 新增/编辑业务领域描述
  - 发布律师简介和专业领域
  - 管理新闻动态和活动信息

#### 3.1.2 网站访客（Visitor）
- **职责**: 浏览律所信息、查询业务领域、联系咨询
- **权限**: 只读访问所有公开内容
- **使用场景**:
  - 了解律所业务领域
  - 查看律师团队信息
  - 提交咨询表单

#### 3.1.3 前端开发者（Frontend Developer）
- **职责**: 基于 Schema 开发渲染组件
- **权限**: 修改前端代码、Schema 定义
- **使用场景**:
  - 新增内容类型的 Schema 定义
  - 开发富文本渲染样式
  - 实现 Picker 等交互组件

### 3.2 典型场景

#### 场景1: 新增业务领域
**角色**: 内容管理员

**流程**:
1. 登录后台 CMS
2. 创建新的业务领域对象
3. 填写中英文名称、描述、核心服务
4. 使用富文本编辑器编写详细介绍（插入图片、列表等）
5. 保存并发布

**前端行为**:
- Adapter 层读取新增的 Schema 对象
- Picker 组件自动添加新 Tab
- 页面内容动态渲染富文本 HTML

#### 场景2: 多语言切换
**角色**: 网站访客

**流程**:
1. 访问业务领域页面（默认中文）
2. 点击语言切换按钮切换到英文
3. 所有文本内容切换为英文版本

**前端行为**:
- 检测语言切换事件
- 从 `name_zh` 切换到 `name_en`
- 从 `description_zh` 切换到 `description_en`
- URL 从 `/zh/practices` 切换到 `/en/practices`

#### 场景3: 富文本内容展示
**角色**: 网站访客

**流程**:
1. 访问某个业务领域详情页
2. 查看包含图片、列表、表格的富文本内容
3. 内容以统一的样式渲染

**前端行为**:
- 从 Schema 读取 `richContent` 字段（HTML 字符串）
- 通过 `{@html richContent}` 渲染
- 应用 `.rich-content` 样式类统一样式

---

## 4. 核心功能

### P0 - 核心功能（必须实现）

#### 4.1 Schema 定义与管理

**功能描述**:
定义标准化的 JSON Schema 结构，支持多语言字段和富文本内容。

**Schema 规范**:
```typescript
interface PracticeSchema {
  // 基础字段
  id: string;                  // 唯一标识
  slug: string;                // URL 友好标识
  category: string;            // 分类（核心业务/行业专长/专业服务）

  // 多语言字段
  name_zh: string;             // 中文名称
  name_en: string;             // 英文名称
  description_zh: string;      // 中文简介
  description_en: string;      // 英文简介

  // 结构化数据
  services: string[];          // 核心服务列表
  cases: string;               // 案例成果

  // 富文本内容（后台编辑器输出）
  richContent?: string;        // HTML 富文本（可选）
}
```

**字段说明**:
- 所有多语言文本使用 `_zh`/`_en` 后缀
- `richContent` 字段存储后台编辑器的完整 HTML 输出
- `slug` 用于 SEO 友好 URL
- `category` 用于分组和筛选

**验收标准**:
- [x] Schema 定义文件已创建（`adapter/schema/practice.ts`）
- [x] 所有必填字段有类型约束
- [x] 多语言字段命名统一

---

#### 4.2 Picker 组件驱动页面导航

**功能描述**:
Picker 组件作为 Schema 容器，每个 Tab 对应一个 Schema 对象，支持水平/垂直滚动选择。

**实现要点**:
- Tabs 数组从 Schema 数组动态生成
- 支持添加"简介"等固定 Tab（`type: 'intro'`）
- 支持业务领域 Tab（`type: 'practice'`）
- 点击切换 Tab 时更新 `activeIndex`

**代码示例**:
```typescript
const tabs = [
  { id: 'intro', label: '简介', type: 'intro' },
  ...practices.map(p => ({
    id: p.id,
    label: p.name_zh,  // 多语言切换时改为 p.name_en
    type: 'practice',
    data: p
  }))
];
```

**验收标准**:
- [x] 新增 Schema 对象自动生成 Tab
- [x] Tab 标签支持多语言切换
- [x] 删除 Schema 对象自动移除 Tab
- [ ] Tab 排序可通过 Schema 数组顺序控制

---

#### 4.3 富文本内容渲染

**功能描述**:
将后台编辑器输出的 HTML 内容渲染为统一样式的网页内容。

**渲染方式**:
```svelte
<div class="rich-content">
  {@html practice.richContent}
</div>
```

**样式规范**:
`.rich-content` 样式类提供统一的富文本样式：
- 标题层级: `h3`/`h4`/`h5`
- 段落间距: `1.5rem`
- 列表样式: 自定义圆点/编号
- 图片处理:
  - 默认居中对齐
  - 支持 `.align-left`/`.align-right`/`.align-center` 类
  - 最大宽度 100%，响应式
- 代码块: 语法高亮
- 表格: 斑马纹样式
- 引用块: 左侧金色边框

**验收标准**:
- [x] 富文本 HTML 正确渲染
- [x] 样式统一、美观
- [x] 图片自适应、懒加载
- [x] 链接正常跳转
- [ ] XSS 防护（HTML 净化）

---

#### 4.4 Adapter 层转换

**功能描述**:
Adapter 层负责将后台 API 数据转换为前端 Schema 对象。

**职责**:
1. **字段映射**: 使用 `schema-map.json` 映射后台字段到前端字段
2. **富文本处理**: 提取后台编辑器输出的 HTML
3. **多语言处理**: 分离中英文字段
4. **数据校验**: 确保必填字段存在

**示例**:
```typescript
// adapter/api-client.ts
export async function fetchPractices(): Promise<PracticeSchema[]> {
  const rawData = await fetch('/api/practices').then(r => r.json());

  return rawData.map(item => ({
    id: item.id,
    slug: item.slug,
    category: item.category,
    name_zh: item.name?.zh || item.name_zh,
    name_en: item.name?.en || item.name_en,
    description_zh: item.description?.zh || item.description_zh,
    description_en: item.description?.en || item.description_en,
    services: item.services || [],
    cases: item.cases || '',
    richContent: item.rich_content || item.richContent
  }));
}
```

**验收标准**:
- [ ] `schema-map.json` 定义完整
- [ ] Adapter 函数有类型安全保证
- [ ] 错误处理（后台数据缺失时的降级）
- [ ] Mock 数据与生产数据结构一致

---

### P1 - 重要功能（应该实现）

#### 4.5 多语言路由

**功能描述**:
URL 结构支持语言前缀，如 `/zh/practices` 和 `/en/practices`。

**实现方式**:
- 使用 SvelteKit 布局分组: `(app)/practices/+page.svelte`
- 语言检测: 从 URL 或 Cookie 读取
- 切换逻辑:
  - `/zh/practices` → `/en/practices`
  - 保留页面状态（当前 Tab 索引）

**验收标准**:
- [ ] URL 包含语言前缀
- [ ] 语言切换时 URL 同步更新
- [ ] SEO: 每个页面有 `hreflang` 标签

---

#### 4.6 Schema 版本管理

**功能描述**:
记录 Schema 变更历史，支持回滚和审计。

**实现方式**:
- 在 `changelog/CHANGELOG-YYYYMMDD.md` 记录 Schema 变更
- 使用 Git 追踪 Schema 文件变更
- 提供 Schema 校验脚本（检查必填字段）

**验收标准**:
- [ ] Changelog 记录所有 Schema 变更
- [ ] Schema 校验脚本可运行
- [ ] 变更通知机制（Slack/Email）

---

### P2 - 优化功能（可选实现）

#### 4.7 Schema 可视化编辑器

**功能描述**:
提供可视化界面编辑 Schema 对象，无需直接修改 JSON。

**功能点**:
- 表单化编辑 Schema 字段
- 实时预览富文本渲染效果
- 拖拽排序 Schema 数组
- 导入/导出 JSON

**验收标准**:
- [ ] 可视化编辑器原型完成
- [ ] 支持基本 CRUD 操作
- [ ] 数据同步到后台 API

---

## 5. 数据与口径

### 5.1 数据来源
- **业务领域数据**: 后台 CMS `/api/practices`
- **律师信息**: 后台 CMS `/api/lawyers`
- **新闻动态**: 后台 CMS `/api/news`
- **活动信息**: 后台 CMS `/api/events`

### 5.2 刷新频率
- **静态页面**: Build 时刷新（SSG）
- **动态页面**: 请求时刷新（SSR）
- **缓存策略**: CDN 缓存 1 小时，ISR 重新验证 10 分钟

### 5.3 字段口径

#### 业务领域（Practice）
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | ✅ | UUID 或自增 ID |
| slug | string | ✅ | URL 标识，唯一 |
| category | string | ✅ | 枚举: "核心业务" \| "行业专长" \| "专业服务" |
| name_zh | string | ✅ | 中文名称 |
| name_en | string | ✅ | 英文名称 |
| description_zh | string | ✅ | 中文简介（≤200字） |
| description_en | string | ✅ | 英文简介（≤200字） |
| services | string[] | ✅ | 核心服务列表 |
| cases | string | ❌ | 案例成果（可选） |
| richContent | string | ❌ | 富文本 HTML（可选） |

---

## 6. 非功能需求

### 6.1 性能
- **首屏加载**: FCP < 1.8s
- **交互响应**: TTI < 3.8s
- **Picker 切换**: 动画流畅 ≥60fps
- **图片懒加载**: Intersection Observer

### 6.2 安全
- **XSS 防护**: 富文本 HTML 需净化（DOMPurify）
- **CSRF 防护**: SvelteKit 内置 Token
- **内容审核**: 后台编辑器有审核流程

### 6.3 可用性
- **响应式**: 支持 320px - 1920px
- **打印友好**: 富文本内容可打印
- **键盘导航**: Picker 支持方向键

### 6.4 合规
- **GDPR**: Cookie 同意机制
- **无障碍**: WCAG 2.1 AA 级别
- **SEO**:
  - 每页唯一 `<title>` 和 `<meta description>`
  - Open Graph 标签
  - Sitemap 包含所有动态页面

---

## 7. 里程碑

### M1: 架构设计与文档（已完成）
- [x] 确定 Schema-Driven Architecture 理念
- [x] 编写 PRD、架构文档
- [x] 定义 Schema 规范

### M2: 核心功能实现（进行中）
- [x] Picker 组件开发
- [x] 富文本渲染样式
- [x] Practices 页面集成
- [ ] Adapter 层完善
- [ ] Mock 数据准备

### M3: 多语言与路由（计划中）
- [ ] 多语言路由实现
- [ ] 语言切换逻辑
- [ ] SEO 优化（hreflang）

### M4: 后台集成与测试（计划中）
- [ ] 对接后台 CMS API
- [ ] 字段映射测试
- [ ] 内容管理员培训

---

## 8. 变更记录

| 日期 | 版本 | 变更内容 | 影响范围 |
|------|------|----------|----------|
| 2025-11-11 | v2.0 | 引入 Schema-Driven Architecture 理念 | 整体架构 |
| 2025-11-11 | v2.0 | 定义 PracticeSchema 规范 | 业务领域页面 |
| 2025-11-11 | v2.0 | 明确 Picker 组件作为 Schema 容器 | 导航交互 |
| 2025-11-11 | v2.0 | 规范富文本内容渲染方式 | 内容展示 |

---

**最后审查**: 2025-11-11
**下次审查**: 2025-11-18
