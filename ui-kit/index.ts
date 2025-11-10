/**
 * UI Kit - 华诚律所组件库
 *
 * 统一导出所有组件、布局和工具
 *
 * @packageDocumentation
 */

// ============================================
// 基础组件 (Components)
// ============================================
export {
  // 基础组件
  Typography,
  Button,
  Card,
  Input,
  Textarea,
  Link,
  Badge,

  // 高级组件
  Stats,
  Timeline,
  Testimonial,
  LogoCloud,
  Modal,
  Accordion,
  Tabs
} from './components';

// ============================================
// 布局组件 (Layouts)
// ============================================
export {
  Hero,
  Navigation,
  Footer,
  Section
} from './layouts';

// ============================================
// 业务组件 (Domain Components)
// ============================================
export {
  LawyerCard,
  NewsCard,
  PracticeCard,
  ContactForm
} from './domain';

// ============================================
// 样式工具 (Styles)
// ============================================
// SCSS文件需要通过 @use 或 @import 引入，不能通过 JS 导出
// 使用方式:
// @use '$ui/styles/variables.scss' as *;
// @use '$ui/styles/mixins.scss' as *;

/**
 * 组件库版本
 */
export const VERSION = '1.0.0';

/**
 * 组件库信息
 */
export const UI_KIT_INFO = {
  name: 'Watson & Band UI Kit',
  version: VERSION,
  description: '华诚律师事务所组件库',
  author: 'Watson & Band Law Firm',
  license: 'Proprietary'
};
