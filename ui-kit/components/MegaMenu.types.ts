/**
 * MegaMenu Types - 超级菜单组件类型定义
 * 支持多列布局的下拉菜单
 */

export interface MegaMenuItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface MegaMenuColumn {
  id: string;
  title?: string;
  items: MegaMenuItem[];
}

export interface MegaMenuProps {
  /** 菜单列数组 */
  columns: MegaMenuColumn[];
  /** 是否显示 */
  isOpen: boolean;
  /** 最大宽度 */
  maxWidth?: string;
  /** 类名 */
  className?: string;
}
