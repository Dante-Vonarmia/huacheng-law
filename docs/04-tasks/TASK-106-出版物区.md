# TASK-106: 首页出版物区

## 状态
- [ ] 待设计确认
- 优先级: P1
- 预计工时: 5小时 (0.625天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: -

## 背景
首页需要展示律所的专业出版物，包括法律分析文章、研究报告、行业洞察等。通过展示专业内容，体现律所的专业深度和行业影响力，吸引潜在客户并建立专业品牌形象。

## 目标
在首页集成出版物展示区，具备以下特性：
1. **出版物展示**：4-6 篇精选文章/报告
2. **卡片信息**：标题、摘要、作者、发布日期、分类标签
3. **列表布局**：垂直列表或卡片 Grid（待确认）
4. **点击跳转**：跳转到出版物详情页
5. **分类筛选**：可按内容分类快速筛选（可选）
6. **查看更多**：底部"查看全部出版物"按钮跳转到列表页
7. **响应式布局**：桌面端 Grid 或列表，移动端垂直堆叠

## 设计要求（待确认）

### 视觉设计
- [ ] 区域标题："专业洞察" / "Insights" 或 "出版物" / "Publications"（待确认）
- [ ] 标题样式：字体大小、颜色、对齐方式（待确认）
- [ ] 布局方案：
  - 方案1：垂直列表（类似博客列表）
  - 方案2：2 列 Grid 卡片布局
  - 方案3：3 列 Grid 卡片布局（待确认）
- [ ] 卡片样式：白色背景、边框、圆角（待确认）
- [ ] 卡片尺寸：固定高度 / 自适应高度（待确认）
- [ ] 卡片间距：24px / 16px（桌面/移动）（待确认）
- [ ] 分类标签颜色：不同分类不同颜色 / 统一颜色（待确认）
- [ ] 日期和作者位置：顶部 / 底部（待确认）

### 内容策略
- [ ] 出版物数量：首页显示 4-6 篇（待确认）
- [ ] 出版物类型：
  - 法律分析文章
  - 行业研究报告
  - 案例评析
  - 法规解读
  - 专业指南
- [ ] 内容分类：
  - 知识产权
  - 公司法务
  - 跨境并购
  - 金融资产
  - 劳动法等
- [ ] 作者信息：律师姓名、职位（待确认）
- [ ] 更新频率：周度/月度更新
- [ ] 内容长度：标题 15-30 字，摘要 80-150 字

### 交互设计
- [ ] 点击行为：跳转到出版物详情页
- [ ] 悬停效果：卡片上浮、阴影加深（待确认）
- [ ] 分类筛选：是否添加分类筛选按钮（可选）
- [ ] 加载状态：骨架屏 / 占位图（待确认）
- [ ] 过渡动画：淡入 / 上浮（待确认）

## 技术实现

### 1. 涉及文件
- `src/routes/+page.svelte` - 首页主文件（修改）
- `src/lib/data/featured-publications.ts` - 精选出版物数据（新建）
- `ui-kit/domain/PublicationCard.svelte` - 出版物卡片组件（新建或复用 Card）

### 2. 实现步骤

#### 步骤1：准备出版物数据
创建 `src/lib/data/featured-publications.ts`：
```typescript
export const featuredPublications = [
  {
    id: '1',
    title_zh: '2024年知识产权保护新规解读',
    title_en: 'IP Protection Regulations 2024',
    summary_zh: '深入分析2024年最新知识产权保护法规的修订内容，解读对企业的实际影响和应对策略。',
    summary_en: 'In-depth analysis of the latest IP protection regulations...',
    category_zh: '知识产权',
    category_en: 'Intellectual Property',
    author_zh: '张律师',
    author_en: 'Lawyer Zhang',
    author_title_zh: '合伙人',
    author_title_en: 'Partner',
    publish_date: '2024-10-15',
    read_time: 8,  // 阅读时长（分钟）
    tags: ['知识产权', '法规解读', '企业合规']
  },
  {
    id: '2',
    title_zh: '跨境并购交易中的法律风险防控',
    title_en: 'Legal Risk Control in Cross-border M&A',
    summary_zh: '基于多年实践经验，总结跨境并购交易中常见的法律风险点，提供系统化的防控建议。',
    summary_en: 'Based on years of experience, summarizing common legal risks...',
    category_zh: '跨境并购',
    category_en: 'Cross-border M&A',
    author_zh: '李律师',
    author_en: 'Lawyer Li',
    author_title_zh: '高级合伙人',
    author_title_en: 'Senior Partner',
    publish_date: '2024-09-28',
    read_time: 12,
    tags: ['跨境并购', '风险防控', '尽职调查']
  },
  {
    id: '3',
    title_zh: '企业数据合规实务指南',
    title_en: 'Data Compliance Guide for Enterprises',
    summary_zh: '详细解析企业在数据收集、存储、使用过程中的合规要求，提供可操作的合规方案。',
    summary_en: 'Detailed analysis of compliance requirements for data...',
    category_zh: '公司法务',
    category_en: 'Corporate Law',
    author_zh: '王律师',
    author_en: 'Lawyer Wang',
    author_title_zh: '合伙人',
    author_title_en: 'Partner',
    publish_date: '2024-09-10',
    read_time: 10,
    tags: ['数据合规', '隐私保护', 'GDPR']
  },
  {
    id: '4',
    title_zh: '劳动合同争议典型案例评析',
    title_en: 'Analysis of Labor Contract Disputes',
    summary_zh: '精选10个劳动合同争议典型案例，深入分析法院判决逻辑和企业应对策略。',
    summary_en: 'Selected 10 typical cases of labor contract disputes...',
    category_zh: '劳动法',
    category_en: 'Labor Law',
    author_zh: '赵律师',
    author_en: 'Lawyer Zhao',
    author_title_zh: '资深律师',
    author_title_en: 'Senior Lawyer',
    publish_date: '2024-08-22',
    read_time: 15,
    tags: ['劳动法', '案例评析', '争议解决']
  }
];
```

#### 步骤2：集成到首页（方案1：列表布局）
在 `src/routes/+page.svelte` 中：
```svelte
<script lang=\"ts\">
import { Card, Badge } from '$ui/components';
import { featuredPublications } from '$lib/data/featured-publications';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
</script>

<!-- 出版物区 -->
<section class=\"publications\">
  <div class=\"container\">
    <div class=\"publications__header\">
      <h2 class=\"publications__title\">专业洞察</h2>
      <p class=\"publications__subtitle\">深度分析，前沿观点</p>
    </div>

    <div class=\"publications__list\">
      {#each featuredPublications.slice(0, 4) as pub}
        <article class=\"publication-item\">
          <a href=\"/publications/{pub.id}\" class=\"publication-item__link\">
            <div class=\"publication-item__content\">
              <div class=\"publication-item__meta\">
                <Badge variant=\"outline\">{pub.category_zh}</Badge>
                <span class=\"publication-item__date\">{formatDate(pub.publish_date)}</span>
                <span class=\"publication-item__read-time\">{pub.read_time} 分钟阅读</span>
              </div>

              <h3 class=\"publication-item__title\">{pub.title_zh}</h3>
              <p class=\"publication-item__summary\">{pub.summary_zh}</p>

              <div class=\"publication-item__author\">
                <span class=\"publication-item__author-name\">{pub.author_zh}</span>
                <span class=\"publication-item__author-title\">{pub.author_title_zh}</span>
              </div>
            </div>
          </a>
        </article>
      {/each}
    </div>

    <div class=\"publications__footer\">
      <a href=\"/publications\" class=\"btn btn--secondary\">查看全部出版物</a>
    </div>
  </div>
</section>
```

#### 步骤3：集成到首页（方案2：Grid 卡片布局）
```svelte
<div class=\"publications__grid\">
  {#each featuredPublications.slice(0, 6) as pub}
    <Card href=\"/publications/{pub.id}\" class=\"publication-card\">
      <div class=\"publication-card__meta\">
        <Badge variant=\"outline\">{pub.category_zh}</Badge>
        <span class=\"publication-card__date\">{formatDate(pub.publish_date)}</span>
      </div>

      <h3 class=\"publication-card__title\">{pub.title_zh}</h3>
      <p class=\"publication-card__summary\">{pub.summary_zh}</p>

      <div class=\"publication-card__footer\">
        <span class=\"publication-card__author\">{pub.author_zh}</span>
        <span class=\"publication-card__read-time\">{pub.read_time} min</span>
      </div>
    </Card>
  {/each}
</div>
```

#### 步骤4：列表布局样式
```scss
.publications {
  padding: 80px 0;
  background: $color-bg-light;

  @include respond-to('mobile') {
    padding: 60px 0;
  }

  &__header {
    text-align: center;
    margin-bottom: 48px;

    @include respond-to('mobile') {
      margin-bottom: 32px;
    }
  }

  &__title {
    font-size: 36px;
    font-weight: 700;
    color: $color-text-primary;
    margin-bottom: 12px;

    @include respond-to('mobile') {
      font-size: 28px;
    }
  }

  &__subtitle {
    font-size: 18px;
    color: $color-text-secondary;

    @include respond-to('mobile') {
      font-size: 16px;
    }
  }

  // 列表布局
  &__list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 48px;

    @include respond-to('mobile') {
      gap: 16px;
      margin-bottom: 32px;
    }
  }

  &__footer {
    text-align: center;
  }
}

// 出版物列表项
.publication-item {
  background: white;
  border-radius: 8px;
  padding: 32px;
  transition: all 0.3s ease;
  border: 1px solid $color-border;

  @include respond-to('mobile') {
    padding: 20px;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &__link {
    text-decoration: none;
    color: inherit;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    flex-wrap: wrap;

    @include respond-to('mobile') {
      gap: 12px;
      margin-bottom: 12px;
    }
  }

  &__date,
  &__read-time {
    font-size: 14px;
    color: $color-text-tertiary;

    @include respond-to('mobile') {
      font-size: 13px;
    }
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    color: $color-text-primary;
    margin-bottom: 12px;
    line-height: 1.4;

    @include respond-to('mobile') {
      font-size: 20px;
    }

    &:hover {
      color: $color-primary;
    }
  }

  &__summary {
    font-size: 16px;
    color: $color-text-secondary;
    line-height: 1.6;
    margin-bottom: 16px;

    @include respond-to('mobile') {
      font-size: 15px;
    }
  }

  &__author {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid $color-border;
  }

  &__author-name {
    font-size: 15px;
    font-weight: 500;
    color: $color-text-primary;
  }

  &__author-title {
    font-size: 14px;
    color: $color-text-tertiary;
  }
}
```

#### 步骤5：Grid 卡片布局样式
```scss
.publications {
  // ... 相同的 header 样式

  // Grid 布局
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 48px;

    @include respond-to('tablet') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to('mobile') {
      grid-template-columns: 1fr;
      gap: 16px;
      margin-bottom: 32px;
    }
  }
}

// 出版物卡片
.publication-card {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__date {
    font-size: 14px;
    color: $color-text-tertiary;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $color-text-primary;
    margin-bottom: 12px;
    line-height: 1.4;

    // 限制 2 行
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__summary {
    font-size: 15px;
    color: $color-text-secondary;
    line-height: 1.6;
    margin-bottom: 16px;
    flex-grow: 1;

    // 限制 3 行
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid $color-border;
    margin-top: auto;
  }

  &__author {
    font-size: 14px;
    font-weight: 500;
    color: $color-text-primary;
  }

  &__read-time {
    font-size: 13px;
    color: $color-text-tertiary;
  }
}
```

### 3. 可选功能：分类筛选

如果需要添加分类筛选：
```svelte
<script lang=\"ts\">
let selectedCategory = $state<string>('all');

const categories = [
  { id: 'all', name_zh: '全部' },
  { id: 'ip', name_zh: '知识产权' },
  { id: 'ma', name_zh: '跨境并购' },
  { id: 'corporate', name_zh: '公司法务' },
  { id: 'labor', name_zh: '劳动法' }
];

$: filteredPublications = selectedCategory === 'all'
  ? featuredPublications
  : featuredPublications.filter(p => p.category_id === selectedCategory);
</script>

<div class=\"publications__filters\">
  {#each categories as cat}
    <button
      class=\"filter-btn\"
      class:active={selectedCategory === cat.id}
      on:click={() => selectedCategory = cat.id}
    >
      {cat.name_zh}
    </button>
  {/each}
</div>
```

## 验收标准

### 功能验收（待设计确认后）
- [ ] 首页出版物区正确显示 4-6 篇文章
- [ ] 每篇文章显示标题、摘要、作者、日期、分类
- [ ] 点击文章卡片跳转到出版物详情页
- [ ] 点击"查看全部出版物"跳转到列表页
- [ ] 分类筛选功能正常（如采用该方案）
- [ ] 响应式布局正确切换
- [ ] 日期格式正确显示

### 视觉验收（待设计稿确认）
- [ ] 区域标题样式符合设计规范
- [ ] 列表/Grid 布局符合设计稿
- [ ] 卡片尺寸、间距、圆角正确
- [ ] 分类标签颜色正确
- [ ] 日期和作者信息位置正确
- [ ] 卡片悬停效果正确
- [ ] 桌面/平板/移动端布局正确

### 内容验收
- [ ] 文章标题准确、吸引人（15-30 字）
- [ ] 文章摘要信息完整（80-150 字）
- [ ] 作者姓名和职位准确
- [ ] 分类标签准确
- [ ] 阅读时长估算合理
- [ ] 发布日期准确

## 设计资源需求

### 出版物内容
- [ ] 4-6 篇精选文章/报告的完整信息：
  - 文章标题（中英文）
  - 文章摘要（80-150 字）
  - 作者姓名和职位
  - 发布日期
  - 内容分类（知识产权/并购/公司法务等）
  - 阅读时长（分钟）
  - 标签（可选）
- [ ] 文章详情页完整内容（后续任务）

### 设计规范
- [ ] 区域标题字体、大小、颜色
- [ ] 布局方案确认（列表 / 2 列 Grid / 3 列 Grid）
- [ ] 卡片样式规范（背景、边框、圆角、间距）
- [ ] 分类标签颜色规范
- [ ] 作者和日期信息样式
- [ ] 悬停效果动画参数
- [ ] 响应式布局规则

### 内容管理
- [ ] 出版物更新频率（周度/月度）
- [ ] 首页展示数量（4-6 篇）
- [ ] 排序规则（按发布日期 / 按阅读量 / 人工推荐）
- [ ] 内容审核流程

## 依赖关系
- 前置任务: 无（可复用 Card、Badge 组件）
- 依赖资源: 出版物内容、作者信息、设计稿
- 后续任务: TASK-502（出版物列表页）、TASK-505（出版物详情页）

## 文件变更清单
- [ ] `src/routes/+page.svelte` - 集成出版物区
- [ ] `src/lib/data/featured-publications.ts` - 新建出版物数据文件
- [ ] `ui-kit/domain/PublicationCard.svelte` - 新建出版物卡片组件（可选，可复用 Card）

## 备注
- 等待设计稿确认后再开始开发
- 需要确认布局方案（列表 / Grid）
- 需要确认是否添加分类筛选功能
- 需要律所提供出版物内容（标题、摘要、作者）
- 需要确认内容管理方式（CMS / 静态数据 / API）
- 阅读时长可通过字数估算（中文约 300-400 字/分钟）
- 考虑添加搜索功能（后期优化）
- 考虑添加阅读统计和推荐算法（后期优化）
