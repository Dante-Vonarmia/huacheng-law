<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let scrollY = $state(0);
  let activeSection = $state(0); // 0 = 简介, 1-13 = 业务领域
  let showVerticalNav = $state(false);

  // 定义业务领域数据（保留原有数据）
  const practices = [
    {
      id: 'ip',
      slug: 'intellectual-property',
      category: '核心业务',
      name_zh: '知识产权',
      name_en: 'Intellectual Property',
      description_zh: '专注于专利、商标、著作权等知识产权领域，为企业提供全方位的IP保护和商业化策略',
      services: ['专利申请与维权', '商标注册与保护', '著作权登记', '商业秘密保护', '知识产权诉讼', 'IP尽职调查'],
      cases: '成功代理500+知识产权案件，涉及高科技、医药、互联网等多个行业',
      richContent: `
        <h3>知识产权法律服务</h3>
        <p>华诚知识产权团队在专利、商标、著作权、商业秘密、反不正当竞争、域名及网络等知识产权各个领域均拥有丰富的执业经验，能够为客户提供全方位的知识产权法律服务。</p>

        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=85" alt="知识产权" />

        <h4>主要服务领域</h4>
        <ul>
          <li><strong>专利服务</strong>：专利申请、专利无效、专利侵权诉讼与行政程序</li>
          <li><strong>商标服务</strong>：商标申请注册、商标异议、商标争议、商标侵权诉讼</li>
          <li><strong>著作权</strong>：著作权登记、著作权许可与转让、著作权侵权诉讼</li>
          <li><strong>商业秘密</strong>：商业秘密保护方案设计、商业秘密侵权诉讼</li>
          <li><strong>不正当竞争</strong>：反不正当竞争法律咨询、不正当竞争纠纷诉讼</li>
        </ul>

        <p>我们的知识产权团队由30余位资深律师组成，其中多位律师具有理工科背景，能够深入理解客户的技术创新。团队成员曾代理多起在行业内具有重大影响的知识产权案件，为众多知名企业提供专业法律服务。</p>

        <h4>典型案例</h4>
        <p>代理某知名互联网公司商标侵权案，涉案金额超过5000万元人民币，最终获得胜诉判决，有效维护了客户的品牌权益。</p>
      `
    },
    {
      id: 'corporate',
      slug: 'corporate-commercial',
      category: '核心业务',
      name_zh: '公司及商业法务',
      name_en: 'Corporate and Commercial',
      description_zh: '为企业提供全生命周期法律服务，包括公司设立、股权架构、并购重组、合规管理等',
      services: ['公司设立与治理', '股权架构设计', '并购重组', '投融资服务', '合规管理', '公司清算'],
      cases: '协助完成100+并购交易，累计交易金额超过500亿元',
      richContent: `
        <h3>公司商事法律服务</h3>
        <p>华诚公司商事团队在公司设立、股权架构设计、并购重组、公司治理、合规管理等领域具有深厚的专业积累，为企业提供全生命周期的法律服务。</p>

        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=85" alt="公司商事" />

        <h4>核心服务内容</h4>
        <ul>
          <li><strong>公司设立</strong>：公司设立方案设计、工商注册、章程起草</li>
          <li><strong>股权架构</strong>：股权结构设计、股权激励方案、员工持股计划</li>
          <li><strong>并购重组</strong>：尽职调查、交易架构设计、并购文件起草与谈判</li>
          <li><strong>公司治理</strong>：股东会、董事会、监事会运作规范、关联交易审查</li>
          <li><strong>合规管理</strong>：合规体系建设、反垄断审查、外商投资合规</li>
        </ul>

        <p>团队成员平均执业年限超过15年，曾参与多起大型跨境并购项目，累计交易金额超过100亿美元。我们的客户涵盖制造业、互联网、新能源、医疗健康等多个行业的领军企业。</p>

        <h4>成功案例</h4>
        <p>为某大型制造企业提供赴美上市全程法律服务，协助客户成功在纳斯达克上市，融资规模达2亿美元，创下行业记录。</p>
      `
    },
    {
      id: 'data',
      slug: 'data-legal-ip',
      category: '核心业务',
      name_zh: '数据相关法律及知识产权',
      name_en: 'Data-related Legal and IP',
      description_zh: '提供数据合规、个人信息保护、数据资产化等专业法律服务，助力企业数字化转型',
      services: ['数据合规', '个人信息保护', '数据跨境', '数据资产化', '网络安全', '数据争议'],
      cases: '为50+企业提供数据合规服务，覆盖互联网、金融科技、人工智能等行业',
      richContent: `
        <h3>数据法律与隐私保护</h3>
        <p>随着《数据安全法》《个人信息保护法》等法律法规的陆续出台，数据合规已成为企业运营的重要议题。华诚数据法律团队致力于为客户提供全方位的数据合规与隐私保护法律服务。</p>

        <img src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=85" alt="数据隐私" />

        <h4>专业服务内容</h4>
        <ul>
          <li><strong>数据合规</strong>：数据合规体系建设、数据分类分级、数据安全评估</li>
          <li><strong>个人信息保护</strong>：隐私政策起草、用户同意机制设计、个人信息处理规范</li>
          <li><strong>数据跨境</strong>：数据出境安全评估、标准合同备案、跨境数据传输方案</li>
          <li><strong>数据交易</strong>：数据交易合同、数据资产评估、数据权属认定</li>
          <li><strong>网络安全</strong>：网络安全等级保护、关键信息基础设施保护、应急响应</li>
        </ul>

        <p>我们的团队成员具有法律、技术双重背景，深刻理解数据处理的技术实现与法律要求。团队已为超过200家企业提供数据合规服务，涵盖互联网、金融科技、医疗健康、智能制造等多个数据密集型行业。</p>

        <h4>典型服务</h4>
        <p>为某大型互联网平台搭建全面的数据合规体系，协助客户通过国家网信办的数据出境安全评估，成功实现业务全球化拓展。</p>
      `
    },
    {
      id: 'capital',
      slug: 'capital-market',
      category: '核心业务',
      name_zh: '资本市场',
      name_en: 'Capital Market',
      description_zh: '提供IPO、再融资、并购重组、债券发行等资本市场法律服务',
      services: ['IPO上市', '再融资', '并购重组', '债券发行', '私募基金', '资本运作'],
      cases: '协助完成IPO项目20+个，债券发行累计超过200亿元',
      richContent: `
        <h3>资本市场法律服务</h3>
        <p>华诚资本市场团队在IPO、再融资、并购重组、债券发行等领域具有深厚经验，为企业提供全方位的资本市场法律服务。</p>

        <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85" alt="资本市场" />

        <h4>核心服务领域</h4>
        <ul>
          <li><strong>IPO上市</strong>：境内外IPO、科创板、创业板上市法律服务</li>
          <li><strong>再融资</strong>：配股、增发、可转债等再融资项目</li>
          <li><strong>并购重组</strong>：重大资产重组、吸收合并、分立重组</li>
          <li><strong>债券发行</strong>：公司债、企业债、资产证券化产品发行</li>
          <li><strong>私募基金</strong>：PE/VC投资、PIPE交易、基金设立与管理</li>
        </ul>

        <p>团队成员具有深厚的资本市场实务经验，多位律师曾在中国证监会、证券交易所、大型券商任职。我们已为超过100家企业提供IPO法律服务，累计融资规模超过500亿元人民币。</p>

        <h4>标志性项目</h4>
        <p>担任某新能源企业科创板IPO项目主承销商法律顾问，协助企业成功上市，首发募集资金50亿元，创科创板同期最大IPO纪录。</p>
      `
    },
    {
      id: 'finance',
      slug: 'financial-asset-management',
      category: '核心业务',
      name_zh: '金融及资产管理',
      name_en: 'Financial & Asset Management',
      description_zh: '提供银行、证券、基金、保险等金融领域的专业法律服务',
      services: ['银行融资', '证券发行', '基金设立', '金融监管', '金融诉讼', '资产管理'],
      cases: '服务金融机构100+家，管理资产规模超过1000亿元'
    },
    {
      id: 'restructuring',
      slug: 'restructuring-insolvency',
      category: '行业专长',
      name_zh: '重组及破产',
      name_en: 'Restructuring & Insolvency',
      description_zh: '提供企业重组、破产清算、债务重组等专业法律服务',
      services: ['企业重组', '破产清算', '债务重组', '债权人保护', '破产管理人', '重整方案'],
      cases: '担任破产管理人30+件，涉及资产总额超过50亿元'
    },
    {
      id: 'culture',
      slug: 'culture-entertainment-sports',
      category: '行业专长',
      name_zh: '文化、娱乐及体育',
      name_en: 'Culture, Entertainment & Sports',
      description_zh: '为文化创意、影视娱乐、体育产业提供专业法律服务',
      services: ['影视制作', '版权交易', '艺人经纪', '体育赛事', '文化产业', '娱乐合规'],
      cases: '服务影视项目50+个，体育赛事法律顾问累计100+场'
    },
    {
      id: 'realestate',
      slug: 'construction-real-estate',
      category: '行业专长',
      name_zh: '建筑、房地产及基础设施',
      name_en: 'Construction & Real Estate',
      description_zh: '涵盖土地使用、房地产开发、项目融资、物业管理等全方位服务',
      services: ['土地使用权', '房地产开发', '建设工程', '不动产交易', '物业管理', 'PPP项目'],
      cases: '服务大型房地产项目50+个，涉及开发面积超过1000万平方米'
    },
    {
      id: 'labor',
      slug: 'labor-employment',
      category: '行业专长',
      name_zh: '劳动及雇佣',
      name_en: 'Labor & Employment',
      description_zh: '协助企业建立合规的人力资源管理体系，处理劳动争议',
      services: ['劳动合同管理', '规章制度设计', '劳动争议处理', '社保公积金', '工伤处理', '高管激励'],
      cases: '处理劳动争议案件200+件，为企业节省人力成本超过5000万元'
    },
    {
      id: 'family',
      slug: 'family-wealth-management',
      category: '专业服务',
      name_zh: '家族法及财富管理',
      name_en: 'Family Law & Wealth Management',
      description_zh: '为高净值家族提供财富传承、家族信托、家族办公室等专业服务',
      services: ['家族信托', '财富传承', '家族办公室', '婚姻家事', '遗产规划', '家族治理'],
      cases: '服务高净值家族50+个，管理家族财富累计超过100亿元'
    },
    {
      id: 'trade',
      slug: 'trade-customs-taxation',
      category: '专业服务',
      name_zh: '贸易、海关及税务',
      name_en: 'Trade, Customs & Taxation',
      description_zh: '提供国际贸易、海关合规、税务筹划等专业法律服务',
      services: ['国际贸易', '海关合规', '税务筹划', '反倾销', '贸易救济', '跨境投资'],
      cases: '处理贸易争议100+件，海关合规项目累计50+个'
    },
    {
      id: 'litigation',
      slug: 'litigation-dispute-resolution',
      category: '专业服务',
      name_zh: '诉讼及争议解决',
      name_en: 'Litigation & Dispute Resolution',
      description_zh: '经验丰富的诉讼团队，专注商事诉讼、国际仲裁，为客户争取最大利益',
      services: ['商事诉讼', '合同纠纷', '公司纠纷', '国际仲裁', '执行程序', '诉讼策略'],
      cases: '代理重大商事诉讼300+案件，标的额累计超过100亿元'
    },
    {
      id: 'investigation',
      slug: 'investigation',
      category: '专业服务',
      name_zh: '调查',
      name_en: 'Investigation',
      description_zh: '提供反舞弊调查、合规调查、尽职调查等专业服务',
      services: ['反舞弊调查', '合规调查', '尽职调查', '内部审计', '风险评估', '调查报告'],
      cases: '完成内部调查50+项，挽回企业损失累计超过10亿元'
    }
  ];

  // 创建sections：简介 + 13个业务领域
  const sections = [
    { id: 'intro', label: '简介' },
    ...practices.map(p => ({
      id: p.id,
      label: p.name_zh
    }))
  ];

  // 滚动到指定section
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

      // 显示垂直导航
      showVerticalNav = scrollY > window.innerHeight * 0.8;

      // 更新active section
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
  <title>业务领域 - 华诚律师事务所</title>
  <meta name="description" content="华诚律师事务所业务领域涵盖知识产权、公司法务、金融法、诉讼仲裁等" />
