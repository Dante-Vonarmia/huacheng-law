/**
 * LawyerCard 组件类型定义
 * 律师卡片组件
 */

/**
 * LawyerCard 变体
 * - default: 默认样式（图片 + 信息）
 * - compact: 紧凑样式（仅头像 + 姓名）
 * - detailed: 详细样式（包含专业领域、简介）
 */
export type LawyerCardVariant = 'default' | 'compact' | 'detailed';

/**
 * 律师数据
 */
export interface Lawyer {
  /**
   * 律师 ID
   */
  id: string;

  /**
   * 姓名（中文）
   */
  nameCn: string;

  /**
   * 姓名（英文）
   */
  nameEn?: string;

  /**
   * 职位/职称
   */
  title: string;

  /**
   * 头像 URL
   */
  avatarUrl: string;

  /**
   * 专业领域列表
   */
  practiceAreas?: string[];

  /**
   * 简介
   */
  bio?: string;

  /**
   * 邮箱
   */
  email?: string;

  /**
   * 电话
   */
  phone?: string;

  /**
   * 详情页链接
   */
  detailUrl?: string;
}

/**
 * LawyerCard 组件 Props
 */
export interface LawyerCardProps {
  /**
   * 律师数据
   */
  lawyer: Lawyer;

  /**
   * 卡片变体
   * @default 'default'
   */
  variant?: LawyerCardVariant;

  /**
   * 是否显示联系方式
   * @default false
   */
  showContact?: boolean;

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
 * LawyerCard 组件事件
 */
export interface LawyerCardEvents {
  /**
   * 卡片点击事件
   */
  click: { lawyer: Lawyer };

  /**
   * 联系按钮点击事件
   */
  contact: { lawyer: Lawyer; type: 'email' | 'phone' };
}

/**
 * LawyerCard 组件插槽
 */
export interface LawyerCardSlots {
  /**
   * 卡片底部额外内容
   */
  footer?: { lawyer: Lawyer };
}
