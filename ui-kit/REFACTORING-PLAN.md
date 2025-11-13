# UI Kit 重构计划

> 详细的分阶段重构计划，从样式提取到组件统一
>
> **制定时间**: 2025-11-12
> **预计完成**: 2025-11-19（约5个工作日）
> **负责人**: Designer Agent

---

## 🎯 重构目标

### 核心目标
1. **消除样式重复** - 减少 40% 的重复代码
2. **建立设计系统** - 统一的组件库和样式规范
3. **提升可维护性** - 模块化架构，易于扩展
4. **优化性能** - 减少 CSS bundle 体积

### 成功指标
- [ ] 所有页面使用统一的 Hero 组件
- [ ] Navigation 组件提取完成（水平/垂直）
- [ ] 样式重复率从 42% 降至 < 10%
- [ ] 所有组件在 `index.ts` 中导出
- [ ] 建立完整的样式模块化体系

---

## 📅 Phase 1: 提取共享样式（Day 1-2，预估 12h）

### 目标
提取重复的样式模式，建立 SCSS 模块化体系

### 任务清单

#### Task 1.1: 创建样式目录结构（1h）
```bash
ui-kit/styles/
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _colors.scss
├── components/
│   ├── _button.scss
│   ├── _hero.scss
│   ├── _navigation.scss
│   ├── _section.scss
│   ├── _stats.scss
│   └── _timeline.scss
├── layout/
│   ├── _grid.scss
│   └── _container.scss
├── utilities/
│   └── _helpers.scss
└── index.scss  # 统一导入
```

**验收标准**:
- [ ] 目录结构创建完成
- [ ] 每个文件包含注释说明
- [ ] `index.scss` 导入所有模块

---

#### Task 1.2: 提取 Hero Banner 样式（2h）

**文件**: `ui-kit/styles/components/_hero.scss`

**提取来源**:
- `/src/routes/(app)/about/+page.svelte` (370-485行)
- `/src/routes/(app)/team/+page.svelte` (300-464行)
- `/src/routes/(app)/practices/[[slug]]/+page.svelte` (412-581行)
- `/src/routes/(app)/publications/+page.svelte` (348-515行)

**样式类**:
```scss
// Hero Banner 基础样式
.hero-banner {
  position: relative;
  height: 60vh;
  min-height: 28rem;
  max-height: 40rem;
  // ...
}

.hero-banner__bg { /* 背景图片+视差效果 */ }
.hero-banner__content { /* 内容容器 */ }
.hero-banner__label { /* 小标题 */ }
.hero-banner__title { /* 主标题 */ }
.hero-banner__subtitle { /* 副标题 */ }
```

**验收标准**:
- [ ] 样式从4个页面提取到独立文件
- [ ] 使用 `$ui-kit/styles/variables.scss` 变量
- [ ] 添加响应式断点
- [ ] 包含注释说明

---

#### Task 1.3: 提取 Navigation 样式（2h）

**文件**: `ui-kit/styles/components/_navigation.scss`

**样式类**:
```scss
// 水平导航（Hero内部）
.horizontal-nav { /* ... */ }
.horizontal-nav__item { /* ... */ }

// 垂直导航（固定侧边）
.vertical-nav { /* ... */ }
.vertical-nav__inner { /* ... */ }
.vertical-nav__item { /* ... */ }
```

**验收标准**:
- [ ] 水平/垂直导航样式提取
- [ ] 活动状态样式统一
- [ ] 过渡动画统一

---

#### Task 1.4: 提取 Section 样式（1.5h）

**文件**: `ui-kit/styles/components/_section.scss`

**样式类**:
```scss
// Section 容器样式
.content-section { /* ... */ }
.section-number { /* ... */ }
.section-explore { /* ... */ }
.section-title { /* ... */ }
.section-title-alt { /* ... */ }
.section-subtitle { /* ... */ }
.section-intro { /* ... */ }
```

**验收标准**:
- [ ] 所有 Section 相关样式提取
- [ ] 与现有 `Section.svelte` 组件整合

---

#### Task 1.5: 提取 Stats 样式（1h）

**文件**: `ui-kit/styles/components/_stats.scss`

**样式类**:
```scss
// 统计数据展示样式
.stats-minimal / .stats-row { /* ... */ }
.stat-minimal / .stat-item { /* ... */ }
.stat-number { /* ... */ }
.stat-label { /* ... */ }
```

**验收标准**:
- [ ] 统一 Stats 样式变体
- [ ] 与 `Stats.svelte` 组件匹配

---

#### Task 1.6: 提取 Timeline 样式（1h）

**文件**: `ui-kit/styles/components/_timeline.scss`

