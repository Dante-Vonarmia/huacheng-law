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
  },
  {
    id: '10',
    name_zh: '孙婷',
    name_en: 'Sun Ting',
    title_zh: '合伙人',
    title_en: 'Partner',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=700&fit=crop&q=80',
    office: '上海',
    practice_areas: ['知识产权法', '科技法'],
    languages: ['中文', '英文', '法文'],
    education: ['上海交通大学法学学士', '巴黎第二大学知识产权法硕士'],
    experience: '11年执业经验',
    email: 'sun.ting@huachenglaw.com',
    phone: '+86 21 5292 1155',
    bio_zh: '孙婷律师专注于版权法、软件著作权和数字内容保护。她在互联网、影视、出版等行业的知识产权保护方面具有丰富经验，为多家内容平台提供版权合规和侵权应对服务。',
    achievements: [
      'WTR 1000推荐律师（版权领域）',
      '成功代理某视频平台版权诉讼案，获赔3000万元',
      '协助某游戏公司完成全球版权布局',
      '荣获"上海市知识产权保护先进个人"称号'
    ],
    publications: [
      '《数字内容版权保护实务》作者',
      '《软件著作权法律指南》合著'
    ],
    isFeatured: false
  },
  {
    id: '11',
    name_zh: '吴刚',
    name_en: 'Wu Gang',
    title_zh: '合伙人',
    title_en: 'Partner',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=700&fit=crop&q=80',
    office: '北京',
    practice_areas: ['环境法', '能源法'],
    languages: ['中文', '英文'],
    education: ['中国人民大学法学学士', '环境法硕士'],
    experience: '16年执业经验',
    email: 'wu.gang@huachenglaw.com',
    phone: '+86 10 8520 1144',
    bio_zh: '吴刚律师专注于环境保护、能源项目和ESG合规。他为多家大型企业提供环境法律服务，协助企业应对环保监管、完成绿色转型。吴律师在碳交易、新能源项目投资方面具有独特见解。',
    achievements: [
      'Chambers Asia推荐律师（环境法领域）',
      '协助某能源集团完成10GW风电项目投资',
      '为多家企业建立ESG合规体系',
      '荣获"全国环境法律服务优秀律师"称号'
    ],
    publications: [
      '《企业环境合规指南》主编',
      '《碳交易法律实务》合著'
    ],
    isFeatured: false
  },
  {
    id: '12',
    name_zh: '黄丽',
    name_en: 'Huang Li',
    title_zh: '合伙人',
    title_en: 'Partner',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=700&fit=crop&q=80',
    office: '深圳',
    practice_areas: ['公司法', '创业法'],
    languages: ['中文', '英文'],
    education: ['厦门大学法学学士', '创业与创新法律硕士'],
    experience: '10年执业经验',
    email: 'huang.li@huachenglaw.com',
    phone: '+86 755 8888 1133',
    bio_zh: '黄丽律师专注于创业公司法律服务、股权设计和风险投资。她为数百家初创企业提供从设立到融资的全流程法律服务，累计协助企业融资超50亿元。黄律师对互联网、科技创业领域有深刻理解。',
    achievements: [
      '深圳市创业导师',
      '协助某AI独角兽完成C轮融资，融资额10亿元',
      '为300余家创业企业提供股权架构设计',
      '荣获"深圳市创新创业法律服务先进个人"称号'
    ],
    publications: [
      '《创业企业法律实务》作者',
      '《股权激励设计与实施》合著'
    ],
    isFeatured: false
  },
  {
    id: '13',
    name_zh: '郑浩',
    name_en: 'Zheng Hao',
    title_zh: '高级律师',
    title_en: 'Senior Associate',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&h=700&fit=crop&q=80',
    office: '上海',
    practice_areas: ['诉讼仲裁', '建筑工程'],
    languages: ['中文', '英文'],
    education: ['同济大学法学学士', '建设工程法硕士'],
    experience: '9年执业经验',
    email: 'zheng.hao@huachenglaw.com',
    phone: '+86 21 5292 1166',
    bio_zh: '郑浩律师专注于建设工程纠纷、工程合同审查和施工索赔。他成功代理了多起重大建设工程诉讼案件，涉及金额累计超30亿元。郑律师精通建设工程法律法规，能为客户提供专业的风险防控建议。',
    achievements: [
      '成功代理某地铁项目施工纠纷，追回工程款5亿元',
      '协助某建筑集团完善工程合同管理体系',
      '为50余个重大工程项目提供法律服务',
      '荣获"上海市建筑法律服务优秀律师"称号'
    ],
    publications: [
      '《建设工程纠纷处理实务》合著',
      '《工程索赔法律指南》编委'
    ],
    isFeatured: false
  },
  {
    id: '14',
    name_zh: '林娜',
    name_en: 'Lin Na',
    title_zh: '高级律师',
    title_en: 'Senior Associate',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=700&fit=crop&q=80',
    office: '北京',
    practice_areas: ['医疗法', '生物医药'],
    languages: ['中文', '英文'],
    education: ['北京大学医学部法学学士', '卫生法学硕士'],
    experience: '8年执业经验',
    email: 'lin.na@huachenglaw.com',
    phone: '+86 10 8520 1155',
    bio_zh: '林娜律师专注于医疗健康、药品注册和医疗器械监管。她拥有医学和法学双重背景，能够为医药企业提供专业的合规咨询和产品注册服务。林律师在临床试验、医疗纠纷方面经验丰富。',
    achievements: [
      '协助某制药企业完成10个新药注册申报',
      '成功代理多起医疗纠纷案件',
      '为30余家医药企业建立合规体系',
      '荣获"全国卫生法律服务优秀律师"称号'
    ],
    publications: [
      '《医疗器械法规实务》作者',
      '《药品注册法律指南》合著'
    ],
    isFeatured: false
  },
  {
    id: '15',
    name_zh: '许涛',
    name_en: 'Xu Tao',
    title_zh: '高级律师',
    title_en: 'Senior Associate',
    photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=700&fit=crop&q=80',
    office: '深圳',
    practice_areas: ['数据法', '网络安全'],
    languages: ['中文', '英文'],
    education: ['北京邮电大学法学学士', '信息安全法硕士'],
    experience: '7年执业经验',
    email: 'xu.tao@huachenglaw.com',
    phone: '+86 755 8888 1144',
    bio_zh: '许涛律师专注于数据保护、网络安全和个人信息合规。他为多家互联网企业提供数据合规咨询，协助企业应对《个人信息保护法》《数据安全法》等新法规要求。许律师在跨境数据传输方面具有丰富经验。',
    achievements: [
      '协助某互联网公司完成数据合规体系建设',
      '为50余家企业提供个人信息保护培训',
      '成功应对多起数据安全监管调查',
      '荣获"深圳市网络安全法律服务先进个人"称号'
    ],
    publications: [
      '《个人信息保护合规指南》作者',
      '《数据跨境传输法律实务》合著'
    ],
    isFeatured: false
  },
  {
    id: '16',
    name_zh: '秦丽',
    name_en: 'Qin Li',
    title_zh: '高级律师',
    title_en: 'Senior Associate',
    photo: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=600&h=700&fit=crop&q=80',
    office: '上海',
    practice_areas: ['家族财富', '信托法'],
    languages: ['中文', '英文', '德文'],
    education: ['复旦大学法学学士', '信托法硕士'],
    experience: '9年执业经验',
    email: 'qin.li@huachenglaw.com',
    phone: '+86 21 5292 1177',
    bio_zh: '秦丽律师专注于家族财富管理、信托设立和财产传承规划。她为高净值客户提供全方位的财富保护和传承方案，涉及资产总额超100亿元。秦律师在跨境家族信托、家族办公室设立方面经验丰富。',
    achievements: [
      'WealthBriefing评选为"亚洲财富管理法律顾问"',
      '协助某家族设立10亿美元家族信托',
      '为50余个高净值家庭提供财富传承方案',
      '荣获"上海市财富管理法律服务优秀律师"称号'
    ],
    publications: [
      '《家族信托法律实务》主编',
      '《财富传承与税务筹划》合著'
    ],
    isFeatured: false
  },
  {
    id: '17',
    name_zh: '冯军',
    name_en: 'Feng Jun',
    title_zh: '律师',
    title_en: 'Associate',
    photo: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=600&h=700&fit=crop&q=80',
    office: '北京',
    practice_areas: ['刑事辩护', '合规'],
    languages: ['中文', '英文'],
    education: ['中国政法大学刑法学学士', '刑事法硕士'],
    experience: '6年执业经验',
    email: 'feng.jun@huachenglaw.com',
    phone: '+86 10 8520 1166',
    bio_zh: '冯军律师专注于刑事辩护、企业刑事合规和职务犯罪预防。他成功代理了多起重大经济犯罪案件，为企业高管提供刑事法律风险防范服务。冯律师在反腐败合规、刑事风险管理方面具有深入研究。',
    achievements: [
      '成功辩护某企业高管经济犯罪案件，获无罪判决',
      '为20余家企业建立刑事合规体系',
      '代理多起职务犯罪辩护案件',
      '荣获"北京市刑事辩护优秀律师"称号'
    ],
    publications: [
      '《企业刑事合规实务》合著',
      '《经济犯罪辩护策略》编委'
    ],
    isFeatured: false
  },
  {
    id: '18',
    name_zh: '田芳',
    name_en: 'Tian Fang',
    title_zh: '律师',
    title_en: 'Associate',
    photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&h=700&fit=crop&q=80',
    office: '深圳',
    practice_areas: ['海商法', '国际贸易'],
    languages: ['中文', '英文', '西班牙文'],
    education: ['大连海事大学法学学士', '海商法硕士'],
    experience: '6年执业经验',
    email: 'tian.fang@huachenglaw.com',
    phone: '+86 755 8888 1155',
    bio_zh: '田芳律师专注于海事海商、国际货物运输和海事保险。她为船公司、货代企业提供专业法律服务，成功处理了多起海事纠纷案件。田律师在海上货物损失索赔、船舶碰撞责任方面经验丰富。',
    achievements: [
      '成功代理某货物灭失案件，追回损失2000万元',
      '为30余家航运企业提供法律服务',
      '处理多起复杂海事保险理赔案件',
      '荣获"深圳市海商法律服务优秀律师"称号'
    ],
    publications: [
      '《海事纠纷处理实务》合著',
      '《国际货物运输法律指南》编委'
    ],
    isFeatured: false
  },
  {
    id: '19',
    name_zh: '韩超',
    name_en: 'Han Chao',
    title_zh: '律师',
    title_en: 'Associate',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=700&fit=crop&q=80',
    office: '上海',
    practice_areas: ['体育法', '娱乐法'],
    languages: ['中文', '英文'],
    education: ['上海体育学院法学学士', '体育法硕士'],
    experience: '5年执业经验',
    email: 'han.chao@huachenglaw.com',
    phone: '+86 21 5292 1188',
    bio_zh: '韩超律师专注于体育产业、运动员权益保护和赛事运营法律服务。他为多家体育俱乐部、运动员和赛事组织方提供法律支持，在体育经纪合同、赛事转播权方面具有丰富经验。',
    achievements: [
      '协助某足球俱乐部完成球员转会谈判',
      '为10余名职业运动员提供法律服务',
      '成功处理多起体育赛事纠纷',
      '荣获"上海市体育法律服务优秀律师"称号'
    ],
    publications: [
      '《体育产业法律实务》合著',
      '《运动员权益保护指南》编委'
    ],
    isFeatured: false
  },
  {
    id: '20',
    name_zh: '叶敏',
    name_en: 'Ye Min',
    title_zh: '律师',
    title_en: 'Associate',
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=700&fit=crop&q=80',
    office: '北京',
    practice_areas: ['保险法', '风险管理'],
    languages: ['中文', '英文'],
    education: ['对外经济贸易大学法学学士', '保险法硕士'],
    experience: '5年执业经验',
    email: 'ye.min@huachenglaw.com',
    phone: '+86 10 8520 1177',
    bio_zh: '叶敏律师专注于保险法律服务、保险产品设计和理赔争议解决。她为保险公司、保险中介机构提供合规咨询和风险管理服务。叶律师在财产保险、责任保险方面具有扎实的理论基础和实践经验。',
    achievements: [
      '协助某保险公司完成产品创新和监管审批',
      '成功代理30余起保险理赔纠纷案件',
      '为多家企业提供保险风险管理方案',
      '荣获"全国保险法律服务优秀律师"称号'
    ],
    publications: [
      '《保险合同纠纷处理实务》合著',
      '《保险法律合规指南》编委'
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
