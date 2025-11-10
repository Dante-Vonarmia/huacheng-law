# 华诚律师事务所门户网站改版 - 完整项目规划

## 项目概述

**项目名称**: 华诚律师事务所门户网站前端重构
**项目周期**: 14 个工作日
**总预算**: ¥68,300（30人天）
**技术栈**: SvelteKit + SCSS + TypeScript
**交付形式**: Demo展示（模拟数据）

## 一、项目任务总览表

### 1.1 核心页面改版任务

| 任务编号 | 任务名称 | 所属页面 | 优先级 | 预估工时 | 依赖关系 | 状态 |
|---------|---------|---------|--------|---------|---------|------|
| T1.0 | 首页改版 | Home | P0 | 7.0人天 | UI Kit | 部分完成 |
| T1.1 | - 顶部导航区 | Home | P0 | 0.5人天 | Navigation组件 | 已完成 |
| T1.2 | - 主视觉Banner | Home | P0 | 1.0人天 | Hero组件 | 需优化 |
| T1.3 | - 新闻动态区 | Home | P0 | 0.8人天 | NewsCard组件 | 已完成 |
| T1.4 | - 精选视频区 | Home | P1 | 0.8人天 | 新建VideoCard | 待开始 |
| T1.5 | - 案例分析区 | Home | P1 | 0.8人天 | 新建CaseCard | 待开始 |
| T1.6 | - 出版物区 | Home | P1 | 0.6人天 | Card组件 | 待开始 |
| T1.7 | - 活动讲座区 | Home | P1 | 0.6人天 | Card组件 | 待开始 |
| T1.8 | - 页脚Footer | Home | P0 | 0.5人天 | Footer组件 | 已完成 |
| T1.9 | - 性能与动画优化 | Home | P2 | 1.5人天 | - | 待开始 |
| | | | | | | |
| T2.0 | 关于华诚页面改版 | About | P0 | 6.0人天 | UI Kit | 已完成 |
| T2.1 | - 左侧导航与锚点 | About | P0 | 0.5人天 | 新建SideNav | 待开始 |
| T2.2 | - 华诚简介 | About | P0 | 0.5人天 | Section组件 | 已完成 |
| T2.3 | - 华诚历程时间轴 | About | P0 | 1.5人天 | Timeline组件 | 已完成 |
| T2.4 | - 业务结构图 | About | P1 | 1.5人天 | 新建OrgChart | 待开始 |
| T2.5 | - 公益活动 | About | P1 | 1.0人天 | Card组件 | 已完成 |
| T2.6 | - 荣誉奖项 | About | P0 | 1.0人天 | LogoCloud组件 | 已完成 |
| | | | | | | |
| T3.0 | 业务领域页面改版 | Practices | P0 | 8.0人天 | UI Kit | 已完成 |
| T3.1 | - 顶部导航与Banner | Practices | P0 | 0.5人天 | Hero组件 | 已完成 |
| T3.2 | - 分类导航区（Tabs） | Practices | P0 | 0.5人天 | Tabs组件 | 待开始 |
| T3.3-3.12 | - 十个业务领域详情页 | Practices/[slug] | P0 | 6.0人天 | 详情模板 | 部分完成 |
| T3.13 | - 业务领域筛选与搜索 | Practices | P1 | 1.0人天 | - | 待开始 |
| | | | | | | |
| T4.0 | 律师团队页面改版 | Team | P0 | 5.0人天 | UI Kit | 已完成 |
| T4.1 | - 顶部导航与Banner | Team | P0 | 0.5人天 | Hero组件 | 已完成 |
| T4.2 | - 团队筛选区 | Team | P0 | 1.0人天 | 新建FilterBar | 待开始 |
| T4.3 | - 律师列表区 | Team | P0 | 1.0人天 | LawyerCard组件 | 已完成 |
| T4.4 | - 分页与搜索 | Team | P1 | 1.0人天 | 新建Pagination | 待开始 |
| T4.5 | - 律师详情页 | Team/[id] | P0 | 1.0人天 | 详情模板 | 已完成 |
| T4.6 | - 律师详情交互 | Team/[id] | P1 | 0.5人天 | - | 已完成 |
| | | | | | | |
| T5.0 | 新闻与出版物页面 | News/Publications | P0 | 4.0人天 | UI Kit | 已完成 |
| T5.1 | - 顶部导航与Banner | News | P0 | 0.3人天 | Hero组件 | 已完成 |
| T5.2 | - 新闻列表页 | News | P0 | 0.8人天 | NewsCard组件 | 已完成 |
| T5.3 | - 新闻详情页 | News/[id] | P0 | 1.0人天 | 富文本渲染 | 已完成 |
| T5.4 | - 出版物列表页 | Publications | P0 | 0.8人天 | Card组件 | 已完成 |
| T5.5 | - 出版物详情页 | Publications/[id] | P1 | 0.6人天 | - | 待开始 |
| T5.6 | - 搜索与分类筛选 | News/Publications | P1 | 0.5人天 | - | 部分完成 |
| | | | | | | |
| T6.0 | 活动与讲座页面 | Events | P0 | 2.5人天 | UI Kit | 已完成 |
| T6.1 | - 活动列表页 | Events | P0 | 1.0人天 | Card组件 | 已完成 |
| T6.2 | - 活动详情页 | Events/[id] | P1 | 0.8人天 | - | 待开始 |
| T6.3 | - 报名表单 | Events | P0 | 0.7人天 | Modal+Form | 已完成 |
| | | | | | | |
| T7.0 | 招聘与加入我们 | Careers | P0 | 2.5人天 | UI Kit | 已完成 |
| T7.1 | - 招聘列表页 | Careers | P0 | 1.0人天 | Card组件 | 已完成 |
| T7.2 | - 招聘详情页 | Careers/[id] | P1 | 0.8人天 | - | 待开始 |
| T7.3 | - 在线投递表单 | Careers | P0 | 0.7人天 | Modal+Form | 已完成 |
| | | | | | | |
| T8.0 | 联系我们页面 | Contact | P0 | 1.5人天 | UI Kit | 已完成 |
| T8.1 | - 联系信息区 | Contact | P0 | 0.7人天 | Card组件 | 已完成 |
| T8.2 | - 地图与表单 | Contact | P0 | 0.8人天 | ContactForm | 已完成 |
| | | | | | | |
| T9.0 | 搜索结果页 | Search | P1 | 0.5人天 | - | 已完成 |
| T9.1 | - 全局搜索结果页 | Search | P1 | 0.5人天 | - | 已完成 |
| | | | | | | |
| T10.0 | 全站功能 | Global | P0 | 8.0人天 | 所有页面 | 进行中 |
| T10.1 | - 接口适配层设计 | Adapter | P0 | 1.5人天 | - | 待开始 |
| T10.2 | - 动效与性能优化 | Global | P1 | 2.0人天 | - | 待开始 |
| T10.3 | - 多语言与SEO | Global | P0 | 2.0人天 | i18n | 部分完成 |
| T10.4 | - 无障碍与兼容测试 | Global | P1 | 1.5人天 | - | 待开始 |
| T10.5 | - 项目管理与验收 | Project | P0 | 1.0人天 | - | 进行中 |

