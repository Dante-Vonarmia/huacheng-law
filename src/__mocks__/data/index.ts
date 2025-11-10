/**
 * Mock Data - 统一导出所有模拟数据
 *
 * 使用方式：
 * import { lawyers, cases, events } from '$mocks/data';
 */

export * from './company-info';
export * from './practice-areas';
export * from './banner-slides';
export * from './navigation';

// 律师数据
export interface Lawyer {
  id: string;
  name_zh: string;
  name_en: string;
  title_zh: string;
  title_en: string;
  office: string;
  photo: string;
  expertise: string[];
  email: string;
  phone?: string;
  bio_zh: string;
  bio_en: string;
  education: string[];
  experience: string[];
}

export const lawyers: Lawyer[] = [
  {
    id: '1',
    name_zh: '张明',
    name_en: 'Zhang Ming',
    title_zh: '高级合伙人',
    title_en: 'Senior Partner',
    office: 'shanghai',
    photo: '/images/lawyers/placeholder.jpg',
    expertise: ['知识产权', '公司法务'],
    email: 'zhang.ming@watson-band.com',
    phone: '(86-21) 5292-1111',
    bio_zh: '张明律师专注于知识产权和公司法务领域，拥有20年执业经验。曾成功代理多起重大知识产权侵权案件。',
    bio_en: 'Zhang Ming specializes in IP and corporate law with 20 years of experience.',
    education: ['清华大学法学院 法学硕士', 'Harvard Law School LL.M.'],
    experience: ['华诚律师事务所 高级合伙人 (2010-至今)', '某知名律所 合伙人 (2005-2010)'],
  },
  {
    id: '2',
    name_zh: '李华',
    name_en: 'Li Hua',
    title_zh: '合伙人',
    title_en: 'Partner',
    office: 'beijing',
    photo: '/images/lawyers/placeholder.jpg',
    expertise: ['资本市场', '金融法务'],
    email: 'li.hua@watson-band.com',
    bio_zh: '李华律师专注于资本市场和金融法务，曾参与多家公司IPO项目。',
    bio_en: 'Li Hua focuses on capital markets and financial law, with experience in multiple IPO projects.',
    education: ['北京大学法学院 法学硕士', 'Columbia Law School LL.M.'],
    experience: ['华诚律师事务所 合伙人 (2015-至今)', '某投资银行 法律顾问 (2010-2015)'],
  },
];

// 案例数据
export interface Case {
  id: string;
  title_zh: string;
  title_en: string;
  practice_area: string;
  result_zh: string;
  result_en: string;
  summary_zh: string;
  summary_en: string;
  date: string;
  featured?: boolean;
}

export const cases: Case[] = [
  {
    id: '1',
    title_zh: 'A公司跨境知识产权侵权案',
    title_en: 'Cross-border IP Infringement Case',
    practice_area: 'intellectual-property',
    result_zh: '胜诉，获赔500万元',
    result_en: 'Won, awarded RMB 5M',
    summary_zh: '成功为A公司在跨国知识产权纠纷中维权，保护其核心技术专利不受侵犯，并获得高额赔偿。',
    summary_en: 'Successfully defended A company in a cross-border IP dispute.',
    date: '2024-08',
    featured: true,
  },
  {
    id: '2',
    title_zh: 'B集团境外并购法律服务',
    title_en: 'Cross-border M&A Legal Services',
    practice_area: 'corporate-commercial',
    result_zh: '成功完成并购交易',
    result_en: 'Transaction completed successfully',
    summary_zh: '为B集团提供境外并购全程法律服务，协助完成价值10亿美元的跨国并购交易。',
    summary_en: 'Provided full legal services for B Group\'s USD 1B acquisition.',
    date: '2024-06',
  },
];

// 出版物数据
export interface Publication {
  id: string;
  title_zh: string;
  title_en: string;
  author_zh: string;
  author_en: string;
  category_zh: string;
  category_en: string;
  summary_zh: string;
  summary_en: string;
  publish_date: string;
  read_time: number;
  tags: string[];
}

export const publications: Publication[] = [
  {
    id: '1',
    title_zh: '2024年知识产权保护新规解读',
    title_en: 'IP Protection Regulations 2024',
    author_zh: '张明',
    author_en: 'Zhang Ming',
    category_zh: '知识产权',
    category_en: 'Intellectual Property',
    summary_zh: '深入分析2024年最新知识产权保护法规的修订内容，解读对企业的实际影响和应对策略。',
    summary_en: 'In-depth analysis of the latest IP protection regulations.',
    publish_date: '2024-10-15',
    read_time: 8,
    tags: ['知识产权', '法规解读', '企业合规'],
  },
];

