import type { PageLoad } from './$types';
import { getNewsById, getLatestNews } from '$lib/data/news';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const news = getNewsById(params.id);

  if (!news) {
    throw error(404, '新闻不存在');
  }

  // 获取相关新闻（同分类的最新3条，排除当前）
  const relatedNews = getLatestNews(6).filter(item =>
    item.id !== news.id && item.category === news.category
  ).slice(0, 3);

  return {
    news,
    relatedNews
  };
};
