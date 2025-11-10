/**
 * Footer 组件类型定义
 * Pages.Revox.io 标准页脚
 */

/**
 * Footer 链接分组
 */
export interface FooterLinkGroup {
  /**
   * 分组标题
   */
  title: string;

  /**
   * 链接列表
   */
  links: FooterLink[];
}

/**
 * Footer 链接项
 */
export interface FooterLink {
  /**
   * 链接文字
   */
  label: string;

  /**
   * 链接地址
   */
  href: string;

  /**
   * 是否在新窗口打开
   */
  target?: '_blank' | '_self';
}

/**
 * 社交媒体链接
 */
export interface SocialLink {
  /**
   * 社交平台名称
   */
  platform: 'wechat' | 'weibo' | 'linkedin' | 'twitter' | 'facebook';

  /**
   * 链接地址
   */
  href: string;

  /**
   * 图标名称（可选，用于自定义图标）
   */
  icon?: string;

  /**
   * 辅助文字
   */
  label?: string;
}

/**
 * Footer 组件 Props
 */
export interface FooterProps {
  /**
   * 公司名称
   * @default '华诚律师事务所'
   */
  companyName?: string;

  /**
   * 版权年份
   * @default 当前年份
   */
  copyrightYear?: number;

  /**
   * 公司简介
   */
  description?: string;

  /**
   * 链接分组列表
   */
  linkGroups?: FooterLinkGroup[];

  /**
   * 社交媒体链接
   */
  socialLinks?: SocialLink[];

  /**
   * ICP 备案号
   */
  icpNumber?: string;

  /**
   * 公安备案号
   */
  policeNumber?: string;

  /**
   * 自定义 CSS 类名
   * @default ''
   */
  className?: string;
}

/**
 * Footer 组件插槽
 */
export interface FooterSlots {
  /**
   * 底部额外内容插槽（如法律声明、隐私政策）
   */
  bottom?: Record<string, never>;

  /**
   * 公司信息插槽（覆盖默认 description）
   */
  company?: Record<string, never>;
}
