import type { PageLoad } from './$types';
import { newsData } from '$lib/data/news';

export const load: PageLoad = async () => {
  // 过滤"事务所动态"分类的新闻
  const filteredNews = newsData.filter(news => news.category === '事务所动态');

  return {
    category: '事务所动态',
    news: filteredNews
  };
};
