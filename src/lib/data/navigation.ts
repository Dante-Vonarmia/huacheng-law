/**
 * 导航菜单数据 - 基于华诚律所官网
 * Navigation Menu Data - Based on Watson & Band website
 */

export interface NavItem {
  id: string;
  label_zh: string;
  label_en: string;
  path: string;
  children?: NavItem[];
  /** Mega menu配置 - 多列布局 */
  megaMenu?: {
    columns: Array<{
      id: string;
      title_zh?: string;
      title_en?: string;
      items: NavItem[];
    }>;
  };
}

// 主导航菜单（与官网保持一致）
export const mainNavigation: NavItem[] = [
  {
    id: 'home',
    label_zh: '首页',
    label_en: 'HOME',
    path: '/',
  },
  {
    id: 'about',
    label_zh: '关于华诚',
    label_en: 'ABOUT US',
    path: '/about',
  },
  {
    id: 'practices',
    label_zh: '业务领域',
    label_en: 'PRACTICE AREAS',
    path: '/practices',
    megaMenu: {
      columns: [
        {
          id: 'practices-col-1',
          title_zh: '核心业务',
          title_en: 'Core Practices',
          items: [
            {
              id: 'practice-1',
              label_zh: '知识产权',
              label_en: 'Intellectual Property',
              path: '/practices/intellectual-property',
            },
            {
              id: 'practice-2',
              label_zh: '公司及商业法务',
              label_en: 'Corporate and Commercial',
              path: '/practices/corporate-commercial',
            },
            {
              id: 'practice-3',
              label_zh: '数据相关法律及知识产权',
              label_en: 'Data-related Legal and IP',
              path: '/practices/data-legal-ip',
            },
            {
              id: 'practice-4',
              label_zh: '资本市场',
              label_en: 'Capital Market',
              path: '/practices/capital-market',
            },
            {
              id: 'practice-5',
              label_zh: '金融及资产管理',
              label_en: 'Financial & Asset Management',
              path: '/practices/financial-asset-management',
            },
          ],
        },
        {
          id: 'practices-col-2',
          title_zh: '行业专长',
          title_en: 'Industry Expertise',
          items: [
            {
              id: 'practice-6',
              label_zh: '重组及破产',
              label_en: 'Restructuring & Insolvency',
              path: '/practices/restructuring-insolvency',
            },
            {
              id: 'practice-7',
              label_zh: '文化、娱乐及体育',
              label_en: 'Culture, Entertainment & Sports',
              path: '/practices/culture-entertainment-sports',
            },
            {
              id: 'practice-8',
              label_zh: '建筑、房地产及基础设施',
              label_en: 'Construction & Real Estate',
              path: '/practices/construction-real-estate',
            },
            {
              id: 'practice-9',
              label_zh: '劳动及雇佣',
              label_en: 'Labor & Employment',
              path: '/practices/labor-employment',
            },
          ],
        },
        {
          id: 'practices-col-3',
          title_zh: '专业服务',
          title_en: 'Professional Services',
          items: [
            {
              id: 'practice-10',
              label_zh: '家族法及财富管理',
              label_en: 'Family Law & Wealth Management',
              path: '/practices/family-wealth-management',
            },
            {
              id: 'practice-11',
              label_zh: '贸易、海关及税务',
              label_en: 'Trade, Customs & Taxation',
              path: '/practices/trade-customs-taxation',
            },
            {
              id: 'practice-12',
              label_zh: '诉讼及争议解决',
              label_en: 'Litigation & Dispute Resolution',
              path: '/practices/litigation-dispute-resolution',
            },
            {
              id: 'practice-13',
              label_zh: '调查',
              label_en: 'Investigation',
              path: '/practices/investigation',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'people',
    label_zh: '专业人士',
    label_en: 'OUR PEOPLE',
    path: '/team',
    megaMenu: {
      columns: [
        {
          id: 'people-col-1',
          title_zh: '我们的团队',
          title_en: 'Our Team',
          items: [
            {
              id: 'professionals',
              label_zh: '律师团队',
              label_en: 'PROFESSIONALS',
              path: '/team',
            },
            {
              id: 'partners',
              label_zh: '合伙人',
              label_en: 'PARTNERS',
              path: '/team?filter=partner',
            },
            {
              id: 'associates',
              label_zh: '律师',
              label_en: 'ASSOCIATES',
              path: '/team?filter=associate',
            },
          ],
        },
        {
          id: 'people-col-2',
          title_zh: '加入华诚',
          title_en: 'Join Us',
          items: [
            {
              id: 'careers',
              label_zh: '招聘职位',
              label_en: 'CAREER OPPORTUNITIES',
              path: '/careers',
            },
            {
              id: 'culture',
              label_zh: '企业文化',
              label_en: 'OUR CULTURE',
              path: '/about#culture',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'news',
    label_zh: '新闻与出版物',
    label_en: 'NEWS & PUBLICATIONS',
    path: '/publications',
    megaMenu: {
      columns: [
        {
          id: 'news-col-1',
          title_zh: '动态资讯',
          title_en: 'News & Updates',
          items: [
            {
              id: 'watson-news',
              label_zh: '华诚最新动态',
              label_en: 'Latest on Watson & Band',
              path: '/news/watson-band',
            },
            {
              id: 'legal-news',
              label_zh: '最新法律新闻',
              label_en: 'Latest Legal News',
              path: '/news/legal',
            },
          ],
        },
        {
          id: 'news-col-2',
          title_zh: '资源中心',
          title_en: 'Resources',
          items: [
            {
              id: 'publications',
              label_zh: '出版物',
              label_en: 'Publications',
              path: '/publications',
            },
            {
              id: 'videos',
              label_zh: '视频',
              label_en: 'Videos',
              path: '/videos',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'events',
    label_zh: '研讨会与活动',
    label_en: 'SEMINARS & EVENTS',
    path: '/events',
  },
  {
    id: 'contact',
    label_zh: '联系我们',
    label_en: 'CONTACT US',
    path: '/contact',
  },
];

// Footer 快速链接
export const footerLinks = {
  about: {
    title_zh: '关于华诚',
    title_en: 'About Us',
    links: [
      { label_zh: '律所简介', label_en: 'Introduction', path: '/about#introduction' },
      { label_zh: '发展历程', label_en: 'History', path: '/about#history' },
      { label_zh: '业务结构', label_en: 'Structure', path: '/about#structure' },
      { label_zh: '荣誉资质', label_en: 'Honors', path: '/about#honors' },
    ],
  },
  services: {
    title_zh: '业务领域',
    title_en: 'Practice Areas',
    links: [
      { label_zh: '知识产权', label_en: 'Intellectual Property', path: '/practices/intellectual-property' },
      { label_zh: '公司及商业', label_en: 'Corporate & Commercial', path: '/practices/corporate-commercial' },
      { label_zh: '诉讼及争议解决', label_en: 'Litigation', path: '/practices/litigation-dispute-resolution' },
      { label_zh: '查看全部', label_en: 'View All', path: '/practices' },
    ],
  },
  resources: {
    title_zh: '资源中心',
    title_en: 'Resources',
    links: [
      { label_zh: '最新动态', label_en: 'Latest News', path: '/news/watson-band' },
      { label_zh: '出版物', label_en: 'Publications', path: '/publications' },
      { label_zh: '活动与讲座', label_en: 'Events', path: '/events' },
      { label_zh: '加入我们', label_en: 'Careers', path: '/careers' },
    ],
  },
};

// 语言选项
export const languages = [
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];
