/**
 * Internationalization (i18n) Types
 * Defines TypeScript interfaces for all locale keys and translation structures
 */

/**
 * Supported locale codes
 */
export type Locale = 'zh' | 'en' | 'ja';

/**
 * Locale display names for UI
 */
export const LocaleDisplayNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語'
};

/**
 * Navigation section translations
 */
export interface NavTranslations {
  home: string;
  about: string;
  practices: string;
  team: string;
  news: string;
  publications: string;
  events: string;
  careers: string;
  contact: string;
  showcase: string;
  search: string;
}

/**
 * Home page translations
 */
export interface HomeTranslations {
  hero_title: string;
  hero_subtitle: string;
  practices_title: string;
  practices_subtitle: string;
  lawyers_title: string;
  lawyers_subtitle: string;
  news_title: string;
  news_subtitle: string;
}

/**
 * About page translations
 */
export interface AboutTranslations {
  overview_title: string;
  history_title: string;
  csr_title: string;
  awards_title: string;
}

/**
 * Practices page translations
 */
export interface PracticesTranslations {
  title: string;
  filter: string;
  all: string;
  related_lawyers: string;
}

/**
 * Team page translations
 */
export interface TeamTranslations {
  title: string;
  filter_by_practice: string;
  filter_by_office: string;
  filter_by_language: string;
  all_practices: string;
  all_offices: string;
  all_languages: string;
  contact: string;
  practices: string;
  publications: string;
  related_news: string;
}

/**
 * News page translations
 */
export interface NewsTranslations {
  title: string;
  latest: string;
  all_categories: string;
  read_more: string;
  share: string;
}

/**
 * Events page translations
 */
export interface EventsTranslations {
  title: string;
  upcoming: string;
  past: string;
  register: string;
  speaker: string;
  location: string;
  date: string;
}

/**
 * Careers page translations
 */
export interface CareersTranslations {
  title: string;
  positions: string;
  apply: string;
  upload_resume: string;
}

/**
 * Contact page translations
 */
export interface ContactTranslations {
  title: string;
  form_title: string;
  offices: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  success: string;
  error: string;
}

/**
 * Search page translations
 */
export interface SearchTranslations {
  title: string;
  placeholder: string;
  results: string;
  no_results: string;
  filter_by_type: string;
}

/**
 * Common UI translations
 */
export interface CommonTranslations {
  more: string;
  loading: string;
  error: string;
  back: string;
  next: string;
  prev: string;
  page: string;
}

/**
 * Footer translations
 */
export interface FooterTranslations {
  copyright: string;
  icp: string;
  address: string;
  phone: string;
  email: string;
}

/**
 * Complete translations structure for a locale
 */
export interface Translations {
  nav: NavTranslations;
  home: HomeTranslations;
  about: AboutTranslations;
  practices: PracticesTranslations;
  team: TeamTranslations;
  news: NewsTranslations;
  events: EventsTranslations;
  careers: CareersTranslations;
  contact: ContactTranslations;
  search: SearchTranslations;
  common: CommonTranslations;
  footer: FooterTranslations;
}

/**
 * Type guard to check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return ['zh', 'en', 'ja'].includes(locale);
}

/**
 * Get locale from URL path
 * @param pathname - The URL pathname
 * @returns The locale code or 'zh' as default
 */
export function getLocaleFromPath(pathname: string): Locale {
  // Match /en/ or /ja/ at the beginning
  const match = pathname.match(/^\/(en|ja)(\/|$)/);
  if (match && isValidLocale(match[1])) {
    return match[1];
  }
  // Default to Chinese for root path and /zh/ prefix
  return 'zh';
}