**样式类**:
```scss
// 时间轴样式
.timeline-minimal { /* About页面变体 */ }
.timeline-item-minimal { /* ... */ }
.news-timeline { /* Publications页面变体 */ }
.timeline-item { /* ... */ }
```

**验收标准**:
- [ ] 两种时间轴变体统一
- [ ] 与 `Timeline.svelte` 组件整合

---

#### Task 1.7: 创建基础样式（1.5h）

**文件**:
- `ui-kit/styles/base/_reset.scss` - CSS 重置
- `ui-kit/styles/base/_typography.scss` - 排版样式
- `ui-kit/styles/base/_colors.scss` - 颜色工具类

**验收标准**:
- [ ] 统一的 CSS reset
- [ ] 排版基础类（`.text-lg`, `.text-sm` 等）
- [ ] 颜色工具类（`.text-primary`, `.bg-lightest` 等）

---

#### Task 1.8: 创建工具类（1h）

**文件**: `ui-kit/styles/utilities/_helpers.scss`

**工具类**:
```scss
// 间距工具类
.mt-xs, .mt-sm, .mt-md, .mt-lg, .mt-xl
.mb-xs, .mb-sm, .mb-md, .mb-lg, .mb-xl
.p-xs, .p-sm, .p-md, .p-lg, .p-xl

// 显示工具类
.hidden, .visible, .hidden-xs, .visible-md

// Flexbox 工具类
.flex, .flex-center, .flex-between, .flex-column
```

**验收标准**:
- [ ] 常用工具类创建完成
- [ ] 遵循 Pages.Revox.io 间距系统
- [ ] 响应式变体

---

#### Task 1.9: 更新 `index.scss` 并导入（1h）

**文件**: `ui-kit/styles/index.scss`

```scss
// 变量和 Mixins
@use 'variables';
@use 'mixins';

// 基础样式
@use 'base/reset';
@use 'base/typography';
@use 'base/colors';

// 组件样式
@use 'components/button';
@use 'components/hero';
@use 'components/navigation';
@use 'components/section';
@use 'components/stats';
@use 'components/timeline';

// 布局样式
@use 'layout/grid';
@use 'layout/container';

// 工具类
@use 'utilities/helpers';

// 全局样式
@use 'global';
```

**验收标准**:
- [ ] 所有样式模块导入
- [ ] 在 `+layout.svelte` 中引入
- [ ] 构建测试通过

---

## 📅 Phase 2: 创建缺失组件（Day 2-3，预估 10h）

### 目标
创建缺失的独立组件，消除页面内联样式

### 任务清单

#### Task 2.1: 创建 `HorizontalNav.svelte`（2h）

**文件**: `ui-kit/components/layout/HorizontalNav.svelte`

**Props**:
```typescript
export let sections: Array<{ id: string; label: string }> = [];
export let activeSection: number = 0;
export let className: string = '';

// 事件
const dispatch = createEventDispatcher<{
  sectionClick: { index: number };
}>();
```

**功能**:
- [ ] 支持多个导航项
- [ ] 活动状态样式
- [ ] 点击事件分发
- [ ] 响应式适配

**使用页面**: About, Team, Practices, Publications

---

#### Task 2.2: 创建 `VerticalNav.svelte`（2h）

**文件**: `ui-kit/components/layout/VerticalNav.svelte`

**Props**:
```typescript
export let sections: Array<{ id: string; label: string }> = [];
export let activeSection: number = 0;
export let show: boolean = false; // 控制显隐
export let className: string = '';
```

**功能**:
- [ ] 固定侧边定位
- [ ] 滚动显示/隐藏
- [ ] 活动指示器
- [ ] 平滑滚动跳转

**使用页面**: About, Team, Practices, Publications

---

#### Task 2.3: 创建 `CallToAction.svelte`（1.5h）

**文件**: `ui-kit/components/domain/CallToAction.svelte`

**Props**:
```typescript
export let title: string;
export let description: string = '';
export let ctaText: string = '联系我们';
export let ctaLink: string = '/contact';
export let variant: 'minimal' | 'block' | 'section' = 'minimal';
```

**功能**:
- [ ] 三种布局变体
- [ ] 可选描述文字
- [ ] 自定义按钮文字和链接
- [ ] 统一样式

**使用页面**: About, Team, Publications

---

#### Task 2.4: 创建 `Checkbox.svelte`（1.5h）

**文件**: `ui-kit/components/base/Checkbox.svelte`

**Props**:
```typescript
export let checked: boolean = false;
export let label: string = '';
export let disabled: boolean = false;
export let indeterminate: boolean = false;
```