### 1.2 任务统计

| 类别 | 任务数 | 已完成 | 进行中 | 待开始 | 完成率 |
|------|--------|--------|--------|--------|--------|
| P0核心任务 | 28 | 18 | 2 | 8 | 64% |
| P1重要任务 | 16 | 3 | 0 | 13 | 19% |
| P2优化任务 | 1 | 0 | 0 | 1 | 0% |
| **总计** | **45** | **21** | **2** | **22** | **47%** |

## 二、任务详细拆分

### 2.1 首页改版（T1.0）

#### 2.1.1 主视觉Banner优化（T1.2）

**当前状态**: 基础Hero区域已完成，需增强为轮播效果

**工作内容**:
1. 创建 Carousel/Slider 组件
2. 实现3-5张轮播图
3. 添加淡入淡出动画
4. 添加导航点和前后箭头
5. 自动播放与手动控制
6. 响应式图片加载

**需要创建的组件**:
```typescript
// ui-kit/components/Carousel.svelte
interface CarouselItem {
  id: string;
  image: string;
  title_zh: string;
  title_en: string;
  subtitle_zh?: string;
  subtitle_en?: string;
  cta?: {
    text: string;
    link: string;
  };
}
```

**Demo数据结构**:
```typescript
const bannerSlides: CarouselItem[] = [
  {
    id: '1',
    image: '/images/banner/slide-1.jpg',
    title_zh: '专业的法律服务团队',
    title_en: 'Professional Legal Services',
    subtitle_zh: '30年行业经验，值得信赖',
    cta: { text: '了解更多', link: '/about' }
  },
  {
    id: '2',
    image: '/images/banner/slide-2.jpg',
    title_zh: '知识产权保护专家',
    title_en: 'Intellectual Property Experts',
    subtitle_zh: '为您的创新保驾护航'
  },
  // 更多...
];
```

#### 2.1.2 精选视频区（T1.4）

**工作内容**:
1. 创建 VideoCard 组件
2. 视频封面展示（带播放按钮）
3. 点击打开视频播放模态框
4. 支持YouTube/本地视频
5. 2x2或3列网格布局

