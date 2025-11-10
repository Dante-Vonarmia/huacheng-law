/**
 * PracticeCard 组件类型定义
 * 业务领域卡片组件
 */

/**
 * PracticeCard 变体
 * - default: 默认样式（图标 + 标题 + 描述）
 * - horizontal: 水平布局
 * - minimal: 极简样式（仅图标 + 标题）
 */
export type PracticeCardVariant = 'default' | 'horizontal' | 'minimal';

/**
 * 业务领域数据
 */
export interface PracticeArea {
  /**
   * 业务领域 ID
   */
  id: string;

  /**
   * 名称（中文）
   */
  nameCn: string;

  /**
   * 名称（英文）
   */
  nameEn?: string;

  /**
   * 图标（可以是 emoji、SVG 路径或图标类名）
   */
  icon?: string;

  /**
   * 图片 URL（如果提供，优先于 icon）
   */
  imageUrl?: string;

  /**
   * 简介
   */
  description?: string;

  /**
   * 关联律师数量
   */
  lawyerCount?: number;

  /**
   * 案例数量
   */
  caseCount?: number;

  /**
   * 详情页链接
   */
  detailUrl?: string;
}

/**
 * PracticeCard 组件 Props
 */
export interface PracticeCardProps {
  /**
   * 业务领域数据
   */
  practice: PracticeArea;

  /**
   * 卡片变体
   * @default 'default'
   */
  variant?: PracticeCardVariant;

  /**
   * 是否显示统计信息（律师数、案例数）
   * @default true
   */
  showStats?: boolean;

  /**
   * 是否可点击（点击跳转详情页）
   * @default true
   */
  clickable?: boolean;

  /**
   * 自定义 CSS 类名
   * @default ''
   */
  className?: string;
}

/**
 * PracticeCard 组件事件
 */
export interface PracticeCardEvents {
  /**
   * 卡片点击事件
   */
  click: { practice: PracticeArea };
}

/**
 * PracticeCard 组件插槽
 */
export interface PracticeCardSlots {
  /**
   * 自定义图标区域
   */
  icon?: { practice: PracticeArea };

  /**
   * 卡片底部额外内容
   */
  footer?: { practice: PracticeArea };
}
