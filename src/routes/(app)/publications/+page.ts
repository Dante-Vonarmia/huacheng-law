import type { PageLoad } from './$types';
import { publicationsData, getPublicationCategories, getPublicationTypes } from '$lib/data/publications';

export const load: PageLoad = async () => {
  return {
    publications: publicationsData,
    categories: getPublicationCategories(),
    types: getPublicationTypes()
  };
};
