/**
 * 导航菜单数据 - 基于华诚律所官网 (Mock Data)
 */

export interface NavItem {
  id: string;
  label_zh: string;
  label_en: string;
  path: string;
  children?: NavItem[];
}

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
    children: [
      { id: 'practice-1', label_zh: '知识产权', label_en: 'Intellectual Property', path: '/practices/intellectual-property' },
      { id: 'practice-2', label_zh: '公司及商业法务', label_en: 'Corporate and Commercial', path: '/practices/corporate-commercial' },
      { id: 'practice-3', label_zh: '数据相关法律及知识产权', label_en: 'Data-related Legal and IP Services', path: '/practices/data-legal-ip' },
      { id: 'practice-4', label_zh: '资本市场', label_en: 'Capital Market', path: '/practices/capital-market' },
      { id: 'practice-5', label_zh: '金融及资产管理', label_en: 'Financial and Asset Management', path: '/practices/financial-asset-management' },
      { id: 'practice-6', label_zh: '重组及破产', label_en: 'Restructuring and Insolvency', path: '/practices/restructuring-insolvency' },
      { id: 'practice-7', label_zh: '文化、娱乐及体育', label_en: 'Culture, Entertainment and Sports', path: '/practices/culture-entertainment-sports' },
      { id: 'practice-8', label_zh: '建筑、房地产及基础设施', label_en: 'Construction, Real Estates and Infrastructure', path: '/practices/construction-real-estate' },
      { id: 'practice-9', label_zh: '劳动及雇佣', label_en: 'Labor and Employment', path: '/practices/labor-employment' },
      { id: 'practice-10', label_zh: '家族法及财富管理', label_en: 'Family Law and Wealth Management', path: '/practices/family-wealth-management' },
      { id: 'practice-11', label_zh: '贸易、海关及税务', label_en: 'Trade, Customs and Taxation', path: '/practices/trade-customs-taxation' },
      { id: 'practice-12', label_zh: '诉讼及争议解决', label_en: 'Litigation and Dispute Resolution', path: '/practices/litigation-dispute-resolution' },
      { id: 'practice-13', label_zh: '调查', label_en: 'Investigation', path: '/practices/investigation' },
    ],
  },
  {
    id: 'people',
    label_zh: '专业人士',
    label_en: 'OUR PEOPLE',
    path: '/team',
    children: [
      { id: 'professionals', label_zh: '律师团队', label_en: 'PROFESSIONALS', path: '/team' },
      { id: 'careers', label_zh: '加入我们', label_en: 'JOIN US', path: '/careers' },
    ],
  },
  {
    id: 'news',
    label_zh: '新闻与出版物',
    label_en: 'NEWS & PUBLICATIONS',
    path: '/news',
    children: [
      { id: 'news-all', label_zh: '全部新闻', label_en: 'All News', path: '/news' },
      { id: 'publications', label_zh: '出版物', label_en: 'Publications', path: '/publications' },
      { id: 'videos', label_zh: '视频', label_en: 'Videos', path: '/videos' },
    ],
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

export const languages = [
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];
