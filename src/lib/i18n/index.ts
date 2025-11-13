/**
 * Internationalization (i18n) Utility
 * Provides locale management and translation functions for the Watson & Band Law Firm website
 */

import { writable } from 'svelte/store';
import type { Locale, Translations } from './types';
import { isValidLocale } from './types';

// Import locale JSON files
import zhTranslations from '../../../locales/zh.json';
import enTranslations from '../../../locales/en.json';
import jaTranslations from '../../../locales/ja.json';

/**
 * Locale data registry
 * Maps locale codes to their translation objects
 */
const localeData: Record<Locale, Translations> = {
  zh: zhTranslations as Translations,
  en: enTranslations as Translations,
  ja: jaTranslations as Translations
};

/**
 * Default locale for the application
 */
export const DEFAULT_LOCALE: Locale = 'zh';

/**
 * Supported locales array
 */
export const SUPPORTED_LOCALES: Locale[] = ['zh', 'en', 'ja'];

/**
 * Current locale store
 * Writable store that can be updated throughout the application
 */
export const currentLocale = writable<Locale>(DEFAULT_LOCALE);

/**
 * Get translations for a specific locale
 * @param locale - The locale code ('zh', 'en', or 'ja')
 * @returns The complete translations object for the locale
 * @throws Error if locale is not supported
 */
export function getLocale(locale: Locale): Translations {
  if (!isValidLocale(locale)) {
    console.warn(`Invalid locale '${locale}', falling back to '${DEFAULT_LOCALE}'`);
    return localeData[DEFAULT_LOCALE];
  }

  const translations = localeData[locale];

  if (!translations) {
    console.error(`Translations not found for locale '${locale}', falling back to '${DEFAULT_LOCALE}'`);
    return localeData[DEFAULT_LOCALE];
  }

  return translations;
}

/**
 * Get the current locale from the store
 * @returns The current locale value
 */
export function getCurrentLocale(): Locale {
  let locale: Locale = DEFAULT_LOCALE;
  currentLocale.subscribe(value => {
    locale = value;
  })();
  return locale;
}

/**
 * Set the current locale
 * @param locale - The locale to set as current
 */
export function setLocale(locale: Locale): void {
  if (!isValidLocale(locale)) {
    console.warn(`Cannot set invalid locale '${locale}'`);
    return;
  }
  currentLocale.set(locale);
}

/**
 * Get a translated string by key path
 * @param locale - The locale to use
 * @param keyPath - Dot-notation key path (e.g., 'nav.home', 'contact.submit')
 * @param params - Optional parameters to interpolate into the translation
 * @returns The translated string
 *
 * @example
 * ```typescript
 * const homeText = translate('en', 'nav.home'); // 'Home'
 * const pageText = translate('zh', 'common.page', { page: '2' }); // '第 2 页'
 * ```
 */
export function translate(
  locale: Locale,
  keyPath: string,
  params?: Record<string, string | number>
): string {
  const translations = getLocale(locale);
  const keys = keyPath.split('.');

  // Navigate through nested translation object
  let value: any = translations;
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Translation key '${keyPath}' not found for locale '${locale}'`);
      return keyPath; // Return the key path as fallback
    }
  }

  // Ensure we have a string
  if (typeof value !== 'string') {
    console.warn(`Translation value for '${keyPath}' is not a string`);
    return keyPath;
  }

  // Interpolate parameters if provided
  if (params) {
    return interpolate(value, params);
  }

  return value;
}

/**
 * Interpolate parameters into a translation string
 * Replaces {key} placeholders with corresponding values from params
 * @param template - The template string with {key} placeholders
 * @param params - Object with key-value pairs for interpolation
 * @returns The interpolated string
 *
 * @example
 * ```typescript
 * interpolate('Page {page}', { page: '2' }); // 'Page 2'
 * interpolate('第 {page} 页', { page: '3' }); // '第 3 页'
 * ```
 */
function interpolate(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return key in params ? String(params[key]) : match;
  });
}

/**
 * Get translations for the current locale from the store
 * This is a reactive helper for Svelte components
 * @returns Readable store containing current translations
 *
 * @example
 * ```svelte
 * <script>
 *   import { translations } from '$lib/i18n';
 * </script>
 *
 * <h1>{$translations.nav.home}</h1>
 * ```
 */
export const translations = {
  subscribe: (callback: (value: Translations) => void) => {
    return currentLocale.subscribe(locale => {
      callback(getLocale(locale));
    });
  }
};

/**
 * Create a translation function bound to a specific locale
 * Useful for server-side rendering or static generation
 * @param locale - The locale to bind to
 * @returns A translation function that uses the specified locale
 *
 * @example
 * ```typescript
 * const t = createTranslator('en');
 * const homeText = t('nav.home'); // 'Home'
 * const pageText = t('common.page', { page: '2' }); // 'Page 2'
 * ```
 */
export function createTranslator(locale: Locale) {
  return (keyPath: string, params?: Record<string, string | number>): string => {
    return translate(locale, keyPath, params);
  };
}

/**
 * Detect browser locale and return matching supported locale
 * Falls back to default locale if no match found
 * @returns A supported locale code
 */
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const browserLang = navigator.language.toLowerCase();

  // Direct match (e.g., 'en' or 'zh')
  if (isValidLocale(browserLang)) {
    return browserLang;
  }

  // Match language prefix (e.g., 'en-US' -> 'en')
  const langPrefix = browserLang.split('-')[0];
  if (isValidLocale(langPrefix)) {
    return langPrefix;
  }

  // No match found, return default
  return DEFAULT_LOCALE;
}

/**
 * Initialize locale from browser settings or URL
 * Should be called on app initialization
 * @param pathname - Optional URL pathname to extract locale from
 */
export function initializeLocale(pathname?: string): void {
  if (pathname) {
    // Match /en/ or /ja/ at the beginning
    const match = pathname.match(/^\/(en|ja)(\/|$)/);
    if (match && isValidLocale(match[1])) {
      setLocale(match[1]);
      return;
    }
  }

  // Default to Chinese for root path
  setLocale('zh');
}

// Re-export types for convenience
export type { Locale, Translations } from './types';
export { LocaleDisplayNames, isValidLocale, getLocaleFromPath } from './types';
