import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  // 这里应该从实际API或数据源获取律师详情
  // 暂时返回模拟数据
  const lawyers = [
    {
      id: '1',
      name_zh: '张明华',
      name_en: 'Zhang Minghua',
      title_zh: '创始合伙人',
      title_en: 'Founding Partner',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600',
      office: '上海',
      practice_areas: ['知识产权法', '公司法'],
      languages: ['中文', '英文'],
      education: ['北京大学法学学士', '哈佛大学法学硕士（LLM）'],
      experience: '30年执业经验',
      email: 'zhang.minghua@huachenglaw.com',
      phone: '+86 21 5292 1111',
      bio_zh: '张明华律师是华诚律师事务所创始合伙人，在知识产权和公司法领域拥有超过30年的执业经验。',
      achievements: [
        '钱伯斯（Chambers）亚太地区知识产权领域领先律师（2018-2024）',
        '《法律500强》中国区知识产权律师第一梯队'
      ],
      publications: [
        '《中国知识产权保护实务指南》主编',
        '《跨境并购法律实务》作者'
      ]
    }
  ];

  const lawyer = lawyers.find(l => l.id === params.id);

  if (!lawyer) {
    throw error(404, '律师信息不存在');
  }

  return { lawyer };
};
