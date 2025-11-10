/**
 * UI Kit Styles - 样式系统
 *
 * SCSS 文件不能通过 JavaScript/TypeScript 导出
 * 请在 .svelte 文件中通过 @use 或 @import 引入
 *
 * @example
 * ```scss
 * <style lang="scss">
 *   @use '$ui/styles/variables.scss' as *;
 *   @use '$ui/styles/mixins.scss' as *;
 *
 *   .my-component {
 *     color: $color-primary;
 *     @include respond-to('mobile') {
 *       font-size: 14px;
 *     }
 *   }
 * </style>
 * ```
 */

/**
 * 样式文件路径
 */
export const STYLE_PATHS = {
  variables: '$ui/styles/variables.scss',
  mixins: '$ui/styles/mixins.scss',
  global: '$ui/styles/global.scss'
} as const;

/**
 * 样式使用文档
 */
export const STYLE_DOCS = `
# UI Kit 样式系统

## 使用方式

在 Svelte 组件中引入样式:

\`\`\`scss
<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .my-component {
    color: $color-primary;
    padding: $spacing-md;

    @include respond-to('mobile') {
      padding: $spacing-sm;
    }
  }
</style>
\`\`\`

## 可用变量

### 颜色变量
- $color-primary: #1a5f3f
- $color-secondary: #c9a858
- $color-accent: #2d8659
- $color-text-primary: #1a1a1a
- $color-text-secondary: #4a4a4a
- $color-text-tertiary: #8a8a8a

### 间距变量
- $spacing-xs: 4px
- $spacing-sm: 8px
- $spacing-md: 16px
- $spacing-lg: 24px
- $spacing-xl: 32px
- $spacing-2xl: 48px

### 断点变量
- $breakpoint-mobile: 768px
- $breakpoint-tablet: 1024px
- $breakpoint-desktop: 1280px
- $breakpoint-wide: 1920px

## 可用 Mixins

### 响应式断点
\`\`\`scss
@include respond-to('mobile') { /* 768px 以下 */ }
@include respond-to('tablet') { /* 768px - 1024px */ }
@include respond-to('desktop') { /* 1024px 以上 */ }
\`\`\`

### 其他常用 Mixins
请查看 mixins.scss 文件了解更多可用的 mixins。
`;

// 导出类型定义（如果需要）
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';
export type ColorVariant = 'primary' | 'secondary' | 'accent';
export type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
