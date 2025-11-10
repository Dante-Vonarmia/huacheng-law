/**
 * Typography 组件类型定义
 * 基于 Pages.Revox.io 设计语言
 */

/**
 * HTML 标签类型
 */
export type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

/**
 * 字号变体（Pages 标准层级）
 * - h1-mega: 110px（Hero 超大标题）
 * - h1: 44px
 * - h2: 31px
 * - h3: 27px
 * - h4: 22px
 * - h5: 18px
 * - h6: 16px
 * - p: 16px（段落）
 * - small: 12px
 * - xs: 11px
 */
export type TypographyVariant =
  | 'h1'
  | 'h1-mega'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'small'
  | 'xs';

/**
 * 字重（Pages 标准：默认 300）
 */
export type TypographyWeight = '300' | '400' | '500' | '600' | '700';

/**
 * 颜色变体
 */
export type TypographyColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'master-dark'
  | 'master'
  | 'light'
  | 'white';

/**
 * 文本对齐
 */
export type TypographyAlign = 'left' | 'center' | 'right';

/**
 * Typography 组件 Props
 */
export interface TypographyProps {
  /**
   * HTML 标签
   * @default 'p'
   */
  tag?: TypographyTag;

  /**
   * 字号变体
   * @default 'p'
   */
  variant?: TypographyVariant;

  /**
   * 字重（Pages 默认 300）
   * @default '300'
   */
  weight?: TypographyWeight;

  /**
   * 颜色变体
   * @default 'default'
   */
  color?: TypographyColor;

  /**
   * 文本对齐
   * @default 'left'
   */
  align?: TypographyAlign;

  /**
   * 自定义 CSS 类名
   * @default ''
   */
  className?: string;
}

/**
 * Typography 组件插槽
 */
export interface TypographySlots {
  /**
   * 默认插槽（文本内容）
   */
  default: Record<string, never>;
}
