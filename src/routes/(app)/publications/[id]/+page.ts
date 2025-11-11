import type { PageLoad } from './$types';
import { getPublicationById, publicationsData } from '$lib/data/publications';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const publication = getPublicationById(params.id);

  if (!publication) {
    throw error(404, 'Publication not found');
  }

  // Get related publications (same category)
  const relatedPublications = publication.category
    ? publicationsData
        .filter(p => p.id !== publication.id && p.category === publication.category)
        .slice(0, 3)
    : [];

  return {
    publication,
    relatedPublications
  };
};