**需要创建的组件**:
```typescript
// ui-kit/domain/VideoCard.svelte
interface Video {
  id: string;
  title_zh: string;
  title_en: string;
  thumbnail: string;
  duration: string; // "5:32"
  video_url: string; // YouTube或本地路径
  description_zh?: string;
  views?: number;
  date?: string;
}
```

**Demo数据**:
```typescript
const featuredVideos: Video[] = [
  {
    id: '1',
    title_zh: '华诚律师事务所宣传片',
    title_en: 'Watson & Band Firm Introduction',
    thumbnail: '/images/videos/intro-thumb.jpg',
    duration: '3:45',
    video_url: 'https://www.youtube.com/embed/xxxxx',
    views: 1200
  },
  // 更多...
];
```

#### 2.1.3 案例分析区（T1.5）

**工作内容**:
1. 创建 CaseCard 组件
2. 展示3-4个成功案例
3. 卡片包含：案例标题、简介、领域标签、结果摘要
4. Hover显示更多信息
5. 点击跳转到案例详情或业务领域

**需要创建的组件**:
```typescript
// ui-kit/domain/CaseCard.svelte
interface Case {
  id: string;
  title_zh: string;
  title_en: string;
  summary_zh: string;
  practice_area: string;
  result_zh: string;
  amount?: string; // "涉案金额5000万"
  year: string;
  image?: string;
  featured?: boolean;
}
```

#### 2.1.4 出版物区（T1.6）

**工作内容**:
1. 展示最新3-4本出版物
2. 封面图+书名+作者+出版年份
3. 链接到出版物详情或列表页

**复用组件**: Card, Badge

#### 2.1.5 活动与讲座区（T1.7）

**工作内容**:
1. 展示即将举办的2-3个活动
2. 活动卡片：标题、时间、地点、状态（报名中/已满员）
3. CTA按钮链接到活动详情

**复用组件**: Card, Badge, Button

#### 2.1.6 首页性能优化（T1.9）

**工作内容**:
1. 图片懒加载（Intersection Observer）
2. 轮播图预加载优化
3. 滚动动画性能优化（transform代替position）
4. 减少首屏加载资源
5. 代码分割优化

### 2.2 关于华诚页面优化（T2.0）

#### 2.2.1 左侧导航菜单（T2.1）

**工作内容**:
1. 创建 SideNav 组件（Sticky定位）
2. 六项导航：简介、历程、业务结构、公益、荣誉、联系
3. 锚点跳转与自动高亮
4. 移动端收起/展开

**需要创建的组件**:
```typescript
// ui-kit/components/SideNav.svelte
interface NavItem {
  id: string;
  label_zh: string;
  label_en: string;
  anchor: string; // #intro
}
```

#### 2.2.2 业务结构组织图（T2.4）

**工作内容**:
1. 创建 OrgChart 组件
2. 树状结构展示：总所 → 分所 → 业务部门
3. 支持展开/收起
4. 响应式布局（移动端垂直，桌面端树状）

**需要创建的组件**:
```typescript
// ui-kit/components/OrgChart.svelte
interface OrgNode {
  id: string;
  name_zh: string;
  name_en: string;
  type: 'headquarters' | 'branch' | 'department';
  children?: OrgNode[];
  employees?: number;
}
```

**Demo数据**:
```typescript
const orgStructure: OrgNode = {
  id: 'root',
  name_zh: '华诚律师事务所',
  name_en: 'Watson & Band',
  type: 'headquarters',
  children: [
    {
      id: 'sh',
      name_zh: '上海总部',
      type: 'branch',
      employees: 120,
      children: [
        { id: 'sh-ip', name_zh: '知识产权部', type: 'department', employees: 25 },
        { id: 'sh-corp', name_zh: '公司业务部', type: 'department', employees: 30 },
        // 更多...
      ]
    },
    // 北京、深圳分所...
  ]
};
```

### 2.3 业务领域页面优化（T3.0）

#### 2.3.1 分类导航Tabs（T3.2）

**工作内容**:
1. 顶部业务分类Tabs（可滑动）
2. 六个分类：全部、知识产权、公司、诉讼、金融、房地产、劳动
3. 点击切换，平滑滚动到对应区域
4. 移动端横向滚动

**复用组件**: Tabs组件（可能需要增强）

#### 2.3.2 完善十个业务领域详情页（T3.3-3.12）

**当前状态**: 已完成3个（知识产权、公司法务、诉讼仲裁）

**待完成领域**:
1. 数据保护与知识产权
2. 资本市场
3. 金融资产管理
4. 破产与重组
5. 文化娱乐体育
6. 建设房地产及基础设施
7. 劳动人事
8. 家事和财富管理

