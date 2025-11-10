/**
 * 业务领域数据 - 基于华诚律所官网真实业务领域
 * Practice Areas Data - Based on Watson & Band official website
 */

export interface PracticeArea {
  id: string;
  slug: string;
  name_zh: string;
  name_en: string;
  description_zh: string;
  description_en: string;
  icon?: string;
  color?: string;
  featured?: boolean;
}

// 13个业务领域 - 与官网保持一致
export const practiceAreas: PracticeArea[] = [
  {
    id: '1',
    slug: 'intellectual-property',
    name_zh: '知识产权',
    name_en: 'Intellectual Property',
    description_zh: '我们在商标、专利、版权、电子通信等领域具有深厚的专业知识，为客户提供全方位的知识产权保护服务。',
    description_en: 'We have deep expertise in trademarks, patents, copyrights, electronic communications, and provide comprehensive IP protection services.',
    icon: '💡',
    color: '#3498DB',
    featured: true,
  },
  {
    id: '2',
    slug: 'corporate-commercial',
    name_zh: '公司及商业法务',
    name_en: 'Corporate and Commercial',
    description_zh: '为国内外众多领先企业提供公司设立、并购、重组、合同等全方位的公司及商业法律服务。',
    description_en: 'Providing comprehensive corporate and commercial legal services including company establishment, M&A, restructuring, and contracts.',
    icon: '🏢',
    color: '#2ECC71',
    featured: true,
  },
  {
    id: '3',
    slug: 'data-legal-ip',
    name_zh: '数据相关法律及知识产权服务',
    name_en: 'Data-related Legal and Intellectual Property Services',
    description_zh: '专注于数据合规、数据安全、隐私保护等新兴领域的法律服务。',
    description_en: 'Focusing on emerging areas such as data compliance, data security, and privacy protection.',
    icon: '🔒',
    color: '#9B59B6',
  },
  {
    id: '4',
    slug: 'capital-market',
    name_zh: '资本市场',
    name_en: 'Capital Market',
    description_zh: 'IPO、融资、证券发行、上市公司并购等资本市场法律服务。',
    description_en: 'Capital market legal services including IPO, financing, securities issuance, and listed company M&A.',
    icon: '📈',
    color: '#E74C3C',
  },
  {
    id: '5',
    slug: 'financial-asset-management',
    name_zh: '金融及资产管理',
    name_en: 'Financial and Asset Management',
    description_zh: '基金设立、资产管理、金融产品设计等金融法律服务。',
    description_en: 'Financial legal services including fund establishment, asset management, and financial product design.',
    icon: '💰',
    color: '#F39C12',
  },
  {
    id: '6',
    slug: 'restructuring-insolvency',
    name_zh: '重组及破产',
    name_en: 'Restructuring and Insolvency',
    description_zh: '企业重组、债务重组、破产清算等专业法律服务。',
    description_en: 'Professional services in corporate restructuring, debt restructuring, and bankruptcy liquidation.',
    icon: '🔄',
    color: '#95A5A6',
  },
  {
    id: '7',
    slug: 'culture-entertainment-sports',
    name_zh: '文化、娱乐及体育',
    name_en: 'Culture, Entertainment and Sports',
    description_zh: '版权保护、艺人合约、体育赛事、影视制作等文娱体育法律服务。',
    description_en: 'Legal services in copyright, artist contracts, sports events, and film/TV production.',
    icon: '🎬',
    color: '#E91E63',
  },
  {
    id: '8',
    slug: 'construction-real-estate',
    name_zh: '建筑、房地产及基础设施',
    name_en: 'Construction, Real Estates and Infrastructure',
    description_zh: '房地产开发、建筑合同、基础设施建设等法律服务。',
    description_en: 'Legal services in real estate development, construction contracts, and infrastructure projects.',
    icon: '🏗️',
    color: '#795548',
  },
  {
    id: '9',
    slug: 'labor-employment',
    name_zh: '劳动及雇佣',
    name_en: 'Labor and Employment',
    description_zh: '劳动合同、劳动争议、员工关系、劳动合规等法律服务。',
    description_en: 'Legal services in employment contracts, labor disputes, employee relations, and labor compliance.',
    icon: '👥',
    color: '#607D8B',
  },
  {
    id: '10',
    slug: 'family-wealth-management',
    name_zh: '家族法及财富管理',
    name_en: 'Family Law and Wealth Management',
    description_zh: '婚姻家庭、遗产规划、财富传承、家族信托等法律服务。',
    description_en: 'Legal services in family law, estate planning, wealth succession, and family trusts.',
    icon: '👨‍👩‍👧‍👦',
    color: '#FF9800',
  },
  {
    id: '11',
    slug: 'trade-customs-taxation',
    name_zh: '贸易、海关及税务',
    name_en: 'Trade, Customs and Taxation',
    description_zh: '国际贸易、海关合规、进出口、税务筹划等法律服务。',
    description_en: 'Legal services in international trade, customs compliance, import/export, and tax planning.',
    icon: '🌐',
    color: '#009688',
  },
  {
    id: '12',
    slug: 'litigation-dispute-resolution',
    name_zh: '诉讼及争议解决',
    name_en: 'Litigation and Dispute Resolution',
    description_zh: '民商事诉讼、仲裁、调解等争议解决法律服务。',
    description_en: 'Legal services in civil and commercial litigation, arbitration, and mediation.',
    icon: '⚖️',
    color: '#34495E',
    featured: true,
  },
  {
    id: '13',
    slug: 'investigation',
    name_zh: '调查',
    name_en: 'Investigation',
    description_zh: '商业调查、尽职调查、反舞弊调查等专业服务。',
    description_en: 'Professional services in commercial investigation, due diligence, and anti-fraud investigation.',
    icon: '🔍',
    color: '#8E44AD',
  },
];

// 获取精选业务领域（用于首页展示）
export function getFeaturedPracticeAreas(): PracticeArea[] {
  return practiceAreas.filter(area => area.featured);
}

// 根据 slug 获取业务领域
export function getPracticeAreaBySlug(slug: string): PracticeArea | undefined {
  return practiceAreas.find(area => area.slug === slug);
}

// 获取业务领域分类列表（用于筛选）
export const practiceAreaCategories = [
  { id: 'all', name_zh: '全部领域', name_en: 'All Areas' },
  ...practiceAreas.map(area => ({
    id: area.id,
    name_zh: area.name_zh,
    name_en: area.name_en,
  })),
];
