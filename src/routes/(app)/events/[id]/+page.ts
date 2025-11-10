import type { PageLoad } from './$types';
import { getEventById, getUpcomingEvents } from '$lib/data/events';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const event = getEventById(params.id);

  if (!event) {
    throw error(404, '活动不存在');
  }

  const relatedEvents = getUpcomingEvents(4).filter(item => item.id !== event.id).slice(0, 3);

  return {
    event,
    relatedEvents
  };
};
