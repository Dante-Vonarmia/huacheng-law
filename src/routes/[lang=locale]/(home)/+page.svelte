<script lang="ts">
  import { onMount } from 'svelte';
  import { LocaleSwitcher } from '$ui/components';
  import { currentLocale, createTranslator } from '$lib/i18n';

  // Create reactive translator function
  const t = $derived(createTranslator($currentLocale));

  let scrollY = $state(0);
  let activeSection = $state('home');
  let showFixedNav = $state(false);
  let currentSlide = $state(0);
  let showMobileMenu = $state(false);

  const navItems = $derived([
    { id: 'home', label: t('nav.home'), subLabel: 'Home' },
    { id: 'about', label: t('nav.about'), subLabel: 'About Us' },
    { id: 'practices', label: t('nav.practices'), subLabel: 'Practice Areas' },
    { id: 'team', label: t('nav.team'), subLabel: 'Our Team' },
    { id: 'publications', label: t('nav.publications'), subLabel: 'Publications' },
    { id: 'news', label: t('nav.news'), subLabel: 'News' },
    { id: 'events', label: t('nav.events'), subLabel: 'Events' },
    { id: 'contact', label: t('nav.contact'), subLabel: 'Contact Us' }
  ]);

  const banners = $derived([
    {
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85',
      texts: [
        { chinese: t('home.hero_values.progressive'), english: t('home.hero_values.progressive_en'), color: '#B5975A' },
        { chinese: t('home.hero_values.professional'), english: t('home.hero_values.professional_en'), color: 'white' },
        { chinese: t('home.hero_values.thoughtful'), english: t('home.hero_values.thoughtful_en'), color: 'white' },
        { chinese: t('home.hero_values.integrity'), english: t('home.hero_values.integrity_en'), color: '#B5975A' }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=85',
      texts: [
        { chinese: t('home.hero_values.progressive'), english: t('home.hero_values.progressive_en'), color: '#B5975A' },
        { chinese: t('home.hero_values.professional'), english: t('home.hero_values.professional_en'), color: 'white' },
        { chinese: t('home.hero_values.thoughtful'), english: t('home.hero_values.thoughtful_en'), color: 'white' },
        { chinese: t('home.hero_values.integrity'), english: t('home.hero_values.integrity_en'), color: '#B5975A' }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=85',
      texts: [
        { chinese: t('home.hero_values.progressive'), english: t('home.hero_values.progressive_en'), color: '#B5975A' },
        { chinese: t('home.hero_values.professional'), english: t('home.hero_values.professional_en'), color: 'white' },
        { chinese: t('home.hero_values.thoughtful'), english: t('home.hero_values.thoughtful_en'), color: 'white' },
        { chinese: t('home.hero_values.integrity'), english: t('home.hero_values.integrity_en'), color: '#B5975A' }
      ]
    }
  ]);

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    showMobileMenu = false;
  }

  function toggleMobileMenu() {
    showMobileMenu = !showMobileMenu;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % banners.length;
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + banners.length) % banners.length;
  }

  function goToSlide(index: number) {
    currentSlide = index;
  }

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
      showFixedNav = scrollY > window.innerHeight * 0.8;

      const sections = ['home', 'about', 'practices', 'team', 'publications', 'news', 'events', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollY + 200) {
          activeSection = sections[i];
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Auto-rotate carousel every 5 seconds
    const interval = setInterval(nextSlide, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  });
</script>

<svelte:head>
  <title>华诚律师事务所 | Watson & Band - 专业法律服务</title>
  <meta name="description" content={t('home.meta_description')} />
</svelte:head>

