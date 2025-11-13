/**
 * i18n Usage Examples
 *
 * This file demonstrates various ways to use the i18n infrastructure.
 * These examples can be adapted for use in actual Svelte components and TypeScript files.
 */

import {
  getLocale,
  getCurrentLocale,
  setLocale,
  translate,
  createTranslator,
  initializeLocale,
  detectBrowserLocale,
  currentLocale,
  translations,
  LocaleDisplayNames,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  isValidLocale,
  getLocaleFromPath
} from './index';

import type { Locale } from './types';

// ============================================
// Example 1: Basic Usage
// ============================================

function example1_BasicUsage() {
  console.log('=== Example 1: Basic Usage ===\n');

  // Get translations for a specific locale
  const zhTranslations = getLocale('zh');
  console.log('Chinese home:', zhTranslations.nav.home); // 首页

  const enTranslations = getLocale('en');
  console.log('English home:', enTranslations.nav.home); // Home

  const jaTranslations = getLocale('ja');
  console.log('Japanese home:', jaTranslations.nav.home); // ホーム
}

// ============================================
// Example 2: Using the Translation Store
// ============================================

function example2_TranslationStore() {
  console.log('\n=== Example 2: Translation Store ===\n');

  // Subscribe to current translations (reactive in Svelte)
  const unsubscribe = translations.subscribe(t => {
    console.log('Current navigation home:', t.nav.home);
    console.log('Current common loading:', t.common.loading);
  });

  // Change locale - subscribers will receive updated translations
  setLocale('en');

  // Clean up subscription (important in non-Svelte contexts)
  unsubscribe();
}

// ============================================
// Example 3: Dynamic Translation with Parameters
// ============================================

function example3_ParameterInterpolation() {
  console.log('\n=== Example 3: Parameter Interpolation ===\n');

  // Translate with parameters
  const page2_zh = translate('zh', 'common.page', { page: '2' });
  console.log('Chinese page 2:', page2_zh); // 第 2 页

  const page2_en = translate('en', 'common.page', { page: '2' });
  console.log('English page 2:', page2_en); // Page 2

  const page2_ja = translate('ja', 'common.page', { page: '2' });
  console.log('Japanese page 2:', page2_ja); // 2ページ
}

// ============================================
// Example 4: Server-Side Rendering (SSR/SSG)
// ============================================

function example4_ServerSideUsage() {
  console.log('\n=== Example 4: Server-Side Usage ===\n');

  // Create a translator bound to a specific locale
  // Useful in +page.server.ts or +page.ts files
  const t_en = createTranslator('en');
  console.log('English about:', t_en('about.overview_title')); // About Us

  const t_zh = createTranslator('zh');
  console.log('Chinese about:', t_zh('about.overview_title')); // 关于华诚

  const t_ja = createTranslator('ja');
  console.log('Japanese about:', t_ja('about.overview_title')); // 事務所概要
}

// ============================================
// Example 5: Locale Detection and Initialization
// ============================================

function example5_LocaleDetection() {
  console.log('\n=== Example 5: Locale Detection ===\n');

  // Detect browser locale (client-side only)
  if (typeof window !== 'undefined') {
    const browserLocale = detectBrowserLocale();
    console.log('Detected browser locale:', browserLocale);
  }

  // Extract locale from URL path
  const locale1 = getLocaleFromPath('/en/about'); // 'en'
  const locale2 = getLocaleFromPath('/zh/team'); // 'zh'
  const locale3 = getLocaleFromPath('/ja/news'); // 'ja'
  const locale4 = getLocaleFromPath('/invalid'); // 'zh' (default)

  console.log('Locale from /en/about:', locale1);
  console.log('Locale from /zh/team:', locale2);
  console.log('Locale from /ja/news:', locale3);
  console.log('Locale from /invalid:', locale4);

  // Initialize locale from path
  initializeLocale('/en/practices');
  console.log('Current locale after init:', getCurrentLocale());
}

// ============================================
// Example 6: Type Safety and Validation
// ============================================

function example6_TypeSafety() {
  console.log('\n=== Example 6: Type Safety ===\n');

  // Validate locale strings
  const userInput1 = 'en';
  if (isValidLocale(userInput1)) {
    setLocale(userInput1);
    console.log('Valid locale:', userInput1);
  }

  const userInput2 = 'fr'; // Not supported
  if (!isValidLocale(userInput2)) {
    console.log('Invalid locale:', userInput2, '- Using default:', DEFAULT_LOCALE);
  }

  // Display supported locales
  console.log('\nSupported locales:');
  SUPPORTED_LOCALES.forEach(locale => {
    console.log(`  ${locale}: ${LocaleDisplayNames[locale]}`);
  });
}

// ============================================
// Example 7: Real-World Component Pattern
// ============================================

/**
 * Example Svelte component usage pattern
 *
 * File: src/routes/about/+page.svelte
 */
const svelteComponentExample = `
<script lang="ts">
  import { translations, currentLocale } from '$lib/i18n';
</script>

<h1>{$translations.about.overview_title}</h1>
<p>Current locale: {$currentLocale}</p>

<nav>
  <a href="/{$currentLocale}/">{$translations.nav.home}</a>
  <a href="/{$currentLocale}/about">{$translations.nav.about}</a>
  <a href="/{$currentLocale}/practices">{$translations.nav.practices}</a>
</nav>
`;

/**
 * Example SvelteKit load function pattern
 *
 * File: src/routes/[lang]/about/+page.ts
 */
const loadFunctionExample = `
import { getLocale, createTranslator } from '$lib/i18n';
import type { Locale } from '$lib/i18n';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const locale = (params.lang || 'zh') as Locale;
  const t = createTranslator(locale);
  const translations = getLocale(locale);

  return {
    locale,
    translations,
    meta: {
      title: t('about.overview_title'),
      description: t('about.overview_title')
    }
  };
};
`;

/**
 * Example Language Switcher Component
 *
 * File: src/lib/components/LanguageSwitcher.svelte
 */
const languageSwitcherExample = `
<script lang="ts">
  import { currentLocale, setLocale, LocaleDisplayNames, SUPPORTED_LOCALES } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';

  function switchLanguage(locale: Locale) {
    setLocale(locale);

    // Update URL if using locale-based routing
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.substring(3); // Remove /xx
    window.location.href = \`/\${locale}\${pathWithoutLocale}\`;
  }
</script>

<div class="language-switcher">
  {#each SUPPORTED_LOCALES as locale}
    <button
      class:active={$currentLocale === locale}
      on:click={() => switchLanguage(locale)}
    >
      {LocaleDisplayNames[locale]}
    </button>
  {/each}
</div>

<style lang="scss">
  .language-switcher {
    display: flex;
    gap: 0.5rem;

    button {
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      background: white;
      cursor: pointer;

      &.active {
        background: #0E1B3A;
        color: white;
      }
    }
  }
</style>
`;

// ============================================
// Run Examples
// ============================================

export function runAllExamples() {
  example1_BasicUsage();
  example2_TranslationStore();
  example3_ParameterInterpolation();
  example4_ServerSideUsage();
  example5_LocaleDetection();
  example6_TypeSafety();

  console.log('\n=== Example 7: Component Patterns ===\n');
  console.log('Svelte Component Pattern:');
  console.log(svelteComponentExample);
  console.log('\nLoad Function Pattern:');
  console.log(loadFunctionExample);
  console.log('\nLanguage Switcher Pattern:');
  console.log(languageSwitcherExample);
}

// Uncomment to run examples (for testing)
// runAllExamples();
