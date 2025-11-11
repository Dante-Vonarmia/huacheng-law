<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  // Props
  let { data }: { data: PageData } = $props();

  let activeSection = $state(0);
  let scrollY = $state(0);
  let showVerticalNav = $state(false);

  // Filter state
  let selectedCategory = $state('全部');
  let selectedType = $state('全部');
  let selectedYear = $state('全部');

  const sections = [
    { id: 'intro', label: '简介' },
    { id: 'publications', label: '出版物' },
    { id: 'articles', label: '专业文章' },
    { id: 'news', label: '法律新闻' }
  ];

  // Derived filtered publications
  const filteredPublications = $derived(() => {
    let filtered = data.publications;

    if (selectedCategory !== '全部') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedType !== '全部') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    if (selectedYear !== '全部') {
      filtered = filtered.filter(p => p.year === selectedYear);
    }

    return filtered;
  });

  // Get all years from publications
  const years = $derived(['全部', ...Array.from(new Set(data.publications.map(p => p.year))).sort().reverse()]);

  function scrollToSection(index: number) {
    const section = document.getElementById(sections[index].id);
    if (section) {
      const offset = 0;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
      showVerticalNav = scrollY > window.innerHeight * 0.8;

      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          activeSection = i;
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:head>
  <title>专业出版物 - 华诚律师事务所</title>
  <meta name="description" content="华诚律师事务所专业出版物、法律著作和学术论文" />
</svelte:head>

<!-- Hero Banner -->
<section class="hero-banner">
  <div class="hero-banner__bg" style="transform: translateY({scrollY * 0.3}px);"></div>
  <div class="hero-banner__content">
    <span class="hero-banner__label">PUBLICATIONS</span>
    <h1 class="hero-banner__title">出版物</h1>
    <p class="hero-banner__subtitle">分享法律智慧，传播专业知识</p>
  </div>

  <!-- Horizontal Navigation (inside hero) -->
  <nav class="horizontal-nav">
    {#each sections as section, index}
      <button
        class="horizontal-nav__item"
        class:active={activeSection === index}
        onclick={() => scrollToSection(index)}
      >
        <span class="nav-label">{section.label}</span>
      </button>
    {/each}
  </nav>
</section>

<!-- Vertical Navigation (shows after scroll) -->
{#if showVerticalNav}
<nav class="vertical-nav">
  <div class="vertical-nav__inner">
    {#each sections as section, index}
      <button
        class="vertical-nav__item"
        class:active={activeSection === index}
        onclick={() => scrollToSection(index)}
      >
        {section.label}
      </button>
    {/each}
  </div>
</nav>
{/if}

<!-- Main Content -->
<div class="page-content">

  <!-- Section ONE: Introduction -->
  <section class="content-section" id="intro">
    <div class="section-number">ONE</div>
    <div class="section-explore">KNOWLEDGE</div>

    <h1 class="section-title">
      "分享法律智慧，<br>
      传播专业知识"
    </h1>

    <p class="section-intro">
      华诚律师事务所始终重视专业知识的积累与传播。我们的律师团队在各自专业领域深入研究，定期发表学术论文、出版法律专著，为法律界贡献智慧结晶。
    </p>

    <div class="stats-minimal">
      <div class="stat-minimal">
        <div class="stat-number">200+</div>
        <div class="stat-label">专业著作</div>
      </div>
      <div class="stat-minimal">
        <div class="stat-number">500+</div>
        <div class="stat-label">学术论文</div>
      </div>
      <div class="stat-minimal">
        <div class="stat-number">15</div>
        <div class="stat-label">专业领域</div>
      </div>
    </div>

    <div class="narrative-text">
      <p>
        这些出版物涵盖知识产权、公司法、金融法、诉讼仲裁等多个法律领域，既有理论深度，又注重实践应用，为客户、同行和法律学子提供了宝贵的参考资料。
      </p>
    </div>
  </section>

  <!-- Section TWO: Publications -->
  <section class="content-section content-section--last" id="publications">
    <div class="section-number">TWO</div>
    <div class="section-explore">PUBLICATIONS</div>

    <h2 class="section-title-alt">出版物</h2>
    <p class="section-subtitle">专业法律著作与学术成果</p>

    <!-- Filters -->
    <div class="filter-minimal">
      <select bind:value={selectedCategory} class="filter-select">
        <option value="全部">所有领域</option>
        {#each data.categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>

      <select bind:value={selectedType} class="filter-select">
        <option value="全部">所有类型</option>
        {#each data.types as type}
          <option value={type}>{type}</option>
        {/each}
      </select>

      <select bind:value={selectedYear} class="filter-select">
        {#each years as year}
          <option value={year}>{year}</option>
        {/each}
      </select>

      {#if selectedCategory !== '全部' || selectedType !== '全部' || selectedYear !== '全部'}
        <button
          class="filter-reset"
          onclick={() => {
            selectedCategory = '全部';
            selectedType = '全部';
            selectedYear = '全部';
          }}
        >
          重置
        </button>
      {/if}
    </div>

    <div class="filter-count">
      找到 <strong>{filteredPublications.length}</strong> 项出版物
    </div>

    <!-- Publications List -->
    <div class="publications-list">
      {#each filteredPublications as pub}
        <div class="publication-item">
          <div class="publication-meta">
            <span class="publication-year">{pub.year}</span>
            <span class="publication-type">{pub.type}</span>
          </div>

          <div class="publication-content">
            {#if pub.category}
              <div class="publication-category">{pub.category}</div>
            {/if}

            <h3 class="publication-title">{pub.title}</h3>

            <div class="publication-authors">
              作者: {pub.authors.join(', ')}
            </div>

            <p class="publication-desc">{pub.description}</p>

            <div class="publication-publisher">
              {pub.publisher}
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredPublications.length === 0}
      <div class="empty-state">
        <p>未找到相关出版物，请调整筛选条件</p>
      </div>
    {/if}

    <div class="cta-minimal">
      <p>获取更多专业出版物信息</p>
      <a href="/contact" class="cta-link">联系我们 →</a>
    </div>
  </section>

  <!-- Section THREE: Professional Articles -->
  <section class="content-section" id="articles">
    <div class="section-number">THREE</div>
    <div class="section-explore">ARTICLES</div>

    <h2 class="section-title-alt">专业文章</h2>
    <p class="section-subtitle">法律分析与行业洞察</p>

    <div class="articles-grid">
      <div class="article-card">
        <div class="article-badge">知识产权</div>
        <h3 class="article-title">人工智能时代的专利保护策略</h3>
        <p class="article-desc">探讨AI技术发展对专利保护带来的挑战与机遇，为企业提供前瞻性的知识产权布局建议。</p>
        <div class="article-meta">
          <span>张明华</span>
          <span class="meta-separator">•</span>
          <span>2024-10-20</span>
        </div>
      </div>

      <div class="article-card">
        <div class="article-badge">公司法务</div>
        <h3 class="article-title">跨境并购中的合规风险管理</h3>
        <p class="article-desc">分析跨境并购交易中的主要合规风险点，提供系统化的风险防控方案。</p>
        <div class="article-meta">
          <span>李静</span>
          <span class="meta-separator">•</span>
          <span>2024-10-15</span>
        </div>
      </div>

      <div class="article-card">
        <div class="article-badge">金融法</div>
        <h3 class="article-title">数字货币监管政策解读</h3>
        <p class="article-desc">深度解读最新数字货币监管政策，为金融机构提供合规指引。</p>
        <div class="article-meta">
          <span>刘伟</span>
          <span class="meta-separator">•</span>
          <span>2024-10-08</span>
        </div>
      </div>
    </div>

    <div class="view-more-section">
      <a href="/news" class="view-more-link">查看更多文章 →</a>
    </div>
  </section>

  <!-- Section FOUR: Legal News -->
  <section class="content-section content-section--last" id="news">
    <div class="section-number">FOUR</div>
    <div class="section-explore">LEGAL NEWS</div>

    <h2 class="section-title-alt">法律新闻</h2>
    <p class="section-subtitle">最新法律动态与行业资讯</p>

    <div class="news-timeline">
      <div class="timeline-item">
        <div class="timeline-date">2024-11-01</div>
        <div class="timeline-content">
          <span class="timeline-tag">法律法规</span>
          <h3 class="timeline-title">新公司法正式实施，企业需关注的五大变化</h3>
          <p class="timeline-desc">新修订的《公司法》于2024年7月1日正式实施，企业需重点关注注册资本制度、股东权利保护等方面的重大变化。</p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-date">2024-10-25</div>
        <div class="timeline-content">
          <span class="timeline-tag">知识产权</span>
          <h3 class="timeline-title">最高法发布知识产权司法保护新规</h3>
          <p class="timeline-desc">最高人民法院发布知识产权保护新司法解释，进一步加强对知识产权权利人的保护力度。</p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-date">2024-10-18</div>
        <div class="timeline-content">
          <span class="timeline-tag">数据合规</span>
          <h3 class="timeline-title">网信办发布数据出境安全评估新规</h3>
          <p class="timeline-desc">国家网信办发布数据出境安全评估新规，对数据出境的安全评估程序和标准进行了明确规定。</p>
        </div>
      </div>
    </div>

    <div class="view-more-section">
      <a href="/news/legal" class="view-more-link">查看更多新闻 →</a>
    </div>
  </section>

</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;

  // Hero Banner
  .hero-banner {
    position: relative;
    height: 60vh;
    min-height: 28rem;
    max-height: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    overflow: hidden;
    margin-bottom: 5rem;
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
    max-width: 50rem;
    padding: 0 1.5rem;
  }

  .hero-banner__label {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1rem;
  }

  .hero-banner__title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 300;
    letter-spacing: 0.02em;
    margin: 0 0 1.25rem 0;
    line-height: 1.2;
  }

  .hero-banner__subtitle {
    font-size: clamp(1rem, 2vw, 1.25rem);
    font-weight: 300;
    letter-spacing: 0.02em;
    opacity: 0.9;
    margin: 0;
    line-height: 1.6;
  }

  // Horizontal Navigation (inside hero)
  .horizontal-nav {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 3rem;
    z-index: 3;
  }

  .horizontal-nav__item {
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0.5rem 0;
    position: relative;

    .nav-label {
      font-size: 0.875rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      letter-spacing: 0.05em;
      transition: color 0.2s;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: white;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover, &.active {
      .nav-label {
        color: white;
      }

      &::after {
        transform: scaleX(1);
      }
    }
  }

  // Vertical Navigation
  .vertical-nav {
    position: fixed;
    left: 3.75rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
  }

  .vertical-nav__inner {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .vertical-nav__item {
    writing-mode: horizontal-tb;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: #cbd5e1;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -1.25rem;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0.0625rem;
      background: $color-primary;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #94a3b8;

      &::before {
        width: 0.75rem;
      }
    }

    &.active {
      color: $color-primary;

      &::before {
        width: 0.75rem;
      }
    }
  }

  // Page Content
  .page-content {
    max-width: 75rem;
    margin: 0 auto;
    padding: 1.5rem 3rem 3rem;
  }

  // Content Sections
  .content-section {
    padding: 1.5rem 0;
    position: relative;

    &--last {
      padding-bottom: 2rem;
    }
  }

  .section-number {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: #cbd5e1;
    margin-bottom: 0.5rem;
  }

  .section-explore {
    font-size: 0.6875rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    color: #cbd5e1;
    margin-bottom: 3.75rem;
    text-transform: uppercase;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.6;
    color: #1e293b;
    margin-bottom: 3rem;
    letter-spacing: -0.01em;
  }

  .section-title-alt {
    font-size: 3rem;
    font-weight: 300;
    line-height: 1.2;
    color: #1e293b;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .section-subtitle {
    font-size: 1rem;
    font-weight: 300;
    color: #94a3b8;
    margin-bottom: 3.75rem;
  }

  .section-intro {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.8;
    color: #64748b;
    margin-bottom: 3.75rem;
  }

  // Stats Minimal
  .stats-minimal {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    margin-bottom: 3.75rem;
    padding: 3.75rem 0;
    border-top: 0.0625rem solid #e2e8f0;
    border-bottom: 0.0625rem solid #e2e8f0;
  }

  .stat-minimal {
    text-align: center;
  }

  .stat-number {
    font-size: 3rem;
    font-weight: 200;
    color: #1e293b;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  .stat-label {
    font-size: 0.75rem;
    font-weight: 400;
    color: #94a3b8;
    letter-spacing: 0.05em;
  }

  // Narrative Text
  .narrative-text {
    p {
      font-size: 0.9375rem;
      font-weight: 300;
      line-height: 1.9;
      color: #475569;
      margin-bottom: 1.75rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  // Filter Minimal
  .filter-minimal {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .filter-select {
    padding: 0.75rem 1rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #1e293b;
    font-weight: 300;
    background: white;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover,
    &:focus {
      border-color: #94a3b8;
    }
  }

  .filter-reset {
    padding: 0.75rem 1.25rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.25rem;
    font-size: 0.8125rem;
    color: #64748b;
    background: white;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: #94a3b8;
      color: #1e293b;
    }
  }

  .filter-count {
    font-size: 0.8125rem;
    color: #94a3b8;
    margin-bottom: 2.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 0.0625rem solid #f1f5f9;

    strong {
      color: $color-primary;
      font-weight: 500;
    }
  }

  // Publications List
  .publications-list {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .publication-item {
    display: grid;
    grid-template-columns: 7.5rem 1fr;
    gap: 2.5rem;
    padding: 2.5rem 0;
    border-bottom: 0.0625rem solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }
  }

  .publication-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .publication-year {
    font-size: 1.125rem;
    font-weight: 500;
    color: #1e293b;
    letter-spacing: -0.01em;
  }

  .publication-type {
    font-size: 0.6875rem;
    color: #94a3b8;
    padding: 0.25rem 0.625rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.1875rem;
    font-weight: 400;
  }

  .publication-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .publication-category {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $color-primary;
  }

  .publication-title {
    font-size: 1.25rem;
    font-weight: 500;
    color: #1e293b;
    line-height: 1.4;
    letter-spacing: -0.01em;
  }

  .publication-authors {
    font-size: 0.8125rem;
    color: #94a3b8;
    font-weight: 300;
  }

  .publication-desc {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.8;
    color: #64748b;
  }

  .publication-publisher {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 300;
    padding-top: 0.75rem;
    border-top: 0.0625rem solid #f8fafc;
  }

  // Empty State
  .empty-state {
    text-align: center;
    padding: 5rem 0;

    p {
      font-size: 0.9375rem;
      color: #94a3b8;
      font-weight: 300;
    }
  }

  // CTA Minimal
  .cta-minimal {
    margin-top: 6.25rem;
    padding-top: 3.75rem;
    border-top: 0.0625rem solid #e2e8f0;
    text-align: center;

    p {
      font-size: 1rem;
      color: #64748b;
      font-weight: 300;
      margin-bottom: 1.25rem;
    }
  }

  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: $color-primary;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.25rem;
    transition: all 0.3s ease;

    &:hover {
      border-color: $color-primary;
      background: rgba(90, 154, 127, 0.03);
    }
  }

  // Articles Grid
  .articles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .article-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
      border-color: $color-primary;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-4px);
    }
  }

  .article-badge {
    display: inline-block;
    align-self: flex-start;
    padding: 0.375rem 0.875rem;
    background: rgba($color-primary, 0.1);
    color: $color-primary;
    font-size: 0.6875rem;
    font-weight: 600;
    border-radius: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .article-title {
    font-size: 1.125rem;
    font-weight: 500;
    color: #1e293b;
    line-height: 1.4;
    margin: 0;
  }

  .article-desc {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.7;
    color: #64748b;
    margin: 0;
    flex-grow: 1;
  }

  .article-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: #94a3b8;
    padding-top: 1rem;
    border-top: 0.0625rem solid #f1f5f9;

    .meta-separator {
      color: #cbd5e1;
    }
  }

  // News Timeline
  .news-timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 7.5rem 1fr;
    gap: 2rem;
    padding-bottom: 2rem;
    border-bottom: 0.0625rem solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .timeline-date {
    font-size: 0.9375rem;
    font-weight: 500;
    color: #1e293b;
    letter-spacing: -0.01em;

    @media (max-width: 768px) {
      font-size: 0.8125rem;
    }
  }

  .timeline-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .timeline-tag {
    display: inline-block;
    align-self: flex-start;
    padding: 0.25rem 0.75rem;
    background: rgba($color-primary, 0.08);
    color: $color-primary;
    font-size: 0.6875rem;
    font-weight: 600;
    border-radius: 0.25rem;
  }

  .timeline-title {
    font-size: 1.125rem;
    font-weight: 500;
    color: #1e293b;
    line-height: 1.4;
    margin: 0;
  }

  .timeline-desc {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.7;
    color: #64748b;
    margin: 0;
  }

  // View More Section
  .view-more-section {
    display: flex;
    justify-content: center;
    padding-top: 2rem;
    border-top: 0.0625rem solid #e2e8f0;
  }

  .view-more-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: $color-primary;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.375rem;
    transition: all 0.3s ease;

    &:hover {
      border-color: $color-primary;
      background: rgba(90, 154, 127, 0.03);
      gap: 0.75rem;
    }
  }

  // Responsive
  @media (max-width: 1024px) {
    .vertical-nav {
      display: none;
    }

    .page-content {
      margin-left: 0;
      padding: 5rem 2.5rem;
    }

    .filter-minimal {
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;

      .filter-reset {
        grid-column: 1 / -1;
      }
    }

    .publication-item {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .publication-meta {
      flex-direction: row;
      align-items: center;
    }
  }

  @media (max-width: 768px) {
    .page-content {
      padding: 3.75rem 1.5rem;
    }

    .section-title {
      font-size: 1.5rem;
    }

    .section-title-alt {
      font-size: 2rem;
    }

    .stats-minimal {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 2.5rem 0;
    }

    .content-section {
      min-height: auto;
      padding: 3.75rem 0;
    }

    .filter-minimal {
      grid-template-columns: 1fr;
    }
  }
</style>