**功能**:
- [ ] 受控组件
- [ ] 半选状态
- [ ] 禁用状态
- [ ] 自定义标签

---

#### Task 2.5: 创建 `Radio.svelte`（1.5h）

**文件**: `ui-kit/components/base/Radio.svelte`

**Props**:
```typescript
export let value: string;
export let checked: boolean = false;
export let label: string = '';
export let name: string;
export let disabled: boolean = false;
```

**功能**:
- [ ] 单选逻辑
- [ ] 分组管理
- [ ] 禁用状态

---

#### Task 2.6: 创建 `Dropdown.svelte`（2h）

**文件**: `ui-kit/components/interactive/Dropdown.svelte`

**Props**:
```typescript
export let trigger: 'click' | 'hover' = 'click';
export let placement: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
export let className: string = '';
```

**功能**:
- [ ] 点击/悬停触发
- [ ] 多种定位
- [ ] 点击外部关闭
- [ ] 过渡动画

---

## 📅 Phase 3: 重构现有页面（Day 3-4，预估 8h）

### 目标
更新所有页面使用统一的 UI Kit 组件

### 任务清单

#### Task 3.1: 重构 About 页面（2h）

**文件**: `/src/routes/(app)/about/+page.svelte`

**修改项**:
- [ ] 使用 `Hero.svelte` 替代内联 Hero 样式
- [ ] 使用 `HorizontalNav.svelte`
- [ ] 使用 `VerticalNav.svelte`
- [ ] 使用 `Stats.svelte` (统计数据)
- [ ] 使用 `Timeline.svelte` (发展历程)
- [ ] 使用 `CallToAction.svelte` (CTA 区块)
- [ ] 删除所有内联重复样式

**预期效果**:
- 代码行数从 1031行 减少至 ~500行
- 样式重复率降至 0%

---

#### Task 3.2: 重构 Team 页面（2h）

**文件**: `/src/routes/(app)/team/+page.svelte`

**修改项**:
- [ ] 使用 `Hero.svelte`
- [ ] 使用 `HorizontalNav.svelte`
- [ ] 使用 `VerticalNav.svelte`
- [ ] 使用 `Stats.svelte`
- [ ] 使用 `FilterBar.svelte` (筛选器)
- [ ] 使用 `CallToAction.svelte`

**预期效果**:
- 代码行数从 884行 减少至 ~450行

---

#### Task 3.3: 重构 Practices 页面（2h）

**文件**: `/src/routes/(app)/practices/[[slug]]/+page.svelte`

**修改项**:
- [ ] 使用 `Hero.svelte`
- [ ] 使用 `HorizontalNav.svelte`
- [ ] 使用 `VerticalNav.svelte`
- [ ] 使用 `CallToAction.svelte`

**预期效果**:
- 代码行数从 794行 减少至 ~400行

---

#### Task 3.4: 重构 Publications 页面（2h）

**文件**: `/src/routes/(app)/publications/+page.svelte`

**修改项**:
- [ ] 使用 `Hero.svelte`
- [ ] 使用 `HorizontalNav.svelte`
- [ ] 使用 `VerticalNav.svelte`
- [ ] 使用 `Stats.svelte`
- [ ] 使用 `FilterBar.svelte`
- [ ] 使用 `Timeline.svelte` (法律新闻)
- [ ] 使用 `CallToAction.svelte`

**预期效果**:
- 代码行数从 1048行 减少至 ~500行

---

## 📅 Phase 4: 完善组件导出和文档（Day 4-5，预估 4h）

### 目标
完善组件库导出和文档

### 任务清单

#### Task 4.1: 更新 `index.ts` 导出（1h）

**文件**: `ui-kit/components/index.ts`

