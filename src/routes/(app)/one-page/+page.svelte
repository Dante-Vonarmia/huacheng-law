<script lang="ts">
    import { Button } from '$ui/components';
  import { onMount } from 'svelte';

  let activeSection = 'home';
  let scrollY = 0;

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // 滚动监听 - 实现导航栏高亮跟随
  onMount(() => {
    const sections = ['home', 'about', 'practices', 'team', 'news', 'contact'];

    const handleScroll = () => {
      scrollY = window.scrollY;

      // 找到当前可见的section
      let current = 'home';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // 如果section的顶部在视口中间以上，就认为是当前section
          if (rect.top <= window.innerHeight / 2) {
            current = sectionId;
          }
        }
      }
      activeSection = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<!-- Fixed One-Page Navigation -->
<nav class="onepage-nav">
  <div class="onepage-nav__container">
    <a href="#" class="onepage-nav__logo" on:click|preventDefault={() => scrollToSection('home')}>
      Watson & Band
    </a>
    <ul class="onepage-nav__menu">
      <li><a href="#home" on:click|preventDefault={() => scrollToSection('home')} class:active={activeSection === 'home'}>首页</a></li>
      <li><a href="#about" on:click|preventDefault={() => scrollToSection('about')} class:active={activeSection === 'about'}>关于</a></li>
      <li><a href="#practices" on:click|preventDefault={() => scrollToSection('practices')} class:active={activeSection === 'practices'}>业务</a></li>
      <li><a href="#team" on:click|preventDefault={() => scrollToSection('team')} class:active={activeSection === 'team'}>团队</a></li>
      <li><a href="#news" on:click|preventDefault={() => scrollToSection('news')} class:active={activeSection === 'news'}>动态</a></li>
      <li><a href="#contact" on:click|preventDefault={() => scrollToSection('contact')} class:active={activeSection === 'contact'}>联系</a></li>
    </ul>
  </div>
</nav>

<!-- Section 1: Full-Screen Hero with Parallax -->
<section id="home" class="section-hero">
  <!-- Parallax Background -->
  <div class="hero-bg" style="transform: translateY({scrollY * 0.5}px);">
    <div class="hero-bg__overlay"></div>
  </div>

  <div class="hero-content" style="transform: translateY({scrollY * 0.3}px); opacity: {1 - scrollY / 800};">
    <h1 class="hero-title">Watson & Band</h1>
    <p class="hero-subtitle">进取敬业 · 思远诚信 · 专业卓越</p>
    <div class="hero-actions">
      <button class="hero-btn hero-btn--primary">立即咨询</button>
      <button class="hero-btn hero-btn--outline">了解更多</button>
    </div>
  </div>

  <div class="hero-scroll" on:click={() => scrollToSection('about')}>
    <span>SCROLL</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 5v14M19 12l-7 7-7-7"/>
    </svg>
  </div>
</section>

<!-- Section 2: About - Grid with Staggered Cards -->
<section id="about" class="section-about">
  <div class="container">
    <div class="section-header">
      <span class="section-label">ABOUT US</span>
      <h2>关于华诚</h2>
    </div>

    <!-- Staggered Cards 卡片落差 -->
    <div class="staggered-grid">
      <div class="stagger-card stagger-card--1">
        <div class="stagger-card__number">30+</div>
        <h3>年历史</h3>
        <p>自1995年成立以来，华诚律师事务所始终坚持专业、诚信、卓越的核心价值观</p>
      </div>
      <div class="stagger-card stagger-card--2">
        <div class="stagger-card__number">200+</div>
        <h3>服务客户</h3>
        <p>为全球200多家企业客户提供卓越的法律服务，涵盖各个行业领域</p>
      </div>
      <div class="stagger-card stagger-card--3">
        <div class="stagger-card__number">50+</div>
        <h3>专业律师</h3>
        <p>汇聚资深律师团队，平均执业经验15年以上，深耕各专业领域</p>
      </div>
      <div class="stagger-card stagger-card--4">
        <div class="stagger-card__number">98%</div>
        <h3>成功率</h3>
        <p>高成功率和客户满意度，建立长期稳定的合作伙伴关系</p>
      </div>
    </div>
  </div>
</section>

<!-- Section 3: Practices - Masonry Grid 瀑布流 -->
<section id="practices" class="section-practices">
  <div class="container">
    <div class="section-header">
      <span class="section-label">SERVICES</span>
      <h2>核心业务领域</h2>
    </div>

    <!-- Masonry Grid -->
    <div class="masonry-container">
      <div class="masonry-item masonry-tall">
        <img src="https://images.unsplash.com/photo-1524633712235-22da046738b4?w=800&q=80" alt="知识产权法" />
        <div class="masonry-content">
          <span class="masonry-badge">CORE</span>
          <h3>知识产权法</h3>
          <p>专利、商标、著作权全方位保护，助力企业创新发展</p>
          <span class="masonry-link">了解详情 →</span>
        </div>
      </div>

      <div class="masonry-item">
        <img src="https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=600&q=80" alt="公司法" />
        <div class="masonry-content">
          <h3>公司法</h3>
          <p>公司设立、股权架构、并购重组</p>
          <span class="masonry-link">了解详情 →</span>
        </div>
      </div>

      <div class="masonry-item masonry-wide">
        <img src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1000&q=80" alt="诉讼仲裁" />
        <div class="masonry-content">
          <h3>诉讼仲裁</h3>
          <p>商事诉讼、国际仲裁，为客户争取最大权益</p>
          <span class="masonry-link">了解详情 →</span>
        </div>
      </div>

      <div class="masonry-item">
        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" alt="金融法" />
        <div class="masonry-content">
          <h3>金融法</h3>
          <p>银行、证券、基金法律服务</p>
          <span class="masonry-link">了解详情 →</span>
        </div>
      </div>

      <div class="masonry-item">
        <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&q=80" alt="房地产法" />
        <div class="masonry-content">
          <h3>房地产法</h3>
          <p>土地使用、房地产开发服务</p>
          <span class="masonry-link">了解详情 →</span>
        </div>
      </div>

      <div class="masonry-item">
        <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80" alt="劳动法" />
        <div class="masonry-content">
          <h3>劳动法</h3>
          <p>劳动争议、人力资源合规</p>
          <span class="masonry-link">了解详情 →</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Section 4: Team - Grid 九宫格 -->
<section id="team" class="section-team">
  <div class="container">
    <div class="section-header">
      <span class="section-label">OUR TEAM</span>
      <h2>专业律师团队</h2>
    </div>

    <!-- 3x3 Grid -->
    <div class="team-grid">
      <div class="team-member">
        <div class="team-member__photo">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&q=80" alt="张明华" />
          <div class="team-member__overlay">
            <p>30年执业经验<br/>成功代理500+重大案件</p>
          </div>
        </div>
        <h3>张明华</h3>
        <p class="team-member__role">创始合伙人</p>
        <span class="team-member__practice">知识产权 · 公司法</span>
      </div>

      <div class="team-member">
        <div class="team-member__photo">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&q=80" alt="李静" />
          <div class="team-member__overlay">
            <p>25年执业经验<br/>服务多家上市公司</p>
          </div>
        </div>
        <h3>李静</h3>
        <p class="team-member__role">高级合伙人</p>
        <span class="team-member__practice">并购重组 · 融资</span>
      </div>

      <div class="team-member">
        <div class="team-member__photo">
          <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&q=80" alt="王建国" />
          <div class="team-member__overlay">
            <p>28年执业经验<br/>胜诉率98%</p>
          </div>
        </div>
        <h3>王建国</h3>
        <p class="team-member__role">高级合伙人</p>
        <span class="team-member__practice">诉讼仲裁</span>
      </div>

      <div class="team-member">
        <div class="team-member__photo">
          <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&q=80" alt="陈雪" />
          <div class="team-member__overlay">
            <p>15年执业经验<br/>专利诉讼专家</p>
          </div>
        </div>
        <h3>陈雪</h3>
        <p class="team-member__role">合伙人</p>
        <span class="team-member__practice">专利诉讼</span>
      </div>

      <div class="team-member">
        <div class="team-member__photo">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80" alt="刘伟" />
          <div class="team-member__overlay">
            <p>18年执业经验<br/>金融法专家</p>
          </div>
        </div>
        <h3>刘伟</h3>
        <p class="team-member__role">合伙人</p>
        <span class="team-member__practice">金融法</span>
      </div>

      <div class="team-member">
        <div class="team-member__photo">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&q=80" alt="杨敏" />
          <div class="team-member__overlay">
            <p>12年执业经验<br/>劳动法专家</p>
          </div>
        </div>
        <h3>杨敏</h3>
        <p class="team-member__role">合伙人</p>
        <span class="team-member__practice">劳动法</span>
      </div>
    </div>
  </div>
</section>

<!-- Section 5: News - Horizontal Scroll -->
<section id="news" class="section-news">
  <div class="container-full">
    <div class="section-header">
      <span class="section-label">NEWS & INSIGHTS</span>
      <h2>新闻动态</h2>
    </div>

    <div class="news-scroll">
      <div class="news-card">
        <img src="https://images.unsplash.com/photo-1524633712235-22da046738b4?w=600&q=80" alt="News" />
        <div class="news-card__content">
          <span class="news-card__date">2024-11-01</span>
          <h3>华诚律所荣获"年度最佳知识产权律所"称号</h3>
          <p>在2024年度法律服务评选中，华诚律所凭借卓越的专业能力和客户服务...</p>
        </div>
      </div>

      <div class="news-card">
        <img src="https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=600&q=80" alt="News" />
        <div class="news-card__content">
          <span class="news-card__date">2024-10-15</span>
          <h3>华诚律所助力某科技公司完成跨境并购</h3>
          <p>成功协助某科技公司完成10亿美元跨境并购交易...</p>
        </div>
      </div>

      <div class="news-card">
        <img src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80" alt="News" />
        <div class="news-card__content">
          <span class="news-card__date">2024-10-01</span>
          <h3>华诚团队在知识产权诉讼中获得重大胜利</h3>
          <p>在一起重大专利侵权案件中为客户赢得胜诉...</p>
        </div>
      </div>

      <div class="news-card">
        <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&q=80" alt="News" />
        <div class="news-card__content">
          <span class="news-card__date">2024-09-20</span>
          <h3>发布《2024年知识产权保护白皮书》</h3>
          <p>深度解析中国知识产权保护现状与趋势...</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Section 6: Contact -->
<section id="contact" class="section-contact">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        <h2>联系我们</h2>
        <p class="contact-desc">期待与您合作，为您提供专业的法律服务</p>

        <div class="contact-items">
          <div class="contact-item">
            <strong>上海总部</strong>
            <p>上海市浦东新区世纪大道1000号</p>
            <p>(86-21) 5292-1111</p>
          </div>
          <div class="contact-item">
            <strong>北京分所</strong>
            <p>北京市朝阳区建国门外大街1号</p>
            <p>(86-10) 8520-1111</p>
          </div>
          <div class="contact-item">
            <strong>深圳分所</strong>
            <p>深圳市福田区福华三路</p>
            <p>(86-755) 8888-1111</p>
          </div>
          <div class="contact-item">
            <strong>电子邮箱</strong>
            <p>info@watsonband.com</p>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <form>
          <input type="text" placeholder="您的姓名 *" required />
          <input type="email" placeholder="邮箱地址 *" required />
          <input type="tel" placeholder="联系电话 *" required />
          <textarea placeholder="咨询内容 *" rows="5" required></textarea>
          <Button variant="primary" size="lg" style="width: 100%; padding: 16px;">提交咨询</Button>
        </form>
      </div>
    </div>
  </div>
</section>


<style lang="scss">
  @use '$ui/styles/variables.scss' as *;

  // One-Page Navigation
  .onepage-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    z-index: 1000;
    padding: 16px 0;
  }

  .onepage-nav__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .onepage-nav__logo {
    font-size: 22px;
    font-weight: 500;
    color: $color-primary;
    text-decoration: none;
    letter-spacing: -0.01em;
  }

  .onepage-nav__menu {
    display: flex;
    gap: 40px;
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      font-size: 15px;
      font-weight: 400;
      color: #64748b;
      text-decoration: none;
      transition: color 0.3s;
      position: relative;

      &:hover, &.active {
        color: $color-primary;
      }

      &.active::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        height: 2px;
        background: $color-primary;
      }
    }
  }

  // Hero Section with Parallax
  .section-hero {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: -10%;
    background: linear-gradient(135deg, rgba(90, 154, 127, 0.92) 0%, rgba(74, 138, 111, 0.88) 100%),
                url('https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1920&q=85');
    background-size: cover;
    background-position: center;
    will-change: transform;
  }

  .hero-bg__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%);
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 900px;
    padding: 0 24px;
    will-change: transform, opacity;
  }

  .hero-btn {
    padding: 16px 40px;
    font-size: 16px;
    font-weight: 400;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 0.01em;

    &--primary {
      background: white;
      color: $color-primary;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      }
    }

    &--outline {
      background: rgba(255,255,255,0.1);
      color: white;
      border: 2px solid rgba(255,255,255,0.8);
      backdrop-filter: blur(10px);

      &:hover {
        background: white;
        color: $color-primary;
        border-color: white;
      }
    }
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-title {
    font-size: clamp(56px, 10vw, 110px);
    font-weight: 300;
    letter-spacing: -0.04em;
    margin: 0 0 24px 0;
    line-height: 1;
  }

  .hero-subtitle {
    font-size: clamp(18px, 2.5vw, 26px);
    font-weight: 300;
    letter-spacing: 0.1em;
    opacity: 0.95;
    margin-bottom: 48px;
  }

  .hero-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-scroll {
    position: absolute;
    bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    letter-spacing: 0.2em;
    opacity: 0.8;
    cursor: pointer;
    animation: bounce 2s infinite;

    &:hover {
      opacity: 1;
    }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }

  // Common Styles
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 48px;
  }

  .container-full {
    max-width: 100%;
    padding: 0 48px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .section-label {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: $color-primary;
    margin-bottom: 16px;
    display: block;
  }

  .section-header h2 {
    font-size: clamp(36px, 5vw, 52px);
    font-weight: 400;
    color: $color-primary;
    margin: 16px 0 0 0;
    letter-spacing: -0.02em;
  }

  // About Section - Staggered Cards
  .section-about {
    padding: 140px 0;
    background: white;
  }

  .staggered-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }

  .stagger-card {
    background: white;
    padding: 40px 32px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-12px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }

    &--1 { transform: translateY(0); }
    &--2 { transform: translateY(30px); }
    &--3 { transform: translateY(15px); }
    &--4 { transform: translateY(40px); }
  }

  .stagger-card__number {
    font-size: 48px;
    font-weight: 300;
    color: $color-primary;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  .stagger-card h3 {
    font-size: 22px;
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 12px;
  }

  .stagger-card p {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;
    color: #64748b;
  }

  // Practices - Masonry
  .section-practices {
    padding: 140px 0;
    background: #fafafa;
  }

  .masonry-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 280px;
    gap: 20px;
  }

  .masonry-item {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;

    &.masonry-tall {
      grid-row: span 2;
    }

    &.masonry-wide {
      grid-column: span 2;
    }

    &:hover {
      img {
        transform: scale(1.1);
      }

      .masonry-content {
        background: rgba(90, 154, 127, 0.95);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
  }

  .masonry-content {
    position: absolute;
    inset: 0;
    background: rgba(90, 154, 127, 0.88);
    color: white;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transition: background 0.3s;

    h3 {
      font-size: 26px;
      font-weight: 400;
      margin-bottom: 12px;
    }

    p {
      font-size: 15px;
      font-weight: 300;
      opacity: 0.95;
      margin-bottom: 20px;
    }
  }

  .masonry-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 6px 12px;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
  }

  .masonry-link {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.95;
  }

  // Team - Grid
  .section-team {
    padding: 140px 0;
    background: white;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
  }

  .team-member {
    text-align: center;

    h3 {
      font-size: 22px;
      font-weight: 500;
      color: #1e293b;
      margin: 20px 0 8px 0;
    }
  }

  .team-member__photo {
    position: relative;
    height: 420px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 16px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }

    &:hover {
      img {
        transform: scale(1.05);
      }

      .team-member__overlay {
        opacity: 1;
      }
    }
  }

  .team-member__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(90, 154, 127, 0.95), transparent);
    display: flex;
    align-items: flex-end;
    padding: 32px;
    opacity: 0;
    transition: opacity 0.4s;
    color: white;

    p {
      font-size: 14px;
      font-weight: 300;
      line-height: 1.7;
      text-align: left;
    }
  }

  .team-member__role {
    font-size: 15px;
    font-weight: 400;
    color: $color-primary;
    margin-bottom: 8px;
  }

  .team-member__practice {
    font-size: 14px;
    font-weight: 300;
    color: #94a3b8;
  }

  // News - Horizontal Scroll
  .section-news {
    padding: 140px 0;
    background: #fafafa;
  }

  .news-scroll {
    display: flex;
    gap: 32px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    padding-bottom: 24px;

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #e2e8f0;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: $color-primary;
      border-radius: 4px;
    }
  }

  .news-card {
    flex: 0 0 400px;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    scroll-snap-align: start;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    }

    img {
      width: 100%;
      height: 240px;
      object-fit: cover;
    }
  }

  .news-card__content {
    padding: 28px;
  }

  .news-card__date {
    font-size: 13px;
    font-weight: 500;
    color: $color-primary;
    margin-bottom: 12px;
    display: block;
  }

  .news-card__content h3 {
    font-size: 20px;
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 12px;
    line-height: 1.4;
  }

  .news-card__content p {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.6;
    color: #64748b;
  }

  // Contact
  .section-contact {
    padding: 140px 0;
    background: white;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 80px;
  }

  .contact-info h2 {
    font-size: 48px;
    font-weight: 400;
    color: $color-primary;
    margin-bottom: 20px;
    letter-spacing: -0.02em;
  }

  .contact-desc {
    font-size: 18px;
    font-weight: 300;
    color: #64748b;
    margin-bottom: 48px;
  }

  .contact-items {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .contact-item {
    strong {
      font-size: 16px;
      font-weight: 500;
      color: #1e293b;
      display: block;
      margin-bottom: 8px;
    }

    p {
      font-size: 15px;
      font-weight: 300;
      color: #64748b;
      line-height: 1.7;
      margin: 0;
    }
  }

  .contact-form {
    background: #fafafa;
    padding: 48px;
    border-radius: 12px;

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;

      input, textarea {
        width: 100%;
        padding: 14px 16px;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 15px;
        font-family: inherit;
        transition: border-color 0.3s;

        &:focus {
          outline: none;
          border-color: $color-primary;
        }
      }

      textarea {
        resize: vertical;
      }
    }
  }

  // Responsive
  @media (max-width: 1024px) {
    .staggered-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .masonry-container {
      grid-template-columns: repeat(2, 1fr);
    }

    .team-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .contact-grid {
      grid-template-columns: 1fr;
      gap: 60px;
    }

    .onepage-nav__menu {
      gap: 24px;

      a {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 768px) {
    .container, .container-full {
      padding: 0 24px;
    }

    .onepage-nav__container {
      padding: 0 24px;
    }

    .onepage-nav__menu {
      display: none;
    }

    .section-about,
    .section-practices,
    .section-team,
    .section-news,
    .section-contact {
      padding: 80px 0;
    }

    .section-header {
      margin-bottom: 48px;
    }

    .staggered-grid,
    .masonry-container,
    .team-grid {
      grid-template-columns: 1fr;
    }

    .stagger-card {
      &--1, &--2, &--3, &--4 {
        transform: translateY(0) !important;
      }
    }

    .masonry-item {
      &.masonry-tall {
        grid-row: span 1;
      }

      &.masonry-wide {
        grid-column: span 1;
      }
    }

    .news-card {
      flex: 0 0 320px;
    }

    .contact-form {
      padding: 32px 24px;
    }
  }
</style>