**工作内容（每个领域）**:
- 业务概述（300字）
- 详细服务内容（3个子服务，每个6项细分）
- 专业团队展示（3-5位律师）
- 成功案例展示（2-3个）
- 相关新闻/出版物推荐

**详情页模板已完成**，主要是数据填充工作。

### 2.4 律师团队页面优化（T4.0）

#### 2.4.1 团队筛选区（T4.2）

**工作内容**:
1. 创建 FilterBar 组件
2. 三个筛选维度：
   - 业务领域（下拉多选）
   - 职称（合伙人/资深律师/律师/实习律师）
   - 办公室（上海/北京/深圳）
3. 关键词搜索框
4. 筛选结果实时更新

**需要创建的组件**:
```typescript
// ui-kit/components/FilterBar.svelte
interface FilterConfig {
  type: 'select' | 'multiselect' | 'search';
  label_zh: string;
  label_en: string;
  options?: FilterOption[];
}

interface FilterOption {
  value: string;
  label_zh: string;
  label_en: string;
  count?: number; // 结果数量
}
```

#### 2.4.2 分页组件（T4.4）

**工作内容**:
1. 创建 Pagination 组件
2. 支持：首页、上一页、页码、下一页、末页
3. 每页显示数量选择（12/24/48）
4. 总数和当前范围显示
5. 响应式布局

**需要创建的组件**:
```typescript
// ui-kit/components/Pagination.svelte
interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}
```

### 2.5 新闻与出版物（T5.0）

#### 2.5.1 出版物详情页（T5.5）

**工作内容**:
1. 创建出版物详情路由 `/publications/[id]/+page.svelte`
2. 展示内容：
   - 封面大图
   - 书名、作者、出版社、ISBN、年份
   - 详细介绍（富文本）
   - 目录章节
   - 在线购买链接（可选）
   - 相关出版物推荐

**Demo数据结构**:
```typescript
interface PublicationDetail {
  id: string;
  title_zh: string;
  cover: string;
  authors: string[];
  publisher: string;
  isbn: string;
  year: string;
  pages: number;
  description_zh: string; // HTML
  tableOfContents: string[]; // 章节列表
  purchaseLinks?: {
    platform: string;
    url: string;
  }[];
  relatedPublications: string[]; // IDs
}
```

### 2.6 活动与讲座（T6.0）

#### 2.6.1 活动详情页（T6.2）

**工作内容**:
1. 创建活动详情路由 `/events/[id]/+page.svelte`
2. 展示内容：
   - 活动横幅图
   - 活动标题、时间、地点
   - 主讲人信息（头像+简介）
   - 活动详细介绍（富文本）
   - 日程安排
   - 报名表单（嵌入或弹窗）
   - 相关活动推荐

**Demo数据结构**:
```typescript
interface EventDetail {
  id: string;
  title_zh: string;
  banner: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  speakers: {
    name: string;
    title: string;
    photo: string;
    bio: string;
  }[];
  description_zh: string; // HTML
  agenda: {
    time: string;
    title: string;
    speaker?: string;
  }[];
  status: 'upcoming' | 'ongoing' | 'past';
}
```

### 2.7 招聘页面（T7.0）

#### 2.7.1 招聘详情页（T7.2）

**工作内容**:
1. 创建招聘详情路由 `/careers/[id]/+page.svelte`
2. 展示内容：
   - 职位标题、部门、地点
   - 职位类型（全职/兼职/实习）
   - 薪资范围（可选）
   - 详细职责与要求
   - 公司福利
   - 申请流程
   - 在线申请表单

**Demo数据结构**:
```typescript
interface JobDetail {
  id: string;
  title_zh: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship';
  salary?: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  applicationProcess: string[];
  postedDate: string;
  expiryDate?: string;
}
```

### 2.8 全站功能（T10.0）

#### 2.8.1 接口适配层设计（T10.1）

**目的**: 为未来接入真实API预留接口，当前展示数据结构和映射逻辑

**工作内容**:
1. 创建适配器目录结构
2. 定义接口契约（TypeScript Interface）
3. 实现模拟数据适配器
4. 文档化API数据结构

**目录结构**:
```
src/lib/adapters/
├── api/
│   ├── types.ts              # API 接口类型定义
│   ├── lawyers.adapter.ts    # 律师数据适配器
│   ├── practices.adapter.ts  # 业务领域适配器
│   ├── news.adapter.ts       # 新闻适配器
│   ├── publications.adapter.ts
│   ├── events.adapter.ts
│   ├── careers.adapter.ts
│   └── index.ts
├── mock/
│   └── data/                 # 模拟数据JSON文件
└── README.md                 # 适配器使用文档
```

