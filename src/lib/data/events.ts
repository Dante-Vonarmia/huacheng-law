// 活动数据类型定义
export interface EventItem {
  id: string;
  title_zh: string;
  title_en: string;
  summary_zh: string;
  summary_en: string;
  cover_image?: string;
  category: string;
  event_date: string;
  location_zh: string;
  location_en: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  registration_required: boolean;
  max_participants?: number;
  content_zh?: string;
  content_en?: string;
}

// Mock 活动数据
export const eventsData: EventItem[] = [
  {
    id: '1',
    title_zh: '2024年度法律科技创新论坛',
    title_en: '2024 Legal Tech Innovation Forum',
    summary_zh: '探讨人工智能、区块链等新技术在法律行业的应用前景，汇聚行业专家共话法律科技未来。',
    summary_en: 'Exploring the application prospects of AI, blockchain and other new technologies in the legal industry.',
    cover_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    category: '论坛峰会',
    event_date: '2024-12-15',
    location_zh: '上海国际会议中心',
    location_en: 'Shanghai International Convention Center',
    status: 'upcoming',
    registration_required: true,
    max_participants: 200,
    content_zh: '本次论坛将邀请国内外知名法律科技专家，共同探讨法律科技的最新发展趋势...',
    content_en: 'This forum will invite renowned legal tech experts from home and abroad...'
  },
  {
    id: '2',
    title_zh: '企业合规管理实务培训',
    title_en: 'Corporate Compliance Management Training',
    summary_zh: '针对企业法务人员和管理层，提供系统的合规管理培训，涵盖反垄断、数据保护、反腐败等多个领域。',
    summary_en: 'Systematic compliance management training for corporate legal professionals and executives.',
    cover_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    category: '培训课程',
    event_date: '2024-11-20',
    location_zh: '华诚律师事务所上海办公室',
    location_en: 'Watson & Band Shanghai Office',
    status: 'upcoming',
    registration_required: true,
    max_participants: 50,
    content_zh: '本次培训将系统讲解企业合规管理的核心要点...',
    content_en: 'This training will systematically explain the core points of corporate compliance management...'
  },
  {
    id: '3',
    title_zh: '新公司法实施专题研讨会',
    title_en: 'New Company Law Implementation Seminar',
    summary_zh: '深度解析新公司法的重要变化，为企业提供实操指引，确保顺利过渡。',
    summary_en: 'In-depth analysis of key changes in the new Company Law.',
    cover_image: 'https://images.unsplash.com/photo-1559223607-2378918c6dc1?w=800',
    category: '专题研讨',
    event_date: '2024-11-05',
    location_zh: '北京金融街威斯汀酒店',
    location_en: 'The Westin Beijing Financial Street',
    status: 'completed',
    registration_required: true,
    content_zh: '研讨会成功举办，吸引了200多位企业代表参加...',
    content_en: 'The seminar was successfully held with over 200 corporate representatives...'
  },
  {
    id: '4',
    title_zh: '知识产权保护策略交流会',
    title_en: 'IP Protection Strategy Exchange',
    summary_zh: '分享知识产权保护的最新实践，探讨企业如何构建完善的知识产权保护体系。',
    summary_en: 'Sharing latest practices in IP protection and discussing how companies can build comprehensive IP protection systems.',
    cover_image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    category: '交流活动',
    event_date: '2024-10-28',
    location_zh: '深圳科技园',
    location_en: 'Shenzhen Science Park',
    status: 'completed',
    registration_required: false,
    content_zh: '交流会汇聚了众多科技企业代表...',
    content_en: 'The exchange brought together many tech company representatives...'
  },
  {
    id: '5',
    title_zh: '跨境投资法律风险防控讲座',
    title_en: 'Cross-border Investment Legal Risk Prevention Lecture',
    summary_zh: '解析跨境投资中的法律风险，提供实用的风险防控策略。',
    summary_en: 'Analyzing legal risks in cross-border investments and providing practical risk prevention strategies.',
    cover_image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
    category: '专题讲座',
    event_date: '2024-12-08',
    location_zh: '线上直播',
    location_en: 'Online Webinar',
    status: 'upcoming',
    registration_required: true,
    content_zh: '本次讲座将重点讲解跨境投资的法律风险...',
    content_en: 'This lecture will focus on legal risks in cross-border investments...'
  }
];

// 按状态筛选活动
export function getEventsByStatus(status: 'upcoming' | 'ongoing' | 'completed'): EventItem[] {
  return eventsData.filter(event => event.status === status);
}

// 按ID获取活动
export function getEventById(id: string): EventItem | undefined {
  return eventsData.find(event => event.id === id);
}

// 获取即将举行的活动
export function getUpcomingEvents(limit: number = 3): EventItem[] {
  return eventsData
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
    .slice(0, limit);
}

// 获取所有分类
export function getEventCategories(): string[] {
  return Array.from(new Set(eventsData.map(event => event.category)));
}
