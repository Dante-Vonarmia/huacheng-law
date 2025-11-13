# i18n Infrastructure

Comprehensive internationalization system for Watson & Band Law Firm website with Chinese, English, and Japanese support.

## Quick Start

### Basic Usage in Svelte Components

```svelte
<script lang="ts">
  import { translations, currentLocale } from '$lib/i18n';
</script>

<h1>{$translations.nav.home}</h1>
<p>{$translations.home.hero_title}</p>

<!-- Access current locale -->
<p>Current locale: {$currentLocale}</p>
```

### Translation Function for Dynamic Keys

```typescript
import { translate, getCurrentLocale } from '$lib/i18n';

const locale = getCurrentLocale();
const homeText = translate(locale, 'nav.home');
const pageText = translate(locale, 'common.page', { page: '2' });
```

### Server-Side Usage (SSR/SSG)

```typescript
import { createTranslator, getLocale } from '$lib/i18n';

// In +page.server.ts or +page.ts
export const load = ({ params }) => {
  const locale = params.lang as Locale; // 'zh', 'en', or 'ja'
  const t = createTranslator(locale);

  return {
    title: t('practices.title'),
    translations: getLocale(locale)
  };
};
```

### Changing Locale

```typescript
import { setLocale } from '$lib/i18n';

// Set locale programmatically
setLocale('en'); // or 'zh', 'ja'
```

### Initialize from URL

```typescript
import { initializeLocale } from '$lib/i18n';

// In +layout.svelte or app initialization
initializeLocale(window.location.pathname); // Extracts locale from /zh/, /en/, /ja/ paths
```

## File Structure

```
src/lib/i18n/
├── index.ts          # Main utility functions and stores
├── types.ts          # TypeScript interfaces and type definitions
└── README.md         # This file

locales/
├── zh.json           # Chinese translations (Simplified)
├── en.json           # English translations
└── ja.json           # Japanese translations
```

## Available Locales

- **zh** - 中文 (Chinese Simplified) - Default
- **en** - English
- **ja** - 日本語 (Japanese)

## Translation Structure

All locale files follow this structure:

```json
{
  "nav": { ... },          // Navigation menu
  "home": { ... },         // Home page
  "about": { ... },        // About page
  "practices": { ... },    // Practice areas
  "team": { ... },         // Team page
  "news": { ... },         // News page
  "events": { ... },       // Events page
  "careers": { ... },      // Careers page
  "contact": { ... },      // Contact page
  "search": { ... },       // Search functionality
  "common": { ... },       // Common UI elements
  "footer": { ... }        // Footer information
}
```

## API Reference

### Stores

#### `currentLocale`
Writable store for the current locale.

```typescript
import { currentLocale } from '$lib/i18n';

// Subscribe to changes
currentLocale.subscribe(locale => {
  console.log('Current locale:', locale);
});

// Update locale
currentLocale.set('en');
```

#### `translations`
Reactive store that provides translations for the current locale.

```typescript
import { translations } from '$lib/i18n';

// Use in Svelte templates
$translations.nav.home
```

### Functions

#### `getLocale(locale: Locale): Translations`
Get the complete translations object for a specific locale.

```typescript
const zhTranslations = getLocale('zh');
console.log(zhTranslations.nav.home); // '首页'
```

#### `getCurrentLocale(): Locale`
Get the current locale value from the store.

```typescript
const locale = getCurrentLocale(); // 'zh', 'en', or 'ja'
```

#### `setLocale(locale: Locale): void`
Set the current locale.

```typescript
setLocale('en');
```

#### `translate(locale: Locale, keyPath: string, params?: Record<string, string | number>): string`
Get a translated string with optional parameter interpolation.

```typescript
translate('en', 'nav.home'); // 'Home'
translate('zh', 'common.page', { page: '2' }); // '第 2 页'
```

#### `createTranslator(locale: Locale)`
Create a translation function bound to a specific locale (useful for SSR/SSG).

```typescript
const t = createTranslator('en');
t('nav.home'); // 'Home'
t('common.page', { page: '2' }); // 'Page 2'
```

#### `detectBrowserLocale(): Locale`
Detect the browser's language preference and return a matching supported locale.

```typescript
const browserLocale = detectBrowserLocale();
```

