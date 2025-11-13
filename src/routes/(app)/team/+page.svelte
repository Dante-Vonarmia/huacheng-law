<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Select from '$ui/components/Select.svelte';

  // Props
  let { data }: { data: PageData } = $props();

  let activeSection = $state(0);
  let scrollY = $state(0);
  let showVerticalNav = $state(false);

  // Filter state
  let selectedPracticeArea = $state('all');
  let selectedOffice = $state('all');
  let selectedTitle = $state('all'); // 添加职位过滤
  let searchQuery = $state('');

  // 从URL查询参数初始化filter
  $effect(() => {
    const filterParam = $page.url.searchParams.get('filter');
    if (filterParam === 'partner') {
      selectedTitle = 'partner';
    } else if (filterParam === 'associate') {
      selectedTitle = 'associate';
    }
  });

  const sections = [
    { id: 'intro', label: '简介' },
    { id: 'lawyers', label: '团队' }
  ];

  // Get data from PageData
  const lawyers = data.lawyers;
  const practiceAreas = data.practiceAreas;
  const offices = data.offices;

  // Convert to options for Select component
  const practiceAreaOptions = $derived([
    { value: 'all', label: '所有领域' },
    ...practiceAreas.map(area => ({ value: area, label: area }))
  ]);

  const officeOptions = $derived([
    { value: 'all', label: '所有办公室' },
    ...offices.map(office => ({ value: office, label: office }))
  ]);

  // Filtering logic
  const filteredLawyers = $derived.by(() => {
    let filtered = lawyers;

    if (selectedPracticeArea !== 'all') {
      filtered = filtered.filter(l =>
        l.practice_areas.some(area => area === selectedPracticeArea)
      );
    }

    if (selectedOffice !== 'all') {
      filtered = filtered.filter(l => l.office === selectedOffice);
    }

    // 职位过滤
    if (selectedTitle === 'partner') {
      filtered = filtered.filter(l =>
        l.title_zh.includes('合伙人')
      );
    } else if (selectedTitle === 'associate') {
      filtered = filtered.filter(l =>
        l.title_zh.includes('律师') && !l.title_zh.includes('合伙人')
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(l =>
        l.name_zh.toLowerCase().includes(query) ||
        l.name_en.toLowerCase().includes(query)
      );
    }

    return filtered;
  });

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
  <title>专业人士 - 华诚律师事务所</title>
  <meta name="description" content="华诚律师事务所专业律师团队" />
</svelte:head>

<!-- Hero Banner -->
<section class="hero-banner">
  <div class="hero-banner__bg" style="transform: translateY({scrollY * 0.3}px);"></div>
  <div class="hero-banner__content">
    <span class="hero-banner__label">OUR TEAM</span>
    <h1 class="hero-banner__title">专业团队</h1>
    <p class="hero-banner__subtitle">200余名资深律师，为您提供卓越的法律服务</p>
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
    <div class="section-explore">OUR PEOPLE</div>

    <h1 class="section-title">
      "汇聚资深专业团队，<br>
      为客户提供卓越的法律服务"
    </h1>

    <p class="section-intro">
      华诚律师事务所拥有一支由200余名资深律师组成的专业团队。团队成员均毕业于国内外知名法学院，具备深厚的法学理论功底和丰富的实践经验。
    </p>

    <div class="stats-minimal">
      <div class="stat-minimal">
        <div class="stat-number">200+</div>
        <div class="stat-label">专业律师</div>
      </div>
      <div class="stat-minimal">
        <div class="stat-number">30</div>
        <div class="stat-label">年历史</div>
      </div>
      <div class="stat-minimal">
        <div class="stat-number">10,000+</div>
        <div class="stat-label">成功案例</div>
      </div>
      <div class="stat-minimal">
        <div class="stat-number">98%</div>
        <div class="stat-label">客户满意度</div>
      </div>
    </div>

    <div class="narrative-text">
      <p>
        团队成员涵盖知识产权、公司并购、诉讼仲裁、金融证券、劳动法等多个专业领域，能够为客户提供全方位、一站式的法律服务解决方案。
      </p>
      <p>
        多位律师入选钱伯斯（Chambers）、《法律500强》等国际知名法律评级机构推荐榜单，在各自专业领域享有盛誉。
      </p>
    </div>
  </section>

  <!-- Section TWO: Lawyers -->
  <section class="content-section content-section--last" id="lawyers">
    <div class="section-number">TWO</div>
    <div class="section-explore">PROFESSIONALS</div>

    <h2 class="section-title-alt">律师团队</h2>
    <p class="section-subtitle">专业领域专家，值得信赖的法律顾问</p>

    <!-- Filters -->
    <div class="filter-minimal">
      <input
        type="text"
        placeholder="搜索律师姓名..."
        bind:value={searchQuery}
        class="filter-search"
      />

      <Select
        bind:value={selectedPracticeArea}
        options={practiceAreaOptions}
        placeholder="所有领域"
        className="filter-select-custom"
      />

      <Select
        bind:value={selectedOffice}
        options={officeOptions}
        placeholder="所有办公室"
        className="filter-select-custom"
      />

      {#if selectedPracticeArea !== 'all' || selectedOffice !== 'all' || searchQuery}
        <button
          class="filter-reset"
          onclick={() => {
            selectedPracticeArea = 'all';
            selectedOffice = 'all';
            searchQuery = '';
          }}
        >
          重置
        </button>
      {/if}
    </div>

    <div class="filter-count">
      找到 <strong>{filteredLawyers.length}</strong> 位律师
    </div>

    <!-- Lawyers List -->
    <div class="lawyers-list">
      {#each filteredLawyers as lawyer}
        <div class="lawyer-item">
          <div class="lawyer-image">
            <img
              src={lawyer.photo}
              alt={lawyer.name_zh}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="lawyer-info">
            <div class="lawyer-header">
              <div>
                <h3>{lawyer.name_zh}</h3>
                <p class="lawyer-title">{lawyer.title_zh}</p>
              </div>
              <span class="lawyer-office">{lawyer.office}</span>
            </div>

            <div class="lawyer-areas">
              {#each lawyer.practice_areas as area}
                <span class="area-tag">{area}</span>
              {/each}
            </div>

            <p class="lawyer-bio">{lawyer.bio_zh}</p>

            <div class="lawyer-meta">
              <div class="meta-item">
                <span class="meta-label">执业经验</span>
                <span>{lawyer.experience}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">语言能力</span>
                <span>{lawyer.languages.join(' / ')}</span>
              </div>
            </div>

            <div class="lawyer-contact">
              <a href="mailto:{lawyer.email}" class="contact-link">{lawyer.email}</a>
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredLawyers.length === 0}
      <div class="empty-state">
        <p>未找到符合条件的律师，请调整筛选条件</p>
      </div>
    {/if}

    <div class="cta-minimal">
      <p>需要法律咨询服务？</p>
      <a href="/contact" class="cta-link">联系我们 →</a>
    </div>
  </section>

</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/components/index.scss' as *;

  // Page-specific overrides
  .hero-banner {
    margin-bottom: 5rem;
  }

  .horizontal-nav__item {
    .nav-label {
      font-size: 0.875rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      letter-spacing: 0.05em;
      transition: color 0.2s;
    }

    &:hover, &.active {
      .nav-label {
        color: white;
      }
    }
  }

  // Stats Minimal
  .stats-minimal {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: start;
  }

  .filter-search {
    padding: 0.75rem 1rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #1e293b;
    font-weight: 300;
    outline: none;
    transition: all 0.2s;

    &::placeholder {
      color: #cbd5e1;
    }

    &:hover {
      border-color: #94a3b8;
      background: #f8fafc;
    }

    &:focus {
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
    }
  }

  :global(.filter-select-custom) {
    margin-bottom: 0;
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

  // Lawyers List
  .lawyers-list {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .lawyer-item {
    display: grid;
    grid-template-columns: 11.25rem 1fr;
    gap: 2.5rem;
    padding: 2.5rem 0;
    border-bottom: 0.0625rem solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }
  }

  .lawyer-image {
    width: 11.25rem;
    height: 13.75rem;
    border-radius: 0.25rem;
    overflow: hidden;
    background: #f8fafc;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.02);
    }
  }

  .lawyer-info {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .lawyer-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h3 {
      font-size: 1.5rem;
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 0.25rem;
      letter-spacing: -0.01em;
    }

    .lawyer-title {
      font-size: 0.875rem;
      color: #94a3b8;
      font-weight: 300;
    }
  }

  .lawyer-office {
    font-size: 0.75rem;
    color: #94a3b8;
    padding: 0.375rem 0.75rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.1875rem;
  }

  .lawyer-areas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .area-tag {
    font-size: 0.6875rem;
    color: #64748b;
    padding: 0.25rem 0.625rem;
    background: #f8fafc;
    border-radius: 0.1875rem;
    font-weight: 400;
  }

  .lawyer-bio {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.8;
    color: #64748b;
  }

  .lawyer-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .meta-item {
    font-size: 0.8125rem;
    color: #64748b;
    font-weight: 300;

    .meta-label {
      display: block;
      font-size: 0.6875rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.25rem;
    }
  }

  .lawyer-contact {
    padding-top: 1.25rem;
    border-top: 0.0625rem solid #f1f5f9;
  }

  .contact-link {
    font-size: 0.8125rem;
    color: $color-primary;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: $color-accent;
    }
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

  // Responsive
  @media (max-width: 1024px) {
    .vertical-nav {
      display: none;
    }

    .page-content {
      margin-left: 0;
      padding: 5rem 2.5rem;
    }

    .stats-minimal {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .filter-minimal {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .lawyer-item {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .lawyer-image {
      width: 100%;
      height: 18.75rem;
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

    .lawyer-meta {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
  }
</style>
