<script lang="ts">
  import type { PageData } from './$types';
  import { Section } from '$ui/components';
    
  let { data }: { data: PageData } = $props();

  const formattedDate = $derived(new Date(data.event.event_date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }));

  const statusLabel = $derived(data.event.status === 'upcoming' ? '即将举行' :
                                data.event.status === 'ongoing' ? '进行中' : '已结束');
</script>

<svelte:head>
  <title>{data.event.title_zh} - 华诚律师事务所</title>
  <meta name="description" content={data.event.summary_zh} />
</svelte:head>

<div class="event-detail">
  <section class="breadcrumb">
    <div class="container">
      <nav class="breadcrumb__nav">
        <a href="/">首页</a>
        <span>/</span>
        <a href="/events">活动中心</a>
        <span>/</span>
        <span>{data.event.title_zh}</span>
      </nav>
    </div>
  </section>

  <Section variant="compact">
    <article class="event">
      <header class="event__header">
        <div class="event__category">{data.event.category}</div>
        <h1 class="event__title">{data.event.title_zh}</h1>
        <div class="event__meta">
          <div class="event__status event__status--{data.event.status}">{statusLabel}</div>
          <div class="event__date">📅 {formattedDate}</div>
          <div class="event__location">📍 {data.event.location_zh}</div>
        </div>
      </header>

      {#if data.event.cover_image}
        <div class="event__cover">
          <img src={data.event.cover_image} alt={data.event.title_zh} />
        </div>
      {/if}

      <div class="event__content">
        <div class="event__summary">
          {data.event.summary_zh}
        </div>

        {#if data.event.content_zh}
          <div class="event__body">
            {@html data.event.content_zh.replace(/\n/g, '<br>')}
          </div>
        {:else}
          <div class="event__body">
            <p>{data.event.summary_zh}</p>
            <p>活动详情敬请期待...</p>
          </div>
        {/if}

        {#if data.event.registration_required && data.event.status === 'upcoming'}
          <div class="event__registration">
            <h3>活动报名</h3>
            <p>本活动需要提前报名</p>
            {#if data.event.max_participants}
              <p>名额限制：{data.event.max_participants}人</p>
            {/if}
            <button class="btn-register">立即报名</button>
          </div>
        {/if}
      </div>
    </article>
  </Section>

  {#if data.relatedEvents.length > 0}
    <Section bgColor="lightest">
      <h2 class="related-title">即将举行的活动</h2>
      <div class="related-grid">
        {#each data.relatedEvents as event}
          <a href="/events/{event.id}" class="related-card">
            <div class="related-card__category">{event.category}</div>
            <h3 class="related-card__title">{event.title_zh}</h3>
            <div class="related-card__date">
              {new Date(event.event_date).toLocaleDateString('zh-CN')}
            </div>
          </a>
        {/each}
      </div>
    </Section>
  {/if}
</div>


<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .breadcrumb {
    padding: 20px 0;
    background: $color-white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &__nav {
      display: flex;
      gap: 8px;
      font-size: 13px;

      a {
        color: $color-text-tertiary;
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
          color: $color-primary;
        }
      }

      span:last-child {
        color: $color-text-primary;
        font-weight: 400;
      }
    }
  }

  .event {
    max-width: 800px;
    margin: 0 auto;

    &__header {
      text-align: center;
      margin-bottom: 48px;
    }

    &__category {
      display: inline-block;
      padding: 6px 16px;
      background: rgba($color-primary, 0.08);
      color: $color-primary;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    &__title {
      font-size: 42px;
      font-weight: 500;
      color: $color-text-primary;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin-bottom: 24px;
    }

    &__meta {
      display: flex;
      justify-content: center;
      gap: 24px;
      flex-wrap: wrap;
      font-size: 14px;
      color: $color-text-secondary;
    }

    &__status {
      padding: 6px 14px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 13px;
      color: $color-white;

      &--upcoming {
        background: $color-primary;
      }

      &--ongoing {
        background: $color-complete;
      }

      &--completed {
        background: $color-master;
      }
    }

    &__cover {
      margin-bottom: 40px;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    &__summary {
      font-size: 18px;
      font-weight: 400;
      line-height: 1.7;
      color: $color-text-secondary;
      padding: 24px;
      background: rgba($color-primary, 0.03);
      border-left: 3px solid $color-primary;
      border-radius: 4px;
      margin-bottom: 40px;
    }

    &__body {
      font-size: 16px;
      line-height: 1.8;
      color: $color-text-secondary;
      margin-bottom: 40px;

      :global(p) {
        margin-bottom: 16px;
      }
    }

    &__registration {
      padding: 32px;
      background: rgba($color-primary, 0.03);
      border: 1px solid rgba($color-primary, 0.1);
      border-radius: 8px;
      text-align: center;

      h3 {
        font-size: 22px;
        font-weight: 500;
        color: $color-text-primary;
        margin-bottom: 12px;
      }

      p {
        font-size: 15px;
        color: $color-text-secondary;
        margin-bottom: 8px;
      }

      .btn-register {
        margin-top: 24px;
        padding: 12px 36px;
        background: $color-primary;
        color: $color-white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: $color-primary-dark;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba($color-primary, 0.25);
        }
      }
    }
  }

  .related-title {
    font-size: 32px;
    font-weight: 400;
    text-align: center;
    color: $color-text-primary;
    margin-bottom: 40px;
    letter-spacing: -0.01em;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
  }

  .related-card {
    background: $color-white;
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    text-decoration: none;
    padding: 20px;
    transition: all 0.2s ease;

    &:hover {
      border-color: rgba($color-primary, 0.3);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      transform: translateY(-2px);
    }

    &__category {
      color: $color-primary;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 12px;
    }

    &__title {
      font-size: 16px;
      font-weight: 500;
      color: $color-text-primary;
      line-height: 1.4;
      margin-bottom: 12px;
      @include text-ellipsis(2);
    }

    &__date {
      color: $color-text-tertiary;
      font-size: 13px;
    }
  }
</style>
