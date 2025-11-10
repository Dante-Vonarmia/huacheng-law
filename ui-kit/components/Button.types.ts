/**
 * Button 组件类型定义
 * 基于 Pages.Revox.io 设计语言
 */

/**
 * 按钮变体
 * - primary: 主按钮（海军蓝）
 * - secondary: 次要按钮（金色）
 * - outline: 轮廓按钮（无背景，有边框）
 * - link: 链接按钮（无边框，无背景）
 * - black: 黑色按钮（Pages 标准）
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link' | 'black';

/**
 * 按钮尺寸
 * - sm: 小尺寸（padding: 16px）
 * - md: 默认尺寸（padding: 17px）
 * - lg: 大尺寸（padding: 28px）
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * 按钮类型（HTML button type 属性）
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Button 组件 Props
 */
export interface ButtonProps {
  /**
   * 按钮变体
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * 按钮尺寸
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * 禁用状态
   * @default false
   */
  isDisabled?: boolean;

  /**
   * 加载状态（显示加载动画）
   * @default false
   */
  isLoading?: boolean;

  /**
   * 全宽按钮
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 链接地址（如果提供，渲染为 <a> 标签）
   * @default undefined
   */
  href?: string;

  /**
   * 按钮类型（仅在渲染 <button> 时生效）
   * @default 'button'
   */
  type?: ButtonType;

  /**
   * 自定义 CSS 类名
   * @default ''
   */
  className?: string;
}

/**
 * Button 组件事件
 */
export interface ButtonEvents {
  /**
   * 点击事件
   */
  click: MouseEvent;

  /**
   * 获得焦点事件
   */
  focus: FocusEvent;

  /**
   * 失去焦点事件
   */
  blur: FocusEvent;
}

/**
 * Button 组件插槽
 */
export interface ButtonSlots {
  /**
   * 默认插槽（按钮文字内容）
   */
  default: Record<string, never>;
}
