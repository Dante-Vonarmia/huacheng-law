# TASK-006: CaseCard案例卡片组件

## 状态
- [x] 已完成
- 优先级: P1
- 预计工时: 2.4小时 (0.3天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: 2025-11-06

## 背景
在首页"案例分析区"需要展示律所的成功案例，突出专业能力和服务成果。案例卡片组件需要清晰展示案例信息，包括业务领域、案情摘要、处理结果等关键信息。

当前缺少专门的案例卡片组件，需要一个支持图片展示、业务领域标签、案例结果高亮的卡片组件。

## 目标
创建一个功能完善的 CaseCard 案例卡片组件，具备以下特性：
1. **案例图片**：支持可选图片展示（16:9 比例）
2. **业务领域标签**：顶部显示业务领域（如：知识产权）
3. **案例标题**：醒目的标题（最多 2 行）
4. **案情摘要**：简要案情描述（最多 3 行）
5. **处理结果**：高亮显示处理结果（左侧绿色边框）
6. **元信息**：年份、涉案金额、标签
7. **两种样式**：default（普通）和 featured（精选，金色边框）

## 技术实现

### 1. 涉及文件
- `ui-kit/domain/CaseCard.svelte` - 主组件文件（新建）
- `ui-kit/domain/index.ts` - 导出配置（修改）
- `src/routes/+page.svelte` - 组件集成（后续任务）

### 2. 实现步骤

#### 步骤1：创建组件文件
创建 `ui-kit/domain/CaseCard.svelte`，包含：
- TypeScript Props 接口定义
- 可选图片区域（16:9 比例）
- 业务领域标签
- 标题和摘要
- 处理结果高亮框
- 元信息和标签

#### 步骤2：实现核心功能

**Props接口**:
```typescript
interface CaseCardProps {
  case: Case;
  variant?: 'default' | 'featured'; // 默认default
}

interface Case {
  id: string;
  title_zh: string;
  title_en: string;
  summary_zh: string;
  summary_en: string;
  practice_area: string;     // 业务领域
  result_zh: string;         // 处理结果
  result_en: string;
  amount?: string;           // 涉案金额 "5000万"
  year: string;              // 年份 "2024"
  image?: string;            // 可选图片
  featured?: boolean;        // 是否精选
  tags?: string[];           // 标签
}
```

#### 步骤3：实现样式
使用 SCSS 实现：
- 卡片容器（白色背景、圆角、阴影）
- 图片区域（16:9 比例，悬停放大 1.05 倍）
- 精选标签（绝对定位在图片左上角）
- 业务领域标签（绿色文字）
- 处理结果框（浅色背景+左侧绿色边框）
- 悬停效果（上移 4px，阴影加深）
- featured 样式（金色边框）

#### 步骤4：导出组件
在 `ui-kit/domain/index.ts` 添加：
```typescript
export { default as CaseCard } from './CaseCard.svelte';
```

### 3. 关键代码逻辑

**样式要点**:
```scss
.case-card {
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);

    .case-card__image img {
      transform: scale(1.05);
    }
  }

  // Featured 样式（金色边框）
  &--featured {
    border: 2px solid $color-secondary;

    .case-card__badge {
      background: $color-secondary;
    }
  }

  // 图片区域
  &__image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: $color-bg-secondary;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
  }

  // 精选标签
  &__badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: $color-primary;
    color: white;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
  }

  // 处理结果框
  &__result {
    background: $color-bg-light;
    padding: 12px 16px;
    border-radius: 4px;
    border-left: 3px solid $color-accent;
    margin-bottom: 16px;

    &-label {
      font-size: 12px;
      color: $color-text-tertiary;
      margin-bottom: 4px;
    }

    &-text {
      font-size: 15px;
      font-weight: 600;
      color: $color-accent;
    }
  }
}
```

### 4. 数据结构

**Demo数据示例**:
```typescript
const cases = [
  {
    id: '1',
    title_zh: '某知名互联网公司知识产权侵权案',
    title_en: 'IP Infringement Case of Internet Company',
    summary_zh: '代理某知名互联网公司诉竞争对手侵犯商标权及不正当竞争纠纷案，涉及复杂的技术问题和法律适用。',
    summary_en: 'Representing a well-known Internet company in trademark infringement and unfair competition disputes.',
    practice_area: '知识产权',
    result_zh: '胜诉，获赔5000万元',
    result_en: 'Won, awarded 50 million',
    amount: '5000万',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
    featured: true,
    tags: ['商标侵权', '不正当竞争', '互联网']
  },
  {
    id: '2',
    title_zh: '跨国企业并购重组法律服务',
    title_en: 'Cross-border M&A Legal Service',
    summary_zh: '为某上市公司提供跨国并购全流程法律服务，成功完成复杂的境外资产收购。',
    summary_en: 'Provided full legal service for cross-border M&A to a listed company.',
    practice_area: '公司法务',
    result_zh: '交易成功完成',
    result_en: 'Transaction completed',
    year: '2023',
    tags: ['并购重组', '跨国交易']
  }
];
```

**使用示例**:
```svelte
<script>
import CaseCard from '$ui/domain/CaseCard.svelte';

const cases = [...]; // 案例数据
</script>

<div class="case-grid">
  {#each cases as caseItem}
    <CaseCard case={caseItem} variant={caseItem.featured ? 'featured' : 'default'} />
  {/each}
</div>

<style>
.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}
</style>
```

## 验收标准

### 功能验收
- [ ] 图片正确显示（16:9 比例），无图片时显示默认背景
- [ ] 业务领域标签显示在顶部
- [ ] 标题最多显示 2 行，超出显示省略号
- [ ] 摘要最多显示 3 行，超出显示省略号
- [ ] 处理结果框正确显示
- [ ] 元信息（年份、金额、标签）正确显示
- [ ] featured 样式（金色边框）正常工作
- [ ] 精选标签在 featured 案例上显示

### 视觉验收
- [ ] 悬停时卡片上移 4px
- [ ] 悬停时图片放大 1.05 倍
- [ ] 处理结果框左侧绿色边框显示
- [ ] featured 卡片金色边框正确显示
- [ ] 精选标签金色背景正确显示
- [ ] 标签样式正确（小圆角、浅色背景）
- [ ] 响应式布局正确

### 技术验收
- [ ] TypeScript 接口定义完整，无 any 类型
- [ ] 使用 aspect-ratio 保持图片 16:9 比例
- [ ] 标题和摘要使用 -webkit-line-clamp 截断
- [ ] 无 ESLint 警告
- [ ] 使用 SCSS 变量系统
- [ ] 响应式使用 mixins（@include respond-to）
- [ ] 组件已在 domain/index.ts 导出

## 文件变更清单
- [ ] `ui-kit/domain/CaseCard.svelte` - 新建
- [ ] `ui-kit/domain/index.ts` - 添加导出

## Git Commit信息

```
feat(ui): TASK-006 CaseCard案例卡片组件

- Add CaseCard.svelte component with TypeScript
- Support optional 16:9 image display
- Add practice area label and case result highlight
- Support default/featured variants (gold border)
- Add title/summary truncation (2/3 lines)
- Add meta info display (year, amount, tags)
- Export component in domain/index.ts

Closes: TASK-006
```

## 测试步骤
1. 启动本地环境：`npm run dev`
2. 访问测试页面（集成到首页或 /showcase）
3. 验证图片 16:9 比例显示
4. 验证标题和摘要截断
5. 验证处理结果框样式
6. 验证 featured 样式（金色边框）
7. 验证悬停动画效果
8. 检查控制台无错误

## 依赖关系
- 前置任务: 无
- 后续任务: TASK-105（首页案例分析区）
- 被依赖: TASK-105

## 参考资料
- 技术规格文档: `docs/01-requirements/TECHNICAL_SPECS.md` 第1.3节
- Line Clamp CSS: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp

## 备注
- image 字段是可选的，无图片时显示默认背景色
- featured 案例显示金色边框和"精选"标签
- 处理结果使用左侧绿色边框高亮显示
- amount 字段可选，格式如："5000万"、"涉案金额1亿"
- tags 是可选的字符串数组
- 标题和摘要使用 -webkit-line-clamp 实现多行截断