```typescript
// 基础组件
export { default as Typography } from './base/Typography.svelte';
export { default as Button } from './base/Button.svelte';
export { default as Input } from './base/Input.svelte';
export { default as Select } from './base/Select.svelte';
export { default as Textarea } from './base/Textarea.svelte';
export { default as Checkbox } from './base/Checkbox.svelte';
export { default as Radio } from './base/Radio.svelte';
export { default as Link } from './base/Link.svelte';
export { default as Badge } from './base/Badge.svelte';

// 布局组件
export { default as Header } from './layout/Header.svelte';
export { default as Footer } from './layout/Footer.svelte';
export { default as Hero } from './layout/Hero.svelte';
export { default as Section } from './layout/Section.svelte';
export { default as HorizontalNav } from './layout/HorizontalNav.svelte';
export { default as VerticalNav } from './layout/VerticalNav.svelte';
export { default as MinimalNav } from './layout/MinimalNav.svelte';
export { default as MegaMenu } from './layout/MegaMenu.svelte';
export { default as SideNav } from './layout/SideNav.svelte';

// 内容组件
export { default as Card } from './content/Card.svelte';
export { default as Tabs } from './content/Tabs.svelte';
export { default as Accordion } from './content/Accordion.svelte';
export { default as BlockTitle } from './content/BlockTitle.svelte';
export { default as Picker } from './content/Picker.svelte';

// 交互组件
export { default as Modal } from './interactive/Modal.svelte';
export { default as Dropdown } from './interactive/Dropdown.svelte';
export { default as Pagination } from './interactive/Pagination.svelte';
export { default as FilterBar } from './interactive/FilterBar.svelte';

// 数据展示组件
export { default as Stats } from './data-display/Stats.svelte';
export { default as Timeline } from './data-display/Timeline.svelte';
export { default as OrgChart } from './data-display/OrgChart.svelte';
export { default as Carousel } from './data-display/Carousel.svelte';
export { default as BannerCarousel } from './data-display/BannerCarousel.svelte';
export { default as LogoCloud } from './data-display/LogoCloud.svelte';
export { default as Testimonial } from './data-display/Testimonial.svelte';

// 业务组件
export { default as LawyerCard } from './domain/LawyerCard.svelte';
export { default as PracticeCard } from './domain/PracticeCard.svelte';
export { default as PublicationCard } from './domain/PublicationCard.svelte';
export { default as CaseCard } from './domain/CaseCard.svelte';
export { default as EventCard } from './domain/EventCard.svelte';
export { default as VideoCard } from './domain/VideoCard.svelte';
export { default as CallToAction } from './domain/CallToAction.svelte';
```

**验收标准**:
- [ ] 所有组件按分类导出
- [ ] 导出路径正确
- [ ] TypeScript 类型正确

---

#### Task 4.2: 创建组件类型定义（1h）

**文件**:
- `ui-kit/types/base.ts`
- `ui-kit/types/layout.ts`
- `ui-kit/types/domain.ts`

**示例**:
```typescript
// ui-kit/types/layout.ts
export interface HorizontalNavProps {
  sections: Array<{ id: string; label: string }>;
  activeSection?: number;
  className?: string;
}

export interface VerticalNavProps {
  sections: Array<{ id: string; label: string }>;
  activeSection?: number;
  show?: boolean;
  className?: string;
}
```

**验收标准**:
- [ ] 所有新组件有类型定义
- [ ] 导出统一的类型接口

---

#### Task 4.3: 创建组件使用文档（1h）

**文件**: `ui-kit/README.md`

**内容**:
```markdown
# UI Kit 使用指南

## 安装和导入

\`\`\`typescript
import { Button, Hero, LawyerCard } from '$ui-kit/components';
\`\`\`

## 组件列表

### 基础组件
- Button - 按钮组件
- Input - 输入框
- Select - 下拉选择
...

### 布局组件
- Hero - 主视觉轮播
- HorizontalNav - 水平导航
- VerticalNav - 垂直导航
...

## 使用示例

### Hero 组件

\`\`\`svelte
<Hero
  slides={heroSlides}
  autoplay={true}
  parallax={true}
/>
\`\`\`

...
```

**验收标准**:
- [ ] 所有组件有使用说明
- [ ] 包含代码示例
- [ ] 包含 Props 说明

---

#### Task 4.4: 更新 CLAUDE.md（1h）

**文件**: `/CLAUDE.md`

**更新内容**:
- [ ] 添加 UI Kit 重构完成说明
- [ ] 更新组件使用规范
- [ ] 添加样式模块化说明
- [ ] 更新文件结构图

---

## 📅 Phase 5: 测试和验证（Day 5，预估 4h）

### 目标
全面测试所有页面和组件

### 任务清单

#### Task 5.1: 组件单元测试（1h）

**测试项**:
- [ ] `HorizontalNav.svelte` 功能测试
- [ ] `VerticalNav.svelte` 功能测试
- [ ] `CallToAction.svelte` 渲染测试
- [ ] `Checkbox.svelte` 交互测试
- [ ] `Radio.svelte` 交互测试
- [ ] `Dropdown.svelte` 交互测试

---

#### Task 5.2: 页面集成测试（1.5h）

**测试项**:
- [ ] About 页面渲染正常
- [ ] Team 页面渲染正常
- [ ] Practices 页面渲染正常
- [ ] Publications 页面渲染正常
- [ ] 所有导航功能正常
- [ ] 所有筛选器正常
- [ ] 响应式布局正常

---

#### Task 5.3: QA 测试（1h）

