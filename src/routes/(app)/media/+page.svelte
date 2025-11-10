<script lang="ts">
    import { Tabs, Button, Modal } from '$ui/components';

  // Import data from existing pages
  const newsItems = [
    {
      id: '1',
      title_zh: '华诚律所荣获"年度最佳知识产权律所"称号',
      title_en: 'Watson & Band Awarded "IP Law Firm of the Year"',
      summary_zh: '在2024年度法律服务评选中,华诚律所凭借卓越的专业能力和客户服务,荣获"年度最佳知识产权律所"称号',
      category: '荣誉奖项',
      published_date: '2024-11-01',
      author: '华诚宣传部',
      read_time: '5分钟',
      cover_image: 'https://images.unsplash.com/photo-1524633712235-22da046738b4?w=1200&q=80',
      content_zh: '<p>详细内容...</p>'
    },
    // ... more news items
  ];

  const events = [
    {
      id: '1',
      title_zh: '企业合规管理研讨会',
      title_en: 'Corporate Compliance Seminar',
      description_zh: '深入探讨企业合规管理的最新趋势和实践',
      type: 'seminar',
      status: 'upcoming',
      date: '2024-12-15',
      location: '上海',
      cover_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80'
    },
    // ... more events
  ];

  const videos = [
    {
      id: '1',
      title_zh: '知识产权保护实务讲座',
      title_en: 'IP Protection Practice Lecture',
      description_zh: '详细讲解知识产权保护的实务操作',
      category: 'tutorial',
      duration: '45:30',
      views: '12.5K',
      published_date: '2024-10-20',
      thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80'
    },
    // ... more videos
  ];

  const publications = [
    {
      id: '1',
      title_zh: '《数据安全法》实施细则解读',
      title_en: 'Interpretation of Data Security Law Implementation Rules',
      summary_zh: '深入分析《数据安全法》实施细则的关键要点',
      category: 'article',
      author_zh: '张明华律师',
      published_date: '2024-10-28',
      read_time: '15分钟',
      cover_image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80'
    },
    // ... more publications
  ];

  let activeTab = $state('news');
  let showDetailModal = $state(false);
  let selectedDetail = $state(null);
  let detailType = $state('');

  const tabs = [
    { id: 'news', label: '新闻动态' },
    { id: 'events', label: '研讨会与活动' },
    { id: 'videos', label: '精选视频' },
    { id: 'publications', label: '专业出版物' }
  ];

  function openDetail(item: any, type: string) {
    selectedDetail = item;
    detailType = type;
    showDetailModal = true;
  }

  function handleTabChange(event: CustomEvent) {
    activeTab = event.detail.tabId;
  }
</script>


<!-- Hero Section -->
<section class="page-hero">
  <div class="hero-overlay"></div>
  <img
    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80"
    alt="Media Center"
    class="hero-bg"
  />
  <div class="container">
    <div class="hero-content">
      <h1>媒体中心</h1>
      <p>了解华诚最新动态 · 探索行业洞察 · 共享专业知识</p>
    </div>
  </div>
</section>

