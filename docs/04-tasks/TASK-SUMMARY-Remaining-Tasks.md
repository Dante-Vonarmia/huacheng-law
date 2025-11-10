# 剩余任务汇总文档

本文档汇总了尚未详细编写的 9 个任务的核心要点。这些任务都标记为"待设计确认"，需要在设计稿和内容确认后再开始开发。

---

## TASK-302: 业务领域-分类导航Tabs

**优先级**: P0 | **工时**: 4小时

### 核心功能
- 在业务领域页面顶部显示分类 Tabs（全部/知识产权/公司法务/跨境并购等）
- 点击 Tab 切换显示对应领域的服务列表
- 使用已完成的 Tabs 组件（TASK-xxx）

### 待确认事项
- [ ] 业务领域分类列表（6-8 个分类）
- [ ] Tab 样式：下划线/填充背景/边框
- [ ] 移动端：横向滚动 / 下拉菜单
- [ ] 筛选方式：前端筛选 / 路由切换

### 技术要点
```svelte
<Tabs
  items={practiceAreaCategories}
  on:change={handleCategoryChange}
/>

<div class=\"services-grid\">
  {#each filteredServices as service}
    <ServiceCard {service} />
  {/each}
</div>
```

### 依赖
- 前置：Tabs 组件
- 数据：业务领域分类和服务列表数据

---

## TASK-304~311: 业务领域详情页（8个）

**优先级**: P1 | **工时**: 每个 4小时，共 32小时

### 覆盖领域
1. TASK-304: 知识产权详情页
2. TASK-305: 公司法务详情页
3. TASK-306: 跨境并购详情页
4. TASK-307: 金融资产详情页
5. TASK-308: 劳动法务详情页
6. TASK-309: 房地产详情页
7. TASK-310: 争议解决详情页
8. TASK-311: 国际贸易详情页

### 统一页面结构
```
1. Hero 区域
   - 领域标题
   - 简短描述
   - 背景图

2. 服务概述
   - 服务介绍（300-500 字）
   - 核心优势（3-4 点）

3. 服务内容
   - 具体服务项目列表（6-8 项）
   - 每项包含：图标、标题、描述

4. 相关案例
   - 3-4 个精选案例
   - 复用 CaseCard 组件

5. 专业团队
   - 3-4 位该领域律师
   - 复用 LawyerCard 组件

6. CTA 区域
   - "立即咨询"按钮
   - 联系方式
```

### 待确认事项（每个领域）
- [ ] 领域名称（中英文）
- [ ] Hero 背景图（1920x400px）
- [ ] 服务介绍文案（300-500 字）
- [ ] 核心优势（3-4 点）
- [ ] 服务项目列表（6-8 项，每项 50-100 字）
- [ ] 相关案例（3-4 个）
- [ ] 专业团队律师（3-4 位）

### 技术要点
- 使用动态路由：`src/routes/practices/[slug]/+page.svelte`
- 服务端数据预加载：`+page.server.ts`
- SEO 优化：Meta 标签、结构化数据
- 响应式图片：WebP + srcset

---

## TASK-312: 业务领域-筛选与搜索

**优先级**: P1 | **工时**: 6小时

### 核心功能
- 在业务领域列表页添加筛选和搜索功能
- 筛选维度：业务分类、服务类型、关键词搜索
- 使用已完成的 FilterBar 组件（TASK-003）

### 待确认事项
- [ ] 筛选维度：
  - 业务分类（多选）
  - 服务类型（单选：诉讼/非诉讼/顾问）
  - 关键词搜索（服务名称/描述）
- [ ] 筛选位置：顶部 / 左侧边栏
- [ ] 搜索方式：实时搜索 / 提交搜索
- [ ] 结果排序：相关度 / 时间 / 字母顺序

### 技术要点
```svelte
<FilterBar
  filters={[
    { type: 'multiselect', key: 'categories', label: '业务分类', options: [...] },
    { type: 'radio', key: 'type', label: '服务类型', options: [...] },
    { type: 'search', key: 'keyword', placeholder: '搜索服务...' }
  ]}
  on:change={handleFilterChange}
/>

{#each filteredServices as service}
  <ServiceCard {service} />
{/each}

{#if filteredServices.length === 0}
  <EmptyState message=\"未找到匹配的服务\" />
{/if}
```

### 依赖
- 前置：FilterBar 组件（TASK-003）
- 数据：完整的业务领域数据

---

## TASK-402: 专业团队-筛选区

**优先级**: P1 | **工时**: 5小时

### 核心功能
- 在专业团队页面添加筛选功能
- 筛选维度：专业领域、职位、分所、关键词搜索
- 使用已完成的 FilterBar 组件（TASK-003）

### 待确认事项
- [ ] 筛选维度：
  - 专业领域（多选：知识产权/并购/劳动法等）
  - 职位（多选：合伙人/高级律师/律师）
  - 分所（多选：上海/北京/深圳等）
  - 关键词搜索（姓名/专业领域）
