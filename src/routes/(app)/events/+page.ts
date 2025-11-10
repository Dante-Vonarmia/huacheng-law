import type { PageLoad } from './$types';
import { eventsData, getEventCategories } from '$lib/data/events';

export const load: PageLoad = async () => {
  return {
    events: eventsData,
    categories: getEventCategories()
  };
};
