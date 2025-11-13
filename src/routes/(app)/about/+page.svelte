<script lang="ts">
  import { Button } from '$ui/components';
  import { onMount } from 'svelte';

  let activeSection = $state(0);
  let scrollY = $state(0);
  let showVerticalNav = $state(false);
  let showMobileNav = $state(false);

  const sections = [
    { id: 'intro', label: '简介' },
    { id: 'timeline', label: '历程' },
    { id: 'values', label: '价值观' },
    { id: 'culture', label: '企业文化' },
    { id: 'honors', label: '荣誉' },
    { id: 'probono', label: '公益' },
    { id: 'locations', label: '地点' }
  ];

  function scrollToSection(index: number) {
    const section = document.getElementById(sections[index].id);
    if (section) {
      const offset = 80; // Account for fixed header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Close mobile nav after navigation
      showMobileNav = false;
    }
  }

  function toggleMobileNav() {
    showMobileNav = !showMobileNav;
  }

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;

      // Show vertical nav after scrolling past hero banner (roughly one viewport)
      showVerticalNav = scrollY > window.innerHeight * 0.8;

      // Update active section based on scroll position
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
  <title>关于华诚 - 华诚律师事务所</title>
  <meta name="description" content="华诚律师事务所 - 30年专业沉淀，值得信赖的法律合作伙伴" />
</svelte:head>

