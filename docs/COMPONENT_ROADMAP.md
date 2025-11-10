# 组件开发路线图

> **项目**: 华诚律所 UI Kit
> **版本**: v1.0
> **更新日期**: 2025-11-06
> **设计基准**: Pages.Revox.io Design Language

---

## 目录

1. [开发策略](#开发策略)
2. [组件优先级](#组件优先级)
3. [分阶段路线图](#分阶段路线图)
4. [组件依赖关系](#组件依赖关系)
5. [技术栈决策](#技术栈决策)

---

## 一、开发策略

### 1.1 核心原则

```
📐 从基础到复杂    - 先开发基础组件，再组合业务组件
🎯 MVP 优先         - Phase 0-1 完成首页展示即可上线
🔄 迭代优化         - 后续 Phase 逐步添加高级功能
🧪 先验证后推广     - 关键组件验证后再批量开发
```

### 1.2 开发顺序

```
1️⃣ 基础样式层 (Foundation Layer)
   ├── SCSS 变量系统 ✅ 已完成
   ├── Mixins 库 ✅ 已完成
   └── 全局样式 （待定）

2️⃣ 原子组件层 (Atomic Components)
   ├── Button, Input, Badge 等
   └── 无依赖，可独立使用

3️⃣ 布局组件层 (Layout Components)
   ├── Header, Footer, Hero
   └── 依赖原子组件

4️⃣ 业务组件层 (Domain Components)
   ├── LawyerCard, NewsCard
   └── 依赖原子 + 布局组件

5️⃣ 页面模板层 (Page Templates)
   ├── 首页、团队页、业务领域页
   └── 组合所有组件
```

### 1.3 质量门槛

每个组件完成必须满足：

- ✅ **功能完整**：所有 Props/Slots/Events 正常工作
- ✅ **样式规范**：符合 Pages 设计语言（扁平化、轻字重、3px圆角）
- ✅ **响应式**：移动/平板/桌面三端适配
- ✅ **可访问性**：WCAG 2.1 AA 标准（语义化、ARIA、键盘导航）
- ✅ **类型安全**：TypeScript 类型定义完整
- ✅ **文档齐全**：Props 说明 + 使用示例

---

## 二、组件优先级

### 2.1 优先级分级

| 级别 | 定义 | 开发时机 |
|------|------|---------|
| **P0** 🔴 | 阻塞性（无此组件无法上线） | Phase 0-1 |
| **P1** 🟠 | 重要性（影响核心功能） | Phase 2 |
| **P2** 🟡 | 增强性（提升用户体验） | Phase 3-4 |
| **P3** 🟢 | 优化性（锦上添花） | Phase 5+ |

### 2.2 组件优先级矩阵

#### P0 - 阻塞性组件（MVP 必需）

| 组件 | 类型 | 使用场景 | 开发工时 |
|------|------|---------|---------|
| **Button** | 原子 | 全站按钮（CTA、表单提交） | 4h |
| **BlockTitle** | 原子 | Section 标题（Pages 特色） | 2h |
| **Typography** | 原子 | 全局文本排版 | 3h |
| **Header** | 布局 | 导航栏（透明+滚动变色） | 8h |
| **Footer** | 布局 | 页脚（链接+版权） | 4h |
| **Hero** | 布局 | 首页全屏轮播（视差效果） | 10h |
| **Section** | 布局 | 区块容器（统一间距） | 2h |
| **LawyerCard** | 业务 | 律师团队展示 | 6h |
| **PracticeCard** | 业务 | 业务领域展示 | 5h |

**小计**: 9 个组件，44 工时（约 5.5 个工作日）

#### P1 - 重要性组件（核心功能）

| 组件 | 类型 | 使用场景 | 开发工时 |
|------|------|---------|---------|
| **Input** | 原子 | 表单输入（联系表单） | 4h |
| **Textarea** | 原子 | 多行文本输入 | 2h |
| **Card** | 原子 | 通用卡片容器 | 4h |
| **Badge** | 原子 | 标签/徽章 | 2h |
| **Link** | 原子 | 链接组件 | 2h |
| **Carousel** | 布局 | 轮播图（案例展示） | 8h |
| **NewsCard** | 业务 | 新闻/出版物展示 | 5h |
| **ContactForm** | 业务 | 联系表单（完整验证） | 8h |
| **Stats** | 原子 | 统计数字展示 | 3h |

**小计**: 9 个组件，38 工时（约 4.8 个工作日）

#### P2 - 增强性组件（UX 提升）

| 组件 | 类型 | 使用场景 | 开发工时 |
|------|------|---------|---------|
| **Tabs** | 原子 | 内容切换 | 4h |
| **Accordion** | 原子 | 常见问题展开 | 4h |
| **Modal** | 原子 | 弹窗（表单确认） | 6h |
| **Testimonial** | 原子 | 客户评价 | 3h |
| **Timeline** | 原子 | 时间线（公司历史） | 5h |
| **Pagination** | 原子 | 分页导航 | 3h |
| **Breadcrumb** | 原子 | 面包屑导航 | 2h |
| **LogoCloud** | 原子 | 客户Logo墙 | 3h |
| **SideNav** | 布局 | 侧边栏导航 | 5h |

**小计**: 9 个组件，35 工时（约 4.4 个工作日）

#### P3 - 优化性组件（高级功能）

| 组件 | 类型 | 使用场景 | 开发工时 |
|------|------|---------|---------|
| **Dropdown** | 原子 | 下拉菜单 | 4h |
| **Tooltip** | 原子 | 提示信息 | 3h |
| **Alert** | 原子 | 提示框 | 2h |
| **Toast** | 原子 | 通知消息 | 4h |
| **Progress** | 原子 | 进度条 | 2h |
| **Skeleton** | 原子 | 骨架屏加载 | 3h |
| **Table** | 原子 | 数据表格 | 8h |
| **DatePicker** | 原子 | 日期选择器 | 10h |
| **FileUpload** | 原子 | 文件上传 | 6h |

**小计**: 9 个组件，42 工时（约 5.3 个工作日）

---

## 三、分阶段路线图

### Phase 0: 基础设施（已完成 ✅）

**目标**: 建立设计系统基础
**交付物**: SCSS 变量 + Mixins + 设计语言文档
**工时**: 16h（2 工作日）

- [x] 学习 Pages.Revox.io 设计语言
- [x] 创建 `DESIGN_LANGUAGE.md`
- [x] 重构 `variables.scss`（正确配色）
- [x] 重写 `mixins.scss`（Pages 标准）
- [x] 创建 `DEVELOPMENT_STANDARDS.md`
- [x] 创建 `COMPONENT_ROADMAP.md`

---

### Phase 1: MVP 首页（P0 组件）

**目标**: 完成首页展示，可上线演示
**交付物**: 可访问的首页 + 9 个核心组件
**工时**: 44h（5.5 工作日）

#### Week 1: 原子组件 + 布局基础
```
Day 1-2: 原子组件
  ├── Button (4h) - 扁平化按钮，5 种变体
  ├── BlockTitle (2h) - Montserrat + 大写
  ├── Typography (3h) - 全局文本样式
  └── Section (2h) - 区块容器

Day 3: 布局组件基础
  ├── Header (8h) - 透明导航栏，滚动变色
  └── Footer (4h) - 多列布局，社交链接

Day 4: Hero 轮播
  ├── Hero (10h) - 全屏视差轮播，Swiper集成
  └── 测试响应式和动画效果
```

#### Week 2: 业务组件 + 首页整合
```
Day 5: 业务组件
  ├── LawyerCard (6h) - 律师卡片，头像+信息
  └── PracticeCard (5h) - 业务领域卡片

Day 6: 首页整合
  ├── 组合所有组件创建首页
  ├── 响应式调试
  ├── 可访问性检查
  └── Lighthouse 性能测试

Day 7: QA 和优化
  ├── 跨浏览器测试
  ├── 移动端适配
  └── 修复 bug
```

**里程碑**: ✅ 首页可上线展示

---

### Phase 2: 核心功能（P1 组件）

**目标**: 完善表单、新闻、案例功能
**交付物**: 联系表单 + 新闻列表 + 案例轮播
**工时**: 38h（约 5 工作日）

```
Week 3: 表单组件
  ├── Input (4h) - 54px 高度，Pages 标准
  ├── Textarea (2h) - 自动高度调整
  └── ContactForm (8h) - 完整验证逻辑

Week 4: 内容展示
  ├── Card (4h) - 通用卡片，3 种变体
  ├── Badge (2h) - 状态标签
  ├── Link (2h) - 链接组件
  ├── NewsCard (5h) - 新闻卡片
  ├── Carousel (8h) - 案例轮播
  └── Stats (3h) - 数据统计展示
```

**里程碑**: ✅ 表单和内容页面完成

---

### Phase 3: UX 增强（P2 组件）

**目标**: 提升交互体验
**交付物**: Tab切换 + 模态框 + 侧边导航
**工时**: 35h（约 4.5 工作日）

```
Week 5-6: 交互组件
  ├── Tabs (4h) - 内容切换
  ├── Accordion (4h) - FAQ 展开
  ├── Modal (6h) - 弹窗组件
  ├── Testimonial (3h) - 客户评价
  ├── Timeline (5h) - 公司历史
  ├── Pagination (3h) - 分页导航
  ├── Breadcrumb (2h) - 面包屑
  ├── LogoCloud (3h) - Logo墙
  └── SideNav (5h) - 侧边栏导航
```

**里程碑**: ✅ 所有核心页面完成

---

### Phase 4: 高级功能（P3 组件）

**目标**: 添加高级交互
**交付物**: 下拉菜单 + 提示框 + 文件上传
**工时**: 42h（约 5 工作日）

```
Week 7-8: 高级组件
  ├── Dropdown (4h)
  ├── Tooltip (3h)
  ├── Alert (2h)
  ├── Toast (4h)
  ├── Progress (2h)
  ├── Skeleton (3h)
  ├── Table (8h)
  ├── DatePicker (10h)
  └── FileUpload (6h)
```

**里程碑**: ✅ 所有计划组件完成

---

### Phase 5: 优化与国际化

**目标**: 性能优化 + 双语支持
**工时**: 24h（约 3 工作日）

```
Week 9: 优化
  ├── 性能优化（懒加载、代码分割）
  ├── SEO 优化（meta标签、结构化数据）
  ├── Lighthouse 得分优化（>90）
  └── 无障碍优化（WCAG AA）

Week 10: 国际化
  ├── i18n 系统集成
  ├── 中英文翻译
  ├── URL 结构（/zh/, /en/）
  └── 语言切换组件
```

**里程碑**: ✅ 生产环境就绪

---

## 四、组件依赖关系

### 4.1 依赖图谱

```
基础样式层
  └── variables.scss ✅
  └── mixins.scss ✅
      │
      ├─→ 原子组件（无依赖）
      │   ├── Button
      │   ├── BlockTitle
      │   ├── Typography
      │   ├── Input
      │   ├── Card
      │   └── Badge
      │
      ├─→ 布局组件（依赖原子）
      │   ├── Header
      │   │   └── Button, Link
      │   ├── Footer
      │   │   └── Link
      │   ├── Hero
      │   │   └── Button, BlockTitle
      │   └── Section
      │       └── BlockTitle
      │
      └─→ 业务组件（依赖原子+布局）
          ├── LawyerCard
          │   └── Card, Badge
          ├── PracticeCard
          │   └── Card, BlockTitle
          ├── NewsCard
          │   └── Card, Badge, Button
          └── ContactForm
              └── Input, Textarea, Button
```

### 4.2 开发顺序建议

基于依赖关系，推荐开发顺序：

**第 1 批**（无依赖，可并行开发）
```
✓ Button
✓ BlockTitle
✓ Typography
✓ Input
✓ Textarea
✓ Badge
✓ Section
```

**第 2 批**（依赖第 1 批）
```
✓ Card (需要 Badge)
✓ Header (需要 Button, Link)
✓ Footer (需要 Link)
✓ Hero (需要 Button, BlockTitle)
```

**第 3 批**（依赖第 1-2 批）
```
✓ LawyerCard (需要 Card, Badge)
✓ PracticeCard (需要 Card, BlockTitle)
✓ NewsCard (需要 Card, Badge, Button)
✓ ContactForm (需要 Input, Textarea, Button)
```

---

## 五、技术栈决策

### 5.1 核心技术

| 技术 | 版本 | 用途 | 决策原因 |
|------|------|------|---------|
| **SvelteKit** | 2.0 | 前端框架 | SSG+SSR 混合，SEO 友好 |
| **SCSS** | - | 样式预处理 | Pages 原生支持，变量系统 |
| **TypeScript** | 5.3 | 类型系统 | 代码质量，IDE 支持 |
| **Vite** | 5.0 | 构建工具 | 快速 HMR，ESM 优先 |

### 5.2 第三方库（精简原则）

#### 必需库
```json
{
  "swiper": "^11.0.0",        // Hero 轮播（Pages 标准）
  "svelte-i18n": "^4.0.0"      // 国际化
}
```

#### 可选库（Phase 3+）
```json
{
  "dayjs": "^1.11.0",          // 日期处理（DatePicker）
  "zod": "^3.22.0",            // 表单验证（ContactForm）
  "svelte-french-toast": "^1.2.0"  // Toast 通知
}
```

#### 禁用库
```
❌ Tailwind CSS      - 与 Pages 设计语言冲突
❌ Bootstrap         - 过于臃肿，样式覆盖困难
❌ Material UI       - 设计风格不符
❌ Ant Design        - 同上
```

### 5.3 开发工具

```json
{
  "devDependencies": {
    "@sveltejs/adapter-static": "^3.0.0",  // SSG 适配器
    "eslint": "^8.57.0",                    // 代码规范
    "prettier": "^3.2.0",                   // 代码格式化
    "prettier-plugin-svelte": "^3.2.0",     // Svelte 格式化
    "sass": "^1.71.0",                      // SCSS 编译
    "svelte-check": "^3.6.0",               // TypeScript 检查
    "lighthouse": "^11.0.0",                // 性能测试
    "axe-core": "^4.8.0"                    // 可访问性测试
  }
}
```

### 5.4 渲染策略决策

| 页面类型 | 渲染方式 | 原因 |
|---------|---------|------|
| **首页** | SSG | 内容稳定，SEO 优先 |
| **关于我们** | SSG | 内容稳定 |
| **业务领域** | SSG | 内容稳定，SEO 优先 |
| **律师团队** | SSR | 数据动态，需实时更新 |
| **新闻列表** | SSR | 数据动态 |
| **联系表单** | CSR | 用户交互，无SEO需求 |

---

## 六、风险与缓解

### 6.1 潜在风险

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|---------|
| **Swiper.js 集成复杂** | 延期 2-3 天 | 中 | 提前调研，准备降级方案（纯CSS轮播） |
| **中英文字体加载慢** | 性能下降 | 高 | 字体子集化，font-display: swap |
| **移动端适配困难** | 返工 1-2 天 | 中 | 移动优先开发，每个组件实时测试 |
| **可访问性遗漏** | 审核不通过 | 低 | 每个组件完成立即检查 WCAG |
| **Pages 设计理解偏差** | 返工 | 低 | 参考文档，关键组件先验证 |

### 6.2 时间缓冲

```
计划工时: 159h（约 20 工作日）
缓冲时间: +30% = 48h（约 6 工作日）
总计: 207h（约 26 工作日，1.3 个月）
```

实际排期建议：**6-8 周**（考虑沟通、评审、测试）

---

## 七、交付标准

### 7.1 Phase 1 (MVP) 交付清单

- [ ] **功能**: 首页完整展示，导航栏工作正常
- [ ] **性能**: Lighthouse Performance ≥ 85
- [ ] **SEO**: Lighthouse SEO ≥ 90
- [ ] **可访问性**: Lighthouse Accessibility ≥ 85
- [ ] **响应式**: 移动/平板/桌面三端正常
- [ ] **浏览器**: Chrome/Safari/Firefox/Edge 最新版测试通过

### 7.2 Phase 2-3 交付清单

- [ ] **功能**: 所有核心页面完成（首页/团队/业务/新闻/联系）
- [ ] **性能**: Lighthouse Performance ≥ 90
- [ ] **SEO**: Lighthouse SEO ≥ 95
- [ ] **可访问性**: Lighthouse Accessibility ≥ 90
- [ ] **表单**: 完整验证，错误提示清晰
- [ ] **文档**: 所有组件有使用示例

### 7.3 Phase 4-5 交付清单（生产就绪）

- [ ] **性能**: 所有 Lighthouse 指标 ≥ 90
- [ ] **国际化**: 中英文完整翻译
- [ ] **SEO**: meta 标签、结构化数据、sitemap
- [ ] **监控**: 接入错误监控（如 Sentry）
- [ ] **文档**: README + API 文档 + 部署指南

---

## 八、成功指标（KPI）

### 8.1 开发效率

- **组件开发速度**: 平均 4-6h/组件（P0-P1）
- **代码复用率**: ≥ 60%（通过 mixins 和基础组件）
- **Bug 修复时间**: < 2h/个（简单bug）

### 8.2 质量指标

- **Lighthouse 得分**: Performance/SEO/Accessibility 均 ≥ 90
- **代码覆盖率**: 关键组件 ≥ 80%（如果有单元测试）
- **可访问性违规**: 0 个严重违规（axe-core）

### 8.3 用户体验

- **首屏加载**: < 2 秒（移动 3G 网络）
- **交互响应**: < 100ms（按钮点击反馈）
- **动画流畅度**: 60 FPS（Hero 轮播）

---

## 附录：快速参考

### 当前进度（2025-11-06）

```
✅ Phase 0: 基础设施 (100%)
   ├── ✅ 设计语言文档
   ├── ✅ SCSS 变量系统
   ├── ✅ SCSS Mixins
   └── ✅ 开发规范文档

⏳ Phase 1: MVP (0%)
   ├── ⏳ Button (待开发)
   ├── ⏳ BlockTitle (待开发)
   ├── ⏳ Typography (待开发)
   └── ... (共 9 个组件)
```

### 下一步行动

**立即开始 Phase 1 - 第 1 批组件开发**：
1. Button (4h) - 最基础，优先级最高
2. BlockTitle (2h) - Pages 特色，简单
3. Typography (3h) - 全局样式，影响所有页面

预计完成时间：**1 个工作日**

---

**文档维护**: Design Agent
**审核**: PM Agent
**最后更新**: 2025-11-06
