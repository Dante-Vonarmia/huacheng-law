/**
 * 专业出版物数据
 */

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  year: string;
  type: '专著' | '论文' | '期刊文章' | '研究报告';
  cover?: string;
  description: string;
  category?: string;
  isbn?: string;
  pages?: number;
  url?: string;
}

export const publicationsData: Publication[] = [
  {
    id: '1',
    title: '中国知识产权保护实务指南（第三版）',
    authors: ['张明华', '李静'],
    publisher: '法律出版社',
    year: '2024',
    type: '专著',
    category: '知识产权法',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300',
    description: '系统介绍中国知识产权保护的法律框架、实务操作和典型案例。本书涵盖专利、商标、著作权、商业秘密等各类知识产权的保护策略，结合500多个真实案例，为企业和律师提供实战指引。',
    isbn: '978-7-5118-9876-5',
    pages: 680
  },
  {
    id: '2',
    title: '跨境并购法律实务',
    authors: ['王强'],
    publisher: '中国法制出版社',
    year: '2023',
    type: '专著',
    category: '公司法',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300',
    description: '深入分析跨境并购的法律风险与应对策略。本书从尽职调查、交易结构设计、合同起草、监管审批到交割后整合，全面覆盖跨境并购全流程，特别关注中美、中欧并购的最新监管动态。',
    isbn: '978-7-5216-1234-8',
    pages: 520
  },
  {
    id: '3',
    title: '公司法修订要点解读',
    authors: ['李静', '赵敏'],
    publisher: '《中国律师》杂志',
    year: '2024',
    type: '论文',
    category: '公司法',
    description: '解读新公司法的重要修订内容及对企业的影响。重点分析公司资本制度、股东权利保护、公司治理结构等方面的变化，为企业合规提供指引。'
  },
  {
    id: '4',
    title: '国际商事仲裁实务',
    authors: ['王建国'],
    publisher: '商务印书馆',
    year: '2023',
    type: '专著',
    category: '诉讼仲裁',
    cover: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=300',
    description: '基于作者28年国际仲裁实务经验编写的权威指南。详细介绍CIETAC、ICC、HKIAC等主要仲裁机构规则，剖析仲裁员选任、证据提交、裁决执行等关键环节，附录包含100多个仲裁案例分析。',
    isbn: '978-7-100-2345-6',
    pages: 720
  },
  {
    id: '5',
    title: '专利诉讼策略与技巧',
    authors: ['陈雪'],
    publisher: '知识产权出版社',
    year: '2023',
    type: '专著',
    category: '知识产权法',
    cover: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300',
    description: '专利诉讼实战指南。涵盖专利侵权判定、无效宣告、保全措施、损害赔偿计算等核心问题，特别关注高科技、生物医药、人工智能领域的专利诉讼特点。',
    isbn: '978-7-5130-5678-9',
    pages: 450
  },
  {
    id: '6',
    title: '金融监管法律实务',
    authors: ['刘伟', '周洁'],
    publisher: '中信出版社',
    year: '2024',
    type: '专著',
    category: '金融法',
    cover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300',
    description: '系统梳理中国金融监管法律体系。涵盖银行、证券、保险、基金、信托等各类金融业务的监管要求，结合资管新规、反洗钱、数据安全等最新政策，为金融机构合规提供实务指引。',
    isbn: '978-7-5217-3456-7',
    pages: 580
  },
  {
    id: '7',
    title: '企业劳动合规实务指南',
    authors: ['杨敏'],
    publisher: '人民法院出版社',
    year: '2023',
    type: '专著',
    category: '劳动法',
    cover: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300',
    description: '企业劳动用工全流程合规指南。从招聘、劳动合同签订、薪酬福利、工时管理到员工离职，全面覆盖企业用工各环节的法律风险及应对策略，附录包含劳动合同范本、规章制度模板等实用工具。',
    isbn: '978-7-5102-2345-1',
    pages: 420
  },
  {
    id: '8',
    title: '房地产开发法律实务',
    authors: ['赵宇', '周洁'],
    publisher: '建筑工业出版社',
    year: '2022',
    type: '专著',
    category: '房地产法',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300',
    description: '房地产开发全程法律实务。涵盖土地取得、项目融资、工程建设、预售销售、物业管理等各环节的法律问题，结合"三道红线"、预售资金监管等最新政策要求。',
    isbn: '978-7-112-2678-4',
    pages: 560
  },
  {
    id: '9',
    title: '企业税务筹划实务',
    authors: ['周洁'],
    publisher: '中国税务出版社',
    year: '2024',
    type: '专著',
    category: '税务法',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300',
    description: '企业税务筹划系统指南。结合最新税收政策，详细介绍企业所得税、增值税、个人所得税等主要税种的筹划策略，特别关注跨境投资、重组并购等复杂交易的税务安排。',
    isbn: '978-7-5678-3456-2',
    pages: 480
  },
  {
    id: '10',
    title: '反垄断法实务指南',
    authors: ['马强', '李静'],
    publisher: '法律出版社',
    year: '2023',
    type: '专著',
    category: '竞争法',
    cover: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300',
    description: '反垄断合规与应对全指南。系统介绍经营者集中申报、垄断协议规制、滥用市场支配地位等核心问题，特别关注平台经济、数字经济领域的反垄断监管。',
    isbn: '978-7-5118-8765-4',
    pages: 520
  },
  {
    id: '11',
    title: '人工智能时代的知识产权保护',
    authors: ['陈雪', '马强'],
    publisher: '《知识产权》期刊',
    year: '2024',
    type: '期刊文章',
    category: '知识产权法',
    description: '探讨人工智能技术发展对知识产权法律制度的挑战。分析AI生成内容的著作权归属、AI算法的专利保护、数据权益保护等前沿问题，提出完善相关法律制度的建议。'
  },
  {
    id: '12',
    title: '私募基金合规指引',
    authors: ['刘伟'],
    publisher: '《中国律师》杂志',
    year: '2023',
    type: '论文',
    category: '金融法',
    description: '系统梳理私募基金监管要求。涵盖基金募集、投资运作、信息披露、内部控制等各方面的合规要点，结合典型违规案例分析监管执法趋势。'
  },
  {
    id: '13',
    title: '劳动争议典型案例解析',
    authors: ['杨敏', '赵宇'],
    publisher: '《人民司法》期刊',
    year: '2024',
    type: '期刊文章',
    category: '劳动法',
    description: '精选近两年劳动争议典型案例，深入分析裁判要点和法律适用。涵盖劳动关系认定、工伤认定、竞业限制、解除劳动合同等热点问题。'
  },
  {
    id: '14',
    title: '建设工程合同纠纷处理指南',
    authors: ['赵宇'],
    publisher: '《人民法院报》',
    year: '2023',
    type: '期刊文章',
    category: '房地产法',
    description: '建设工程合同纠纷司法审判实务。分析工程质量、工程款结算、工期延误等常见纠纷的裁判思路，为建设各方防范和化解纠纷提供指引。'
  },
  {
    id: '15',
    title: '跨境投资税务指南',
    authors: ['周洁', '李静'],
    publisher: '经济科学出版社',
    year: '2023',
    type: '专著',
    category: '税务法',
    cover: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300',
    description: '跨境投资税务筹划实务。涵盖投资架构设计、转让定价、税收协定适用、受控外国企业规则等核心问题，结合BEPS行动计划分析国际税收新趋势。',
    isbn: '978-7-5141-7890-2',
    pages: 440
  },
  {
    id: '16',
    title: '数字经济时代的竞争法',
    authors: ['马强'],
    publisher: '社会科学文献出版社',
    year: '2024',
    type: '专著',
    category: '竞争法',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300',
    description: '数字经济反垄断法律问题研究。分析平台经济、算法定价、数据垄断等新型垄断行为的法律规制，比较研究欧美反垄断执法实践，为中国数字经济监管提供借鉴。',
    isbn: '978-7-5201-8901-3',
    pages: 380
  },
  {
    id: '17',
    title: '中国上市公司并购重组法律实务',
    authors: ['李静', '王强'],
    publisher: '《证券市场导报》期刊',
    year: '2024',
    type: '研究报告',
    category: '公司法',
    description: '2023年上市公司并购重组市场研究报告。统计分析全年并购交易数据，总结审核要点和监管趋势，为上市公司并购重组提供实务指引。'
  },
  {
    id: '18',
    title: '商事诉讼证据规则实务',
    authors: ['王建国'],
    publisher: '《法律适用》期刊',
    year: '2023',
    type: '论文',
    category: '诉讼仲裁',
    description: '商事诉讼证据规则适用研究。结合民事诉讼法司法解释，分析举证责任分配、证据保全、电子证据等热点问题，提出完善证据规则的建议。'
  },
  {
    id: '19',
    title: '企业知识产权战略规划',
    authors: ['张明华', '陈雪'],
    publisher: '《中国发明与专利》期刊',
    year: '2024',
    type: '期刊文章',
    category: '知识产权法',
    description: '企业知识产权战略规划指南。介绍专利布局、商标保护、商业秘密管理等知识产权战略要素，结合科技企业、制造企业等不同行业特点提供定制化建议。'
  },
  {
    id: '20',
    title: '中国法律服务业发展报告 2024',
    authors: ['张明华', '李静', '王建国'],
    publisher: '中国社会科学出版社',
    year: '2024',
    type: '研究报告',
    category: '综合',
    cover: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300',
    description: '年度法律服务业发展研究报告。分析中国法律服务市场规模、律所发展趋势、专业领域热点、国际化进程等，为律所战略规划和业务发展提供参考。',
    isbn: '978-7-5203-9012-4',
    pages: 320
  }
];

