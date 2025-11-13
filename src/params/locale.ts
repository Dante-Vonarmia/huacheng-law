import type { ParamMatcher } from '@sveltejs/kit';

/**
 * Locale parameter matcher for SvelteKit routing
 * Matches valid locale codes: zh (Chinese), en (English), ja (Japanese)
 */
export const match = ((param) => {
  return ['zh', 'en', 'ja'].includes(param);
}) satisfies ParamMatcher;
