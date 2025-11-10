<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Props接口定义
  export let video: Video;
  export let variant: 'default' | 'compact' = 'default';

  // 类型定义
  interface Video {
    id: string;
    title_zh: string;
    title_en: string;
    thumbnail: string;
    duration: string;           // "5:32"
    video_url: string;
    description_zh?: string;
    description_en?: string;
    views?: number;
    published_date?: string;
    category?: string;
  }

  // 事件派发
  const dispatch = createEventDispatcher<{
    play: { videoId: string; videoUrl: string };
  }>();

  // 处理播放
  function handlePlay() {
    dispatch('play', {
      videoId: video.id,
      videoUrl: video.video_url
    });
  }

  // 格式化观看次数
  function formatViews(views: number | undefined): string {
    if (!views) return '0';
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  }

  // 格式化日期
  function formatDate(date: string | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }
</script>

<div class="video-card video-card--{variant}" on:click={handlePlay} on:keypress={handlePlay} role="button" tabindex="0">
  <div class="video-card__thumbnail-container">
    <img
      src={video.thumbnail}
      alt={video.title_zh}
      class="video-card__thumbnail"
      loading="lazy"
    />
    <div class="video-card__overlay"></div>

    <!-- 播放按钮 -->
    <div class="video-card__play" aria-label="播放视频"></div>

    <!-- 时长标签 -->
    <div class="video-card__duration">{video.duration}</div>
  </div>

  <div class="video-card__info">
    <h3 class="video-card__title">{video.title_zh}</h3>

    {#if variant === 'default'}
      <div class="video-card__meta">
        {#if video.published_date}
          <span class="video-card__date">{formatDate(video.published_date)}</span>
        {/if}
        {#if video.views !== undefined}
          <span class="video-card__views">{formatViews(video.views)} 观看</span>
        {/if}
        {#if video.category}
          <span class="video-card__category">{video.category}</span>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .video-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: white;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

      .video-card__play {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }

    &:focus {
      outline: 2px solid $color-primary;
      outline-offset: 2px;
    }

    &__thumbnail-container {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      overflow: hidden;
    }

    &__thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    &__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.7) 100%
      );
      z-index: 1;
    }

    &__play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 64px;
      height: 64px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      transition: all 0.3s ease;

      // 三角形播放图标
      &::after {
        content: '';
        width: 0;
        height: 0;
        border-left: 20px solid $color-primary;
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        margin-left: 4px;
      }

      @include respond-to('mobile') {
        width: 56px;
        height: 56px;

        &::after {
          border-left-width: 16px;
          border-top-width: 10px;
          border-bottom-width: 10px;
        }
      }
    }

    &__duration {
      position: absolute;
      bottom: 16px;
      right: 16px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      z-index: 2;

      @include respond-to('mobile') {
        bottom: 12px;
        right: 12px;
        font-size: 12px;
        padding: 3px 6px;
      }
    }

    &__info {
      padding: 16px;
      background: white;

      @include respond-to('mobile') {
        padding: 12px;
      }
    }

    &__title {
      font-size: 18px;
      font-weight: 600;
      color: $color-text-primary;
      margin: 0 0 8px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      @include respond-to('mobile') {
        font-size: 16px;
        margin-bottom: 6px;
      }
    }

    &__meta {
      display: flex;
      gap: 12px;
      font-size: 14px;
      color: $color-text-secondary;
      flex-wrap: wrap;

      @include respond-to('mobile') {
        font-size: 13px;
        gap: 8px;
      }

      span {
        display: flex;
        align-items: center;
      }
    }

    &__date,
    &__views,
    &__category {
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        background: $color-text-tertiary;
        border-radius: 50%;
        margin-right: 8px;
      }

      &:first-child::before {
        display: none;
      }
    }

    // Compact variant
    &--compact {
      .video-card__info {
        padding: 12px;
      }

      .video-card__title {
        font-size: 16px;
        margin-bottom: 0;
        -webkit-line-clamp: 1;
      }
    }
  }
</style>