// 视频数据
export interface Video {
  id: string;
  title_zh: string;
  title_en: string;
  thumbnail: string;
  duration: string;
  category_zh: string;
  category_en: string;
  description_zh: string;
  description_en: string;
  video_url: string;
  publish_date: string;
}

export const videos: Video[] = [
  {
    id: '1',
    title_zh: '华诚律所专业介绍',
    title_en: 'Watson & Band Introduction',
    thumbnail: '/images/videos/placeholder.jpg',
    duration: '5:30',
    category_zh: '律所介绍',
    category_en: 'Introduction',
    description_zh: '深入了解华诚律师事务所的专业服务和团队实力',
    description_en: 'Learn about our professional services and team',
    video_url: '/videos/intro.mp4',
    publish_date: '2024-10-01',
  },
];

// 活动数据
export interface Event {
  id: string;
  title_zh: string;
  title_en: string;
  type_zh: string;
  type_en: string;
  start_date: string;
  end_date?: string;
  location_zh: string;
  location_en: string;
  is_online: boolean;
  description_zh: string;
  description_en: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  capacity?: number;
  registered?: number;
  registration_url?: string;
}

export const events: Event[] = [
  {
    id: '1',
    title_zh: '2024跨境并购法律实务研讨会',
    title_en: 'Cross-border M&A Legal Practice Seminar 2024',
    type_zh: '专业研讨会',
    type_en: 'Seminar',
    start_date: '2024-11-20T14:00:00+08:00',
    end_date: '2024-11-20T17:00:00+08:00',
    location_zh: '上海国际会议中心',
    location_en: 'Shanghai International Convention Center',
    is_online: false,
    description_zh: '深入探讨跨境并购交易中的法律风险防控、尽职调查要点及合规策略。',
    description_en: 'In-depth discussion on legal risk control in cross-border M&A.',
    status: 'upcoming',
    capacity: 200,
    registered: 150,
    registration_url: '/events/1/register',
  },
];

// 新闻数据
export interface News {
  id: string;
  title_zh: string;
  title_en: string;
  type: 'watson-band' | 'legal';
  summary_zh: string;
  summary_en: string;
  publish_date: string;
  thumbnail?: string;
}

export const news: News[] = [
  {
    id: '1',
    title_zh: '华诚律所荣获"2024年度最佳知识产权律所"称号',
    title_en: 'Watson & Band Awarded "Best IP Law Firm 2024"',
    type: 'watson-band',
    summary_zh: '华诚律师事务所在2024年度法律服务评选中荣获"最佳知识产权律所"称号。',
    summary_en: 'Watson & Band was awarded "Best IP Law Firm" in 2024.',
    publish_date: '2024-10-20',
  },
];

// 招聘数据
export interface Career {
  id: string;
  title_zh: string;
  title_en: string;
  location: string;
  type: 'full-time' | 'part-time' | 'intern';
  salary_range?: string;
  responsibilities_zh: string[];
  responsibilities_en: string[];
  requirements_zh: string[];
  requirements_en: string[];
  benefits_zh: string[];
  benefits_en: string[];
  publish_date: string;
  deadline?: string;
}

export const careers: Career[] = [
  {
    id: '1',
    title_zh: '知识产权律师',
    title_en: 'IP Lawyer',
    location: 'shanghai',
    type: 'full-time',
    salary_range: '面议',
    responsibilities_zh: [
      '处理知识产权诉讼和非诉讼法律事务',
      '为客户提供知识产权保护策略咨询',
      '参与重大知识产权项目',
    ],
    responsibilities_en: [
      'Handle IP litigation and non-litigation matters',
      'Provide IP protection strategy consulting',
      'Participate in major IP projects',
    ],
    requirements_zh: [
      '法学本科及以上学历',
      '3年以上知识产权法律工作经验',
      '通过司法考试',
      '英语流利',
    ],
    requirements_en: [
      'Bachelor degree or above in Law',
      '3+ years IP law experience',
      'Passed bar examination',
      'Fluent in English',
    ],
    benefits_zh: [
      '具有竞争力的薪资',
      '五险一金',
      '带薪年假',
      '专业培训机会',
      '职业发展通道',
    ],
    benefits_en: [
      'Competitive salary',
      'Social insurance',
      'Paid annual leave',
      'Professional training',
      'Career development',
    ],
    publish_date: '2024-10-15',
    deadline: '2024-12-31',
  },
];