- [ ] 筛选位置：顶部 / 左侧边栏
- [ ] 结果排序：职位 / 姓名 / 加入时间

### 技术要点
```svelte
<FilterBar
  filters={[
    { type: 'multiselect', key: 'expertise', label: '专业领域', options: practiceAreas },
    { type: 'multiselect', key: 'position', label: '职位', options: positions },
    { type: 'multiselect', key: 'office', label: '分所', options: offices },
    { type: 'search', key: 'keyword', placeholder: '搜索律师...' }
  ]}
  on:change={handleFilterChange}
/>

<div class=\"lawyers-grid\">
  {#each filteredLawyers as lawyer}
    <LawyerCard {lawyer} />
  {/each}
</div>
```

### 依赖
- 前置：FilterBar 组件（TASK-003）
- 数据：律师列表数据（专业领域、职位、分所）

---

## TASK-404: 专业团队-分页与搜索

**优先级**: P1 | **工时**: 4小时

### 核心功能
- 在专业团队页面添加分页功能
- 每页显示 12/24/48 个律师
- 使用已完成的 Pagination 组件（TASK-004）

### 待确认事项
- [ ] 每页显示数量：12 / 24 / 48（默认值）
- [ ] 是否允许用户切换每页数量
- [ ] 分页样式：数字按钮 / 简单的上一页下一页
- [ ] 总数显示：是否显示"共 XX 位律师"

### 技术要点
```svelte
<script lang=\"ts\">
let currentPage = $state(1);
let pageSize = $state(24);
let totalCount = lawyers.length;

$: paginatedLawyers = lawyers.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
);

$: totalPages = Math.ceil(totalCount / pageSize);
</script>

<div class=\"lawyers-grid\">
  {#each paginatedLawyers as lawyer}
    <LawyerCard {lawyer} />
  {/each}
</div>

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  pageSize={pageSize}
  totalCount={totalCount}
  on:pageChange={(e) => currentPage = e.detail}
  on:pageSizeChange=(e) => { pageSize = e.detail; currentPage = 1; }}
/>
```

### 依赖
- 前置：Pagination 组件（TASK-004）
- 数据：律师列表数据

---

## TASK-505: 出版物详情页

**优先级**: P1 | **工时**: 6小时

### 核心功能
- 展示出版物（文章/报告）的完整内容
- 包含：标题、作者、日期、正文、相关推荐
- 支持 Markdown 渲染

### 页面结构
```
1. 文章头部
   - 分类标签
   - 标题
   - 作者信息（头像、姓名、职位）
   - 发布日期、阅读时长

2. 文章正文
   - Markdown 内容渲染
   - 代码高亮、表格、图片
   - 目录导航（TOC）

3. 文章底部
   - 标签列表
   - 分享按钮（微信/LinkedIn/Email）
   - 作者简介卡片

4. 相关推荐
   - 3-4 篇相关文章
   - 复用 PublicationCard
```

### 待确认事项
- [ ] 正文格式：Markdown / HTML / 富文本
- [ ] 代码高亮：highlight.js / Prism.js
- [ ] 目录导航（TOC）：是否显示、位置（右侧/顶部）
- [ ] 分享功能：哪些平台（微信/LinkedIn/Twitter等）
- [ ] 相关推荐：算法（相同分类 / 相同作者 / 手动推荐）
- [ ] 阅读统计：是否统计阅读量

### 技术要点
- 动态路由：`src/routes/publications/[id]/+page.svelte`
- Markdown 渲染：`marked` 或 `mdsvex`
- 语法高亮：`highlight.js`
- SEO：Meta 标签、og:image
- 目录生成：解析 Markdown 标题自动生成

---

## TASK-602: 活动详情页

**优先级**: P1 | **工时**: 6小时

### 核心功能
- 展示活动的完整信息
- 包含：活动介绍、时间地点、议程、讲师、报名功能

### 页面结构
```
1. Hero 区域
   - 活动标题
   - 活动时间、地点
   - 活动状态（即将开始/进行中/已结束）
   - 报名按钮

2. 活动介绍
   - 活动背景
   - 活动亮点
   - 适合人群

3. 活动议程
   - Timeline 时间轴
   - 每个议程：时间、主题、讲师

4. 讲师介绍
   - 讲师头像、姓名、职位
   - 讲师简介

5. 活动信息
   - 时间、地点、费用
   - 联系方式
   - 报名截止时间

6. 报名表单（可选）
   - 姓名、电话、邮箱、公司
   - 提交按钮
```

### 待确认事项
- [ ] 报名方式：站内表单 / 跳转第三方（活动行/Eventbrite）
- [ ] 议程展示：Timeline / 表格 / 列表
- [ ] 讲师信息：完整简介 / 简短介绍
- [ ] 地图展示：是否嵌入地图（Google Maps/高德地图）
- [ ] 分享功能：是否添加社交分享
- [ ] 已结束活动：是否显示活动回顾（照片/视频）