// 获取所有分类
export function getPublicationCategories(): string[] {
  const categories = new Set<string>();
  publicationsData.forEach(pub => {
    if (pub.category) categories.add(pub.category);
  });
  return Array.from(categories).sort();
}

// 获取所有类型
export function getPublicationTypes(): string[] {
  const types = new Set<string>();
  publicationsData.forEach(pub => types.add(pub.type));
  return Array.from(types);
}

// 根据作者查询出版物
export function getPublicationsByAuthor(authorName: string): Publication[] {
  return publicationsData.filter(pub =>
    pub.authors.some(author => author.includes(authorName))
  );
}

// 根据年份查询出版物
export function getPublicationsByYear(year: string): Publication[] {
  return publicationsData.filter(pub => pub.year === year);
}

// 根据分类查询出版物
export function getPublicationsByCategory(category: string): Publication[] {
  return publicationsData.filter(pub => pub.category === category);
}

// 根据类型查询出版物
export function getPublicationsByType(type: Publication['type']): Publication[] {
  return publicationsData.filter(pub => pub.type === type);
}

// 根据ID获取出版物
export function getPublicationById(id: string): Publication | undefined {
  return publicationsData.find(pub => pub.id === id);
}

// 获取最新出版物
export function getLatestPublications(limit: number = 5): Publication[] {
  return [...publicationsData]
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    .slice(0, limit);
}
