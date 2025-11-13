import { initI18n } from '$lib/utils/i18n';
import { redirect, type Handle } from '@sveltejs/kit';

// 服务端启动时初始化 i18n
initI18n();

/**
 * SvelteKit server hooks
 * Handles locale routing and redirects
 */
export const handle: Handle = async ({ event, resolve }) => {
  const { url } = event;

  // Handle invalid language routes - redirect to Chinese
  // Match patterns like /xyz or /xyz/... where xyz is not a valid locale
  const pathMatch = url.pathname.match(/^\/([a-z]{2})(\/|$)/);
  if (pathMatch) {
    const lang = pathMatch[1];
    const validLocales = ['zh', 'en', 'ja'];

    if (!validLocales.includes(lang)) {
      // Invalid language code, redirect to Chinese with the same path
      const restOfPath = url.pathname.slice(3); // Remove /xy
      throw redirect(302, `/zh${restOfPath}`);
    }
  }

  return resolve(event);
};

export { };
