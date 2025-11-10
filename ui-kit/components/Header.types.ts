/**
 * Header 组件类型定义
 * Pages.Revox.io 标准导航栏
 */

/**
 * Header 变体
 * - default: 默认导航栏（白色背景）
 * - transparent: 透明导航栏（滚动后变白）
 * - dark: 深色导航栏（深色背景）
 */
export type HeaderVariant = 'default' | 'transparent' | 'dark';

/**
 * 导航链接项
 */
export interface NavLink {
  /**
   * 链接文字
   */
  label: string;

  /**
   * 链接地址
   */
  href: string;

  /**
   * 是否激活
   */
  active?: boolean;

  /**
   * 子菜单（可选）
   */
  children?: NavLink[];
}

/**
 * Header 组件 Props
 */
export interface HeaderProps {
  /**
   * Header 变体
   * @default 'default'
   */
  variant?: HeaderVariant;

  /**
   * 导航链接列表
   */
  navLinks?: NavLink[];

  /**
   * Logo 图片 URL
   * @default undefined
   */
  logoSrc?: string;

  /**
   * Logo 文字（如果没有图片）
   * @default '华诚律师事务所'
   */
  logoText?: string;

  /**
   * Logo 链接地址
   * @default '/'
   */
  logoHref?: string;

  /**
   * 滚动多少像素后变为不透明
   * @default 50
   */
  scrollThreshold?: number;

  /**
   * 自定义 CSS 类名
   * @default ''
   */
  className?: string;
}

/**
 * Header 组件事件
 */
export interface HeaderEvents {
  /**
   * 导航链接点击事件
   */
  navClick: { link: NavLink };

  /**
   * 移动端菜单切换事件
   */
  menuToggle: { isOpen: boolean };
}

/**
 * Header 组件插槽
 */
export interface HeaderSlots {
  /**
   * Logo 插槽（可选，覆盖默认 logo）
   */
  logo?: Record<string, never>;

  /**
   * 导航右侧额外内容（如语言切换、搜索按钮）
   */
  actions?: Record<string, never>;
}
