<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  // Props
  let { data }: { data: PageData } = $props();

  let scrollY = $state(0);

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:head>
  <title>{data.publication.title} - 华诚律师事务所</title>
  <meta name="description" content={data.publication.description} />
</svelte:head>

<!-- Hero Banner -->
<section class="hero-banner">
  <div class="hero-banner__bg" style="transform: translateY({scrollY * 0.3}px);"></div>
  <div class="hero-banner__content">
    <div class="breadcrumb">
      <a href="/">首页</a>
      <span class="breadcrumb__separator">/</span>
      <a href="/publications">出版物</a>
      <span class="breadcrumb__separator">/</span>
      <span class="breadcrumb__current">详情</span>
    </div>
  </div>
</section>

<!-- Main Content -->
<div class="page-content">
  <div class="publication-detail">

    <!-- Cover & Info Section -->
    <div class="publication-header">
      {#if data.publication.cover}
        <div class="publication-cover">
          <img src={data.publication.cover} alt={data.publication.title} />
        </div>
      {/if}

      <div class="publication-info">
        {#if data.publication.category}
          <div class="publication-category">{data.publication.category}</div>
        {/if}

        <h1 class="publication-title">{data.publication.title}</h1>

        <div class="publication-meta">
          <div class="meta-item">
            <span class="meta-label">作者</span>
            <span class="meta-value">{data.publication.authors.join(', ')}</span>
          </div>

          <div class="meta-item">
            <span class="meta-label">出版社</span>
            <span class="meta-value">{data.publication.publisher}</span>
          </div>

          <div class="meta-item">
            <span class="meta-label">出版年份</span>
            <span class="meta-value">{data.publication.year}</span>
          </div>

          <div class="meta-item">
            <span class="meta-label">类型</span>
            <span class="meta-value">{data.publication.type}</span>
          </div>

          {#if data.publication.isbn}
            <div class="meta-item">
              <span class="meta-label">ISBN</span>
              <span class="meta-value">{data.publication.isbn}</span>
            </div>
          {/if}

          {#if data.publication.pages}
            <div class="meta-item">
              <span class="meta-label">页数</span>
              <span class="meta-value">{data.publication.pages} 页</span>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Description Section -->
    <div class="publication-description">
      <h2 class="section-title">内容简介</h2>
      <p class="description-text">{data.publication.description}</p>
    </div>

    <!-- Related Publications -->
    {#if data.relatedPublications.length > 0}
      <div class="related-publications">
        <h2 class="section-title">相关出版物</h2>
        <div class="related-grid">
          {#each data.relatedPublications as pub}
            <a href="/publications/{pub.id}" class="related-card">
              {#if pub.cover}
                <div class="related-card__cover">
                  <img src={pub.cover} alt={pub.title} />
                </div>
              {/if}
              <div class="related-card__content">
                <h3 class="related-card__title">{pub.title}</h3>
                <div class="related-card__meta">
                  <span>{pub.authors[0]}</span>
                  <span class="meta-separator">•</span>
                  <span>{pub.year}</span>
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Back Button -->
    <div class="back-section">
      <a href="/publications" class="back-button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        返回出版物列表
      </a>
    </div>

  </div>
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;

  // Hero Banner
  .hero-banner {
    position: relative;
    height: 20vh;
    min-height: 12rem;
    max-height: 16rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 3rem;
  }

  .hero-banner__bg {
    position: absolute;
    inset: -10%;
    background: linear-gradient(135deg, rgba(14, 27, 58, 0.92) 0%, rgba(14, 27, 58, 0.85) 100%),
                url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=85');
    background-size: cover;
    background-position: center;
    will-change: transform;
  }

  .hero-banner__content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 75rem;
    padding: 0 3rem;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);

    a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: white;
      }
    }

    &__separator {
      color: rgba(255, 255, 255, 0.5);
    }

    &__current {
      color: white;
    }
  }

  // Page Content
  .page-content {
    max-width: 75rem;
    margin: 0 auto;
    padding: 0 3rem 5rem;
  }

  .publication-detail {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  // Publication Header
  .publication-header {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 3rem;
    padding-bottom: 3rem;
    border-bottom: 0.0625rem solid #e2e8f0;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .publication-cover {
    img {
      width: 100%;
      height: auto;
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      max-width: 200px;
      margin: 0 auto;
    }
  }

  .publication-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .publication-category {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $color-primary;
  }

  .publication-title {
    font-size: 2.25rem;
    font-weight: 500;
    color: #1e293b;
    line-height: 1.3;
    letter-spacing: -0.01em;

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  }

  .publication-meta {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .meta-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .meta-value {
    font-size: 0.9375rem;
    font-weight: 400;
    color: #1e293b;
  }

  // Description Section
  .publication-description {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 500;
    color: #1e293b;
    letter-spacing: -0.01em;
  }

  .description-text {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.8;
    color: #475569;
  }

  // Related Publications
  .related-publications {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-top: 3rem;
    border-top: 0.0625rem solid #e2e8f0;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .related-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      border-color: $color-primary;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }

    &__cover {
      img {
        width: 100%;
        height: auto;
        border-radius: 0.25rem;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    &__title {
      font-size: 1rem;
      font-weight: 500;
      color: #1e293b;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &__meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      color: #94a3b8;

      .meta-separator {
        color: #cbd5e1;
      }
    }
  }

  // Back Section
  .back-section {
    display: flex;
    justify-content: center;
    padding-top: 2rem;
    border-top: 0.0625rem solid #e2e8f0;
  }

  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: #64748b;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      border-color: $color-primary;
      color: $color-primary;
      background: rgba(90, 154, 127, 0.03);
    }

    svg {
      flex-shrink: 0;
    }
  }
</style>
