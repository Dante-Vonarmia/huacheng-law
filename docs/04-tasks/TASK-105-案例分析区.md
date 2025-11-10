# TASK-105: 首页案例分析区

## 状态
- [ ] 待设计确认
- 优先级: P0
- 预计工时: 6小时 (0.75天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: -

## 背景
首页需要展示律所的精选案例，通过真实案例展示律所的专业能力和成功经验，增强用户信任感。案例展示是法律服务网站的核心内容之一，能够直观地向潜在客户证明律所的实力。

## 目标
在首页集成精选案例展示区，具备以下特性：
1. **案例展示**：4-6 个精选案例卡片
2. **卡片信息**：案例标题、领域标签、案件结果、简短描述
3. **Featured 案例**：1 个重点案例采用大卡片样式突出显示
4. **点击跳转**：跳转到案例详情页
5. **领域筛选**：可按业务领域快速筛选（可选）
6. **查看更多**：底部"查看全部案例"按钮跳转到案例列表页
7. **响应式布局**：桌面端 Grid 布局，移动端垂直堆叠

## 设计要求（待确认）

### 视觉设计
- [ ] 区域标题："精选案例" / "Featured Cases"
- [ ] 标题样式：字体大小、颜色、对齐方式（待确认）
- [ ] 布局方案：
  - 方案1：1 个大卡片（featured）+ 4 个常规卡片
  - 方案2：6 个等大小卡片 Grid 布局
  - 方案3：Masonry 瀑布流布局（待确认）
- [ ] Featured 卡片样式：金色边框、更大尺寸、渐变背景（待确认）
- [ ] 常规卡片尺寸：高度自适应 / 固定高度（待确认）
- [ ] 卡片间距：24px / 16px（桌面/移动）（待确认）
- [ ] 结果标签样式：左边框、背景色、图标（待确认）
- [ ] 领域标签颜色：不同领域不同颜色 / 统一颜色（待确认）

### 内容策略
- [ ] 案例数量：首页显示 4-6 个（待确认）
- [ ] Featured 案例：1 个重点案例（待确认是否采用）
- [ ] 案例类型：
  - 知识产权保护案例
  - 跨境并购案例
  - 公司重组案例
  - 劳动纠纷案例
  - 金融资产案例
- [ ] 案例结果：胜诉、和解、成功协助完成等
- [ ] 更新频率：季度更新或按需更新
- [ ] 案例详细程度：首页显示摘要，详情页显示完整案情

### 交互设计
- [ ] 点击行为：跳转到案例详情页
- [ ] 悬停效果：卡片上浮、阴影加深（待确认）
- [ ] 领域筛选：是否添加快速筛选按钮（可选）
- [ ] 加载状态：骨架屏 / 占位图（待确认）
- [ ] 过渡动画：淡入 / 上浮（待确认）

## 技术实现

### 1. 涉及文件
- `src/routes/+page.svelte` - 首页主文件（修改）
- `src/lib/data/featured-cases.ts` - 精选案例数据（新建）
- `ui-kit/domain/CaseCard.svelte` - 案例卡片组件（已存在，TASK-006）

### 2. 实现步骤

#### 步骤1：准备案例数据
创建 `src/lib/data/featured-cases.ts`：
```typescript
export const featuredCases = [
  {
    id: '1',
    title_zh: 'A公司跨境知识产权侵权案',
    title_en: 'Cross-border IP Infringement Case',
    practice_area_zh: '知识产权',
    practice_area_en: 'Intellectual Property',
    result_zh: '胜诉，获赔500万元',
    result_en: 'Won, awarded RMB 5M',
    summary_zh: '成功为A公司在跨国知识产权纠纷中维权，保护其核心技术专利不受侵犯，并获得高额赔偿。',
    summary_en: 'Successfully defended A company in a cross-border IP dispute...',
    featured: true,  // 重点案例标记
    date: '2024-08'
  },
  {
    id: '2',
    title_zh: 'B集团境外并购法律服务',
    title_en: 'Cross-border M&A Legal Services',
    practice_area_zh: '跨境并购',
    practice_area_en: 'Cross-border M&A',
    result_zh: '成功完成并购交易',
    result_en: 'Transaction completed successfully',
    summary_zh: '为B集团提供境外并购全程法律服务，协助完成价值10亿美元的跨国并购交易。',
    summary_en: 'Provided full legal services for B Group\'s USD 1B acquisition...',
    featured: false,
    date: '2024-06'
  },
  {
    id: '3',
    title_zh: 'C公司劳动争议仲裁案',
    title_en: 'Labor Dispute Arbitration',
    practice_area_zh: '劳动法',
    practice_area_en: 'Labor Law',
    result_zh: '和解协商，维护双方利益',
    result_en: 'Settled through mediation',
    summary_zh: '协助C公司妥善处理劳动争议，通过和解方式维护企业声誉和员工权益。',
    summary_en: 'Helped C company resolve labor dispute through mediation...',
    featured: false,
    date: '2024-05'
  },
  {
    id: '4',
    title_zh: 'D银行不良资产处置',
    title_en: 'NPL Asset Disposal',
    practice_area_zh: '金融资产',
    practice_area_en: 'Financial Assets',
    result_zh: '成功回收80%资产',
    result_en: '80% asset recovery',
    summary_zh: '为D银行提供不良资产处置法律服务，成功回收大部分资产，减少金融风险。',
    summary_en: 'Provided legal services for NPL disposal, recovered 80% assets...',
    featured: false,
    date: '2024-04'
  },
  {
    id: '5',
    title_zh: 'E企业公司重组方案',
    title_en: 'Corporate Restructuring',
    practice_area_zh: '公司法务',
    practice_area_en: 'Corporate Law',
    result_zh: '重组方案顺利实施',
    result_en: 'Restructuring completed',
    summary_zh: '为E企业设计并实施公司重组方案，优化组织架构，提升运营效率。',
    summary_en: 'Designed and implemented restructuring plan for E company...',
    featured: false,
    date: '2024-03'
  }
];
```

#### 步骤2：集成到首页（方案1：1大+4小）
在 `src/routes/+page.svelte` 中：
```svelte
<script lang=\"ts\">
import { CaseCard } from '$ui/domain';
import { featuredCases } from '$lib/data/featured-cases';

// 分离 featured 案例和常规案例
$: featuredCase = featuredCases.find(c => c.featured);
$: regularCases = featuredCases.filter(c => !c.featured).slice(0, 4);
</script>

<!-- 精选案例区 -->
<section class=\"featured-cases\">
  <div class=\"container\">
    <div class=\"featured-cases__header\">
      <h2 class=\"featured-cases__title\">精选案例</h2>
      <p class=\"featured-cases__subtitle\">真实案例，专业实力</p>
    </div>

    <div class=\"featured-cases__content\">
      <!-- Featured 案例（大卡片） -->
      {#if featuredCase}
        <div class=\"featured-cases__featured\">
          <CaseCard
            title={featuredCase.title_zh}
            practiceArea={featuredCase.practice_area_zh}
            result={featuredCase.result_zh}
            summary={featuredCase.summary_zh}
            variant=\"featured\"
            href=\"/cases/{featuredCase.id}\"
          />
        </div>
      {/if}

      <!-- 常规案例（小卡片） -->
      <div class=\"featured-cases__grid\">
        {#each regularCases as case_}
          <CaseCard
            title={case_.title_zh}
            practiceArea={case_.practice_area_zh}
            result={case_.result_zh}
            summary={case_.summary_zh}
            href=\"/cases/{case_.id}\"
          />
        {/each}
      </div>
    </div>

    <div class=\"featured-cases__footer\">
      <a href=\"/cases\" class=\"btn btn--primary\">查看全部案例</a>
    </div>
  </div>
</section>
```

#### 步骤3：布局样式（方案1：1大+4小）
```scss
.featured-cases {
  padding: 80px 0;
  background: white;

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

  // 内容布局：左侧 Featured，右侧 Grid
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 48px;

    @include respond-to('tablet') {
      grid-template-columns: 1fr;
    }

    @include respond-to('mobile') {
      gap: 16px;
      margin-bottom: 32px;
    }
  }

  // Featured 案例（左侧大卡片）
  &__featured {
    grid-row: span 2;

    @include respond-to('tablet') {
      grid-row: span 1;
    }

    :global(.case-card) {
      height: 100%;
    }
  }

  // 常规案例网格（右侧 2x2）
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    grid-column: 2;
    grid-row: span 2;

    @include respond-to('tablet') {
      grid-template-columns: repeat(2, 1fr);
      grid-column: 1;
      grid-row: auto;
    }

    @include respond-to('mobile') {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  &__footer {
    text-align: center;
  }
}
```

#### 步骤4：布局样式（方案2：等大小 Grid）
```scss
.featured-cases {
  // ... 相同的 header 样式

  // 等大小 Grid 布局
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
```

### 3. 可选功能：领域筛选

如果需要添加快速筛选：
```svelte
<script lang=\"ts\">
let selectedArea = $state<string>('all');

const practiceAreas = [
  { id: 'all', name_zh: '全部' },
  { id: 'ip', name_zh: '知识产权' },
  { id: 'ma', name_zh: '跨境并购' },
  { id: 'labor', name_zh: '劳动法' },
  { id: 'finance', name_zh: '金融资产' }
];

$: filteredCases = selectedArea === 'all'
  ? featuredCases
  : featuredCases.filter(c => c.practice_area_id === selectedArea);
</script>

<div class=\"featured-cases__filters\">
  {#each practiceAreas as area}
    <button
      class=\"filter-btn\"
      class:active={selectedArea === area.id}
      on:click={() => selectedArea = area.id}
    >
      {area.name_zh}
    </button>
  {/each}
</div>
```

## 验收标准

### 功能验收（待设计确认后）
- [ ] 首页精选案例区正确显示 4-6 个案例
- [ ] Featured 案例大卡片正确显示（如采用该方案）
- [ ] 每个案例卡片显示标题、领域、结果、摘要
- [ ] 点击案例卡片跳转到案例详情页
- [ ] 点击"查看全部案例"跳转到案例列表页
- [ ] 领域筛选功能正常（如采用该方案）
- [ ] 响应式布局正确切换

### 视觉验收（待设计稿确认）
- [ ] 区域标题样式符合设计规范
- [ ] Featured 卡片金色边框和渐变背景正确（如采用）
- [ ] 常规卡片尺寸、间距符合设计稿
- [ ] 结果标签样式正确（左边框、背景色）
- [ ] 领域标签颜色正确
- [ ] 卡片悬停效果正确
- [ ] 桌面/平板/移动端布局正确

### 内容验收
- [ ] 案例标题准确、简洁（15-30 字）
- [ ] 案例摘要信息完整（80-150 字）
- [ ] 案件结果描述清晰
- [ ] 业务领域分类准确
- [ ] 案例真实性和合规性（客户隐私保护）

## 设计资源需求

### 案例内容
- [ ] 4-6 个精选案例的完整信息：
  - 案例标题（中英文）
  - 业务领域（知识产权/并购/劳动法等）
  - 案件结果（胜诉/和解/成功完成等）
  - 案例摘要（80-150 字）
  - 案例时间（年月）
- [ ] Featured 案例选定（如采用大卡片方案）
- [ ] 案例详情页完整内容（后续任务）

### 设计规范
- [ ] 区域标题字体、大小、颜色
- [ ] 布局方案确认（1大+4小 / 等大小 Grid / 瀑布流）
- [ ] Featured 卡片样式规范（金色边框、渐变背景）
- [ ] 常规卡片尺寸和间距
- [ ] 结果标签样式规范
- [ ] 领域标签颜色规范
- [ ] 悬停效果动画参数
- [ ] 响应式布局规则

### 法律合规
- [ ] 案例使用授权：客户是否同意公开案例
- [ ] 隐私保护：是否需要匿名化处理（A公司、B集团）
- [ ] 敏感信息处理：是否涉及商业机密或敏感数据

## 依赖关系
- 前置任务: TASK-006（CaseCard 组件已完成）
- 依赖资源: 案例内容、设计稿、客户授权
- 后续任务: TASK-802（案例列表页）、TASK-803（案例详情页）

## 文件变更清单
- [ ] `src/routes/+page.svelte` - 集成精选案例区
- [ ] `src/lib/data/featured-cases.ts` - 新建案例数据文件

## 备注
- 等待设计稿确认后再开始开发
- 需要确认布局方案（1大+4小 / 等大小 Grid）
- 需要确认是否添加领域筛选功能
- 需要律所提供真实案例内容和客户授权
- 注意客户隐私保护和敏感信息处理
- 案例数量和更新频率待律所确认
- Featured 案例的选择标准待确认（最新/最重要/最具代表性）