<!-- Fixed Top Navigation -->
<nav class="fixed-nav" class:visible={showFixedNav}>
  <div class="fixed-nav__container">
    <a href="/" class="fixed-nav__logo">
      <img src="/images/logo.png" alt="华诚律师事务所" />
    </a>
    <div class="fixed-nav__items">
      {#each navItems as item}
        <button
          class="fixed-nav__item"
          class:active={activeSection === item.id}
          onclick={() => scrollToSection(item.id)}
        >
          {item.label}
        </button>
      {/each}
    </div>
    <div class="fixed-nav__actions">
      <div class="locale-switcher-wrapper">
        <LocaleSwitcher />
      </div>
      <button class="mobile-menu-toggle" onclick={toggleMobileMenu} aria-label="菜单">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          {#if showMobileMenu}
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          {:else}
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          {/if}
        </svg>
      </button>
    </div>
  </div>
</nav>

<!-- Full Screen Hero with Carousel -->
<section id="home" class="hero-fullscreen">
  <div class="carousel">
    {#each banners as banner, index}
      <div class="carousel-slide" class:active={currentSlide === index}>
        <div class="carousel-bg" style="background-image: url({banner.image});"></div>
        <div class="carousel-overlay"></div>
        <div class="carousel-content">
          <div class="text-grid">
            {#each banner.texts as text}
              <div class="text-item">
                <span class="chinese-text" style="color: {text.color};">{text.chinese}</span>
                <span class="english-text" style="color: {text.color};">{text.english}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <nav class="hero-nav">
    <a href="/" class="hero-nav__logo">
      <img src="/images/logo.png" alt="华诚律师事务所" class="logo" />
    </a>
    <div class="hero-nav__items">
      {#each navItems as item}
        <button
          class="hero-nav__item"
          class:active={activeSection === item.id}
          onclick={() => scrollToSection(item.id)}
        >
          <span class="nav-label">{item.label}</span>
          <span class="nav-sublabel">{item.subLabel}</span>
        </button>
      {/each}
    </div>
    <div class="hero-nav__actions">
      <div class="locale-switcher-wrapper">
        <LocaleSwitcher />
      </div>
      <button class="hero-nav__search" aria-label="搜索">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
      <button class="mobile-menu-toggle" onclick={toggleMobileMenu} aria-label="菜单">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          {#if showMobileMenu}
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          {:else}
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          {/if}
        </svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu Overlay -->
  {#if showMobileMenu}
    <div class="mobile-menu-overlay" onclick={() => showMobileMenu = false}></div>
    <div class="mobile-menu">
      <div class="mobile-menu__header">
        <span class="mobile-menu__title">{t('home.mobile_menu_title')}</span>
        <button class="mobile-menu__close" onclick={() => showMobileMenu = false}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <nav class="mobile-menu__nav">
        {#each navItems as item}
          <button
            class="mobile-menu__item"
            class:active={activeSection === item.id}
            onclick={() => scrollToSection(item.id)}
          >
            <span class="mobile-nav-label">{item.label}</span>
            <span class="mobile-nav-sublabel">{item.subLabel}</span>
          </button>
        {/each}
      </nav>
    </div>
  {/if}
</section>

<!-- About Section: Stats Layout -->
<section id="about" class="section-about">
  <div class="about-bg"></div>
  <div class="about-overlay"></div>

  <div class="about-content">
    <div class="about-text">
      <span class="section-label">{t('home.about_label')}</span>
      <h2 class="section-title-large">{t('home.about_title')}</h2>
      <p class="about-description">
        {t('home.about_description')}
      </p>
      <a href="/about" class="cta-link">
        <span>{t('home.about_cta')}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>

    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-number">30+</div>
        <div class="stat-label">{t('home.stats.years')}</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">200+</div>
        <div class="stat-label">{t('home.stats.lawyers')}</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">500+</div>
        <div class="stat-label">{t('home.stats.clients')}</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">98%</div>
        <div class="stat-label">{t('home.stats.satisfaction')}</div>
      </div>
    </div>
  </div>
</section>

<!-- Practices Section: Modern Design -->
<section id="practices" class="section-practices">
  <div class="practices-content-wrapper">
    <div class="practices-header">
      <span class="section-label-dark">PRACTICE AREAS</span>
      <h2 class="section-title-dark">{t('home.practices_title')}</h2>
      <p class="practices-subtitle-dark">{t('home.practices_subtitle')}</p>
    </div>

    <div class="practices-grid-modern">
      <a href="/practices" class="practice-card-modern">
        <div class="practice-card-bg"></div>
        <div class="practice-card-content">
          <div class="practice-icon-modern">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="practice-title-modern">{t('home.practice_ip')}</h3>
          <p class="practice-desc-modern">{t('home.practice_ip_desc')}</p>
        </div>
      </a>

      <a href="/practices" class="practice-card-modern">
        <div class="practice-card-bg"></div>
        <div class="practice-card-content">
          <div class="practice-icon-modern">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <h3 class="practice-title-modern">{t('home.practice_corporate')}</h3>
          <p class="practice-desc-modern">{t('home.practice_corporate_desc')}</p>
        </div>
      </a>

      <a href="/practices" class="practice-card-modern">
        <div class="practice-card-bg"></div>
        <div class="practice-card-content">
          <div class="practice-icon-modern">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
            </svg>
          </div>
          <h3 class="practice-title-modern">{t('home.practice_litigation')}</h3>
          <p class="practice-desc-modern">{t('home.practice_litigation_desc')}</p>
        </div>
      </a>

      <a href="/practices" class="practice-card-modern">
        <div class="practice-card-bg"></div>
        <div class="practice-card-content">
          <div class="practice-icon-modern">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="practice-title-modern">{t('home.practice_finance')}</h3>
          <p class="practice-desc-modern">{t('home.practice_finance_desc')}</p>
        </div>
      </a>
    </div>

    <div class="practices-cta-modern">
      <a href="/practices" class="cta-btn-primary">
        <span>{t('home.practices_cta')}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- Team Section: Split Layout -->
<section id="team" class="section-team">
  <div class="team-split">
    <div class="team-image">
      <div class="team-bg"></div>
    </div>
    <div class="team-content">
      <span class="section-label">OUR TEAM</span>
      <h2 class="section-title-large">{t('home.team_title')}</h2>
      <p class="team-description">
        {t('home.team_description')}
      </p>
      <ul class="team-features">
        <li>{t('home.team_feature_1')}</li>
        <li>{t('home.team_feature_2')}</li>
        <li>{t('home.team_feature_3')}</li>
      </ul>
      <a href="/team" class="cta-link">
        <span>{t('home.team_cta')}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- Publications Section: Timeline Layout -->
<section id="publications" class="section-publications">
  <div class="publications-bg"></div>
  <div class="publications-overlay"></div>

  <div class="publications-content">
    <div class="publications-header">
      <span class="section-label">PUBLICATIONS</span>
      <h2 class="section-title-large">{t('home.publications_title')}</h2>
      <p class="publications-subtitle">{t('home.publications_subtitle')}</p>
    </div>

    <div class="publications-stats">
      <div class="pub-stat">
        <div class="pub-number">200+</div>
        <div class="pub-label">{t('home.publications_stat_books')}</div>
      </div>
      <div class="pub-stat">
        <div class="pub-number">500+</div>
        <div class="pub-label">{t('home.publications_stat_papers')}</div>
      </div>
      <div class="pub-stat">
        <div class="pub-number">15</div>
        <div class="pub-label">{t('home.publications_stat_areas')}</div>
      </div>
    </div>

    <a href="/publications" class="cta-btn-glass">{t('home.publications_cta')} →</a>
  </div>
</section>

<!-- News Section: Cards Layout -->
<section id="news" class="section-news">
  <div class="news-bg"></div>
  <div class="news-overlay"></div>

  <div class="news-content">
    <span class="section-label">NEWS & INSIGHTS</span>
    <h2 class="section-title-large">{t('home.news_title')}</h2>
    <p class="news-subtitle">{t('home.news_subtitle')}</p>
    <a href="/news" class="cta-btn-glass">{t('home.news_cta')} →</a>
  </div>
</section>

<!-- Events Section: Feature Layout -->
<section id="events" class="section-events">
  <div class="events-bg"></div>
  <div class="events-overlay"></div>

  <div class="events-content">
    <span class="section-label">EVENTS & SEMINARS</span>
    <h2 class="section-title-large">{t('home.events_title')}</h2>
    <p class="events-description">
      {t('home.events_description')}
    </p>
    <a href="/events" class="cta-btn-glass">{t('home.events_cta')} →</a>
  </div>
</section>

<!-- Contact Section: CTA Layout -->
<section id="contact" class="section-contact">
  <div class="contact-bg"></div>
  <div class="contact-overlay"></div>

  <div class="contact-content">
    <span class="section-label">CONTACT US</span>
    <h2 class="section-title-xl">{t('home.contact_title')}</h2>
    <p class="contact-description">{t('home.contact_description')}</p>

    <div class="contact-grid">
      <div class="contact-item">
        <h4>{t('home.contact_office_shanghai')}</h4>
        <p>{t('home.contact_shanghai_address')}</p>
        <p>{t('home.contact_shanghai_phone')}</p>
      </div>
      <div class="contact-item">
        <h4>{t('home.contact_office_beijing')}</h4>
        <p>{t('home.contact_beijing_address')}</p>
        <p>{t('home.contact_beijing_phone')}</p>
      </div>
      <div class="contact-item">
        <h4>{t('home.contact_office_shenzhen')}</h4>
        <p>{t('home.contact_shenzhen_address')}</p>
        <p>{t('home.contact_shenzhen_phone')}</p>
      </div>
    </div>

    <a href="/contact" class="cta-btn-large">{t('home.contact_cta')} →</a>
  </div>
</section>

<style lang="scss">
  @use 'sass:color';
  @use '$ui/styles/variables.scss' as *;

  // CSS Variables
  :root {
    --hero-nav-height: 7rem; // ~80px with padding
  }

  // Fixed Top Navigation
  .fixed-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transform: translateY(-100%);
    transition: transform 0.3s ease;

    &.visible {
      transform: translateY(0);
    }
  }

  .fixed-nav__container {
    max-width: 90rem;
    margin: 0 auto;
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    gap: 3rem;

    @media (max-width: 768px) {
      padding: 1rem 1.25rem;
      gap: 1rem;
      justify-content: space-between;
    }
  }

  .fixed-nav__logo {
    display: flex;
    align-items: center;

    img {
      height: 2rem;
      width: auto;
    }
  }

  .fixed-nav__items {
    flex: 1;
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .fixed-nav__item {
    background: none;
    border: none;
    font-size: 0.875rem;
    font-weight: 400;
    color: #64748b;
    cursor: pointer;
    padding: 0.5rem 0;
    position: relative;
    transition: color 0.2s;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: $color-primary;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover,
    &.active {
      color: $color-primary;

      &::after {
        transform: scaleX(1);
      }
    }
  }

  .fixed-nav__actions {
    display: flex;
    align-items: center;
    gap: 1rem;

    .locale-switcher-wrapper {
      :global(.locale-switcher) {
        color: #1e293b;
        font-weight: 500;
        &:hover {
          background: rgba(0, 0, 0, 0.05);
          color: $color-primary;
        }
      }
    }

    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      color: #1e293b;
      cursor: pointer;
      padding: 0.5rem;
      transition: color 0.2s;
      z-index: 100;

      &:hover {
        color: $color-primary;
      }

      @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  // Hero Section - Carousel
  .hero-fullscreen {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media (max-width: 768px) {
      height: calc(100vh - var(--hero-nav-height));
    }
  }

  .carousel {
    position: relative;
    flex: 1;
    width: 100%;
    overflow: hidden;
  }

  .carousel-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    pointer-events: none;

    &.active {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .carousel-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .carousel-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(14, 27, 58, 0.5) 0%, rgba(14, 27, 58, 0.3) 100%);
  }

  .carousel-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 8%;
  }

  .text-grid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 3rem 4rem;
    align-items: center;
  }

  .text-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .chinese-text {
    font-size: clamp(3.5rem, 6vw, 5.5rem);
    font-weight: 300;
    letter-spacing: 0.1em;
    line-height: 1;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  }

  .english-text {
    font-size: clamp(0.75rem, 1vw, 0.9rem);
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    opacity: 0.95;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  }


  .hero-nav {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 1.5rem 3rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 10;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }

  .hero-nav__logo {
    display: flex;
    align-items: center;
    text-decoration: none;

    .logo {
      height: 2.5rem;
      width: auto;
    }
  }

  .hero-nav__items {
    flex: 1;
    display: flex;
    gap: 2.5rem;
  }

  .hero-nav__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0.25rem 0;

    .nav-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #1e293b;
      letter-spacing: 0.01em;
    }

    .nav-sublabel {
      font-size: 0.6875rem;
      color: #94a3b8;
      font-weight: 400;
      text-transform: capitalize;
    }

    &:hover, &.active {
      .nav-label {
        color: $color-primary;
      }
    }
  }

  .hero-nav__actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  // Override LocaleSwitcher styles for light background
  .locale-switcher-wrapper {
    :global(.locale-switcher) {
      color: #475569;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
        color: #1e293b;
      }

      :global(svg) {
        opacity: 0.7;
      }

      :global(.locale-switcher__arrow) {
        opacity: 0.6;
      }
    }

    :global(.locale-dropdown) {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
  }

  .hero-nav__search {
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.2s;

    &:hover {
      color: #1e293b;
    }
  }

  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    color: #475569;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.2s;

    &:hover {
      color: #1e293b;
    }

    @media (max-width: 768px) {
      display: block;
    }
  }

  // Mobile Menu
  .mobile-menu-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    animation: fadeIn 0.3s ease;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 85vw;
    max-width: 400px;
    background: white;
    z-index: 1000;
    overflow-y: auto;
    animation: slideInRight 0.3s ease;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.15);
  }

  .mobile-menu__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1.25rem;
    border-bottom: 1px solid #e2e8f0;
    background: #fafafa;
  }

  .mobile-menu__title {
    font-size: 1.125rem;
    font-weight: 500;
    color: #1e293b;
  }

  .mobile-menu__close {
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;

    &:hover {
      color: #1e293b;
    }
  }

  .mobile-menu__nav {
    padding: 1rem 0;
  }

  .mobile-menu__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    border-left: 3px solid transparent;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;

    .mobile-nav-label {
      font-size: 1rem;
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 0.25rem;
    }

    .mobile-nav-sublabel {
      font-size: 0.75rem;
      color: #94a3b8;
      text-transform: capitalize;
    }

    &:hover {
      background: rgba($color-primary, 0.05);
      border-left-color: rgba($color-primary, 0.3);

      .mobile-nav-label {
        color: $color-primary;
      }
    }

    &.active {
      background: rgba($color-primary, 0.08);
      border-left-color: $color-primary;

      .mobile-nav-label {
        color: $color-primary;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  // Common Styles
  .section-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0.9;
    margin-bottom: 1rem;
  }

  .section-title-large {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 200;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0 0 1.5rem 0;
  }

  .section-title-xl {
    font-size: clamp(3rem, 6vw, 5.5rem);
    font-weight: 200;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0 0 1.5rem 0;
  }

  // CTA Buttons
  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    color: inherit;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;

    svg {
      transition: transform 0.3s ease;
    }

    &:hover {
      gap: 1rem;

      svg {
        transform: translateX(4px);
      }
    }
  }

  .cta-btn-glass {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.125rem 2.5rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: white;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    text-decoration: none;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }
  }

  .cta-btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: white;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: white;
    }
  }

  .cta-btn-large {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 3rem;
    font-size: 1.125rem;
    font-weight: 500;
    color: white;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50px;
    text-decoration: none;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: white;
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
  }

  // About Section: Stats Layout
  .section-about {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: #fafafa;
  }

  .about-bg {
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=85');
    background-size: cover;
    background-position: center;
    opacity: 0.1;
  }

  .about-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(250, 250, 250, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  }

  .about-content {
    position: relative;
    z-index: 2;
    max-width: 90rem;
    margin: 0 auto;
    padding: 6rem 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
  }

  .about-text {
    .section-label {
      color: $color-primary;
    }

    .section-title-large {
      color: #1e293b;
    }
  }

  .about-description {
    font-size: 1.125rem;
    line-height: 1.8;
    color: #64748b;
    margin-bottom: 2.5rem;
  }

  .stats-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .stat-card {
    background: white;
    padding: 2.5rem 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    }
  }

  .stat-number {
    font-size: 3rem;
    font-weight: 200;
    color: $color-primary;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  .stat-label {
    font-size: 0.9375rem;
    color: #64748b;
  }

  // Practices Section: Modern Clean Design
  .section-practices {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FAFAFA;
    padding: 4rem 0;
  }

  .practices-content-wrapper {
    max-width: 75rem;
    margin: 0 auto;
    padding: 0 3rem;
    width: 100%;
  }

  .section-label-dark {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: $color-secondary;
    margin-bottom: 1rem;
    text-align: center;
  }

  .section-title-dark {
    font-size: clamp(2.5rem, 5vw, 3.75rem);
    font-weight: 300;
    letter-spacing: -0.01em;
    line-height: 1.2;
    color: $color-primary;
    margin: 0 0 1rem 0;
    text-align: center;
  }

  .practices-subtitle-dark {
    font-size: 1.125rem;
    color: #64748b;
    font-weight: 400;
    text-align: center;
    margin-bottom: 4rem;
  }

  .practices-grid-modern {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .practice-card-modern {
    position: relative;
    background: white;
    border-radius: 12px;
    padding: 2.5rem 2rem;
    text-decoration: none;
    overflow: hidden;
    border: 1px solid #E2E8F0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    // 交错排列：第2、4张卡片向下偏移
    &:nth-child(2),
    &:nth-child(4) {
      transform: translateY(2rem);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, $color-secondary 0%, $color-primary 100%);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(14, 27, 58, 0.12);
      border-color: $color-secondary;

      &::before {
        transform: scaleX(1);
      }

      .practice-icon-modern {
        transform: scale(1.1);
        color: $color-secondary;
      }
    }

    // 保持交错效果的 hover 状态
    &:nth-child(2):hover,
    &:nth-child(4):hover {
      transform: translateY(calc(2rem - 8px));
    }
  }

  .practice-card-content {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .practice-icon-modern {
    width: 3.5rem;
    height: 3.5rem;
    margin: 0 auto 1.5rem;
    color: $color-primary;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .practice-title-modern {
    font-size: 1.25rem;
    font-weight: 600;
    color: $color-primary;
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }

  .practice-desc-modern {
    font-size: 0.9375rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }

  .practices-cta-modern {
    text-align: center;
    margin-top: 3rem;
  }

  .cta-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: white;
    background: linear-gradient(135deg, $color-primary 0%, color.adjust($color-primary, $lightness: -5%) 100%);
    border: none;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(14, 27, 58, 0.15);

    svg {
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(14, 27, 58, 0.25);
      gap: 1rem;

      svg {
        transform: translateX(4px);
      }
    }
  }

  // Team Section: Split Layout
  .section-team {
    position: relative;
    min-height: 100vh;
  }

  .team-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }

  .team-image {
    position: relative;
    overflow: hidden;
  }

  .team-bg {
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=85');
    background-size: cover;
    background-position: center;
    transition: transform 0.5s ease;

    .team-image:hover & {
      transform: scale(1.05);
    }
  }

  .team-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem 5rem;
    background: #fafafa;

    .section-label {
      color: $color-primary;
    }

    .section-title-large {
      color: #1e293b;
    }
  }

  .team-description {
    font-size: 1.125rem;
    line-height: 1.8;
    color: #64748b;
    margin-bottom: 2rem;
  }

  .team-features {
    list-style: none;
    padding: 0;
    margin: 0 0 2.5rem 0;

    li {
      font-size: 1rem;
      color: #475569;
      padding: 0.75rem 0;
      padding-left: 2rem;
      position: relative;

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: $color-primary;
        font-weight: bold;
      }
    }
  }

  // Publications Section: Stats Layout
  .section-publications {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .publications-bg {
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=85');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .publications-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(90, 157, 126, 0.93) 0%, rgba(71, 128, 102, 0.90) 100%);
  }

  .publications-content {
    position: relative;
    z-index: 2;
    max-width: 75rem;
    margin: 0 auto;
    padding: 6rem 3rem;
    color: white;
    text-align: center;
  }

  .publications-header {
    margin-bottom: 4rem;
  }

  .publications-subtitle {
    font-size: 1.25rem;
    opacity: 0.95;
    font-weight: 300;
  }

  .publications-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
    margin-bottom: 4rem;
  }

  .pub-stat {
    .pub-number {
      font-size: 4rem;
      font-weight: 200;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .pub-label {
      font-size: 1rem;
      opacity: 0.9;
    }
  }

  // News Section: Simple Center
  .section-news {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .news-bg {
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=85');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .news-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(90, 157, 126, 0.92) 0%, rgba(71, 128, 102, 0.88) 100%);
  }

  .news-content {
    position: relative;
    z-index: 2;
    max-width: 50rem;
    padding: 5rem 3rem;
    color: white;
    text-align: center;
  }

  .news-subtitle {
    font-size: 1.25rem;
    opacity: 0.95;
    font-weight: 300;
    margin-bottom: 3rem;
  }

  // Events Section: Feature Layout
  .section-events {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .events-bg {
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .events-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(90, 157, 126, 0.94) 0%, rgba(71, 128, 102, 0.90) 100%);
  }

  .events-content {
    position: relative;
    z-index: 2;
    max-width: 75rem;
    margin: 0 auto;
    padding: 6rem 3rem;
    color: white;
    text-align: center;
  }

  .events-description {
    font-size: 1.25rem;
    line-height: 1.7;
    opacity: 0.95;
    font-weight: 300;
    margin-bottom: 3rem;
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
  }

  // Contact Section: CTA Layout
  .section-contact {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .contact-bg {
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=85');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .contact-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(90, 157, 126, 0.95) 0%, rgba(71, 128, 102, 0.93) 100%);
  }

  .contact-content {
    position: relative;
    z-index: 2;
    max-width: 90rem;
    margin: 0 auto;
    padding: 6rem 3rem;
    color: white;
    text-align: center;
  }

  .contact-description {
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 4rem;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
    margin-bottom: 4rem;
  }

  .contact-item {
    h4 {
      font-size: 1.25rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      opacity: 0.9;
      margin-bottom: 0.5rem;
    }
  }

  // Responsive
  @media (max-width: 1024px) {
    .text-grid {
      gap: 2rem 3rem;
    }

    .chinese-text {
      font-size: clamp(2.5rem, 5vw, 4rem);
    }

    .carousel-content {
      padding-left: 5%;
    }

    .about-content,
    .team-split {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .practices-grid-modern {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }

    .publications-stats {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .contact-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  @media (max-width: 768px) {
    .text-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 0 1rem;
    }

    .carousel-content {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .chinese-text {
      font-size: clamp(2rem, 8vw, 3rem);
    }

    .fixed-nav__items {
      display: none;
    }

    .hero-nav {
      padding: 1rem 1.25rem;
    }

    .hero-nav__items {
      display: none;
    }

    .hero-nav__search {
      display: none;
    }

    .hero-nav__actions {
      gap: 0.5rem;
    }

    .stats-cards {
      grid-template-columns: 1fr;
    }

    .practices-grid-modern {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .practice-card-modern {
      padding: 2rem 1.5rem;
    }

    .team-content {
      padding: 4rem 2rem;
    }
  }
</style>
