import { setLocale, type Locale } from '$lib/i18n';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const locale = params.lang as Locale;
  setLocale(locale);

  return {
    locale
  };
};