### 技术要点
- 动态路由：`src/routes/events/[id]/+page.svelte`
- 使用 Timeline 组件展示议程
- 表单验证：Zod / Valibot
- 地图嵌入：iframe / API
- SEO：结构化数据（Event schema）

---

## TASK-702: 招聘详情页

**优先级**: P2 | **工时**: 5小时

### 核心功能
- 展示职位的完整信息
- 包含：职位要求、工作职责、福利待遇、申请流程

### 页面结构
```
1. 职位头部
   - 职位名称
   - 工作地点、薪资范围
   - 发布日期、截止日期
   - 立即申请按钮

2. 职位详情
   - 工作职责
   - 任职要求
   - 优先条件

3. 福利待遇
   - 薪资福利列表
   - 图标 + 文字

4. 关于我们
   - 律所简介
   - 工作环境照片

5. 申请流程
   - 步骤说明（投递简历 → 初筛 → 面试 → Offer）
   - Timeline 展示

6. 申请方式
   - 邮箱投递
   - 在线申请表单（可选）
```

### 待确认事项
- [ ] 薪资显示：具体数字 / 范围 / 面议
- [ ] 申请方式：邮箱 / 站内表单 / 跳转第三方（智联/前程无忧）
- [ ] 工作环境：是否展示办公室照片
- [ ] 相关职位：是否推荐其他职位
- [ ] 简历要求：格式（PDF/Word）、大小限制

### 技术要点
- 动态路由：`src/routes/careers/[id]/+page.svelte`
- 使用 Timeline 组件展示申请流程
- 文件上传：简历上传功能（如采用站内表单）
- SEO：结构化数据（JobPosting schema）

---

## TASK-1001~1005: 全站功能（5个任务）

### TASK-1001: 全局Header和Footer
**优先级**: P0 | **工时**: 8小时

**核心功能**：
- Header：Logo、导航菜单、语言切换、搜索按钮
- Footer：快速链接、联系方式、社交媒体、版权信息
- 移动端：汉堡菜单、抽屉导航

**待确认事项**：
- [ ] Header 样式：透明/白色背景、滚动后变化
- [ ] 导航菜单：一级/二级菜单结构
- [ ] 语言切换：下拉菜单/切换按钮
- [ ] Footer 布局：3列/4列
- [ ] 社交媒体：哪些平台（微信/LinkedIn/微博等）

---

### TASK-1002: 多语言切换
**优先级**: P1 | **工时**: 6小时

**核心功能**：
- 支持中文、英文、日文三种语言
- 使用 svelte-i18n
- 语言切换按钮在 Header
- 持久化语言偏好（localStorage）

**技术要点**：
```typescript
// src/lib/i18n.ts
import { init, locale, t } from 'svelte-i18n';

init({
  fallbackLocale: 'zh',
  initialLocale: 'zh'
});

// 切换语言
locale.set('en');
```

---

### TASK-1003: 全站性能优化
**优先级**: P1 | **工时**: 8小时

**优化清单**：
- [ ] 图片优化：WebP、懒加载、响应式
- [ ] 代码分割：动态导入、路由级分割
- [ ] 字体优化：子集化、preload
- [ ] 缓存策略：Service Worker、静态资源缓存
- [ ] CDN 部署：静态资源 CDN 加速
- [ ] 性能监控：Web Vitals、错误上报

**目标**：
- Lighthouse 性能评分 > 90
- FCP < 1.5s, LCP < 2.5s
- CLS < 0.1

---

### TASK-1004: SEO优化
**优先级**: P1 | **工时**: 6小时

**优化清单**：
- [ ] Meta 标签：title、description、og:image
- [ ] 结构化数据：Organization、LegalService、BreadcrumbList
- [ ] Sitemap.xml：自动生成站点地图
- [ ] Robots.txt：配置爬虫规则
- [ ] 语义化 HTML：正确使用标签
- [ ] 内链优化：合理的链接结构
- [ ] 加载性能：影响 SEO 排名

---

### TASK-1005: 无障碍优化
**优先级**: P2 | **工时**: 6小时

**优化清单**：
- [ ] 键盘导航：所有交互可通过键盘操作
- [ ] ARIA 标签：正确使用 aria-label、aria-describedby
- [ ] 色彩对比度：符合 WCAG AA 标准（4.5:1）
- [ ] 屏幕阅读器：语义化 HTML、alt 文字
- [ ] 焦点管理：清晰的焦点指示
- [ ] 动画控制：支持 prefers-reduced-motion

**目标**：
- Lighthouse 可访问性评分 > 90
- WCAG 2.1 AA 标准

---

## 总结

以上 9 个任务（实际包含更多子任务）覆盖了：
- **业务领域页面**：分类导航、8 个详情页、筛选搜索
- **专业团队页面**：筛选、分页
- **内容详情页**：出版物、活动、招聘
- **全站功能**：Header/Footer、多语言、性能优化、SEO、无障碍

所有任务都标记为"待设计确认"，需要在设计稿和内容准备好之后再开始开发。建议优先完成 P0 任务，然后是 P1，最后是 P2。
