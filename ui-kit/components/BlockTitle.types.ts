/**
 * BlockTitle 组件类型定义
 * Pages.Revox.io 特色标题组件
 */

/**
 * BlockTitle 变体
 * - default: 默认灰色（hint-text）
 * - light: 白色文字（用于深色背景）
 * - dark: 深灰文字（用于浅色背景）
 */
export type BlockTitleVariant = 'default' | 'light' | 'dark';

/**
 * BlockTitle 组件 Props
 */
export interface BlockTitleProps {
  /**
   * 标题变体
   * @default 'default'
   */
  variant?: BlockTitleVariant;

  /**
   * 自定义 CSS 类名
   * @default ''
   */
  className?: string;
}

/**
 * BlockTitle 组件插槽
 */
export interface BlockTitleSlots {
  /**
   * 默认插槽（标题文字内容）
   */
  default: Record<string, never>;
}