<!-- Tabs Section -->
<section class="media-tabs">
  <div class="container">
    <Tabs {tabs} bind:activeTab variant="underline" fullWidth={false} on:change={handleTabChange}>
      <!-- News Content -->
      {#if activeTab === 'news'}
        <div class="content-grid">
          {#each newsItems as news}
            <article class="media-card">
              <div class="media-card__image">
                <img src={news.cover_image} alt={news.title_zh} />
                <div class="media-card__category">{news.category}</div>
              </div>
              <div class="media-card__content">
                <div class="media-card__meta">
                  <span class="date">{news.published_date}</span>
                  <span class="divider">·</span>
                  <span class="read-time">{news.read_time}</span>
                </div>
                <h3>{news.title_zh}</h3>
                <p class="summary">{news.summary_zh}</p>
                <div class="media-card__footer">
                  <span class="author">{news.author}</span>
                  <Button variant="text" size="sm" onclick={() => openDetail(news, 'news')}>
                    阅读全文 →
                  </Button>
                </div>
              </div>
            </article>
          {/each}
        </div>
      {/if}

      <!-- Events Content -->
      {#if activeTab === 'events'}
        <div class="content-grid">
          {#each events as event}
            <article class="media-card">
              <div class="media-card__image">
                <img src={event.cover_image} alt={event.title_zh} />
                <div class="media-card__badge media-card__badge--{event.status}">
                  {event.status === 'upcoming' ? '即将举办' : event.status === 'ongoing' ? '进行中' : '已结束'}
                </div>
              </div>
              <div class="media-card__content">
                <div class="media-card__meta">
                  <span class="date">{event.date}</span>
                  <span class="divider">·</span>
                  <span class="location">{event.location}</span>
                </div>
                <h3>{event.title_zh}</h3>
                <p class="summary">{event.description_zh}</p>
                <Button variant="primary" size="md" onclick={() => openDetail(event, 'event')}>
                  查看详情
                </Button>
              </div>
            </article>
          {/each}
        </div>
      {/if}

      <!-- Videos Content -->
      {#if activeTab === 'videos'}
        <div class="content-grid">
          {#each videos as video}
            <article class="media-card media-card--video">
              <div class="media-card__image">
                <img src={video.thumbnail} alt={video.title_zh} />
                <div class="video-overlay">
                  <button class="play-button" onclick={() => openDetail(video, 'video')}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </button>
                  <div class="video-duration">{video.duration}</div>
                </div>
              </div>
              <div class="media-card__content">
                <div class="media-card__meta">
                  <span class="date">{video.published_date}</span>
                  <span class="divider">·</span>
                  <span class="views">{video.views} 观看</span>
                </div>
                <h3>{video.title_zh}</h3>
                <p class="summary">{video.description_zh}</p>
              </div>
            </article>
          {/each}
        </div>
      {/if}

      <!-- Publications Content -->
      {#if activeTab === 'publications'}
        <div class="content-grid">
          {#each publications as publication}
            <article class="media-card">
              <div class="media-card__image">
                <img src={publication.cover_image} alt={publication.title_zh} />
                <div class="media-card__category">{publication.category === 'article' ? '专业文章' : publication.category === 'insight' ? '行业洞察' : publication.category === 'alert' ? '法律快讯' : '案例评析'}</div>
              </div>
              <div class="media-card__content">
                <div class="media-card__meta">
                  <span class="date">{publication.published_date}</span>
                  <span class="divider">·</span>
                  <span class="read-time">{publication.read_time}</span>
                </div>
                <h3>{publication.title_zh}</h3>
                <p class="summary">{publication.summary_zh}</p>
                <div class="media-card__footer">
                  <span class="author">{publication.author_zh}</span>
                  <Button variant="text" size="sm" onclick={() => openDetail(publication, 'publication')}>
                    查看详情 →
                  </Button>
                </div>
              </div>
            </article>
          {/each}
        </div>
      {/if}
    </Tabs>
  </div>
</section>

<!-- Detail Modal -->
{#if selectedDetail && showDetailModal}
  <Modal bind:open={showDetailModal} size="xl" title={selectedDetail.title_zh || ''}>
    <div class="detail-content">
      {#if detailType === 'news'}
        <div class="detail__meta">
          <span>{selectedDetail.published_date}</span>
          <span>·</span>
          <span>{selectedDetail.author}</span>
          <span>·</span>
          <span>{selectedDetail.read_time}</span>
        </div>
        <div class="detail__body">
          {@html selectedDetail.content_zh}
        </div>
      {:else if detailType === 'event'}
        <div class="detail__meta">
          <span>{selectedDetail.date}</span>
          <span>·</span>
          <span>{selectedDetail.location}</span>
        </div>
        <div class="detail__body">
          <p>{selectedDetail.description_zh}</p>
        </div>
      {:else if detailType === 'video'}
        <div class="detail__meta">
          <span>{selectedDetail.published_date}</span>
          <span>·</span>
          <span>{selectedDetail.views} 观看</span>
          <span>·</span>
          <span>{selectedDetail.duration}</span>
        </div>
        <div class="detail__body">
          <p>{selectedDetail.description_zh}</p>
        </div>
      {:else if detailType === 'publication'}
        <div class="detail__meta">
          <span>{selectedDetail.published_date}</span>
          <span>·</span>
          <span>{selectedDetail.author_zh}</span>
          <span>·</span>
          <span>{selectedDetail.read_time}</span>
        </div>
        <div class="detail__body">
          <p>{selectedDetail.summary_zh}</p>
        </div>
      {/if}
    </div>
  </Modal>
{/if}


<style lang="scss">
  @use '$ui/styles/variables.scss' as *;

  // Hero Section
  .page-hero {
    position: relative;
    padding: 200px 0 120px;
    overflow: hidden;
    color: white;

    .hero-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba($color-primary, 0.9) 0%, rgba($color-accent, 0.85) 100%);
      z-index: 2;
    }

    .container {
      position: relative;
      z-index: 3;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    h1 {
      font-size: 72px;
      font-weight: 400;
      margin-bottom: 32px;
      letter-spacing: -0.02em;
    }

    p {
      font-size: 24px;
      font-weight: 300;
      opacity: 0.95;
      letter-spacing: 0.05em;
    }
  }

  // Media Tabs
  .media-tabs {
    padding: 60px 0 120px;
    background: white;
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  // Media Card
  .media-card {
    background: white;
    border: 1px solid #e5e5e5;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      border-color: $color-primary;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
      transform: translateY(-4px);
    }

    &__image {
      position: relative;
      width: 100%;
      height: 240px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    &__category, &__badge {
      position: absolute;
      top: 16px;
      left: 16px;
      background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
    }

    &__badge {
      &--upcoming {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      }

      &--ongoing {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      }

      &--completed {
        background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
      }
    }

    &__content {
      padding: 24px;
    }

    &__meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      font-size: 13px;
      color: $color-text-tertiary;

      .divider {
        opacity: 0.5;
      }
    }

    h3 {
      font-size: 18px;
      font-weight: 500;
      color: $color-text-primary;
      margin-bottom: 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .summary {
      font-size: 14px;
      line-height: 1.6;
      color: $color-text-secondary;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid #e5e5e5;

      .author {
        font-size: 13px;
        color: $color-text-tertiary;
      }
    }

    // Video specific styles
    &--video {
      .video-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.3s ease;

        &:hover {
          opacity: 1;
        }
      }

      .play-button {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.95);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.1);
          background: white;
        }

        svg {
          margin-left: 4px;
        }
      }

      .video-duration {
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
      }
    }
  }

  // Detail Modal Content
  .detail-content {
    .detail__meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
      font-size: 14px;
      color: $color-text-tertiary;
      padding-bottom: 16px;
      border-bottom: 1px solid #e5e5e5;
    }

    .detail__body {
      font-size: 16px;
      line-height: 1.8;
      color: $color-text-secondary;

      :global(h3) {
        font-size: 20px;
        font-weight: 600;
        color: $color-text-primary;
        margin: 32px 0 16px;

        &::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 20px;
          background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
          margin-right: 12px;
          vertical-align: middle;
          border-radius: 2px;
        }
      }

      :global(p) {
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 48px;

    @media (max-width: 768px) {
      padding: 0 24px;
    }
  }

  // Responsive
  @media (max-width: 768px) {
    .page-hero {
      padding: 140px 0 80px;

      h1 {
        font-size: 40px;
      }

      p {
        font-size: 18px;
      }
    }

    .media-tabs {
      padding: 40px 0 80px;
    }
  }
</style>