#### `initializeLocale(pathname?: string): void`
Initialize the locale from URL or browser settings.

```typescript
// From URL path
initializeLocale('/en/about'); // Sets locale to 'en'

// From browser
initializeLocale(); // Uses browser language preference
```

### Type Utilities

#### `isValidLocale(locale: string): locale is Locale`
Type guard to check if a string is a valid locale.

```typescript
if (isValidLocale(userInput)) {
  setLocale(userInput);
}
```

#### `getLocaleFromPath(pathname: string): Locale`
Extract locale from URL pathname.

```typescript
getLocaleFromPath('/en/about'); // 'en'
getLocaleFromPath('/invalid'); // 'zh' (default)
```

## Constants

#### `DEFAULT_LOCALE`
The default locale used when no locale is specified.

```typescript
import { DEFAULT_LOCALE } from '$lib/i18n';
console.log(DEFAULT_LOCALE); // 'zh'
```

#### `SUPPORTED_LOCALES`
Array of all supported locale codes.

```typescript
import { SUPPORTED_LOCALES } from '$lib/i18n';
console.log(SUPPORTED_LOCALES); // ['zh', 'en', 'ja']
```

#### `LocaleDisplayNames`
Human-readable names for each locale.

```typescript
import { LocaleDisplayNames } from '$lib/i18n';
console.log(LocaleDisplayNames.en); // 'English'
console.log(LocaleDisplayNames.zh); // '中文'
console.log(LocaleDisplayNames.ja); // '日本語'
```

## Examples

### Language Switcher Component

```svelte
<script lang="ts">
  import { currentLocale, setLocale, LocaleDisplayNames, SUPPORTED_LOCALES } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';

  function switchLanguage(locale: Locale) {
    setLocale(locale);
    // Optionally update URL
    window.location.href = `/${locale}${window.location.pathname.substring(3)}`;
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
```

### Page with SSG and i18n

```typescript
// +page.ts
import { getLocale } from '$lib/i18n';
import type { Locale } from '$lib/i18n';

export const load = ({ params }) => {
  const locale = (params.lang || 'zh') as Locale;
  const translations = getLocale(locale);

  return {
    locale,
    translations,
    meta: {
      title: translations.about.overview_title,
      description: translations.about.overview_title
    }
  };
};
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  export let data;
  const { translations, meta } = data;
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
</svelte:head>

<h1>{translations.about.overview_title}</h1>
```

## Adding New Translations

1. Add new keys to all three locale files (`zh.json`, `en.json`, `ja.json`)
2. Update the corresponding interface in `types.ts`
3. The TypeScript compiler will ensure type safety

Example:

```json
// zh.json
{
  "pricing": {
    "title": "价格方案",
    "monthly": "月付",
    "yearly": "年付"
  }
}
```

```typescript
// types.ts
export interface PricingTranslations {
  title: string;
  monthly: string;
  yearly: string;
}

export interface Translations {
  // ... existing
  pricing: PricingTranslations;
}
```

## Best Practices

1. **Always use translation keys, never hardcode text**
   ```svelte
   <!-- Good -->
   <h1>{$translations.nav.home}</h1>

   <!-- Bad -->
   <h1>首页</h1>
   ```

2. **Use createTranslator for SSR/SSG contexts**
   ```typescript
   // In +page.server.ts
   const t = createTranslator(locale);
   const title = t('nav.home');
   ```

3. **Keep translation keys organized by page/section**
   - Group related translations under the same parent key
   - Use consistent naming conventions

4. **Use parameter interpolation for dynamic content**
   ```typescript
   t('common.page', { page: pageNumber })
   ```

5. **Test all locales when adding new features**
   - Ensure all translations are complete
   - Check for proper formatting in all languages

## Maintenance

- All translations are stored in JSON files under `/locales`
- TypeScript types provide compile-time safety
- The adapter layer separates frontend from backend locale handling
- Schema-driven content uses `_zh`, `_en`, `_ja` suffixes for multi-language fields

## Related Documentation

- Project architecture: `/docs/architecture.md` §12 (Schema-Driven Architecture)
- CLAUDE.md: Multi-language architecture section
- Backend integration: `/adapter/schema-map.json`
