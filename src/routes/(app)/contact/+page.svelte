<script lang="ts">
  import { onMount } from 'svelte';

  let scrollY = $state(0);
  let formData = $state({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const offices = [
    {
      id: 'shanghai',
      name: '上海总部',
      name_en: 'Shanghai Headquarters',
      address: '上海市浦东新区世纪大道1000号',
      address_en: '1000 Century Avenue, Pudong New Area, Shanghai',
      phone: '(86-21) 5292-1111',
      fax: '(86-21) 5292-2222',
      email: 'shanghai@watsonband.com',
      hours: '周一至周五 9:00 - 18:00',
      description: '作为华诚律师事务所的总部，上海办公室汇集了最资深的律师团队，为国内外客户提供全方位的法律服务。'
    },
    {
      id: 'beijing',
      name: '北京分所',
      name_en: 'Beijing Office',
      address: '北京市朝阳区建国门外大街1号国贸大厦',
      address_en: 'China World Tower, 1 Jianguomenwai Avenue, Chaoyang District, Beijing',
      phone: '(86-10) 8520-1111',
      fax: '(86-10) 8520-2222',
      email: 'beijing@watsonband.com',
      hours: '周一至周五 9:00 - 18:00',
      description: '北京分所专注于政府事务、知识产权和公司并购领域，为企业提供专业的法律支持。'
    },
    {
      id: 'shenzhen',
      name: '深圳分所',
      name_en: 'Shenzhen Office',
      address: '深圳市福田区福华三路卓越世纪中心',
      address_en: 'Excellence Century Center, Fuhua 3rd Road, Futian District, Shenzhen',
      phone: '(86-755) 8888-1111',
      fax: '(86-755) 8888-2222',
      email: 'shenzhen@watsonband.com',
      hours: '周一至周五 9:00 - 18:00',
      description: '深圳分所服务于粤港澳大湾区客户，专注于科技创新、跨境交易和资本市场领域。'
    }
  ];

  function handleSubmit(e: Event) {
    e.preventDefault();
    console.log('Form submitted:', formData);
  }

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:head>
  <title>联系我们 - 华诚律师事务所</title>
  <meta name="description" content="联系华诚律师事务所，获取专业法律服务" />
</svelte:head>

<!-- Hero Banner -->
<section class="hero-banner">
  <div class="hero-banner__bg" style="transform: translateY({scrollY * 0.3}px);"></div>
  <div class="hero-banner__content">
    <span class="hero-banner__label">CONTACT US</span>
    <h1 class="hero-banner__title">联系我们</h1>
    <p class="hero-banner__subtitle">我们随时准备为您提供专业的法律服务</p>
  </div>
</section>

<!-- Main Content -->
<div class="contact-page">
  <div class="contact-container">

    <!-- Contact Form Section -->
    <section class="form-section">
      <div class="section-header">
        <h2>在线咨询</h2>
        <p>请填写以下表单，我们的专业团队将在48小时内回复您</p>
      </div>

      <form class="contact-form" onsubmit={handleSubmit}>
        <div class="form-row">
          <div class="form-group">
            <label for="name">姓名 *</label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
            />
          </div>

          <div class="form-group">
            <label for="email">邮箱 *</label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="phone">电话</label>
            <input
              type="tel"
              id="phone"
              bind:value={formData.phone}
            />
          </div>

          <div class="form-group">
            <label for="company">公司</label>
            <input
              type="text"
              id="company"
              bind:value={formData.company}
            />
          </div>
        </div>

        <div class="form-group">
          <label for="message">咨询内容 *</label>
          <textarea
            id="message"
            rows="6"
            bind:value={formData.message}
            required
          ></textarea>
        </div>

        <button type="submit" class="submit-btn">发送咨询</button>
      </form>
    </section>

    <!-- Offices Section -->
    <section class="offices-section">
      <div class="section-header">
        <h2>我们的办公室</h2>
        <p>遍布中国主要城市，为您提供便捷的法律服务</p>
      </div>

      <div class="offices-grid">
        {#each offices as office (office.id)}
          <div class="office-card">
            <div class="office-header">
              <h3>{office.name}</h3>
              <span class="office-name-en">{office.name_en}</span>
            </div>

            <p class="office-desc">{office.description}</p>

            <div class="office-info">
              <div class="info-item">
                <span class="info-label">地址</span>
                <span class="info-value">{office.address}</span>
                <span class="info-sub">{office.address_en}</span>
              </div>

              <div class="info-item">
                <span class="info-label">电话</span>
                <span class="info-value">{office.phone}</span>
              </div>

              <div class="info-item">
                <span class="info-label">传真</span>
                <span class="info-value">{office.fax}</span>
              </div>

              <div class="info-item">
                <span class="info-label">邮箱</span>
                <a href="mailto:{office.email}" class="info-link">{office.email}</a>
              </div>

              <div class="info-item">
                <span class="info-label">营业时间</span>
                <span class="info-value">{office.hours}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

  </div>
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
  }

  .hero-banner__bg {
    position: absolute;
    inset: -10%;
    background: linear-gradient(135deg, rgba(14, 27, 58, 0.92) 0%, rgba(14, 27, 58, 0.85) 100%),
                url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85');
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

  // Main Content
  .contact-page {
    background: #fafafa;
    padding: 5rem 0;
  }

  .contact-container {
    max-width: 75rem;
    margin: 0 auto;
    padding: 0 3rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 3.75rem;

    h2 {
      font-size: 2.5rem;
      font-weight: 300;
      color: #1e293b;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }

    p {
      font-size: 1rem;
      color: #64748b;
      font-weight: 300;
      line-height: 1.7;
    }
  }

  // Contact Form
  .form-section {
    background: white;
    padding: 3.75rem;
    border-radius: 0.25rem;
    margin-bottom: 5rem;
    box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05);
  }

  .contact-form {
    max-width: 50rem;
    margin: 0 auto;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #1e293b;
      letter-spacing: 0.01em;
    }

    input,
    textarea {
      padding: 0.875rem 1rem;
      border: 0.0625rem solid #e2e8f0;
      border-radius: 0.25rem;
      font-size: 0.9375rem;
      color: #1e293b;
      font-family: inherit;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: $color-primary;
      }

      &::placeholder {
        color: #cbd5e1;
      }
    }

    textarea {
      resize: vertical;
      min-height: 9.375rem;
      line-height: 1.6;
    }
  }

  .submit-btn {
    width: 100%;
    padding: 1rem 2rem;
    background: $color-primary;
    color: white;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1.5rem;

    &:hover {
      background: color.adjust($color-primary, $lightness: -5%);
      transform: translateY(-0.0625rem);
    }
  }

  // Offices Section
  .offices-section {
    margin-bottom: 3.75rem;
  }

  .offices-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .office-card {
    background: white;
    padding: 2.5rem;
    border-radius: 0.25rem;
    box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05);
  }

  .office-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 0.0625rem solid #f1f5f9;

    h3 {
      font-size: 1.5rem;
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 0.5rem;
      letter-spacing: -0.01em;
    }

    .office-name-en {
      display: block;
      font-size: 0.875rem;
      color: #94a3b8;
      font-weight: 300;
    }
  }

  .office-desc {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-weight: 300;
  }

  .office-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .info-label {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
    }

    .info-value {
      font-size: 0.9375rem;
      color: #1e293b;
      font-weight: 400;
      line-height: 1.5;
    }

    .info-sub {
      font-size: 0.8125rem;
      color: #94a3b8;
      font-weight: 300;
      line-height: 1.5;
    }

    .info-link {
      font-size: 0.9375rem;
      color: $color-primary;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: color.adjust($color-primary, $lightness: -10%);
      }
    }
  }

  // Responsive
  @media (max-width: 1024px) {
    .contact-container {
      padding: 0 2.5rem;
    }

    .offices-grid {
      grid-template-columns: 1fr;
    }

    .form-section {
      padding: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    .contact-container {
      padding: 0 1.5rem;
    }

    .contact-page {
      padding: 3.75rem 0;
    }

    .section-header {
      margin-bottom: 2.5rem;

      h2 {
        font-size: 2rem;
      }
    }

    .form-section {
      padding: 2rem 1.5rem;
      margin-bottom: 3.75rem;
    }

    .form-row {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .office-card {
      padding: 2rem;
    }
  }
</style>
