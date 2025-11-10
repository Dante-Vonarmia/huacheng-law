/**
 * Hero 组件类型定义
 * Pages.Revox.io 全屏视差轮播组件
 */

/**
 * Hero 幻灯片项
 */
export interface HeroSlide {
  /**
   * 唯一标识
   */
  id: string;

  /**
   * 背景图片 URL
   */
  imageUrl: string;

  /**
   * 主标题
   */
  title: string;

  /**
   * 副标题（可选）
   */
  subtitle?: string;

  /**
   * 描述文字（可选）
   */
  description?: string;

  /**
   * CTA 按钮文字（可选）
   */
  ctaText?: string;

  /**
   * CTA 按钮链接（可选）
   */
  ctaLink?: string;

  /**
   * 文字颜色（深色或浅色）
   */
  textColor?: 'light' | 'dark';

  /**
   * 文字对齐方式
   */
  textAlign?: 'left' | 'center' | 'right';

  /**
   * 内容垂直位置
   */
  contentPosition?: 'top' | 'center' | 'bottom';
}

/**
 * Hero 组件 Props
 */
export interface HeroProps {
  /**
   * 幻灯片列表
   */
  slides: HeroSlide[];

  /**
   * 是否自动播放
   * @default true
   */
  autoplay?: boolean;

  /**
   * 自动播放间隔（毫秒）
   * @default 5000
   */
  autoplayDelay?: number;

  /**
   * 是否循环播放
   * @default true
   */
  loop?: boolean;

  /**
   * 是否显示导航箭头
   * @default true
   */
  showNavigation?: boolean;

  /**
   * 是否显示分页器（小圆点）
   * @default true
   */
  showPagination?: boolean;

  /**
   * 是否启用视差效果
   * @default true
   */
  parallax?: boolean;

  /**
   * 视差速度（0-1，值越小移动越慢）
   * @default 0.5
   */
  parallaxSpeed?: number;

  /**
   * Hero 高度
   * @default '100vh'
   */
  height?: string;

  /**
   * 自定义 CSS 类名
   * @default ''
   */
  className?: string;
}

/**
 * Hero 组件事件
 */
export interface HeroEvents {
  /**
   * 幻灯片切换事件
   */
  slideChange: { currentIndex: number; currentSlide: HeroSlide };

  /**
   * CTA 按钮点击事件
   */
  ctaClick: { slide: HeroSlide };
}

/**
 * Hero 组件插槽
 */
export interface HeroSlots {
  /**
   * 自定义幻灯片内容（覆盖默认布局）
   */
  slide?: { slide: HeroSlide; index: number };

  /**
   * 自定义导航箭头
   */
  navigation?: Record<string, never>;

  /**
   * 自定义分页器
   */
  pagination?: Record<string, never>;
}