**运行测试**:
```bash
npm run test:lighthouse  # 性能测试
npm run test:a11y        # 可访问性测试
npm run test:seo         # SEO测试
```

**验收标准**:
- [ ] Lighthouse Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] SEO ≥ 95

---

#### Task 5.4: 构建验证（0.5h）

```bash
npm run build
npm run preview
```

**验收标准**:
- [ ] 构建无错误
- [ ] CSS bundle 体积减小
- [ ] 所有页面加载正常

---

## 📊 预期效果

### 代码量减少

| 页面 | 重构前 | 重构后 | 减少 |
|------|--------|--------|------|
| About | 1031 行 | ~500 行 | -51% |
| Team | 884 行 | ~450 行 | -49% |
| Practices | 794 行 | ~400 行 | -50% |
| Publications | 1048 行 | ~500 行 | -52% |
| **总计** | **3757 行** | **~1850 行** | **-51%** |

---

### 样式重复率

| 项目 | 重构前 | 重构后 |
|------|--------|--------|
| Hero Banner | 4次重复 | 0次（使用组件） |
| 水平导航 | 4次重复 | 0次（使用组件） |
| 垂直导航 | 4次重复 | 0次（使用组件） |
| Stats | 3次重复 | 0次（使用组件） |
| Timeline | 2次重复 | 0次（使用组件） |
| FilterBar | 2次重复 | 0次（使用组件） |
| **总重复率** | **42%** | **< 10%** |

---

### 性能提升

| 指标 | 重构前 | 重构后 | 改善 |
|------|--------|--------|------|
| CSS Bundle 大小 | ~180KB | ~120KB | -33% |
| 首屏渲染时间 | 1.8s | 1.4s | -22% |
| Lighthouse 性能分 | 85 | 92+ | +8% |

---

## 🚀 执行时间表

| 阶段 | 开始日期 | 结束日期 | 工时 | 负责人 |
|------|----------|----------|------|--------|
| Phase 1 | Day 1 上午 | Day 2 下午 | 12h | Designer Agent |
| Phase 2 | Day 2 下午 | Day 3 下午 | 10h | Designer Agent |
| Phase 3 | Day 3 下午 | Day 4 下午 | 8h | Frontend Agent |
| Phase 4 | Day 4 下午 | Day 5 上午 | 4h | Designer Agent |
| Phase 5 | Day 5 上午 | Day 5 下午 | 4h | QA Agent |
| **总计** |  |  | **38h** |  |

**预计完成日期**: 2025-11-19（5个工作日）

---

## ⚠️ 风险和缓解措施

### 风险 1: 组件提取破坏现有功能
**缓解措施**:
- 每个组件完成后立即测试
- 保留原页面备份（Git branch）
- 逐页面重构，不一次性修改

### 风险 2: 样式模块化导致加载顺序问题
**缓解措施**:
- 使用 `index.scss` 统一导入
- 明确样式优先级
- 测试所有页面渲染

### 风险 3: 时间估算不准确
**缓解措施**:
- 每日 Review 进度
- 优先完成 P0 任务
- 如超时，P2/P3 任务可延后

---

## ✅ 验收标准

### 代码质量
- [ ] 所有新组件通过 ESLint 检查
- [ ] 所有新组件通过 TypeScript 类型检查
- [ ] 代码注释完整

### 功能完整性
- [ ] 所有页面功能正常
- [ ] 所有交互功能正常
- [ ] 响应式布局正常

### 性能指标
- [ ] Lighthouse Performance ≥ 90
- [ ] CSS bundle 减少 > 30%
- [ ] 首屏渲染时间 < 1.5s

### 文档完整性
- [ ] `COMPONENT-INVENTORY.md` 更新
- [ ] `README.md` 创建完成
- [ ] `CLAUDE.md` 更新

---

## 📝 每日进度跟踪

### Day 1 (预计 2025-11-13)
- [ ] 完成 Phase 1 Task 1.1-1.3
- [ ] 提取 Hero、Navigation 样式

### Day 2 (预计 2025-11-14)
- [ ] 完成 Phase 1 剩余任务
- [ ] 开始 Phase 2 组件创建

### Day 3 (预计 2025-11-15)
- [ ] 完成 Phase 2 组件创建
- [ ] 开始 Phase 3 页面重构

### Day 4 (预计 2025-11-18)
- [ ] 完成 Phase 3 页面重构
- [ ] 完成 Phase 4 文档更新

### Day 5 (预计 2025-11-19)
- [ ] 完成 Phase 5 测试和验证
- [ ] 最终验收

---

**文档维护者**: Designer Agent
**版本**: v1.0
**最后更新**: 2025-11-12
