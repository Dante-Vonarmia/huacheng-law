<script lang="ts">
  import { Section } from '$ui/components';
    
  const videos = [
    {
      id: '1',
      title: '新公司法解读系列：股东出资制度的重大变化',
      thumbnail: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800',
      duration: '25:30',
      views: '12.5k',
      date: '2024-10-15',
      category: '法律解读'
    },
    {
      id: '2',
      title: '企业合规管理实务分享',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      duration: '18:45',
      views: '8.3k',
      date: '2024-09-28',
      category: '实务分享'
    },
    {
      id: '3',
      title: '知识产权保护策略与案例分析',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
      duration: '32:15',
      views: '15.2k',
      date: '2024-09-10',
      category: '案例分析'
    }
  ];
</script>

<svelte:head>
  <title>视频中心 - 华诚律师事务所</title>
  <meta name="description" content="华诚律师事务所专业视频、法律讲座和案例分析" />
</svelte:head>

<div class="videos-page">
  <section class="hero">
    <div class="container">
      <h1 class="hero__title">视频中心</h1>
      <p class="hero__subtitle">观看专业讲座，学习法律知识</p>
    </div>
  </section>

  <Section>
    <div class="videos-grid">
      {#each videos as video}
        <div class="video-card">
          <div class="video-card__thumbnail">
            <img src={video.thumbnail} alt={video.title} />
            <div class="video-card__duration">{video.duration}</div>
            <div class="video-card__play">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.9)"/>
                <path d="M18 14L34 24L18 34V14Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div class="video-card__content">
            <div class="video-card__category">{video.category}</div>
            <h3 class="video-card__title">{video.title}</h3>
            <div class="video-card__meta">
              <span>👁 {video.views}</span>
              <span>·</span>
              <span>{new Date(video.date).toLocaleDateString('zh-CN')}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </Section>
</div>


<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .hero {
    padding: 120px 0 80px;
    background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
    color: $color-white;

    @include respond-to(mobile) {
      padding: 80px 0 60px;
    }

    &__title {
      @include heading(xl);
      font-weight: 700;
      text-align: center;
      margin-bottom: $spacing-md;
    }

    &__subtitle {
      @include heading(md);
      font-weight: 400;
      text-align: center;
      opacity: 0.9;
    }
  }

  .videos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: $spacing-xl;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }

  .video-card {
    @include card;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0;
    cursor: pointer;

    &:hover {
      .video-card__play {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
      }

      .video-card__thumbnail img {
        transform: scale(1.05);
      }
    }

    &__thumbnail {
      position: relative;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: $color-master-light;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform $transition-slow;
      }
    }

    &__duration {
      position: absolute;
      bottom: $spacing-sm;
      right: $spacing-sm;
      padding: 4px $spacing-sm;
      background: rgba(0, 0, 0, 0.8);
      color: $color-white;
      font-size: $font-size-xs;
      border-radius: $radius-sm;
      font-weight: 600;
    }

    &__play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $color-primary;
      opacity: 0.8;
      transition: all $transition-base;
    }

    &__content {
      padding: $spacing-lg;
    }

    &__category {
      color: $color-secondary;
      font-size: $font-size-xs;
      font-weight: 600;
      margin-bottom: $spacing-sm;
      text-transform: uppercase;
    }

    &__title {
      @include heading(md);
      font-weight: 700;
      margin-bottom: $spacing-md;
      @include text-ellipsis(2);
    }

    &__meta {
      display: flex;
      gap: $spacing-xs;
      color: $color-text-light;
      font-size: $font-size-sm;
    }
  }
</style>
