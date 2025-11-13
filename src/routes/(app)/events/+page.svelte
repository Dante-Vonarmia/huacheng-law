<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  let { data }: { data: PageData } = $props();

  let activeSection = $state(0);
  let scrollY = $state(0);
  let showVerticalNav = $state(false);

  let selectedCategory = $state('全部');
  let selectedStatus = $state('全部');
  let currentPage = $state(1);
  const itemsPerPage = 9;

  const sections = [
    { id: 'intro', label: '简介' },
    { id: 'events', label: '活动' }
  ];

  const filteredEvents = $derived(data.events.filter((item) => {
    const matchesCategory = selectedCategory === '全部' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === '全部' || item.status === selectedStatus;
    return matchesCategory && matchesStatus;
  }));

  const totalPages = $derived(Math.ceil(filteredEvents.length / itemsPerPage));
  const paginatedEvents = $derived(filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ));

  const categories = $derived(['全部', ...data.categories]);
  const statuses = ['全部', 'upcoming', 'ongoing', 'completed'];
  const statusLabels: Record<string, string> = {
    '全部': '全部',
    'upcoming': '即将举行',
    'ongoing': '进行中',
    'completed': '已结束'
  };

  function selectCategory(category: string) {
    selectedCategory = category;
    currentPage = 1;
  }

  function selectStatus(status: string) {
    selectedStatus = status;
    currentPage = 1;
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

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
  <title>研讨会与活动 - 华诚律师事务所</title>
  <meta name="description" content="华诚律师事务所活动信息、研讨会、培训课程等" />
</svelte:head>

<!-- Hero Banner -->
<section class="hero-banner">
  <div class="hero-banner__bg" style="transform: translateY({scrollY * 0.3}px);"></div>
  <div class="hero-banner__content">
    <span class="hero-banner__label">EVENTS & SEMINARS</span>
    <h1 class="hero-banner__title">活动中心</h1>
    <p class="hero-banner__subtitle">聚焦法律前沿，分享实践智慧</p>
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
    <div class="section-explore">EVENTS</div>

    <h1 class="section-title">
      "聚焦法律前沿，<br>
      分享实践智慧"
    </h1>

    <p class="section-intro">
      华诚律师事务所定期举办专业研讨会、培训课程和行业交流活动，邀请业内专家和学者，围绕法律热点、实务难点进行深入探讨，为客户和法律界同仁提供专业交流平台。
    </p>

    <div class="stats-minimal">
      <div class="stat-minimal">
        <div class="stat-number">{data.events.length}+</div>
        <div class="stat-label">年度活动</div>
      </div>
      <div class="stat-minimal">
        <div class="stat-number">{categories.length - 1}</div>
        <div class="stat-label">活动类型</div>
      </div>
      <div class="stat-minimal">
        <div class="stat-number">1000+</div>
        <div class="stat-label">参与人次</div>
      </div>
    </div>

    <div class="narrative-text">
      <p>
        我们的活动涵盖知识产权、公司法务、金融法律、诉讼仲裁等多个专业领域，致力于搭建法律知识分享与实务经验交流的桥梁。
      </p>
    </div>
  </section>

  <!-- Section TWO: Events -->
  <section class="content-section content-section--last" id="events">
    <div class="section-number">TWO</div>
    <div class="section-explore">SEMINARS</div>

    <h2 class="section-title-alt">活动中心</h2>
    <p class="section-subtitle">研讨会、培训与行业交流</p>

    <!-- Filters -->
    <div class="filter-minimal">
      <div class="filter-group">
        <label class="filter-label">活动分类</label>
        <div class="filter-buttons">
          {#each categories as category}
            <button
              class="filter-btn"
              class:filter-btn--active={selectedCategory === category}
              onclick={() => selectCategory(category)}
            >
              {category}
            </button>
          {/each}
        </div>
      </div>

      <div class="filter-group">
        <label class="filter-label">活动状态</label>
        <div class="filter-buttons">
          {#each statuses as status}
            <button
              class="filter-btn"
              class:filter-btn--active={selectedStatus === status}
              onclick={() => selectStatus(status)}
            >
              {statusLabels[status]}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <div class="filter-count">
      找到 <strong>{filteredEvents.length}</strong> 项活动
    </div>

    <!-- Events Grid -->
    {#if paginatedEvents.length > 0}
      <div class="events-grid">
        {#each paginatedEvents as event (event.id)}
          <a href="/events/{event.id}" class="event-card">
            {#if event.cover_image}
              <div class="event-card__image">
                <img src={event.cover_image} alt={event.title_zh} />
                <div class="event-card__status event-card__status--{event.status}">
                  {statusLabels[event.status]}
                </div>
              </div>
            {/if}
            <div class="event-card__content">
              <div class="event-card__category">{event.category}</div>
              <h3 class="event-card__title">{event.title_zh}</h3>
              <p class="event-card__summary">{event.summary_zh}</p>
              <div class="event-card__meta">
                <div class="event-card__date">{formatDate(event.event_date)}</div>
                <div class="event-card__location">{event.location_zh}</div>
              </div>
            </div>
          </a>
        {/each}
      </div>

      {#if totalPages > 1}
        <div class="pagination">
          <button class="pagination__btn" disabled={currentPage === 1} onclick={() => currentPage--}>上一页</button>
          <div class="pagination__numbers">
            {#each Array(totalPages) as _, i}
              <button
                class="pagination__number"
                class:pagination__number--active={currentPage === i + 1}
                onclick={() => currentPage = i + 1}
              >
                {i + 1}
              </button>
            {/each}
          </div>
          <button class="pagination__btn" disabled={currentPage === totalPages} onclick={() => currentPage++}>下一页</button>
        </div>
      {/if}
    {:else}
      <div class="empty-state">
        <p>未找到相关活动，请调整筛选条件</p>
      </div>
    {/if}

    <div class="cta-minimal">
      <p>了解更多活动信息</p>
      <a href="/contact" class="cta-link">联系我们 →</a>
    </div>
  </section>

</div>


<style lang="scss">
  @use 'sass:color';
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
                url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85');
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
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .filter-label {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #94a3b8;
  }

  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.25rem;
    font-size: 0.8125rem;
    color: #64748b;
    font-weight: 300;
    background: white;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: #94a3b8;
      color: #1e293b;
    }

    &--active {
      background: $color-primary;
      color: white;
      border-color: $color-primary;

      &:hover {
        background: color.adjust($color-primary, $lightness: -5%);
      }
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

  // Events Grid
  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
    gap: 1.5rem;
    margin-bottom: 3.75rem;
  }

  .event-card {
    background: white;
    border: 0.0625rem solid #f1f5f9;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    overflow: hidden;
    transition: all 0.2s;

    &:hover {
      border-color: #e2e8f0;
      box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.04);
      transform: translateY(-0.125rem);
    }

    &__image {
      position: relative;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: #f8fafc;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    &:hover &__image img {
      transform: scale(1.02);
    }

    &__status {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      padding: 0.25rem 0.625rem;
      border-radius: 0.1875rem;
      font-size: 0.6875rem;
      font-weight: 500;
      color: white;

      &--upcoming {
        background: $color-primary;
      }

      &--ongoing {
        background: #10b981;
      }

      &--completed {
        background: #94a3b8;
      }
    }

    &__content {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    &__category {
      color: $color-primary;
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    &__title {
      font-size: 1rem;
      font-weight: 500;
      color: #1e293b;
      line-height: 1.4;
      letter-spacing: -0.01em;
    }

    &__summary {
      font-size: 0.8125rem;
      line-height: 1.7;
      color: #64748b;
      font-weight: 300;
    }

    &__meta {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      font-size: 0.75rem;
      color: #94a3b8;
      font-weight: 300;
      padding-top: 0.75rem;
      border-top: 0.0625rem solid #f8fafc;
    }

    &__date,
    &__location {
      display: flex;
      align-items: center;
      gap: 0.375rem;
    }
  }

  // Pagination
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 3.75rem;

    &__btn {
      padding: 0.625rem 1.25rem;
      border: 0.0625rem solid #e2e8f0;
      background: white;
      border-radius: 0.25rem;
      font-size: 0.8125rem;
      font-weight: 300;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s;

      &:hover:not(:disabled) {
        border-color: #94a3b8;
        color: #1e293b;
      }

      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }

    &__numbers {
      display: flex;
      gap: 0.375rem;
    }

    &__number {
      min-width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0.0625rem solid #e2e8f0;
      background: white;
      border-radius: 0.25rem;
      font-size: 0.8125rem;
      font-weight: 300;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: #94a3b8;
        color: #1e293b;
      }

      &--active {
        background: $color-primary;
        color: white;
        border-color: $color-primary;

        &:hover {
          background: color.adjust($color-primary, $lightness: -5%);
        }
      }
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

    .events-grid {
      grid-template-columns: repeat(auto-fill, minmax(15.625rem, 1fr));
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

    .events-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
