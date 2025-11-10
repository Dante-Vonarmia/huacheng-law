# TASK-201: 关于华诚-左侧导航与锚点

## 状态
- [ ] 待设计确认
- 优先级: P1
- 预计工时: 4小时 (0.5天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: -

## 背景
"关于华诚"页面内容较长，包含多个章节（律所简介、发展历程、业务结构、荣誉资质、社会责任等）。需要在页面左侧添加固定导航栏，方便用户快速跳转到不同章节，提升页面浏览体验。

## 目标
在"关于华诚"页面集成左侧导航栏，具备以下特性：
1. **固定定位**：左侧导航固定在页面左侧，滚动时保持可见
2. **章节列表**：显示所有章节标题
3. **自动高亮**：根据当前滚动位置自动高亮对应章节
4. **平滑滚动**：点击章节跳转到对应位置，平滑滚动
5. **Intersection Observer**：使用 Intersection Observer API 自动检测当前章节
6. **移动端适配**：移动端收起为抽屉菜单
7. **响应式布局**：桌面端左侧固定，移动端顶部或抽屉

## 设计要求（待确认）

### 视觉设计
- [ ] 导航宽度：200px / 240px（待确认）
- [ ] 导航位置：左侧固定 / 右侧固定（待确认）
- [ ] 距离顶部：100px / 120px（给 Header 留空间）（待确认）
- [ ] 章节间距：16px / 20px（待确认）
- [ ] 激活状态：左边框、背景色、字体加粗（待确认）
- [ ] 悬停效果：背景色变化（待确认）
- [ ] 字体大小：15px / 16px（待确认）
- [ ] 移动端方案：
  - 方案1：顶部 Tab 导航
  - 方案2：右下角悬浮按钮 + 抽屉菜单（待确认）

### 章节结构（待确认）
- [ ] 章节列表：
  1. 律所简介（Introduction）
  2. 发展历程（History）
  3. 业务结构（Structure）
  4. 核心价值观（Values）
  5. 荣誉资质（Honors）
  6. 社会责任（Social Responsibility）
- [ ] 章节 ID 命名规范：section-introduction, section-history 等

### 交互设计
- [ ] 点击跳转：平滑滚动到对应章节
- [ ] 滚动偏移：距顶部 80-100px（避免被 Header 遮挡）（待确认）
- [ ] 自动高亮：滚动时自动高亮当前章节
- [ ] 高亮阈值：章节顶部进入视口 60% 时高亮（待确认）
- [ ] 移动端抽屉：点击按钮打开，点击遮罩或章节关闭（待确认）

## 技术实现

### 1. 涉及文件
- `src/routes/about/+page.svelte` - 关于华诚页面（修改）
- `ui-kit/components/SideNav.svelte` - 侧边导航组件（已存在，TASK-002）

### 2. 实现步骤

#### 步骤1：定义章节结构
在 `src/routes/about/+page.svelte` 中：
```svelte
<script lang=\"ts\">
import { SideNav } from '$ui/components';

const sections = [
  { id: 'section-introduction', label_zh: '律所简介', label_en: 'Introduction' },
  { id: 'section-history', label_zh: '发展历程', label_en: 'History' },
  { id: 'section-structure', label_zh: '业务结构', label_en: 'Structure' },
  { id: 'section-values', label_zh: '核心价值观', label_en: 'Values' },
  { id: 'section-honors', label_zh: '荣誉资质', label_en: 'Honors' },
  { id: 'section-social', label_zh: '社会责任', label_en: 'Social Responsibility' }
];
</script>

<div class=\"about-page\">
  <!-- 左侧导航 -->
  <aside class=\"about-page__nav\">
    <SideNav items={sections} />
  </aside>

  <!-- 主要内容 -->
  <main class=\"about-page__content\">
    <!-- 律所简介 -->
    <section id=\"section-introduction\" class=\"about-section\">
      <h2 class=\"about-section__title\">律所简介</h2>
      <div class=\"about-section__content\">
        <!-- 内容 -->
      </div>
    </section>

    <!-- 发展历程 -->
    <section id=\"section-history\" class=\"about-section\">
      <h2 class=\"about-section__title\">发展历程</h2>
      <div class=\"about-section__content\">
        <!-- 内容 -->
      </div>
    </section>

    <!-- 业务结构 -->
    <section id=\"section-structure\" class=\"about-section\">
      <h2 class=\"about-section__title\">业务结构</h2>
      <div class=\"about-section__content\">
        <!-- 内容 -->
      </div>
    </section>

    <!-- 核心价值观 -->
    <section id=\"section-values\" class=\"about-section\">
      <h2 class=\"about-section__title\">核心价值观</h2>
      <div class=\"about-section__content\">
        <!-- 内容 -->
      </div>
    </section>

    <!-- 荣誉资质 -->
    <section id=\"section-honors\" class=\"about-section\">
      <h2 class=\"about-section__title\">荣誉资质</h2>
      <div class=\"about-section__content\">
        <!-- 内容 -->
      </div>
    </section>

    <!-- 社会责任 -->
    <section id=\"section-social\" class=\"about-section\">
      <h2 class=\"about-section__title\">社会责任</h2>
      <div class=\"about-section__content\">
        <!-- 内容 -->
      </div>
    </section>
  </main>
</div>
```

#### 步骤2：页面布局样式
```scss
.about-page {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 40px;

  @include respond-to('tablet') {
    flex-direction: column;
    gap: 24px;
  }

  @include respond-to('mobile') {
    padding: 24px 16px;
  }

  // 左侧导航
  &__nav {
    flex: 0 0 240px;
    position: sticky;
    top: 100px;  // 给 Header 留空间
    align-self: flex-start;
    max-height: calc(100vh - 120px);
    overflow-y: auto;

    @include respond-to('tablet') {
      position: static;
      flex: 0 0 auto;
      width: 100%;
      max-height: none;
      overflow-y: visible;
    }

    @include respond-to('mobile') {
      // 移动端：固定在右下角
      position: fixed;
      bottom: 80px;
      right: 20px;
      flex: none;
      width: auto;
      z-index: 100;
    }
  }

  // 主要内容
  &__content {
    flex: 1;
    min-width: 0;  // 防止内容溢出
  }
}

// 章节样式
.about-section {
  margin-bottom: 80px;
  scroll-margin-top: 100px;  // 滚动偏移，避免被 Header 遮挡

  @include respond-to('mobile') {
    margin-bottom: 60px;
    scroll-margin-top: 80px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &__title {
    font-size: 32px;
    font-weight: 700;
    color: $color-text-primary;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 2px solid $color-primary;

    @include respond-to('mobile') {
      font-size: 24px;
      margin-bottom: 24px;
    }
  }

  &__content {
    font-size: 16px;
    line-height: 1.8;
    color: $color-text-secondary;

    @include respond-to('mobile') {
      font-size: 15px;
    }
  }
}
```

#### 步骤3：移动端抽屉菜单（可选）
如果采用移动端抽屉菜单方案，在 SideNav 组件中添加：
```svelte
<script lang=\"ts\">
export let items: NavItem[];
export let variant: 'desktop' | 'mobile' = 'desktop';

let isOpen = $state(false);

function toggleDrawer() {
  isOpen = !isOpen;
}

function handleItemClick() {
  if (variant === 'mobile') {
    isOpen = false;
  }
}
</script>

{#if variant === 'mobile'}
  <!-- 悬浮按钮 -->
  <button class=\"side-nav__fab\" on:click={toggleDrawer}>
    <span class=\"side-nav__fab-icon\">☰</span>
  </button>

  <!-- 抽屉遮罩 -->
  {#if isOpen}
    <div class=\"side-nav__overlay\" on:click={toggleDrawer} />
  {/if}

  <!-- 抽屉内容 -->
  <nav class=\"side-nav side-nav--drawer\" class:open={isOpen}>
    <div class=\"side-nav__header\">
      <h3 class=\"side-nav__title\">目录</h3>
      <button class=\"side-nav__close\" on:click={toggleDrawer}>✕</button>
    </div>
    <ul class=\"side-nav__list\">
      {#each items as item}
        <li class=\"side-nav__item\">
          <a href=\"#{item.id}\" on:click={handleItemClick}>
            {item.label_zh}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{:else}
  <!-- 桌面端导航（已有实现） -->
{/if}

<style lang=\"scss\">
// 悬浮按钮
.side-nav__fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: $color-primary;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &__icon {
    font-size: 24px;
  }
}

// 抽屉遮罩
.side-nav__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// 抽屉导航
.side-nav--drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;

  &.open {
    transform: translateX(0);
  }
}

.side-nav__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid $color-border;
}

.side-nav__title {
  font-size: 18px;
  font-weight: 600;
  color: $color-text-primary;
}

.side-nav__close {
  width: 32px;
  height: 32px;
  border: none;
  background: $color-bg-light;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  color: $color-text-secondary;
  transition: all 0.2s ease;

  &:hover {
    background: $color-primary;
    color: white;
  }
}
</style>
```

#### 步骤4：使用已有 SideNav 组件
根据 TASK-002，SideNav 组件已经实现了以下功能：
- ✅ 固定定位（sticky）
- ✅ Intersection Observer 自动高亮
- ✅ 平滑滚动
- ✅ 响应式布局

只需在"关于华诚"页面中正确使用即可：
```svelte
<SideNav
  items={sections}
  top={100}
  mobileBreakpoint={768}
/>
```

## 验收标准

### 功能验收（待设计确认后）
- [ ] 左侧导航固定在页面左侧，滚动时保持可见
- [ ] 导航显示所有章节标题
- [ ] 点击章节平滑滚动到对应位置
- [ ] 滚动时自动高亮当前章节
- [ ] 滚动偏移正确（不被 Header 遮挡）
- [ ] 移动端导航正确显示（Tab / 抽屉菜单）
- [ ] 移动端抽屉菜单打开/关闭正常（如采用）

### 视觉验收（待设计稿确认）
- [ ] 导航宽度、位置、间距符合设计稿
- [ ] 激活状态样式正确（左边框、背景色、字体）
- [ ] 悬停效果正确
- [ ] 桌面/平板/移动端布局正确
- [ ] 移动端悬浮按钮样式正确（如采用）
- [ ] 移动端抽屉动画流畅（如采用）

### 技术验收
- [ ] 使用 Intersection Observer API
- [ ] 使用 CSS scroll-margin-top 实现滚动偏移
- [ ] 无 ESLint 警告
- [ ] TypeScript 类型定义完整
- [ ] 响应式使用 mixins（@include respond-to）

## 设计资源需求

### 内容结构
- [ ] 确认章节列表和顺序：
  - 律所简介
  - 发展历程
  - 业务结构
  - 核心价值观
  - 荣誉资质
  - 社会责任
  - （其他章节待确认）
- [ ] 每个章节的内容（后续任务）

### 设计规范
- [ ] 导航宽度、位置、距离顶部
- [ ] 章节字体、大小、颜色
- [ ] 激活状态样式（左边框、背景色、字体加粗）
- [ ] 悬停效果样式
- [ ] 移动端方案（Tab / 抽屉菜单）
- [ ] 移动端悬浮按钮样式（如采用）
- [ ] 滚动偏移量（避免被 Header 遮挡）

## 依赖关系
- 前置任务: TASK-002（SideNav 组件已完成）
- 依赖资源: 设计稿、章节内容结构
- 后续任务: TASK-202~206（关于华诚各章节内容）

## 文件变更清单
- [ ] `src/routes/about/+page.svelte` - 集成左侧导航和章节结构
- [ ] `ui-kit/components/SideNav.svelte` - 可能需要微调（如添加移动端抽屉）

## 备注
- 等待设计稿确认后再开始开发
- SideNav 组件已在 TASK-002 中完成，可直接复用
- 需要确认移动端方案（Tab / 抽屉菜单 / 顶部固定）
- 章节内容由后续任务完成（TASK-202~206）
- 滚动偏移量需要根据实际 Header 高度调整
- 考虑添加"返回顶部"按钮（移动端）
- 考虑添加阅读进度条（页面顶部）