**接口示例**:
```typescript
// src/lib/adapters/api/types.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// 律师API接口
export interface LawyerApiData {
  id: number;
  name: string;
  name_en?: string;
  title: string;
  photo_url: string;
  office_id: number;
  practice_areas: number[]; // 关联ID
  languages: string[];
  email: string;
  phone: string;
  bio: string;
  education: string[];
  experience_years: number;
  created_at: string;
  updated_at: string;
}

// 前端展示数据结构
export interface Lawyer {
  id: string;
  name_zh: string;
  name_en: string;
  title_zh: string;
  title_en: string;
  photo: string;
  office: string;
  practice_areas: string[];
  languages: string[];
  email: string;
  phone: string;
  bio_zh: string;
  bio_en: string;
  education: string[];
  experience: string;
}

// 适配器函数
export function adaptLawyerData(apiData: LawyerApiData): Lawyer {
  return {
    id: String(apiData.id),
    name_zh: apiData.name,
    name_en: apiData.name_en || apiData.name,
    title_zh: apiData.title,
    title_en: apiData.title,
    photo: apiData.photo_url,
    office: getOfficeName(apiData.office_id),
    practice_areas: getPracticeAreaNames(apiData.practice_areas),
    languages: apiData.languages,
    email: apiData.email,
    phone: apiData.phone,
    bio_zh: apiData.bio,
    bio_en: apiData.bio,
    education: apiData.education,
    experience: `${apiData.experience_years}年`
  };
}
```

**文档化要求**:
- API端点列表
- 请求/响应数据结构
- 错误码定义
- 分页参数规范
- 筛选排序参数规范

#### 2.8.2 动效与性能优化（T10.2）

**工作内容**:
1. **滚动动画**:
   - 使用 Intersection Observer API
   - 元素进入视口时淡入/滑入
   - 避免过度动画（尊重 `prefers-reduced-motion`）

2. **页面过渡**:
   - SvelteKit 页面切换过渡
   - 加载状态指示器

3. **图片优化**:
   - 懒加载（原生 loading="lazy" 或自定义）
   - 响应式图片（srcset）
   - WebP格式支持

4. **代码优化**:
   - 组件懒加载（动态导入）
   - Tree-shaking检查
   - Bundle分析与优化

5. **性能监控**:
   - Lighthouse跑分（目标90+）
   - Core Web Vitals优化
   - 首屏加载时间<2s

#### 2.8.3 多语言与SEO（T10.3）

**当前状态**: 已有 svelte-i18n 基础配置

**工作内容**:
1. **完善语言包**:
   - 补全所有页面文案
   - 动态内容多语言支持
   - 日期/数字格式化

2. **SEO优化**:
   - 每个页面的 meta 标签（title, description）
   - Open Graph 标签（社交分享）
   - 结构化数据（JSON-LD）
   - Sitemap.xml 生成
   - robots.txt 配置

3. **语言切换**:
   - URL路径策略（/en/about 或 /?lang=en）
   - 浏览器语言检测
   - 记住用户选择（localStorage）

**SEO 数据结构**:
```typescript
// src/lib/seo/metadata.ts
interface PageMetadata {
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export const pageMetadata: Record<string, PageMetadata> = {
  home: {
    title_zh: '华诚律师事务所 - 专业法律服务',
    title_en: 'Watson & Band - Professional Legal Services',
    description_zh: '华诚律师事务所成立于1995年，拥有30年行业经验...',
    description_en: 'Watson & Band was established in 1995...',
    keywords: ['律师事务所', '法律服务', '知识产权', 'law firm'],
    ogImage: '/images/og/home.jpg'
  },
  // 更多页面...
};
```

#### 2.8.4 无障碍与兼容测试（T10.4）

**工作内容**:
1. **无障碍（A11y）**:
   - 语义化HTML标签
   - ARIA标签补充
   - 键盘导航支持
   - 屏幕阅读器测试
   - 颜色对比度检查（WCAG AA）
   - 焦点管理

2. **浏览器兼容**:
   - Chrome（最新2个版本）
   - Firefox（最新2个版本）
   - Safari（最新2个版本）
   - Edge（最新版本）
   - 移动浏览器（iOS Safari, Chrome Mobile）

3. **响应式测试**:
   - 320px（小屏手机）
   - 375px（iPhone）
   - 768px（iPad竖屏）
   - 1024px（iPad横屏）
   - 1440px（桌面）
   - 1920px（宽屏）

4. **测试工具**:
   - axe DevTools
   - WAVE
   - Lighthouse Accessibility
   - 手动键盘导航测试

## 三、开发路线图

### 第一阶段：基础组件补充（2人天）

**目标**: 完成缺失的UI组件