<!-- Hero Banner -->
<section class="hero-banner">
  <div class="hero-banner__bg" style="transform: translateY({scrollY * 0.3}px);"></div>
  <div class="hero-banner__content">
    <span class="hero-banner__label">ABOUT US</span>
    <h1 class="hero-banner__title">关于华诚</h1>
    <p class="hero-banner__subtitle">专业沉淀30年，值得信赖的法律合作伙伴</p>
  </div>

  <!-- Horizontal Navigation (inside hero) -->
  <nav class="horizontal-nav">
    {#each sections as section, index}
      <button
        class="horizontal-nav__item"
        class:active={activeSection === index}
        onclick={() => scrollToSection(index)}
      >
        {section.label}
      </button>
    {/each}
  </nav>
</section>

<!-- Vertical Navigation (shows after scroll) - Desktop Only -->
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

<!-- Mobile Floating Navigation Button -->
{#if showVerticalNav}
  <button class="mobile-nav-toggle" onclick={toggleMobileNav} aria-label="导航菜单">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  </button>
{/if}

<!-- Mobile Navigation Menu -->
{#if showMobileNav}
  <div class="mobile-nav-overlay" onclick={() => showMobileNav = false}></div>
  <div class="mobile-nav-menu">
    <div class="mobile-nav-header">
      <h3 class="mobile-nav-title">页面导航</h3>
      <button class="mobile-nav-close" onclick={() => showMobileNav = false} aria-label="关闭">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <nav class="mobile-nav-list">
      {#each sections as section, index}
        <button
          class="mobile-nav-item"
          class:active={activeSection === index}
          onclick={() => scrollToSection(index)}
        >
          {section.label}
        </button>
      {/each}
    </nav>
  </div>
{/if}

<!-- Main Content -->
<div class="page-content">

  <!-- Section ONE: Introduction -->
  <section class="content-section" id="intro">
    <div class="section-number">ONE</div>
    <div class="section-explore">EXPLORE</div>

    <h1 class="section-title">
      "专业沉淀，值得信赖的法律合作伙伴，<br>
      致力于为客户提供卓越的法律服务"
    </h1>

    <p class="section-intro">
      华诚律师事务所成立于1995年，是中国领先的综合性律师事务所之一。三十年来，我们始终坚持专业、诚信、卓越的核心价值观。
    </p>

    <div class="content-grid">
      <div class="content-block">
        <h3>我们的愿景</h3>
        <p>成为中国最受尊敬的综合性律师事务所，以卓越的专业能力和创新的服务模式，为客户创造持续价值，推动法治进步。</p>
      </div>

      <div class="content-block">
        <h3>我们的使命</h3>
        <p>为客户提供专业、高效、优质的法律服务，成为客户值得信赖的长期合作伙伴，助力客户实现商业目标，维护合法权益。</p>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-item">
        <div class="stat-number">30+</div>
        <div class="stat-label">年历史</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">200+</div>
        <div class="stat-label">服务客户</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">50+</div>
        <div class="stat-label">专业律师</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">98%</div>
        <div class="stat-label">客户满意度</div>
      </div>
    </div>

    <div class="narrative-text">
      <p>
        我们在知识产权、公司法、诉讼仲裁、金融法等核心领域拥有深厚的专业积累，服务范围覆盖企业法律顾问、诉讼代理、投融资并购、知识产权保护等多个方面。凭借卓越的专业能力和客户至上的服务理念，华诚已为全球200多家企业提供了高质量的法律解决方案。
      </p>
      <p>
        展望未来，华诚将继续秉承专业精神，不断创新服务模式，拥抱数字化转型，为客户创造更大价值。
      </p>
    </div>
  </section>

  <!-- Section TWO: Timeline -->
  <section class="content-section" id="timeline">
    <div class="section-number">TWO</div>
    <div class="section-explore">HISTORY</div>

    <h2 class="section-title-alt">发展历程</h2>
    <p class="section-subtitle">三十年砥砺前行，见证中国法律服务业发展</p>

    <div class="timeline-minimal">
      <div class="timeline-item-minimal">
        <div class="timeline-year">1995</div>
        <div class="timeline-content">
          <h4>律所成立</h4>
          <p>华诚律师事务所在上海成立，开启专业法律服务之路</p>
        </div>
      </div>

      <div class="timeline-item-minimal">
        <div class="timeline-year">2000</div>
        <div class="timeline-content">
          <h4>业务拓展</h4>
          <p>成功代理多起重大知识产权案件，奠定行业地位</p>
        </div>
      </div>

      <div class="timeline-item-minimal">
        <div class="timeline-year">2005</div>
        <div class="timeline-content">
          <h4>北京分所成立</h4>
          <p>在北京设立分所，服务网络覆盖全国</p>
        </div>
      </div>

      <div class="timeline-item-minimal">
        <div class="timeline-year">2010</div>
        <div class="timeline-content">
          <h4>深圳分所成立</h4>
          <p>深圳分所开业，服务华南地区客户</p>
        </div>
      </div>

      <div class="timeline-item-minimal">
        <div class="timeline-year">2015</div>
        <div class="timeline-content">
          <h4>国际化发展</h4>
          <p>与国际知名律所建立合作关系，拓展跨境法律服务</p>
        </div>
      </div>

      <div class="timeline-item-minimal timeline-item-minimal--highlight">
        <div class="timeline-year">2025</div>
        <div class="timeline-content">
          <h4>数字化转型</h4>
          <p>全面推进数字化转型，打造智慧法律服务平台</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section THREE: Core Values -->
  <section class="content-section" id="values">
    <div class="section-number">THREE</div>
    <div class="section-explore">PHILOSOPHY</div>

    <h2 class="section-title-alt">核心价值观</h2>
    <p class="section-subtitle">坚守原则，追求卓越</p>

    <div class="values-list">
      <div class="value-item">
        <div class="value-number">01</div>
        <h4>专业</h4>
        <p>深耕法律领域30年，汇聚资深专业团队，持续提升专业能力，为客户提供最专业的法律服务。</p>
      </div>

      <div class="value-item">
        <div class="value-number">02</div>
        <h4>诚信</h4>
        <p>以诚信为本，严守职业道德，恪守执业纪律，赢得客户长期信赖与尊重。</p>
      </div>

      <div class="value-item">
        <div class="value-number">03</div>
        <h4>卓越</h4>
        <p>追求卓越服务品质，关注每一个细节，创造客户最大价值，实现双赢共赢。</p>
      </div>

      <div class="value-item">
        <div class="value-number">04</div>
        <h4>创新</h4>
        <p>拥抱变化，勇于创新，积极探索法律科技应用，打造智慧法律服务新模式。</p>
      </div>
    </div>
  </section>

  <!-- Section FOUR: Culture -->
  <section class="content-section" id="culture">
    <div class="section-number">FOUR</div>
    <div class="section-explore">CULTURE</div>

    <h2 class="section-title-alt">企业文化</h2>
    <p class="section-subtitle">打造有温度的专业团队</p>

    <div class="culture-grid">
      <div class="culture-item">
        <div class="culture-icon">🎯</div>
        <h4>专业至上</h4>
        <p>以专业能力为核心，持续学习成长，追求卓越的法律服务品质。</p>
      </div>

      <div class="culture-item">
        <div class="culture-icon">🤝</div>
        <h4>团队协作</h4>
        <p>倡导开放包容的工作环境，鼓励团队合作，共同为客户创造价值。</p>
      </div>

      <div class="culture-item">
        <div class="culture-icon">💡</div>
        <h4>创新思维</h4>
        <p>鼓励创新思考，勇于突破传统，积极探索法律服务的新模式。</p>
      </div>

      <div class="culture-item">
        <div class="culture-icon">⚖️</div>
        <h4>职业操守</h4>
        <p>坚守职业道德底线，恪守律师执业规范，维护法律正义与客户权益。</p>
      </div>

      <div class="culture-item">
        <div class="culture-icon">🌱</div>
        <h4>成长发展</h4>
        <p>提供完善的培训体系和职业发展通道，助力每一位成员实现个人价值。</p>
      </div>

      <div class="culture-item">
        <div class="culture-icon">🌍</div>
        <h4>社会责任</h4>
        <p>积极参与公益法律服务，履行社会责任，用专业力量回馈社会。</p>
      </div>
    </div>
  </section>

  <!-- Section FIVE: Honors -->
  <section class="content-section" id="honors">
    <div class="section-number">FIVE</div>
    <div class="section-explore">RECOGNITION</div>

    <h2 class="section-title-alt">荣誉奖项</h2>
    <p class="section-subtitle">专业实力获得广泛认可</p>

    <div class="honors-list">
      <div class="honor-item">
        <span class="honor-year">2024</span>
        <h4>年度最佳知识产权律所</h4>
        <p>中国法律服务大奖</p>
      </div>

      <div class="honor-item">
        <span class="honor-year">2023</span>
        <h4>最佳公司法律师团队</h4>
        <p>亚洲法律事务所评选</p>
      </div>

      <div class="honor-item">
        <span class="honor-year">2023</span>
        <h4>优秀律师事务所</h4>
        <p>上海市司法局表彰</p>
      </div>

      <div class="honor-item">
        <span class="honor-year">2022</span>
        <h4>年度最佳诉讼团队</h4>
        <p>钱伯斯法律评级</p>
      </div>

      <div class="honor-item">
        <span class="honor-year">2022</span>
        <h4>杰出并购交易</h4>
        <p>中国并购年会</p>
      </div>

      <div class="honor-item">
        <span class="honor-year">2021</span>
        <h4>最受信赖律所</h4>
        <p>企业法律顾问评选</p>
      </div>
    </div>
  </section>

  <!-- Section SIX: Pro Bono -->
  <section class="content-section" id="probono">
    <div class="section-number">SIX</div>
    <div class="section-explore">RESPONSIBILITY</div>

    <h2 class="section-title-alt">公益法律服务</h2>
    <p class="section-subtitle">用专业力量回馈社会</p>

    <div class="probono-intro-text">
      <p>作为具有社会责任感的律师事务所，华诚始终积极参与公益法律服务，为弱势群体提供无偿法律援助，为推动法治建设贡献专业力量。</p>
    </div>

    <div class="probono-stats">
      <div class="probono-stat">
        <div class="probono-stat-number">500+</div>
        <div class="probono-stat-label">法律援助人次</div>
      </div>
      <div class="probono-stat">
        <div class="probono-stat-number">100+</div>
        <div class="probono-stat-label">普法讲座场次</div>
      </div>
      <div class="probono-stat">
        <div class="probono-stat-number">80+</div>
        <div class="probono-stat-label">实习生培养</div>
      </div>
      <div class="probono-stat">
        <div class="probono-stat-number">200万+</div>
        <div class="probono-stat-label">慈善捐赠金额</div>
      </div>
    </div>
  </section>

  <!-- Section SEVEN: Locations -->
  <section class="content-section content-section--last" id="locations">
    <div class="section-number">SEVEN</div>
    <div class="section-explore">OFFICES</div>

    <h2 class="section-title-alt">办公地点</h2>
    <p class="section-subtitle">全国布局，就近服务</p>

    <div class="locations-list">
      <div class="location-item">
        <h4>上海总部</h4>
        <p>上海市浦东新区世纪大道1000号</p>
        <p class="location-contact">T: (86-21) 5292-1111 | E: shanghai@watsonband.com</p>
      </div>

      <div class="location-item">
        <h4>北京分所</h4>
        <p>北京市朝阳区建国门外大街1号</p>
        <p class="location-contact">T: (86-10) 8520-1111 | E: beijing@watsonband.com</p>
      </div>

      <div class="location-item">
        <h4>深圳分所</h4>
        <p>深圳市福田区福华三路</p>
        <p class="location-contact">T: (86-755) 8888-1111 | E: shenzhen@watsonband.com</p>
      </div>
    </div>

    <div class="cta-block">
      <h3>期待与您合作</h3>
      <p>专业团队随时为您提供法律咨询服务</p>
      <a href="/contact" class="cta-link">联系我们 →</a>
    </div>
  </section>

</div>

<style lang="scss">
  @use 'sass:color';
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/components/index.scss' as *;

  // Page-specific styles only

  // Timeline Minimal - Desktop horizontal layout
  .timeline-minimal {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem 4rem;
    margin-top: 2rem;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .timeline-item-minimal {
    position: relative;
    padding-left: 2rem;
    border-left: 0.125rem solid #e2e8f0;

    &::before {
      content: '';
      position: absolute;
      left: -0.3125rem;
      top: 0.375rem;
      width: 0.4375rem;
      height: 0.4375rem;
      border-radius: 50%;
      background: #cbd5e1;
    }

    &--highlight {
      border-left-color: rgba(90, 154, 127, 0.3);

      &::before {
        background: $color-primary;
        width: 0.5625rem;
        height: 0.5625rem;
        left: -0.375rem;
        box-shadow: 0 0 0 0.25rem rgba(90, 154, 127, 0.1);
      }

      .timeline-year {
        color: $color-primary;
      }
    }
  }

  .timeline-year {
    font-size: 1.125rem;
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 0.75rem;
  }

  .timeline-content {
    h4 {
      font-size: 1rem;
      font-weight: 500;
      color: #334155;
      margin-bottom: 0.625rem;
      letter-spacing: -0.01em;
      line-height: 1.4;
    }

    p {
      font-size: 0.875rem;
      font-weight: 300;
      line-height: 1.8;
      color: #64748b;
    }
  }

  // Values List - Desktop 2-column layout
  .values-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem 5rem;
  }

  .value-item {
    padding: 2rem;
    border: 0.0625rem solid #f1f5f9;
    border-radius: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
      border-color: #e2e8f0;
      box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.04);
    }
  }

  .value-number {
    font-size: 0.875rem;
    font-weight: 300;
    color: #cbd5e1;
    margin-bottom: 1rem;
  }

  .value-item h4 {
    font-size: 1.25rem;
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
    line-height: 1.4;
  }

  .value-item p {
    font-size: 0.9375rem;
    font-weight: 300;
    line-height: 1.9;
    color: #475569;
    max-width: 43.75rem;
  }

  // Culture Grid - 3-column layout
  .culture-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }
  }

  .culture-item {
    padding: 2rem 1.5rem;
    background: #fafafa;
    border-radius: 0.75rem;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      background: white;
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
      transform: translateY(-0.25rem);
    }
  }

  .culture-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4rem;
  }

  .culture-item h4 {
    font-size: 1.125rem;
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }

  .culture-item p {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.8;
    color: #64748b;
  }

  // Honors List - Desktop 2-column layout
  .honors-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 4rem;
  }

  .honor-item {
    padding: 1.5rem 0;
  }

  .honor-year {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 500;
    color: $color-primary;
    background: rgba(90, 154, 127, 0.08);
    padding: 0.25rem 0.75rem;
    border-radius: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .honor-item h4 {
    font-size: 1.125rem;
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
    line-height: 1.4;
  }

  .honor-item p {
    font-size: 0.875rem;
    font-weight: 300;
    color: #64748b;
    line-height: 1.6;
  }

  // Locations - Desktop 3-column layout
  .locations-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    margin-bottom: 6.25rem;
  }

  .location-item {
    padding: 2.5rem 2rem;
    border: 0.0625rem solid #e2e8f0;
    border-radius: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
      border-color: $color-primary;
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.06);
    }

    h4 {
      font-size: 1.125rem;
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 1rem;
      letter-spacing: -0.01em;
      line-height: 1.4;
    }

    p {
      font-size: 0.9375rem;
      font-weight: 300;
      color: #475569;
      margin-bottom: 0.5rem;
      line-height: 1.7;
    }

    .location-contact {
      font-size: 0.8125rem;
      color: #64748b;
      line-height: 1.6;
    }
  }

  // Responsive
  @media (max-width: 1024px) {
    .timeline-minimal {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
    }

    .values-list {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .honors-list {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .locations-list {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  @media (max-width: 768px) {
    .timeline-minimal {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    // Hide horizontal navigation on mobile
    .horizontal-nav {
      display: none;
    }

    // Hide vertical navigation on mobile
    .vertical-nav {
      display: none;
    }
  }

  // ========================================
  // Mobile Navigation Components
  // ========================================

  // Floating Navigation Button (Mobile Only)
  .mobile-nav-toggle {
    display: none;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 50%;
    background: $color-primary;
    color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 100;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background: color.adjust($color-primary, $lightness: -10%);
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(0.95);
    }

    @media (max-width: 768px) {
      display: flex;
    }

    @media (max-width: 480px) {
      bottom: 16px;
      right: 16px;
      width: 48px;
      height: 48px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  // Mobile Navigation Overlay
  .mobile-nav-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    animation: fadeIn 0.3s ease;

    @media (min-width: 769px) {
      display: none;
    }
  }

  // Mobile Navigation Menu
  .mobile-nav-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 320px;
    max-width: 85vw;
    background: white;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
    z-index: 201;
    overflow-y: auto;
    animation: slideInRight 0.3s ease;

    @media (min-width: 769px) {
      display: none;
    }

    @media (max-width: 480px) {
      width: 100vw;
      max-width: 100vw;
    }
  }

  .mobile-nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid #e2e8f0;
  }

  .mobile-nav-title {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: #1e293b;
  }

  .mobile-nav-close {
    padding: 8px;
    border: none;
    background: transparent;
    color: #64748b;
    cursor: pointer;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: $color-primary;
    }
  }

  .mobile-nav-list {
    padding: 16px 0;
  }

  .mobile-nav-item {
    display: block;
    width: 100%;
    padding: 14px 24px;
    border: none;
    border-left: 3px solid transparent;
    background: transparent;
    color: #64748b;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba($color-primary, 0.05);
      color: $color-primary;
    }

    &.active {
      border-left-color: $color-primary;
      background: rgba($color-primary, 0.08);
      color: $color-primary;
      font-weight: 500;
    }
  }

  // Animations
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
</style>
