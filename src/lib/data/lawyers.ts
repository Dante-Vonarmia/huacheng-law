/**
 * 律师团队数据
 */

export interface Lawyer {
  id: string;
  name_zh: string;
  name_en: string;
  title_zh: string;
  title_en: string;
  photo: string;
  office: string;
  practice_areas: string[];
  languages: string[];
  education: string[];
  experience: string;
  email: string;
  phone: string;
  bio_zh: string;
  achievements: string[];
  publications: string[];
  representative_cases?: {
    title: string;
    year: string;
    description: string;
  }[];
  isFeatured: boolean;
}

export const lawyersData: Lawyer[] = [
  {
    id: '1',
    name_zh: '张明华',
    name_en: 'Zhang Minghua',
    title_zh: '创始合伙人',
    title_en: 'Founding Partner',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop&q=80',
    office: '上海',
    practice_areas: ['知识产权法', '公司法'],
    languages: ['中文', '英文'],
    education: ['北京大学法学学士', '哈佛大学法学硕士（LLM）'],
    experience: '30年执业经验',
    email: 'zhang.minghua@huachenglaw.com',
    phone: '+86 21 5292 1111',
    bio_zh: '张明华律师是华诚律师事务所创始合伙人，在知识产权和公司法领域拥有超过30年的执业经验。他成功代理了500多起重大知识产权案件，涉及专利、商标、著作权等多个领域。张律师曾担任多家世界500强企业的法律顾问，在跨境并购和知识产权战略方面具有深厚造诣。',
    achievements: [
      '钱伯斯（Chambers）亚太地区知识产权领域领先律师（2018-2024）',
      '《法律500强》中国区知识产权律师第一梯队',
      '成功代理某科技公司专利侵权案，获赔金额达2亿元',
      '主导完成多起跨境并购交易，总金额超100亿美元'
    ],
    publications: [
      '《中国知识产权保护实务指南》主编',
      '《跨境并购法律实务》作者',
      '在《知识产权》等核心期刊发表论文50余篇'
    ],
    representative_cases: [
      {
        title: '某科技公司专利侵权案',
        year: '2023',
        description: '代理某科技公司专利侵权案件，获赔金额达2亿元，创下行业记录'
      },
      {
        title: '某跨国公司商标保护',
        year: '2022',
        description: '协助某跨国公司在全球范围内完成商标布局，成功维护品牌权益'
      },
      {
        title: '某企业跨境并购',
        year: '2021',
        description: '主导某企业对美国公司的收购，交易金额30亿美元'
      }
    ],
    isFeatured: true
  },
  {
    id: '2',
    name_zh: '李静',
    name_en: 'Li Jing',
    title_zh: '高级合伙人',
    title_en: 'Senior Partner',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop&q=80',
    office: '北京',
    practice_areas: ['公司法', '金融法'],
    languages: ['中文', '英文', '日文'],
    education: ['中国政法大学法学学士', '伦敦大学学院法学硕士（LLM）'],
    experience: '25年执业经验',
    email: 'li.jing@huachenglaw.com',
    phone: '+86 10 8520 1111',
    bio_zh: '李静律师专注于公司并购、融资重组和私募股权投资领域。她曾为数十家上市公司提供IPO、再融资等资本市场法律服务，并成功主导了多起大型跨境并购项目。李律师在公司治理、合规管理方面具有丰富的实践经验，是众多知名企业的长期法律顾问。',
    achievements: [
      '《亚洲法律杂志》评选为"中国杰出女律师"',
      'IFLR1000推荐律师（公司/并购领域）',
      '协助某集团完成香港主板上市，融资额达50亿港币',
      '主导某跨国公司在华并购项目，交易金额30亿美元'
    ],
    publications: [
      '《公司并购法律实务》合著',
      '《私募股权投资法律指引》编委',
      '多次在《中国律师》杂志发表专业文章'
    ],
    representative_cases: [
      {
        title: '某集团香港上市',
        year: '2023',
        description: '协助某集团完成香港主板上市，融资额达50亿港币'
      },
      {
        title: '某企业跨境并购',
        year: '2022',
        description: '主导某企业对欧洲公司的收购，成功完成交易'
      }
    ],
    isFeatured: true
  },
  {
    id: '3',
    name_zh: '王建国',
    name_en: 'Wang Jianguo',
    title_zh: '高级合伙人',
    title_en: 'Senior Partner',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=700&fit=crop&q=80',
    office: '上海',
    practice_areas: ['诉讼仲裁'],
    languages: ['中文', '英文'],
    education: ['复旦大学法学学士', '哥伦比亚大学法学硕士（LLM）'],
    experience: '28年执业经验',
    email: 'wang.jianguo@huachenglaw.com',
    phone: '+86 21 5292 1122',
    bio_zh: '王建国律师是国内顶尖的诉讼和仲裁专家，在商事诉讼、国际仲裁领域拥有28年执业经验。他代理的案件胜诉率高达98%，涉及金额累计超过200亿元。王律师精通各类复杂商事纠纷的解决，尤其擅长处理跨境争议和大型合同纠纷案件。',
    achievements: [
      '钱伯斯（Chambers）亚太地区争议解决领域领先律师',
      'WhoWhoLegal评选为"全球商事仲裁领域顶尖律师"',
      '代理某央企国际仲裁案，成功追回损失15亿美元',
      '连续10年保持98%以上胜诉率'
    ],
    publications: [
      '《国际商事仲裁实务》主编',
      '《中国商事诉讼策略》作者',
      '担任多个仲裁机构仲裁员'
    ],
    representative_cases: [
      {
        title: '某央企国际仲裁案',
        year: '2023',
        description: '代理某央企国际仲裁案，成功追回损失15亿美元'
      },
      {
        title: '某大型合同纠纷',
        year: '2022',
        description: '成功代理某大型合同纠纷案，涉及金额达10亿元'
      }
    ],
    isFeatured: true
  },
  {
    id: '4',
    name_zh: '陈雪',
    name_en: 'Chen Xue',
    title_zh: '合伙人',
    title_en: 'Partner',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=700&fit=crop&q=80',
    office: '深圳',
    practice_areas: ['知识产权法'],
    languages: ['中文', '英文'],
    education: ['清华大学法学学士', '知识产权法博士'],
    experience: '15年执业经验',
    email: 'chen.xue@huachenglaw.com',
    phone: '+86 755 8888 1111',
    bio_zh: '陈雪律师专注于专利诉讼和技术转让领域，在高科技、生物医药、人工智能等技术密集型行业的知识产权保护方面具有丰富经验。她成功代理了数百起专利侵权诉讼案件，为众多科技企业提供知识产权战略咨询服务。',
    achievements: [
      'Managing IP评选为"中国区知识产权之星"',
      '成功代理某AI公司专利诉讼，获赔8000万元',
      '协助某生物医药企业完成全球专利布局，申请专利300余件',
      '荣获"深圳市优秀律师"称号'
    ],
    publications: [
      '《专利诉讼策略与技巧》作者',
      '《人工智能时代的知识产权保护》合著',
      '在核心期刊发表论文20余篇'
    ],
    isFeatured: false
  },
  {
    id: '5',
    name_zh: '刘伟',
    name_en: 'Liu Wei',
    title_zh: '合伙人',
    title_en: 'Partner',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=700&fit=crop&q=80',
    office: '北京',
    practice_areas: ['金融法'],
    languages: ['中文', '英文'],
    education: ['中国人民大学法学学士', 'CFA持证人'],
    experience: '18年执业经验',
    email: 'liu.wei@huachenglaw.com',
    phone: '+86 10 8520 1122',
    bio_zh: '刘伟律师在金融法领域拥有18年执业经验，精通金融监管、证券发行、基金管理等业务。他同时拥有CFA（特许金融分析师）资格，能够深度理解金融业务本质，为客户提供专业的法律与金融一体化解决方案。',
    achievements: [
      'Asialaw推荐律师（银行与金融领域）',
      '协助某银行完成A股IPO，融资额达80亿元',
      '为多家私募基金提供法律服务，管理规模超500亿元',
      '荣获"北京市金融法律服务优秀律师"称号'
    ],
    publications: [
      '《金融监管法律实务》合著',
      '《私募基金合规指引》编委',
      '定期在《金融法苑》发表专业文章'
    ],
    isFeatured: false
  },
  {
    id: '6',
    name_zh: '杨敏',
    name_en: 'Yang Min',
    title_zh: '合伙人',
    title_en: 'Partner',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=700&fit=crop&q=80',
    office: '上海',
    practice_areas: ['劳动法'],
    languages: ['中文', '英文'],
    education: ['华东政法大学法学学士', '劳动法硕士'],
    experience: '12年执业经验',
    email: 'yang.min@huachenglaw.com',
    phone: '+86 21 5292 1133',
    bio_zh: '杨敏律师专注于劳动法和人力资源合规领域，为众多大型企业提供劳动用工、员工关系管理、合规体系建设等法律服务。她擅长处理复杂劳动争议案件，并在企业重组、裁员等敏感事项中具有丰富的实践经验。',
    achievements: [
      '《亚太法律500强》推荐律师（劳动法领域）',
      '协助某跨国企业完成中国区业务重组，涉及员工3000余人',
      '成功代理数百起劳动争议案件，胜诉率95%以上',
      '荣获"上海市劳动法专业委员会优秀律师"称号'
    ],
    publications: [
      '《企业劳动合规实务指南》作者',
      '《劳动争议典型案例解析》合著',
      '为多家企业提供劳动法培训课程'
    ],
    isFeatured: false
  },
  {
    id: '7',
    name_zh: '赵宇',
    name_en: 'Zhao Yu',
    title_zh: '合伙人',
    title_en: 'Partner',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&q=80',
    office: '上海',
    practice_areas: ['房地产法'],
    languages: ['中文', '英文'],
    education: ['同济大学法学学士', '房地产法硕士'],
    experience: '16年执业经验',
    email: 'zhao.yu@huachenglaw.com',
    phone: '+86 21 5292 1144',
    bio_zh: '赵宇律师在房地产法领域拥有16年执业经验，擅长房地产开发、建设工程、物业管理等业务。他为多家房地产开发企业提供全流程法律服务，累计参与项目总投资额超1000亿元。',
    achievements: [
      'Legal 500推荐律师（房地产与建设工程领域）',
      '协助某地产集团完成全国性业务布局，涉及项目50余个',
      '成功处理多起重大建设工程纠纷',
      '荣获"上海市房地产法律服务优秀律师"称号'
    ],
    publications: [
      '《房地产开发法律实务》合著',
      '《建设工程合同纠纷处理指南》编委'
    ],
    isFeatured: false
  },
  {
    id: '8',
    name_zh: '周洁',
    name_en: 'Zhou Jie',
    title_zh: '合伙人',
    title_en: 'Partner',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=700&fit=crop&q=80',
    office: '北京',
    practice_areas: ['税务法'],
    languages: ['中文', '英文'],
    education: ['中央财经大学法学学士', '税务师'],
    experience: '14年执业经验',
    email: 'zhou.jie@huachenglaw.com',
    phone: '+86 10 8520 1133',
    bio_zh: '周洁律师专注于税务筹划、税务争议解决和跨境税务安排。她同时拥有税务师资格，能够为企业提供税法与税务实务相结合的专业服务。周律师在跨境投资、企业重组等交易中的税务安排方面经验丰富。',
    achievements: [
      'ITR（国际税务评论）推荐律师',
      '协助某跨国集团完成税务架构优化，年节税额超5亿元',
      '成功处理多起重大税务争议案件',
      '荣获"全国优秀税务律师"称号'
    ],
    publications: [
      '《企业税务筹划实务》作者',
      '《跨境投资税务指南》合著'
    ],
    isFeatured: false
  },
  {
    id: '9',
    name_zh: '马强',
    name_en: 'Ma Qiang',
    title_zh: '合伙人',
    title_en: 'Partner',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=700&fit=crop&q=80',
    office: '深圳',
    practice_areas: ['竞争法'],
    languages: ['中文', '英文'],
    education: ['武汉大学法学学士', '反垄断法博士'],
    experience: '13年执业经验',
    email: 'ma.qiang@huachenglaw.com',
    phone: '+86 755 8888 1122',
    bio_zh: '马强律师专注于反垄断、反不正当竞争和数据合规领域。他在互联网、科技行业的竞争法合规方面具有丰富经验，为多家科技巨头提供反垄断申报、竞争合规等法律服务。',
    achievements: [
      'GCR（全球竞争评论）推荐律师',
      '协助某科技公司完成反垄断申报，顺利获批',
      '成功代理多起反不正当竞争诉讼案件',
      '荣获"深圳市竞争法专业优秀律师"称号'
    ],
    publications: [
      '《反垄断法实务指南》合著',
      '《数字经济时代的竞争法》作者'
    ],
    isFeatured: false
  }
];

// 获取所有执业领域
export function getPracticeAreas(): string[] {
  const areas = new Set<string>();
  lawyersData.forEach(lawyer => {
    lawyer.practice_areas.forEach(area => areas.add(area));
  });
  return Array.from(areas).sort();
}

// 获取所有办公地点
export function getOffices(): string[] {
  const offices = new Set<string>();
  lawyersData.forEach(lawyer => offices.add(lawyer.office));
  return Array.from(offices).sort();
}

// 获取所有语言
export function getLanguages(): string[] {
  const languages = new Set<string>();
  lawyersData.forEach(lawyer => {
    lawyer.languages.forEach(lang => languages.add(lang));
  });
  return Array.from(languages).sort();
}

// 根据ID获取律师
export function getLawyerById(id: string): Lawyer | undefined {
  return lawyersData.find(lawyer => lawyer.id === id);
}

// 获取资深合伙人
export function getFeaturedLawyers(): Lawyer[] {
  return lawyersData.filter(lawyer => lawyer.isFeatured);
}

// 获取普通合伙人
export function getRegularLawyers(): Lawyer[] {
  return lawyersData.filter(lawyer => !lawyer.isFeatured);
}