**任务列表**:
1. [x] UI Kit 22个组件（已完成）
2. [ ] Carousel 轮播组件（0.5人天）
3. [ ] VideoCard 视频卡片（0.3人天）
4. [ ] CaseCard 案例卡片（0.3人天）
5. [ ] SideNav 侧边导航（0.3人天）
6. [ ] OrgChart 组织图（0.5人天）
7. [ ] FilterBar 筛选栏（0.4人天）
8. [ ] Pagination 分页组件（0.3人天）

**交付物**:
- 8个新增组件
- 组件文档更新
- Showcase页面演示更新

### 第二阶段：页面框架搭建（3人天）

**目标**: 完成所有页面的基础框架和布局

**任务列表**:
1. [ ] 首页框架优化（1.0人天）
   - Banner轮播区
   - 视频/案例/出版物/活动区块布局
2. [ ] 关于页面左侧导航（0.5人天）
3. [ ] 业务领域Tabs导航（0.5人天）
4. [ ] 律师团队筛选区（0.5人天）
5. [ ] 出版物详情页框架（0.3人天）
6. [ ] 活动详情页框架（0.3人天）
7. [ ] 招聘详情页框架（0.3人天）

**交付物**:
- 所有页面路由可访问
- 基础布局完成
- 导航系统连通

### 第三阶段：模块功能实现（5人天）

**目标**: 填充数据，实现交互功能

**任务列表**:
1. [ ] 首页内容填充（1.5人天）
   - Banner轮播数据与动画
   - 视频区数据与播放
   - 案例区数据展示
   - 出版物/活动摘要
2. [ ] 完善7个业务领域详情页（2.0人天）
3. [ ] 出版物详情页内容（0.5人天）
4. [ ] 活动详情页内容（0.5人天）
5. [ ] 招聘详情页内容（0.5人天）

**交付物**:
- 所有页面完整数据
- 交互功能可用
- 表单验证完成

### 第四阶段：优化与测试（4人天）

**目标**: 性能优化、多语言、SEO、测试

**任务列表**:
1. [ ] 接口适配层（1.5人天）
   - 数据结构定义
   - 适配器函数
   - Mock数据完善
   - 文档编写
2. [ ] 性能优化（1.0人天）
   - 图片懒加载
   - 代码分割
   - 动画优化
   - Lighthouse优化
3. [ ] 多语言与SEO（1.0人天）
   - 语言包补全
   - Meta标签
   - 结构化数据
   - Sitemap
4. [ ] 无障碍与兼容测试（0.5人天）
   - A11y检查与修复
   - 浏览器测试
   - 响应式测试

**交付物**:
- 接口文档
- Lighthouse 90+分
- 多语言完整
- 无障碍合格
- 兼容性报告

### 第五阶段：项目管理与验收（1人天）

**目标**: 文档整理、演示准备、交付验收

**任务列表**:
1. [ ] 项目文档整理（0.3人天）
   - 更新README
   - 完善组件文档
   - 编写部署文档
2. [ ] Demo演示准备（0.3人天）
   - 演示脚本
   - 测试数据检查
   - 演示环境搭建
3. [ ] 验收材料准备（0.4人天）
   - 功能清单对照
   - 截图与录屏
   - 已知问题说明
   - 后续建议

**交付物**:
- 完整项目文档
- 演示Demo
- 验收报告

## 四、技术实现建议

### 4.1 可复用组件设计原则

1. **单一职责**: 每个组件只做一件事
2. **Props设计**: 灵活但有默认值
3. **插槽（Slots）**: 提供内容定制能力
4. **事件（Events）**: 父子组件通信
5. **样式隔离**: 使用scoped样式，避免全局污染
6. **TypeScript**: 强类型Props和Events

**组件模板**:
```svelte
<script lang="ts">
  // Props with defaults
  export let variant: 'primary' | 'secondary' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;

  // Events
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    click: { id: string };
    change: { value: string };
  }>();

  // Internal state
  let isActive = false;
</script>

<div class="component {variant} {size}" class:disabled>
  <slot name="icon" />
  <slot />
  <slot name="actions" />
</div>

<style lang="scss">
  @use '$ui/styles/variables' as *;

  .component {
    // Styles
  }
</style>
```

### 4.2 数据结构规范

**命名规范**:
- 字段名使用 snake_case（与API对接方便）
- 多语言字段添加 `_zh` / `_en` 后缀
- ID字段统一为字符串类型（方便扩展）
- 日期使用 ISO 8601 格式字符串

**通用字段**:
```typescript
interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

interface Translatable {
  name_zh: string;
  name_en: string;
  description_zh?: string;
  description_en?: string;
}
```

