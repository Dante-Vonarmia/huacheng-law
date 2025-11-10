/**
 * 华诚律师事务所 - 公司信息
 * Watson & Band - Company Information
 */

export interface OfficeInfo {
  id: string;
  name_zh: string;
  name_en: string;
  address_zh: string;
  address_en: string;
  tel: string;
  fax?: string;
  email?: string;
  maps_link?: string;
}

export const companyInfo = {
  name_zh: '华诚律师事务所',
  name_en: 'WATSON & BAND',
  name_full_en: 'Watson & Band Law Firm',

  // 主要联系方式
  main_office: 'shanghai',
  email: 'info@watson-band.com',
  website: 'www.watson-band.com',

  // 工作时间
  business_hours_zh: '周一至周五 9:00-18:00',
  business_hours_en: 'Monday - Friday 9:00-18:00',

  // 社交媒体
  social: {
    wechat: 'WatsonBand',
    linkedin: 'https://www.linkedin.com/company/watson-band',
    weibo: 'https://weibo.com/watsonband',
  },

  // 简介
  description_zh: '华诚律师事务所成立于1993年，是中国领先的综合性律师事务所之一。我们在上海、北京、哈尔滨、香港、烟台、甘肃设有办公室，为国内外客户提供全方位的法律服务。',
  description_en: 'Watson & Band was established in 1993 and is one of China\'s leading full-service law firms. With offices in Shanghai, Beijing, Harbin, Hong Kong, Yantai, and Gansu, we provide comprehensive legal services to domestic and international clients.',
};

// 办公室信息（基于官网真实信息）
export const offices: OfficeInfo[] = [
  {
    id: 'shanghai',
    name_zh: '上海办公室',
    name_en: 'Shanghai Office',
    address_zh: '上海市黄浦区（详细地址待补充）',
    address_en: 'Huangpu District, Shanghai, China',
    tel: '(86-21) 5292-1111 / (86-21) 6350-0777',
    fax: '(86-21) 5292-1001 / (86-21) 6272-6366',
    email: 'shanghai@watson-band.com',
  },
  {
    id: 'beijing',
    name_zh: '北京办公室',
    name_en: 'Beijing Office',
    address_zh: '北京市（详细地址待补充）',
    address_en: 'Beijing, China',
    tel: '(86-10) 8563-3059',
    email: 'beijing@watson-band.com',
  },
  {
    id: 'harbin',
    name_zh: '哈尔滨办公室',
    name_en: 'Harbin Office',
    address_zh: '黑龙江省哈尔滨市（详细地址待补充）',
    address_en: 'Harbin, Heilongjiang, China',
    tel: '(+86) 139-3625-1391',
    email: 'harbin@watson-band.com',
  },
  {
    id: 'yantai',
    name_zh: '烟台办公室',
    name_en: 'Yantai Office',
    address_zh: '山东省烟台市（详细地址待补充）',
    address_en: 'Yantai, Shandong, China',
    tel: '(0535) 410-4160',
    email: 'yantai@watson-band.com',
  },
  {
    id: 'gansu',
    name_zh: '甘肃办公室',
    name_en: 'Gansu Office',
    address_zh: '甘肃省（详细地址待补充）',
    address_en: 'Gansu, China',
    tel: '待补充',
    email: 'gansu@watson-band.com',
  },
  {
    id: 'hongkong',
    name_zh: '香港办公室',
    name_en: 'Hong Kong Office',
    address_zh: '香港（详细地址待补充）',
    address_en: 'Hong Kong',
    tel: '待补充',
    email: 'hongkong@watson-band.com',
  },
];

// 获取主办公室信息
export function getMainOffice(): OfficeInfo {
  return offices.find(office => office.id === companyInfo.main_office) || offices[0];
}

// 获取所有办公室城市列表
export function getOfficeCities(): string[] {
  return offices.map(office => office.name_zh.replace('办公室', ''));
}
