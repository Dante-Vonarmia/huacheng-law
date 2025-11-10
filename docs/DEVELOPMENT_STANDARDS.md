# 华诚律所前端开发规范

> **版本**: v1.0
> **更新日期**: 2025-11-06
> **适用范围**: UI Kit 组件库 + 页面模板开发
> **设计基础**: Pages.Revox.io Design Language

---

## 目录

1. [核心原则](#核心原则)
2. [命名约定](#命名约定)
3. [组件开发规范](#组件开发规范)
4. [样式编写规范](#样式编写规范)
5. [响应式设计规范](#响应式设计规范)
6. [可访问性标准](#可访问性标准)
7. [性能优化规范](#性能优化规范)
8. [代码质量检查](#代码质量检查)

---

## 一、核心原则

### 1.1 设计哲学

遵循 **Pages.Revox.io** 的核心设计理念：

```
✓ 扁平化设计（Flat Design）      - 无阴影、无渐变、纯色块
✓ 轻量化优先（Lightweight）      - CSS < 50KB, 组件按需加载
✓ 轻字重排版（Light Typography） - 默认 font-weight: 300
✓ 快速响应（Fast Transition）    - 0.1-0.2s 过渡动画
✓ 移动优先（Mobile First）       - 先写手机样式，渐进增强
✓ 内容驱动（Content First）      - 装饰最小化，突出信息
```

### 1.2 开发约束

#### 必须遵守（MUST）
- ✅ 使用 SCSS 变量，**禁止硬编码颜色/尺寸**
- ✅ 所有组件必须支持 **TypeScript** 类型定义
- ✅ 遵循 **BEM 命名法**（Block-Element-Modifier）
- ✅ 按钮和卡片 **不使用 box-shadow**（Pages 扁平化）
- ✅ 圆角统一使用 **3px**（`$radius-base`）
- ✅ 字体默认使用 **font-weight: 300**
- ✅ 过渡动画使用 **0.1-0.4s**（不超过 0.4s）

#### 应当遵守（SHOULD）
- ⚠️ 优先使用 SCSS mixins 而非重复样式
- ⚠️ 组件尺寸优先使用 **相对单位**（rem/em）
- ⚠️ 间距遵循 **5 的倍数规律**（5, 10, 15, 20...）
- ⚠️ 颜色优先使用 **灰度系统**，语义色谨慎使用

#### 禁止使用（MUST NOT）
- ❌ 不使用 Tailwind CSS（本项目纯 SCSS）
- ❌ 不使用内联样式（`style="..."`）
- ❌ 不使用 `!important`（除非覆盖第三方库）
- ❌ 不使用绝对定位布局（优先 Flexbox/Grid）

---

## 二、命名约定

### 2.1 文件命名

#### Svelte 组件（PascalCase）
```
✓ Button.svelte
✓ LawyerCard.svelte
✓ NavigationBar.svelte
✓ BlockTitle.svelte

✗ button.svelte
✗ lawyer-card.svelte
✗ navigation_bar.svelte
```

#### SCSS 文件（kebab-case）
```
✓ variables.scss
✓ mixins.scss
✓ button-variants.scss
✓ responsive-utilities.scss

✗ Variables.scss
✗ button_variants.scss
```

#### TypeScript 类型文件（PascalCase）
```
✓ Button.types.ts
✓ LawyerCard.types.ts

✗ button.types.ts
✗ lawyer-card-types.ts
```

### 2.2 CSS 类命名（BEM + Pages 混合）

#### 标准 BEM 结构
```scss
// Block（块）
.lawyer-card { }

// Element（元素）
.lawyer-card__photo { }
.lawyer-card__name { }
.lawyer-card__title { }

// Modifier（修饰符）
.lawyer-card--featured { }
.lawyer-card--compact { }
.lawyer-card__photo--rounded { }
```

#### Pages 工具类（保留原始命名）
```scss
// 间距工具类（Pages 标准）
.m-t-5, .m-t-10, .m-t-20, .m-t-30  // margin-top
.m-b-5, .m-b-10, .m-b-20           // margin-bottom
.p-l-20, .p-r-30                   // padding-left/right
.no-padding, .no-margin            // 重置

// 响应式工具类（Pages 标准）
.visible-xs, .visible-sm, .visible-md
.hidden-xs, .hidden-sm, .hidden-md
.xs-no-padding, .md-p-l-20

// 布局工具类（Pages 标准）
.full-height, .full-vh
.container, .container-lg
.pull-left, .pull-right
.col-xs-height, .col-middle

// 文本工具类（Pages 标准）
.text-center, .text-left, .text-right
.small-text, .hint-text
.block-title

// 颜色工具类（Pages 标准）
.bg-master-lightest
.text-white, .text-master-dark
```

#### 命名规则总结

| 类型 | 命名方式 | 示例 |
|------|---------|------|
| **组件块** | kebab-case | `.navigation-bar` |
| **组件元素** | BEM (`__`) | `.navigation-bar__logo` |
| **组件修饰符** | BEM (`--`) | `.button--primary` |
| **Pages工具类** | 保持原样 | `.m-t-20`, `.full-vh` |
| **状态类** | `is-` 前缀 | `.is-active`, `.is-loading` |
| **JS钩子类** | `js-` 前缀 | `.js-toggle`, `.js-modal` |

### 2.3 变量命名（SCSS）

```scss
// 颜色变量（kebab-case + 语义化）
$color-primary              // 主色
$color-primary-light        // 浅色变体
$color-primary-dark         // 深色变体
$color-master-lightest      // 灰度最浅

// 尺寸变量
$spacing-xs, $spacing-sm, $spacing-md
$font-size-h1, $font-size-base
$header-default-height

// Mixin 命名（kebab-case）
@mixin button-primary { }
@mixin respond-from($breakpoint) { }
@mixin header-color($bg, $text, $opacity) { }
```

### 2.4 组件 Props 命名（TypeScript）

```typescript
// camelCase 命名
export let variant: 'primary' | 'secondary' = 'primary';
export let size: 'sm' | 'md' | 'lg' = 'md';
export let isDisabled: boolean = false;
export let isLoading: boolean = false;

// 布尔值用 is/has/should 前缀
export let isActive: boolean = false;
export let hasIcon: boolean = false;
export let shouldAutoFocus: boolean = false;
```

---

## 三、组件开发规范

### 3.1 组件文件结构

#### 标准组件模板
```svelte
<script lang="ts">
  // 1. 类型导入
  import type { ButtonVariant, ButtonSize } from './Button.types';

  // 2. Props 定义（必须有类型）
  export let variant: ButtonVariant = 'primary';
  export let size: ButtonSize = 'md';
  export let isDisabled: boolean = false;
  export let isLoading: boolean = false;

  // 3. 内部状态
  let isPressed = false;

  // 4. 计算属性
  $: className = `btn btn--${variant} btn--${size}`;

  // 5. 事件处理
  function handleClick(event: MouseEvent) {
    if (isDisabled || isLoading) return;
    // 自定义逻辑
  }
</script>

<!-- 6. 模板（简洁的HTML） -->
<button
  class={className}
  class:is-disabled={isDisabled}
  class:is-loading={isLoading}
  disabled={isDisabled}
  on:click={handleClick}
>
  <slot />
</button>

<!-- 7. 样式（独立的<style>标签） -->
<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  .btn {
    @include btn-base;  // 使用 mixin

    // 变体样式
    &--primary {
      @include button($color-white, $color-primary, $color-primary);
    }

    &--secondary {
      @include button($color-white, $color-secondary, $color-secondary);
    }

    // 尺寸样式
    &--sm { @include btn-sm; }
    &--lg { @include btn-lg; }

    // 状态样式
    &.is-disabled {
      opacity: $opacity-disabled;
      cursor: not-allowed;
    }
  }
</style>
```

### 3.2 组件类型定义

#### 独立类型文件（`Button.types.ts`）
```typescript
// 使用 string literal union 而非 enum
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'text';

export type ButtonSize = 'sm' | 'md' | 'lg';

// Props 接口
export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

// 事件类型
export interface ButtonEvents {
  click: MouseEvent;
  focus: FocusEvent;
  blur: FocusEvent;
}
```

### 3.3 组件职责划分

#### 基础组件（Components）
- **职责**：纯UI展示，无业务逻辑
- **特征**：高复用性，无状态管理
- **示例**：Button, Input, Card, Badge

```svelte
<!-- ✓ 正确：基础组件只处理UI -->
<Button variant="primary" on:click>
  提交
</Button>

<!-- ✗ 错误：基础组件不应包含业务逻辑 -->
<Button on:click={submitLawyerProfile}>
  提交律师信息
</Button>
```

#### 布局组件（Layouts）
- **职责**：页面结构，容器布局
- **特征**：包含插槽（slots），响应式
- **示例**：Navigation, Footer, Hero, Section

#### 业务组件（Domain）
- **职责**：特定业务逻辑，数据处理
- **特征**：组合基础组件，包含状态
- **示例**：LawyerCard, NewsCard, ContactForm

```svelte
<!-- ✓ 正确：业务组件组合基础组件 -->
<Card variant="elevated">
  <img src={lawyer.photo} alt={lawyer.name} />
  <h3>{lawyer.name}</h3>
  <Badge variant="primary">{lawyer.title}</Badge>
  <Button variant="outline" on:click={viewProfile}>
    查看详情
  </Button>
</Card>
```

### 3.4 Props 设计原则

#### 必须提供的 Props
```typescript
// 1. variant（变体）- 视觉样式
export let variant: 'primary' | 'secondary' = 'primary';

// 2. size（尺寸）- 如果组件有多种尺寸
export let size: 'sm' | 'md' | 'lg' = 'md';

// 3. 禁用状态
export let isDisabled: boolean = false;
```

#### 可选的 Props
```typescript
// 加载状态（如果组件支持异步操作）
export let isLoading: boolean = false;

// 自定义类名（允许外部覆盖样式）
export let className: string = '';

// ARIA 属性（可访问性）
export let ariaLabel: string = '';
```

#### Props 默认值规范
```typescript
// ✓ 正确：提供合理的默认值
export let variant: ButtonVariant = 'primary';
export let size: ButtonSize = 'md';

// ✗ 错误：不提供默认值会导致 undefined
export let variant: ButtonVariant;
```

### 3.5 插槽（Slots）使用

#### 默认插槽
```svelte
<button class="btn">
  <slot>默认按钮文字</slot>
</button>
```

#### 命名插槽
```svelte
<div class="card">
  <header class="card__header">
    <slot name="header" />
  </header>

  <div class="card__body">
    <slot />  <!-- 默认内容 -->
  </div>

  <footer class="card__footer">
    <slot name="footer" />
  </footer>
</div>
```

#### 插槽 Fallback
```svelte
<!-- 如果没有提供插槽内容，显示默认UI -->
<slot name="icon">
  <i class="default-icon"></i>
</slot>
```

---

## 四、样式编写规范

### 4.1 SCSS 组织结构

#### 单文件组件样式
```scss
<style lang="scss">
  // 1. 导入变量和 mixins
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  // 2. 块级选择器（BEM Block）
  .button {
    // 3. 基础样式（使用 mixin）
    @include btn-base;

    // 4. 元素样式（BEM Element）
    &__icon {
      margin-right: $spacing-xs;
    }

    // 5. 修饰符样式（BEM Modifier）
    &--primary {
      @include button($color-white, $color-primary, $color-primary);
    }

    &--secondary {
      @include button($color-primary, $color-white, $color-primary);
    }

    // 6. 状态样式
    &.is-active { }
    &.is-disabled { }

    // 7. 响应式样式
    @include respond-from(md) {
      font-size: $font-size-lg;
    }
  }
</style>
```

### 4.2 CSS 属性书写顺序

遵循 **定位 → 盒模型 → 视觉 → 排版 → 其他** 的顺序：

```scss
.element {
  // 1. 定位
  position: absolute;
  top: 0;
  left: 0;
  z-index: $z-index-header;

  // 2. 盒模型
  display: flex;
  width: 100%;
  height: $header-default-height;
  padding: $spacing-md;
  margin: 0 auto;

  // 3. 视觉
  background-color: $color-primary;
  border: $border-width solid $border-color;
  border-radius: $radius-base;
  box-shadow: none;  // Pages 扁平化
  opacity: 1;

  // 4. 排版
  font-family: $font-family-body;
  font-size: $font-size-base;
  font-weight: $font-weight-light;
  line-height: $line-height-base;
  letter-spacing: $letter-spacing-base;
  color: $color-master-dark;
  text-align: center;

  // 5. 其他
  transition: $transition-all;
  cursor: pointer;
}
```

### 4.3 选择器规范

#### 使用类选择器，避免标签选择器
```scss
// ✓ 正确
.button { }
.button__icon { }

// ✗ 错误（除非必要）
button { }
div.button { }
```

#### 嵌套不超过 3 层
```scss
// ✓ 正确
.card {
  &__header {
    &__title { }  // 最多 3 层
  }
}

// ✗ 错误
.card {
  &__header {
    &__title {
      &__icon { }  // 超过 3 层
    }
  }
}
```

#### 避免过度限定
```scss
// ✓ 正确
.button--primary { }

// ✗ 错误
button.button.button--primary { }
```

### 4.4 颜色使用规范

#### 优先使用灰度系统（80%的场景）
```scss
// ✓ 正确：优先使用灰度
.text-primary {
  color: $color-master-dark;  // #2c3e50 深灰
}

.text-secondary {
  color: $color-master;  // #626262 中灰
}

.bg-light {
  background-color: $color-master-lightest;  // #fafafa 浅灰
}
```

#### 语义色仅用于状态标识（20%的场景）
```scss
// ✓ 正确：语义色用于状态
.button--primary {
  background-color: $color-primary;  // 海军蓝
}

.badge--success {
  background-color: $color-success;  // 青绿色
}

.alert--danger {
  background-color: $color-danger;  // 红色
}
```

#### 禁止硬编码颜色
```scss
// ✗ 错误
.element {
  color: #333;
  background: #fff;
}

// ✓ 正确
.element {
  color: $color-master-dark;
  background: $color-white;
}
```

### 4.5 间距使用规范

#### 遵循 5 的倍数规律
```scss
// ✓ 正确：使用变量
margin-top: $spacing-xs;   // 5px
padding: $spacing-sm;      // 10px
margin-bottom: $spacing-md; // 20px
gap: $spacing-lg;          // 30px

// ✗ 错误：随意数字
margin-top: 7px;
padding: 13px;
```

#### Section 区块间距标准
```scss
// Pages 标准：75-85px
section {
  padding-top: $spacing-section-top;     // 75px
  padding-bottom: $spacing-section-bottom; // 85px
}

// 紧凑版
section.compact {
  padding-top: $spacing-section-compact-top;     // 55px
  padding-bottom: $spacing-section-compact-bottom; // 65px
}
```

---

## 五、响应式设计规范

### 5.1 断点系统（Pages Bootstrap 3 标准）

```scss
$breakpoint-xs:  0;       // 手机（<768px）
$breakpoint-sm:  768px;   // 平板
$breakpoint-md:  992px;   // 小桌面
$breakpoint-lg:  1200px;  // 大桌面
$breakpoint-xl:  1920px;  // 超宽屏
```

### 5.2 移动优先策略

#### 默认写移动端样式
```scss
.element {
  // 移动端样式（默认）
  font-size: $font-size-sm;
  padding: $spacing-sm;

  // 平板及以上
  @include respond-from(sm) {
    font-size: $font-size-base;
  }

  // 桌面及以上
  @include respond-from(md) {
    font-size: $font-size-lg;
    padding: $spacing-lg;
  }
}
```

### 5.3 容器最大宽度

```scss
.container {
  max-width: $container-max-width;  // 1140px
}

.container-lg {
  max-width: $container-max-width-lg;  // 1700px（超宽屏）
}

.container-narrow {
  max-width: 960px;  // 文章内容
}
```

### 5.4 响应式工具类

#### 显示/隐藏
```html
<!-- 仅手机显示 -->
<div class="visible-xs hidden-sm hidden-md"></div>

<!-- 仅桌面显示 -->
<div class="hidden-xs hidden-sm visible-md"></div>
```

#### 响应式间距
```html
<!-- 中等屏幕左内边距 20px -->
<div class="md-p-l-20"></div>

<!-- 小屏幕取消内边距 -->
<div class="xs-no-padding"></div>
```

#### 响应式文本对齐
```html
<h1 class="text-center sm-text-left">标题</h1>
```

### 5.5 响应式图片

```scss
// 宽度自适应
.image-responsive-width {
  width: 100%;
  height: auto;
}

// 高度自适应
.image-responsive-height {
  height: 100%;
  width: auto;
}

// 小屏幕切换
.xs-image-responsive-height {
  @include respond-to(xs) {
    height: 100%;
    width: auto;
  }
}
```

---

## 六、可访问性标准（WCAG 2.1 AA）

### 6.1 语义化 HTML

#### 使用正确的标签
```html
<!-- ✓ 正确 -->
<header>
  <nav>
    <ul>
      <li><a href="/about">关于我们</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>标题</h1>
    <p>内容</p>
  </article>
</main>

<footer>
  <p>&copy; 2025 华诚律所</p>
</footer>

<!-- ✗ 错误 -->
<div class="header">
  <div class="nav">
    <div class="link">关于我们</div>
  </div>
</div>
```

### 6.2 ARIA 属性

#### 必须添加的 ARIA
```html
<!-- 按钮 -->
<button aria-label="关闭对话框">
  <i class="icon-close"></i>
</button>

<!-- 加载状态 -->
<button aria-busy="true" aria-live="polite">
  加载中...
</button>

<!-- 展开/折叠 -->
<button
  aria-expanded="false"
  aria-controls="menu-dropdown"
>
  菜单
</button>

<!-- 表单 -->
<label for="email">邮箱</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid="false"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">请输入有效邮箱</span>
```

### 6.3 键盘导航

#### 可聚焦元素
```scss
// 所有交互元素必须有焦点样式
button, a, input, textarea, select {
  &:focus {
    outline: $focus-ring-width solid $focus-ring-color;
    outline-offset: $focus-ring-offset;
  }

  // 仅键盘聚焦时显示（去除鼠标点击轮廓）
  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: $focus-ring-width solid $focus-ring-color;
  }
}
```

#### Tab 顺序
```html
<!-- 使用 tabindex 控制顺序 -->
<button tabindex="1">第一个</button>
<button tabindex="2">第二个</button>

<!-- 隐藏元素不可聚焦 -->
<button tabindex="-1" aria-hidden="true">不可聚焦</button>
```

### 6.4 色彩对比度

#### 最低对比度要求（WCAG AA）
```scss
// 文字与背景对比度 ≥ 4.5:1
.text-on-white {
  color: $color-master-dark;  // #2c3e50 vs #fff = 8.59:1 ✓
}

// 大文字（≥18px 或粗体≥14px）对比度 ≥ 3:1
.large-text {
  font-size: $font-size-h3;  // 27px
  color: $color-master;      // #626262 vs #fff = 4.54:1 ✓
}
```

#### 验证工具
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- Accessible Colors

### 6.5 屏幕阅读器支持

```html
<!-- 隐藏装饰性元素 -->
<img src="decoration.svg" alt="" aria-hidden="true" />

<!-- 提供替代文本 -->
<img src="lawyer.jpg" alt="张律师，华诚高级合伙人" />

<!-- 跳过导航链接 -->
<a href="#main-content" class="skip-link">
  跳转到主内容
</a>

<main id="main-content">
  <!-- 主要内容 -->
</main>
```

---

## 七、性能优化规范

### 7.1 CSS 性能

#### 避免昂贵的选择器
```scss
// ✗ 错误：通配符选择器
* { box-sizing: border-box; }

// ✓ 正确：限定范围
.component * { box-sizing: border-box; }

// ✗ 错误：属性选择器
input[type="text"] { }

// ✓ 正确：类选择器
.input-text { }
```

#### 减少重绘和重排
```scss
// ✓ 正确：使用 transform（GPU 加速）
.element {
  transform: translateY(-2px);
  transition: transform $transition-base;
}

// ✗ 错误：使用 top/left（触发重排）
.element {
  position: relative;
  top: -2px;
  transition: top $transition-base;
}
```

### 7.2 图片优化

```html
<!-- 响应式图片 -->
<img
  src="lawyer-400.jpg"
  srcset="
    lawyer-400.jpg 400w,
    lawyer-800.jpg 800w,
    lawyer-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="张律师"
  loading="lazy"
/>

<!-- WebP 格式优先 -->
<picture>
  <source srcset="image.webp" type="image/webp" />
  <source srcset="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="..." />
</picture>
```

### 7.3 字体加载优化

```html
<!-- Google Fonts 优化加载 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

```scss
// 仅加载需要的字重
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

// 字体展示策略
body {
  font-family: $font-family-body;
  font-display: swap;  // 避免 FOIT（Flash of Invisible Text）
}
```

### 7.4 组件懒加载

```svelte
<script>
  import { onMount } from 'svelte';

  let Component;

  onMount(async () => {
    // 动态导入重量级组件
    const module = await import('./HeavyComponent.svelte');
    Component = module.default;
  });
</script>

{#if Component}
  <svelte:component this={Component} />
{/if}
```

---

## 八、代码质量检查清单

### 8.1 提交前检查（Pre-commit）

#### 必须通过的检查
```bash
# 1. TypeScript 类型检查
npm run check

# 2. ESLint 代码规范
npm run lint

# 3. Prettier 格式化
npm run format

# 4. 单元测试（如果有）
npm run test
```

#### 手动检查项
- [ ] 所有颜色使用 SCSS 变量
- [ ] 所有间距使用 5 的倍数
- [ ] 按钮和卡片无 box-shadow
- [ ] 圆角使用 `$radius-base`（3px）
- [ ] 字体默认 `font-weight: 300`
- [ ] 过渡动画 ≤ 0.4s

### 8.2 组件完成检查

#### 功能检查
- [ ] Props 有默认值
- [ ] 支持所有必需的变体（variant/size）
- [ ] 支持禁用状态（isDisabled）
- [ ] 事件正确触发（click/focus/blur）
- [ ] 插槽正常工作

#### 样式检查
- [ ] 移动端优先（默认写手机样式）
- [ ] 响应式断点正确
- [ ] 无硬编码颜色/尺寸
- [ ] BEM 命名规范
- [ ] SCSS 嵌套 ≤ 3 层

#### 可访问性检查
- [ ] 语义化 HTML 标签
- [ ] ARIA 属性完整
- [ ] 键盘可导航（Tab/Enter）
- [ ] 焦点样式清晰
- [ ] 色彩对比度 ≥ 4.5:1
- [ ] 屏幕阅读器友好

#### 性能检查
- [ ] 图片使用懒加载
- [ ] 避免昂贵的选择器
- [ ] 动画使用 transform（GPU加速）
- [ ] 组件按需加载

#### 文档检查
- [ ] Props 类型定义完整
- [ ] 使用示例清晰
- [ ] 注释充分（特殊逻辑）

### 8.3 代码审查（Code Review）标准

#### 必须拒绝的情况
- ❌ 使用内联样式
- ❌ 硬编码颜色/尺寸
- ❌ 按钮/卡片有 box-shadow
- ❌ 过渡动画 > 0.4s
- ❌ 没有 TypeScript 类型
- ❌ 缺少可访问性属性

#### 建议优化的情况
- ⚠️ SCSS 嵌套超过 3 层
- ⚠️ 选择器过于复杂
- ⚠️ 重复代码（应提取 mixin）
- ⚠️ Props 命名不清晰
- ⚠️ 缺少注释

---

## 附录 A：快速参考

### 常用变量
```scss
// 颜色
$color-primary              // 海军蓝 #0E1B3A
$color-secondary            // 金色 #B5975A
$color-master-dark          // 深灰 #2c3e50（标题）
$color-master               // 中灰 #626262（正文）
$color-master-lightest      // 浅灰 #fafafa（背景）

// 字号
$font-size-h1               // 44px
$font-size-base             // 14px
$font-size-p                // 16px

// 间距
$spacing-xs                 // 5px
$spacing-sm                 // 10px
$spacing-md                 // 20px
$spacing-lg                 // 30px

// 圆角
$radius-base                // 3px（Pages 标准）

// 过渡
$transition-fast            // 0.1s
$transition-base            // 0.2s
$transition-slow            // 0.4s
```

### 常用 Mixins
```scss
@include btn-base;                    // 按钮基础样式
@include button($text, $bg, $border); // 按钮变体
@include heading(h1);                 // 标题样式
@include block-title;                 // BlockTitle 组件
@include form-control;                // 表单控件
@include panel;                       // 卡片/面板
@include respond-from(md);            // 响应式断点
@include container;                   // 容器
@include full-vh;                     // 全屏高度
```

### Pages 工具类
```scss
// 间距
.m-t-20, .m-b-30, .p-l-10, .p-r-20
.no-padding, .no-margin

// 响应式
.visible-xs, .hidden-sm, .xs-no-padding

// 布局
.full-height, .full-vh
.pull-left, .pull-right
.col-xs-height, .col-middle

// 文本
.text-center, .small-text, .hint-text, .block-title
```

---

## 附录 B：常见问题

### Q1: 何时使用 box-shadow？
**A**: Pages 是扁平化设计，按钮和卡片**不使用阴影**。仅在必要时（如 Modal 浮层）可添加微妙阴影（`$shadow-sm`）。

### Q2: 为什么字体默认 font-weight: 300？
**A**: Pages 设计语言强调轻盈感，通过字号区分层级而非字重。仅在 Montserrat 标题时使用 400/700。

### Q3: 何时使用语义色（success/danger）？
**A**: 仅用于状态标识（20%场景），其余 80% 使用灰度系统。避免过度使用彩色。

### Q4: 如何处理中英文混排？
**A**: 标题优先使用 Montserrat（`$font-family-heading`），正文使用系统字体（`$font-family-body`），自动回退到中文字体。

### Q5: 何时使用 Tailwind CSS？
**A**: **永远不使用**。本项目纯 SCSS，使用 Pages 的工具类系统（`.m-t-20`, `.full-vh` 等）。

---

## 更新日志

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| v1.0 | 2025-11-06 | 初版发布，基于 Pages.Revox.io 设计语言 |

---

**文档维护**: Design Agent
**审核**: Project Manager Agent
**最后更新**: 2025-11-06