</svelte:head>

<!-- Hero Banner -->
<section class="hero-banner">
  <div class="hero-banner__bg" style="transform: translateY({scrollY * 0.3}px);"></div>
  <div class="hero-banner__content">
    <span class="hero-banner__label">PRACTICE AREAS</span>
    <h1 class="hero-banner__title">业务领域</h1>
    <p class="hero-banner__subtitle">专注核心领域，提供全方位法律服务解决方案</p>
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

  <!-- Section INTRO: 简介 -->
  <section class="content-section" id="intro">
    <div class="section-number">INTRO</div>
    <div class="section-explore">EXPLORE</div>

    <h2 class="section-title">
      "专业沉淀，全方位法律服务解决方案"
    </h2>

    <p class="section-intro">
      华诚律师事务所在知识产权、公司法、金融法、诉讼仲裁等多个专业领域拥有深厚的专业积累。我们的律师团队始终秉承专业、高效、务实的服务理念，为客户提供全方位的法律解决方案。
    </p>

    <div class="stats-row">
      <div class="stat-item">
        <div class="stat-number">13</div>
        <div class="stat-label">业务领域</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">100+</div>
        <div class="stat-label">专业律师</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">1000+</div>
        <div class="stat-label">成功案例</div>
      </div>
    </div>

    <div class="narrative-text">
      <p>自成立以来，华诚已为数千家国内外企业提供专业法律服务，业务涵盖13个核心领域，累计处理案件超过10000件，客户满意度持续保持在95%以上。</p>
      <p>我们深知每个客户的需求都是独特的，因此我们致力于提供量身定制的法律解决方案，确保客户在复杂的法律环境中获得最大的商业价值和法律保护。</p>
    </div>
  </section>

  <!-- 13个业务领域 -->
  {#each practices as practice, index}
    <section class="content-section" id={practice.id}>
      <div class="section-number">{String(index + 1).padStart(2, '0')}</div>
      <div class="section-explore">EXPLORE</div>

      <article class="practice-detail">
        <div class="practice-detail-header">
          <div class="practice-category">{practice.category}</div>
          <h2 class="practice-detail-title">{practice.name_zh}</h2>
          <p class="practice-detail-subtitle">{practice.name_en}</p>
        </div>

        {#if practice.richContent}
          <div class="rich-content">
            {@html practice.richContent}
          </div>
        {:else}
          <div class="rich-content">
            <p>{practice.description_zh}</p>

            <h4>核心服务</h4>
            <ul>
              {#each practice.services as service}
                <li>{service}</li>
              {/each}
            </ul>

            {#if practice.cases}
              <p><strong>案例成果：</strong>{practice.cases}</p>
            {/if}
          </div>
        {/if}
      </article>
    </section>
  {/each}

  <!-- CTA Section -->
  <section class="cta-section">
    <h3>了解我们如何帮助您的企业</h3>
    <p>专业团队随时为您提供法律咨询服务</p>
    <a href="/contact" class="cta-button">联系我们 →</a>
  </section>

</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;

  // Hero Banner
  .hero-banner {
    position: relative;
    min-height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    overflow: hidden;
  }

  .hero-banner__bg {
    position: absolute;
    inset: -10%;
    background: linear-gradient(135deg, rgba(14, 27, 58, 0.92) 0%, rgba(14, 27, 58, 0.85) 100%),
                url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=85');
    background-size: cover;
    background-position: center;
    will-change: transform;
  }

  .hero-banner__content {
    position: relative;
    z-index: 2;
    max-width: 60rem;
    padding: 0 2rem;
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

  // Horizontal Navigation
  .horizontal-nav {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem 2rem;
    z-index: 3;
    max-width: 90%;
  }

  .horizontal-nav__item {
    flex-shrink: 0;
    background: none;
    border: none;
    font-size: 0.9rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: color 0.2s;
    padding: 0.5rem 0;
    position: relative;
    white-space: nowrap;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: white;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    &.active {
      color: white;

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
    align-items: flex-start;
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

  .section-intro {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.8;
    color: #64748b;
    margin-bottom: 3.75rem;
  }

  // Stats
  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    margin-bottom: 5rem;
    padding: 3.75rem 0;
    border-top: 0.0625rem solid #e2e8f0;
    border-bottom: 0.0625rem solid #e2e8f0;
  }

  .stat-item {
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


  // Practice Detail
  .practice-detail {
    margin-bottom: 3rem;
  }

  .practice-detail-header {
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 0.0625rem solid #e2e8f0;
  }

  .practice-category {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $color-primary;
    margin-bottom: 0.75rem;
  }

  .practice-detail-title {
    font-size: 2rem;
    font-weight: 500;
    color: #1e293b;
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .practice-detail-subtitle {
    font-size: 1rem;
    font-weight: 400;
    color: #64748b;
    font-style: italic;
    margin: 0;
  }

  // CTA Section
  .cta-section {
    padding: 5rem 0;
    text-align: center;
    border-top: 0.0625rem solid #e2e8f0;
    margin-top: 4rem;

    h3 {
      font-size: 1.75rem;
      font-weight: 500;
      color: #1e293b;
      margin: 0 0 1rem 0;
      letter-spacing: -0.01em;
    }

    p {
      font-size: 0.9375rem;
      color: #64748b;
      margin: 0 0 2rem 0;
    }
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background: $color-primary;
    color: white;
    text-decoration: none;
    border-radius: 0.375rem;
    font-size: 0.9375rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background: darken($color-primary, 8%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(90, 154, 127, 0.3);
    }
  }

  // Rich Content Styles - WYSIWYG Editor Output
  .rich-content {
    line-height: 1.8;
    color: #475569;

    // Headings
    :global(h3) {
      font-size: 1.75rem;
      font-weight: 500;
      color: $color-primary;
      margin: 0 0 1.5rem 0;
      line-height: 1.3;
    }

    :global(h4) {
      font-size: 1.25rem;
      font-weight: 500;
      color: #334155;
      margin: 2.5rem 0 1rem 0;
      line-height: 1.4;
    }

    :global(h5) {
      font-size: 1.125rem;
      font-weight: 500;
      color: #475569;
      margin: 2rem 0 0.75rem 0;
    }

    // Paragraphs
    :global(p) {
      font-size: 1rem;
      line-height: 1.8;
      color: #475569;
      margin-bottom: 1.5rem;
    }

    // Lists
    :global(ul),
    :global(ol) {
      padding-left: 2rem;
      margin: 1.5rem 0;
    }

    :global(ul) {
      list-style: none;

      :global(li) {
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: $color-primary;
          font-weight: bold;
          font-size: 1.25rem;
        }
      }
    }

    :global(ol) {
      list-style: decimal;

      :global(li) {
        padding-left: 0.5rem;
      }
    }

    :global(li) {
      font-size: 0.9375rem;
      line-height: 1.7;
      color: #475569;
      margin-bottom: 0.75rem;
    }

    :global(strong),
    :global(b) {
      font-weight: 600;
      color: #334155;
    }

    :global(em),
    :global(i) {
      font-style: italic;
    }

    // Images - Default (center aligned)
    :global(img) {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
      margin: 2rem auto;
      display: block;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    // Image alignment classes (from WYSIWYG editor)
    :global(img.align-left) {
      float: left;
      margin: 0.5rem 2rem 1rem 0;
      max-width: 50%;
    }

    :global(img.align-right) {
      float: right;
      margin: 0.5rem 0 1rem 2rem;
      max-width: 50%;
    }

    :global(img.align-center) {
      display: block;
      margin: 2rem auto;
      max-width: 100%;
    }

    // Blockquote
    :global(blockquote) {
      border-left: 4px solid $color-secondary;
      padding-left: 1.5rem;
      margin: 2rem 0;
      font-style: italic;
      color: #64748b;
      background: #f8fafc;
      padding: 1.5rem;
      border-radius: 0 0.5rem 0.5rem 0;
    }

    // Tables
    :global(table) {
      width: 100%;
      border-collapse: collapse;
      margin: 2rem 0;
      font-size: 0.9375rem;
    }

    :global(th),
    :global(td) {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    :global(th) {
      background: #f8fafc;
      font-weight: 600;
      color: #334155;
    }

    :global(tr:hover) {
      background: #fafbfc;
    }

    // Links
    :global(a) {
      color: $color-primary;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s;

      &:hover {
        border-bottom-color: $color-primary;
      }
    }

    // Code
    :global(code) {
      background: #f1f5f9;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.875rem;
      color: #334155;
    }

    :global(pre) {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1.5rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 2rem 0;

      :global(code) {
        background: none;
        padding: 0;
        color: inherit;
      }
    }

    // Horizontal Rule
    :global(hr) {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 3rem 0;
    }

    // Clear floats after images
    &::after {
      content: '';
      display: table;
      clear: both;
    }
  }

  // Responsive
  @media (max-width: 1024px) {
    .vertical-nav {
      display: none;
    }

    .page-content {
      padding: 1.5rem 2.5rem 3rem;
    }

    .stats-row {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .hero-banner {
      min-height: 70vh;
    }

    .hero-banner__content {
      padding: 0 1.5rem;
    }

    .horizontal-nav {
      gap: 1.5rem;
      max-width: 95%;
    }

    .horizontal-nav__item {
      font-size: 0.8125rem;
    }

    .page-content {
      padding: 1.5rem 1.5rem 3rem;
    }

    .section-title {
      font-size: 1.5rem;
    }

    .practice-detail-title {
      font-size: 1.5rem;
    }

    .stats-row {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 2.5rem 0;
    }

    .stat-number {
      font-size: 2.5rem;
    }

    .cta-section {
      padding: 3rem 0;

      h3 {
        font-size: 1.5rem;
      }
    }

    .rich-content {
      :global(h3) {
        font-size: 1.5rem;
      }

      :global(h4) {
        font-size: 1.125rem;
      }

      :global(p) {
        font-size: 0.9375rem;
      }

      :global(img) {
        margin: 1.5rem auto;
      }
    }
  }
</style>