**关联数据**:
```typescript
// 方式1：嵌入完整对象（Demo阶段推荐）
interface Lawyer {
  id: string;
  name_zh: string;
  practice_areas: {
    id: string;
    name_zh: string;
  }[];
}

// 方式2：仅ID（真实API推荐）
interface Lawyer {
  id: string;
  name_zh: string;
  practice_area_ids: string[];
}
```

### 4.3 路由设计

**静态路由**:
```
/                     # 首页（重定向到/one-page或直接展示）
/about                # 关于我们
/practices            # 业务领域列表
/team                 # 律师团队列表
/news                 # 新闻列表
/publications         # 出版物列表
/events               # 活动列表
/careers              # 招聘列表
/contact              # 联系我们
/search               # 搜索结果
/awards               # 荣誉奖项
/showcase             # 组件展示（可选）
```

**动态路由**:
```
/practices/[slug]     # 业务领域详情（slug: intellectual-property）
/team/[id]            # 律师详情
/news/[id]            # 新闻详情
/publications/[id]    # 出版物详情
/events/[id]          # 活动详情
/careers/[id]         # 招聘详情
```

**路由参数处理**:
```typescript
// src/routes/practices/[slug]/+page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
  const { slug } = params;
  const practice = practicesData.find(p => p.slug === slug);

  if (!practice) {
    throw error(404, 'Practice area not found');
  }

  return { practice };
};
```

### 4.4 样式规范

**SCSS变量（已有）**:
```scss
// ui-kit/styles/variables.scss
$color-primary: #1a5f3f;
$color-secondary: #c9a858;
$color-accent: #2d8659;

$font-family-heading: 'Noto Serif SC', serif;
$font-family-body: 'Noto Sans SC', sans-serif;

$spacing-unit: 8px;
$border-radius: 4px;
$transition-duration: 300ms;
```

**响应式Mixins（已有）**:
```scss
// ui-kit/styles/mixins.scss
@mixin mobile {
  @media (max-width: 768px) { @content; }
}

@mixin tablet {
  @media (min-width: 769px) and (max-width: 1024px) { @content; }
}

@mixin desktop {
  @media (min-width: 1025px) { @content; }
}
```

**组件样式示例**:
```scss
<style lang="scss">
  @use '$ui/styles/variables' as *;
  @use '$ui/styles/mixins' as *;

  .lawyer-card {
    padding: $spacing-unit * 3;
    border-radius: $border-radius * 2;
    transition: transform $transition-duration;

    &:hover {
      transform: translateY(-4px);
    }

    @include mobile {
      padding: $spacing-unit * 2;
    }
  }
</style>
```

## 五、验收标准

### 5.1 页面完成度（DoD - Definition of Done）

每个页面必须满足：

- [ ] 页面可正常访问，无500/404错误
- [ ] 包含完整的Hero区域（如适用）
- [ ] 包含Navigation和Footer
- [ ] 使用UI Kit组件（不自造轮子）
- [ ] 响应式布局完整（移动/平板/桌面）
- [ ] 多语言切换正常
- [ ] 无控制台错误或警告
- [ ] 图片正常加载（占位图可接受）
- [ ] 链接可点击（即使跳转到占位页）
- [ ] 表单验证工作正常
- [ ] 代码格式化（Prettier）
- [ ] 类型检查通过（svelte-check）

### 5.2 组件完成度

每个新建组件必须：

- [ ] 定义清晰的Props接口（TypeScript）
- [ ] 提供默认值
- [ ] 支持插槽（如适用）
- [ ] 发射事件（如适用）
- [ ] 响应式设计
- [ ] 无障碍属性（ARIA）
- [ ] 在Showcase页面有演示（可选）
- [ ] 有使用注释或文档

### 5.3 Demo展示要求

**演示环境**:
- 本地开发服务器（npm run dev）
- 可构建生产版本（npm run build）
- 静态预览正常（npm run preview）

**演示数据**:
- 数据结构完整且真实
- 中英文内容都存在
- 图片使用占位图或真实图（Unsplash等）
- 数量充足（列表至少6项，详情页至少3个）

**演示脚本**（建议）:
1. 首页 → 展示Banner轮播、各区块
2. 关于我们 → 展示时间轴、组织图
3. 业务领域 → 列表+详情页跳转
4. 律师团队 → 筛选功能+详情页
5. 新闻 → 富文本渲染
6. 表单 → 填写与验证
7. 搜索 → 全局搜索
8. 响应式 → 切换设备尺寸
9. 多语言 → 中英文切换

### 5.4 响应式测试检查点

