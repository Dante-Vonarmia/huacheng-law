<script lang="ts">
  import { currentLocale, setLocale, type Locale } from '$lib/i18n';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  const locales: Locale[] = ['zh', 'en', 'ja'];
  const localeLabels: Record<Locale, string> = {
    zh: '中文',
    en: 'English',
    ja: '日本語'
  };

  let showDropdown = $state(false);

  function switchLocale(locale: Locale) {
    // Update the locale store first
    setLocale(locale);

    // Get current path without locale prefix
    const currentPath = $page.url.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(zh|en|ja)/, '') || '/';

    // Navigate to new locale path with client-side navigation
    // For Chinese (zh), use root path without /zh/ prefix
    if (locale === 'zh') {
      goto(pathWithoutLocale === '/' ? '/' : pathWithoutLocale, {
        replaceState: false,
        noScroll: true,
        keepFocus: true
      });
    } else {
      goto(`/${locale}${pathWithoutLocale}`, {
        replaceState: false,
        noScroll: true,
        keepFocus: true
      });
    }

    showDropdown = false;
  }

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  function closeDropdown() {
    showDropdown = false;
  }
</script>

<div class="locale-switcher-container">
  <button
    class="locale-switcher"
    onclick={toggleDropdown}
    aria-label="切换语言 / Switch Language"
    title={localeLabels[$currentLocale]}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
    <span class="locale-switcher__label">{$currentLocale.toUpperCase()}</span>
    <svg class="locale-switcher__arrow" class:rotated={showDropdown} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>

  {#if showDropdown}
    <div class="locale-dropdown-overlay" onclick={closeDropdown}></div>
    <div class="locale-dropdown">
      {#each locales as locale}
        <button
          class="locale-option"
          class:active={locale === $currentLocale}
          onclick={() => switchLocale(locale)}
        >
          <span class="locale-option__label">{localeLabels[locale]}</span>
          {#if locale === $currentLocale}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .locale-switcher-container {
    position: relative;
  }

  .locale-switcher {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 0.25rem;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    &:focus {
      outline: none;
    }

    svg {
      opacity: 0.8;
    }
  }

  .locale-switcher__label {
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
  }

  .locale-switcher__arrow {
    transition: transform 0.2s ease;
    opacity: 0.6;

    &.rotated {
      transform: rotate(180deg);
    }
  }

  .locale-dropdown-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
  }

  .locale-dropdown {
    position: absolute;
    bottom: calc(100% + 0.5rem);
    right: 0;
    min-width: 140px;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    z-index: 1000;
    animation: slideDown 0.2s ease;

    // When inside fixed-nav.visible, dropdown should open downward
    :global(.fixed-nav.visible) & {
      bottom: auto;
      top: calc(100% + 0.5rem);
    }
  }

  .locale-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.75rem 1rem;
    background: white;
    border: none;
    cursor: pointer;
    transition: background 0.15s ease;
    text-align: left;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: #f8fafc;
    }

    &.active {
      background: #f1f5f9;

      .locale-option__label {
        color: #0e1b3a;
        font-weight: 600;
      }
    }
  }

  .locale-option__label {
    font-size: 0.875rem;
    color: #64748b;
    transition: color 0.15s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
