/**
 * 首页 Banner 轮播数据 (Mock Data)
 * 图片来源：华诚律所官网
 */

export interface BannerSlide {
  id: string;
  image: string;
  image_mobile?: string;
  title_zh: string;
  title_en: string;
  subtitle_zh?: string;
  subtitle_en?: string;
  cta?: {
    text_zh: string;
    text_en: string;
    link: string;
  };
}

export const bannerSlides: BannerSlide[] = [
  {
    id: '1',
    image: '/images/banner/banner-1.jpg',
    title_zh: '专业的法律服务团队',
    title_en: 'Professional Legal Team',
    subtitle_zh: '30年行业经验，值得信赖',
    subtitle_en: '30 Years of Experience',
    cta: {
      text_zh: '了解更多',
      text_en: 'Learn More',
      link: '/about',
    },
  },
  {
    id: '2',
    image: '/images/banner/banner-2.jpg',
    title_zh: '全方位法律解决方案',
    title_en: 'Comprehensive Legal Solutions',
    subtitle_zh: '涵盖13个专业领域',
    subtitle_en: 'Covering 13 Practice Areas',
    cta: {
      text_zh: '查看服务',
      text_en: 'Our Services',
      link: '/practices',
    },
  },
  {
    id: '3',
    image: '/images/banner/banner-3.jpg',
    title_zh: '服务全球客户',
    title_en: 'Serving Global Clients',
    subtitle_zh: '上海、北京、香港等6地办公室',
    subtitle_en: 'Offices in Shanghai, Beijing, Hong Kong and more',
    cta: {
      text_zh: '联系我们',
      text_en: 'Contact Us',
      link: '/contact',
    },
  },
];

export const bannerConfig = {
  autoplay: true,
  interval: 5000,
  transition: 'fade' as const,
  showDots: true,
  showArrows: true,
  pauseOnHover: true,
};
