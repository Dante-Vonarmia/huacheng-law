import type { PageLoad } from './$types';
import { lawyersData, getPracticeAreas, getOffices, getLanguages } from '$lib/data/lawyers';

export const load: PageLoad = async () => {
  return {
    lawyers: lawyersData,
    practiceAreas: getPracticeAreas(),
    offices: getOffices(),
    languages: getLanguages()
  };
};
