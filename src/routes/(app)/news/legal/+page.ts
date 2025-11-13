import type { PageLoad } from './$types';
import { newsData } from '$lib/data/news';

export const load: PageLoad = async () => {
  // 过滤"专业观点"分类的新闻
  const filteredNews = newsData.filter(news => news.category === '专业观点');

  return {
    category: '专业观点',
    news: filteredNews
  };
};
