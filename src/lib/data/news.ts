// 新闻数据类型定义
export interface NewsItem {
  id: string;
  title_zh: string;
  title_en: string;
  summary_zh: string;
  summary_en: string;
  cover_image?: string;
  category: string;
  published_date: string;
  author_ids?: string[];
  content_zh?: string;
  content_en?: string;
}

// Mock 新闻数据
export const newsData: NewsItem[] = [
  {
    id: '1',
    title_zh: '华诚律师事务所在跨境并购领域再获殊荣',
    title_en: 'Watson & Band Recognized for Excellence in Cross-Border M&A',
    summary_zh: '华诚律师事务所凭借在跨境并购领域的卓越表现，荣获"年度最佳跨境并购法律服务团队"称号，这是对我们专业能力和服务质量的高度认可。',
    summary_en: 'Watson & Band has been awarded "Best Cross-Border M&A Legal Team of the Year" for its outstanding performance in cross-border mergers and acquisitions.',
    cover_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    category: '事务所动态',
    published_date: '2024-11-05',
    author_ids: [],
    content_zh: '华诚律师事务所在2024年度法律服务评选中，凭借在跨境并购领域的卓越表现荣获"年度最佳跨境并购法律服务团队"称号...',
    content_en: 'In the 2024 Legal Services Awards, Watson & Band received the prestigious "Best Cross-Border M&A Legal Team of the Year" award...'
  },
  {
    id: '2',
    title_zh: '华诚成功协助某科技公司完成Pre-IPO融资',
    title_en: 'Watson & Band Successfully Assists Tech Company in Pre-IPO Financing',
    summary_zh: '我所成功为某知名科技公司完成Pre-IPO融资，融资金额达5亿美元，为该公司后续上市奠定坚实基础。',
    summary_en: 'We successfully assisted a leading technology company in completing a $500 million Pre-IPO financing round, laying a solid foundation for its future IPO.',
    cover_image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800',
    category: '业务成果',
    published_date: '2024-11-01',
    author_ids: [],
    content_zh: '华诚律师事务所成功为某知名科技公司完成Pre-IPO融资，融资金额达5亿美元...',
    content_en: 'Watson & Band has successfully assisted a leading technology company in completing a $500 million Pre-IPO financing round...'
  },
  {
    id: '3',
    title_zh: '华诚举办"企业合规管理与风险防控"专题研讨会',
    title_en: 'Watson & Band Hosts Seminar on Corporate Compliance and Risk Prevention',
    summary_zh: '我所于近日成功举办"企业合规管理与风险防控"专题研讨会，吸引了众多企业法务人员和管理层参加。',
    summary_en: 'We recently hosted a seminar on "Corporate Compliance Management and Risk Prevention" which attracted numerous corporate legal professionals and executives.',
    cover_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    category: '活动资讯',
    published_date: '2024-10-28',
    author_ids: [],
    content_zh: '华诚律师事务所于10月28日成功举办"企业合规管理与风险防控"专题研讨会...',
    content_en: 'On October 28, Watson & Band successfully hosted a seminar on "Corporate Compliance Management and Risk Prevention"...'
  },
  {
    id: '4',
    title_zh: '华诚律师在《中国法律年鉴》发表专题文章',
    title_en: 'Watson & Band Lawyers Publish Article in China Law Yearbook',
    summary_zh: '我所多位资深律师在《中国法律年鉴》发表关于新公司法实施要点的专题文章，受到业界广泛关注。',
    summary_en: 'Several senior lawyers from our firm published an article on key points of the new Company Law implementation in the China Law Yearbook.',
    cover_image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
    category: '专业观点',
    published_date: '2024-10-25',
    author_ids: [],
    content_zh: '华诚律师事务所多位资深律师在《中国法律年鉴》发表关于新公司法实施要点的专题文章...',
    content_en: 'Several senior lawyers from Watson & Band published a featured article on key implementation points of the new Company Law...'
  },
  {
    id: '5',
    title_zh: '华诚助力某新能源企业完成境外上市',
    title_en: 'Watson & Band Assists New Energy Company in Overseas Listing',
    summary_zh: '我所成功协助某新能源企业在纳斯达克上市，这是华诚在新能源领域的又一重要里程碑。',
    summary_en: 'We successfully assisted a new energy company in its NASDAQ listing, marking another important milestone in the new energy sector.',
    cover_image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
    category: '业务成果',
    published_date: '2024-10-20',
    author_ids: [],
    content_zh: '华诚律师事务所成功协助某新能源企业在纳斯达克上市，融资金额超过2亿美元...',
    content_en: 'Watson & Band successfully assisted a new energy company in its NASDAQ listing, raising over $200 million...'
  },
  {
    id: '6',
    title_zh: '华诚律师受邀参加国际知识产权保护论坛',
    title_en: 'Watson & Band Lawyers Invited to International IP Protection Forum',
    summary_zh: '我所知识产权团队受邀参加国际知识产权保护论坛，分享在知识产权保护领域的实践经验。',
    summary_en: 'Our IP team was invited to the International Intellectual Property Protection Forum to share practical experience in IP protection.',
    cover_image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
    category: '活动资讯',
    published_date: '2024-10-15',
    author_ids: [],
    content_zh: '华诚律师事务所知识产权团队受邀参加国际知识产权保护论坛...',
    content_en: 'The IP team of Watson & Band was invited to participate in the International Intellectual Property Protection Forum...'
  },
  {
    id: '7',
    title_zh: '新公司法实施后的公司治理要点解析',
    title_en: 'Analysis of Corporate Governance Under the New Company Law',
    summary_zh: '我所公司法团队深度解析新公司法实施后企业需要关注的公司治理要点，为企业合规运营提供指引。',
    summary_en: 'Our corporate law team provides in-depth analysis of key corporate governance points under the new Company Law.',
    cover_image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    category: '专业观点',
    published_date: '2024-10-10',
    author_ids: [],
    content_zh: '华诚律师事务所公司法团队深度解析新公司法实施后企业需要关注的公司治理要点...',
    content_en: 'The corporate law team of Watson & Band provides an in-depth analysis of key corporate governance points...'
  },
  {
    id: '8',
    title_zh: '华诚成功代理某跨国企业劳动争议案件',
    title_en: 'Watson & Band Successfully Represents MNC in Labor Dispute',
    summary_zh: '我所劳动法团队成功代理某跨国企业劳动争议案件，维护了客户的合法权益。',
    summary_en: 'Our labor law team successfully represented a multinational corporation in a labor dispute, protecting the clients legal rights.',
    cover_image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    category: '业务成果',
    published_date: '2024-10-05',
    author_ids: [],
    content_zh: '华诚律师事务所劳动法团队成功代理某跨国企业劳动争议案件...',
    content_en: 'The labor law team of Watson & Band successfully represented a multinational corporation in a labor dispute case...'
  },
  {
    id: '9',
    title_zh: '华诚获评"2024年度中国最佳律师事务所"',
    title_en: 'Watson & Band Named "Best Law Firm in China 2024"',
    summary_zh: '在权威法律评选中，华诚律师事务所凭借卓越的专业服务和优秀的业绩表现，荣获"2024年度中国最佳律师事务所"殊荣。',
    summary_en: 'Watson & Band was awarded "Best Law Firm in China 2024" for its excellent professional services and outstanding performance.',
    cover_image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800',
    category: '事务所动态',
    published_date: '2024-09-30',
    author_ids: [],
    content_zh: '在权威法律评选中，华诚律师事务所凭借卓越的专业服务和优秀的业绩表现，荣获"2024年度中国最佳律师事务所"殊荣...',
    content_en: 'In an authoritative legal selection, Watson & Band was awarded "Best Law Firm in China 2024"...'
  },
  {
    id: '10',
    title_zh: '华诚协助某生物制药企业完成跨境投资',
    title_en: 'Watson & Band Assists Biotech Company in Cross-Border Investment',
    summary_zh: '我所成功协助某生物制药企业完成对欧洲研发中心的跨境投资，交易金额达3亿欧元。',
    summary_en: 'We successfully assisted a biotech company in completing a cross-border investment in a European R&D center worth €300 million.',
    cover_image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
    category: '业务成果',
    published_date: '2024-09-25',
    author_ids: [],
    content_zh: '华诚律师事务所成功协助某生物制药企业完成对欧洲研发中心的跨境投资...',
    content_en: 'Watson & Band successfully assisted a biotech company in completing a cross-border investment...'
  },
  {
    id: '11',
    title_zh: '数据合规新趋势：企业如何应对《个人信息保护法》',
    title_en: 'New Trends in Data Compliance: How Companies Can Adapt to PIPL',
    summary_zh: '我所数据合规团队深入解读《个人信息保护法》实施后的企业合规要点，为企业提供全面的数据保护解决方案。',
    summary_en: 'Our data compliance team provides an in-depth interpretation of key corporate compliance points after the implementation of the Personal Information Protection Law.',
    cover_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    category: '专业观点',
    published_date: '2024-09-20',
    author_ids: [],
    content_zh: '华诚律师事务所数据合规团队深入解读《个人信息保护法》实施后的企业合规要点...',
    content_en: 'The data compliance team of Watson & Band provides an in-depth interpretation of key corporate compliance points...'
  },
  {
    id: '12',
    title_zh: '华诚举办"ESG投资与公司治理"主题论坛',
    title_en: 'Watson & Band Hosts "ESG Investment and Corporate Governance" Forum',
    summary_zh: '我所成功举办"ESG投资与公司治理"主题论坛，邀请多位行业专家共同探讨ESG在中国的发展趋势。',
    summary_en: 'We successfully hosted the "ESG Investment and Corporate Governance" forum, inviting industry experts to discuss ESG development trends in China.',
    cover_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    category: '活动资讯',
    published_date: '2024-09-15',
    author_ids: [],
    content_zh: '华诚律师事务所成功举办"ESG投资与公司治理"主题论坛...',
    content_en: 'Watson & Band successfully hosted the "ESG Investment and Corporate Governance" forum...'
  },
  {
    id: '13',
    title_zh: '华诚成功代理国内首例AI生成内容著作权案',
    title_en: 'Watson & Band Successfully Handles First AI-Generated Content Copyright Case',
    summary_zh: '我所知识产权团队成功代理国内首例AI生成内容著作权纠纷案件，为AI时代的知识产权保护提供了重要参考。',
    summary_en: 'Our IP team successfully handled the first AI-generated content copyright dispute case in China, providing important reference for IP protection in the AI era.',
    cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    category: '业务成果',
    published_date: '2024-09-10',
    author_ids: [],
    content_zh: '华诚律师事务所知识产权团队成功代理国内首例AI生成内容著作权纠纷案件...',
    content_en: 'The IP team of Watson & Band successfully handled the first AI-generated content copyright dispute case...'
  },
  {
    id: '14',
    title_zh: '跨境电商合规要点：如何应对全球化挑战',
    title_en: 'Cross-Border E-Commerce Compliance: Meeting Global Challenges',
    summary_zh: '我所电商法团队分析跨境电商企业面临的合规挑战，提供针对性的解决方案和风险防范建议。',
    summary_en: 'Our e-commerce law team analyzes compliance challenges faced by cross-border e-commerce companies and provides targeted solutions.',
    cover_image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    category: '专业观点',
    published_date: '2024-09-05',
    author_ids: [],
    content_zh: '华诚律师事务所电商法团队分析跨境电商企业面临的合规挑战...',
    content_en: 'The e-commerce law team of Watson & Band analyzes compliance challenges faced by cross-border e-commerce companies...'
  },
  {
    id: '15',
    title_zh: '华诚助力某新材料企业完成B轮融资',
    title_en: 'Watson & Band Assists New Materials Company in Series B Funding',
    summary_zh: '我所成功协助某新材料企业完成B轮融资，融资金额达8000万美元，助力企业快速发展。',
    summary_en: 'We successfully assisted a new materials company in completing an $80 million Series B funding round, supporting rapid business growth.',
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    category: '业务成果',
    published_date: '2024-08-30',
    author_ids: [],
    content_zh: '华诚律师事务所成功协助某新材料企业完成B轮融资，融资金额达8000万美元...',
    content_en: 'Watson & Band successfully assisted a new materials company in completing an $80 million Series B funding round...'
  },
  {
    id: '16',
    title_zh: '华诚律师受邀在清华大学法学院发表演讲',
    title_en: 'Watson & Band Lawyers Invited to Speak at Tsinghua Law School',
    summary_zh: '我所合伙人受邀在清华大学法学院发表"企业海外并购法律实务"主题演讲，分享实战经验。',
    summary_en: 'Our partners were invited to deliver a speech on "Legal Practice in Corporate Overseas M&A" at Tsinghua Law School.',
    cover_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    category: '活动资讯',
    published_date: '2024-08-25',
    author_ids: [],
    content_zh: '华诚律师事务所合伙人受邀在清华大学法学院发表"企业海外并购法律实务"主题演讲...',
    content_en: 'Partners of Watson & Band were invited to deliver a speech on "Legal Practice in Corporate Overseas M&A"...'
  },
  {
    id: '17',
    title_zh: '华诚成功处理某房地产企业债务重组案',
    title_en: 'Watson & Band Successfully Handles Real Estate Debt Restructuring',
    summary_zh: '我所成功协助某大型房地产企业完成债务重组，涉及金额超过50亿元人民币，帮助企业化解债务危机。',
    summary_en: 'We successfully assisted a major real estate company in completing debt restructuring involving over RMB 5 billion, helping resolve the debt crisis.',
    cover_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    category: '业务成果',
    published_date: '2024-08-20',
    author_ids: [],
    content_zh: '华诚律师事务所成功协助某大型房地产企业完成债务重组，涉及金额超过50亿元人民币...',
    content_en: 'Watson & Band successfully assisted a major real estate company in completing debt restructuring...'
  },
  {
    id: '18',
    title_zh: '绿色金融法律实务：助力碳中和目标实现',
    title_en: 'Green Finance Legal Practice: Supporting Carbon Neutrality Goals',
    summary_zh: '我所绿色金融团队深度解析绿色金融领域的法律实务，为企业实现碳中和目标提供专业支持。',
    summary_en: 'Our green finance team provides in-depth analysis of legal practices in green finance, supporting companies in achieving carbon neutrality goals.',
    cover_image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
    category: '专业观点',
    published_date: '2024-08-15',
    author_ids: [],
    content_zh: '华诚律师事务所绿色金融团队深度解析绿色金融领域的法律实务...',
    content_en: 'The green finance team of Watson & Band provides in-depth analysis of legal practices in green finance...'
  },
  {
    id: '19',
    title_zh: '华诚举办"私募基金合规管理"实务培训',
    title_en: 'Watson & Band Hosts Training on Private Equity Fund Compliance',
    summary_zh: '我所成功举办"私募基金合规管理"实务培训，为基金管理人提供全面的合规指导。',
    summary_en: 'We successfully hosted a training session on "Private Equity Fund Compliance Management", providing comprehensive compliance guidance for fund managers.',
    cover_image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800',
    category: '活动资讯',
    published_date: '2024-08-10',
    author_ids: [],
    content_zh: '华诚律师事务所成功举办"私募基金合规管理"实务培训...',
    content_en: 'Watson & Band successfully hosted a training session on "Private Equity Fund Compliance Management"...'
  },
  {
    id: '20',
    title_zh: '华诚协助某科技独角兽企业完成股权激励计划',
    title_en: 'Watson & Band Assists Tech Unicorn in Equity Incentive Plan',
    summary_zh: '我所成功协助某科技独角兽企业完成股权激励计划设计与实施，惠及超过500名核心员工。',
    summary_en: 'We successfully assisted a tech unicorn in designing and implementing an equity incentive plan benefiting over 500 core employees.',
    cover_image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    category: '业务成果',
    published_date: '2024-08-05',
    author_ids: [],
    content_zh: '华诚律师事务所成功协助某科技独角兽企业完成股权激励计划设计与实施...',
    content_en: 'Watson & Band successfully assisted a tech unicorn in designing and implementing an equity incentive plan...'
  }
];

// 按分类筛选新闻
export function getNewsByCategory(category: string): NewsItem[] {
  return newsData.filter(news => news.category === category);
}

// 按ID获取新闻
export function getNewsById(id: string): NewsItem | undefined {
  return newsData.find(news => news.id === id);
}

// 获取最新新闻
export function getLatestNews(limit: number = 3): NewsItem[] {
  return newsData
    .sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())
    .slice(0, limit);
}

// 获取所有分类
export function getNewsCategories(): string[] {
  return Array.from(new Set(newsData.map(news => news.category)));
}
