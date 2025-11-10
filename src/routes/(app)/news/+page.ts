import type { PageLoad } from './$types';
import { newsData, getNewsCategories } from '$lib/data/news';

export const load: PageLoad = async () => {
  return {
    news: newsData,
    categories: getNewsCategories()
  };
};