| 设备尺寸 | 宽度 | 检查项 |
|---------|------|--------|
| 小屏手机 | 320px | 导航收起、单列布局、文字可读、按钮可点 |
| iPhone | 375px | 同上 |
| 大屏手机 | 414px | 同上 |
| iPad竖屏 | 768px | 导航展开或汉堡菜单、2列布局 |
| iPad横屏 | 1024px | 完整导航、2-3列布局 |
| 桌面 | 1440px | 完整功能、3-4列布局、侧边栏 |
| 宽屏 | 1920px | 内容居中、最大宽度限制 |

### 5.5 性能指标

**Lighthouse目标**:
- Performance: ≥90
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90

**Core Web Vitals**:
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

**其他指标**:
- 首屏加载: <2s (Fast 3G)
- 总页面大小: <2MB
- 图片优化: WebP格式、懒加载
- JavaScript: <300KB (gzipped)

## 六、风险与问题

### 6.1 已知问题

1. **Showcase页面**: 当前为简化版本，完整组件演示待开发
2. **真实数据接入**: 需要后端API支持，当前仅为Demo数据
3. **表单提交**: 前端验证完成，后端处理待开发
4. **视频播放**: 需要确定视频托管方案（YouTube/自建）

### 6.2 潜在风险

| 风险 | 影响 | 可能性 | 应对措施 |
|------|------|--------|----------|
| 组件开发超时 | 高 | 中 | 优先P0任务，P1/P2可延后 |
| 真实内容不足 | 中 | 高 | 使用高质量占位内容 |
| 性能不达标 | 中 | 低 | 预留优化时间 |
| 浏览器兼容问题 | 中 | 中 | 使用成熟的polyfill |
| 多语言翻译不准确 | 低 | 中 | 标注为机器翻译，待审核 |

### 6.3 依赖关系

**外部依赖**:
- 真实图片素材（建议提供）
- 多语言翻译审核（建议由客户提供）
- 视频素材（如需要）
- Logo和品牌资源

**技术依赖**:
- Node.js ≥18
- npm ≥9
- 现代浏览器支持

## 七、交付清单

### 7.1 代码交付

- [ ] 完整源代码（GitHub仓库或压缩包）
- [ ] 构建后的静态文件（/build目录）
- [ ] package.json及依赖锁文件
- [ ] 环境配置说明（.env.example）

### 7.2 文档交付

- [ ] README.md（项目说明）
- [ ] INSTALLATION.md（安装部署指南）
- [ ] API-DESIGN.md（接口设计文档）
- [ ] COMPONENT-LIBRARY.md（组件库文档）
- [ ] CHANGELOG.md（变更日志）
- [ ] KNOWN-ISSUES.md（已知问题）

### 7.3 演示交付

- [ ] 在线Demo地址（如有）
- [ ] 本地演示环境
- [ ] 演示视频或录屏（可选）
- [ ] 演示PPT（可选）

### 7.4 测试报告

- [ ] Lighthouse报告
- [ ] 无障碍测试报告
- [ ] 浏览器兼容性测试报告
- [ ] 响应式测试截图

## 八、后续建议

### 8.1 短期（1个月内）

1. **真实数据接入**:
   - 后端API开发
   - 数据库设计
   - 接口联调

2. **内容管理系统（CMS）**:
   - 选型（Strapi/Directus/自研）
   - 配置与迁移
   - 编辑器集成

3. **表单处理**:
   - 邮件服务集成
   - 数据存储
   - 通知系统

### 8.2 中期（3个月内）

1. **功能增强**:
   - 用户登录/注册（如需要）
   - 在线咨询系统
   - 案例管理系统
   - 文档下载中心

2. **运营支持**:
   - Google Analytics
   - 错误监控（Sentry）
   - A/B测试能力

### 8.3 长期（6个月+）

1. **高级功能**:
   - 客户门户
   - 在线预约系统
   - 支付集成（如需要）
   - 移动App（可选）

2. **优化迭代**:
   - 基于用户反馈改进
   - 性能持续优化
   - 内容SEO优化
   - 国际化拓展（更多语言）

## 附录：参考资料

### A. 技术文档

- [SvelteKit官方文档](https://kit.svelte.dev/)
- [SCSS指南](https://sass-lang.com/guide)
- [TypeScript手册](https://www.typescriptlang.org/docs/)
- [Web Accessibility (A11y)](https://www.w3.org/WAI/)

### B. 设计资源

- [Unsplash](https://unsplash.com/) - 免费高质量图片
- [Pexels](https://www.pexels.com/) - 免费视频素材
- [Heroicons](https://heroicons.com/) - Icon库
- [Google Fonts](https://fonts.google.com/) - 字体

### C. 工具

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [BrowserStack](https://www.browserstack.com/) - 浏览器测试
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

**文档版本**: v1.0
**创建日期**: 2025-11-06
**维护者**: Product Manager Agent
**状态**: Draft

**下一步**: 开始第一阶段 - 基础组件补充
