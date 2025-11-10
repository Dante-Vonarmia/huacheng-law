/**
 * Section 组件类型定义
 * Pages.Revox.io 标准容器组件
 */

/**
 * Section 变体
 * - default: 标准间距（75px/85px）
 * - compact: 紧凑间距（55px/65px）
 */
export type SectionVariant = 'default' | 'compact';

/**
 * Section 背景颜色
 * - white: 白色背景
 * - lightest: 浅灰背景（#fafafa）
 * - alt: 备用背景色
 */
export type SectionBgColor = 'white' | 'lightest' | 'alt';

/**
 * Section 组件 Props
 */
export interface SectionProps {
  /**
   * 间距变体
   * @default 'default'
   */
  variant?: SectionVariant;

  /**
   * 背景颜色
   * @default 'white'
   */
  bgColor?: SectionBgColor;

  /**
   * 是否使用容器（.container）
   * @default true
   */
  useContainer?: boolean;

  /**
   * 自定义 CSS 类名
   * @default ''
   */
  className?: string;
}

/**
 * Section 组件插槽
 */
export interface SectionSlots {
  /**
   * 默认插槽（Section 内容）
   */
  default: Record<string, never>;
}
