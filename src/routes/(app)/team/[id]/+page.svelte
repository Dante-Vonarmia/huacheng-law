<script lang="ts">
  import type { PageData } from './$types';
  import { Section } from '$ui/components';
    
  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.lawyer.name_zh} - 华诚律师事务所</title>
  <meta name="description" content={data.lawyer.bio_zh} />
</svelte:head>

<div class="lawyer-detail">
  <Section variant="compact">
    <div class="lawyer-profile">
      <div class="lawyer-profile__sidebar">
        <div class="lawyer-photo">
          <img src={data.lawyer.photo} alt={data.lawyer.name_zh} />
        </div>
        <div class="lawyer-contact">
          <h3>联系方式</h3>
          <div class="contact-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M18 5L10 11L2 5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <a href="mailto:{data.lawyer.email}">{data.lawyer.email}</a>
          </div>
          <div class="contact-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 3h3l2 5-2 2c1.5 3 4 5.5 7 7l2-2 5 2v3a2 2 0 01-2 2C7.82 20 0 12.18 0 3a2 2 0 012-2z" fill="currentColor"/>
            </svg>
            <a href="tel:{data.lawyer.phone}">{data.lawyer.phone}</a>
          </div>
        </div>
      </div>

      <div class="lawyer-profile__main">
        <header class="lawyer-header">
          <h1 class="lawyer-header__name">{data.lawyer.name_zh}</h1>
          <div class="lawyer-header__title">{data.lawyer.title_zh}</div>
          <div class="lawyer-header__meta">
            <span>📍 {data.lawyer.office}办公室</span>
            <span>⏱ {data.lawyer.experience}</span>
          </div>
        </header>

        <section class="lawyer-section">
          <h2>执业领域</h2>
          <div class="tags">
            {#each data.lawyer.practice_areas as area}
              <span class="tag">{area}</span>
            {/each}
          </div>
        </section>

        <section class="lawyer-section">
          <h2>个人简介</h2>
          <p>{data.lawyer.bio_zh}</p>
        </section>

        <section class="lawyer-section">
          <h2>教育背景</h2>
          <ul>
            {#each data.lawyer.education as edu}
              <li>{edu}</li>
            {/each}
          </ul>
        </section>

        {#if data.lawyer.languages}
          <section class="lawyer-section">
            <h2>语言能力</h2>
            <div class="tags">
              {#each data.lawyer.languages as lang}
                <span class="tag tag--outline">{lang}</span>
              {/each}
            </div>
          </section>
        {/if}

        {#if data.lawyer.achievements}
          <section class="lawyer-section">
            <h2>专业成就</h2>
            <ul>
              {#each data.lawyer.achievements as achievement}
                <li>{achievement}</li>
              {/each}
            </ul>
          </section>
        {/if}

        {#if data.lawyer.publications}
          <section class="lawyer-section">
            <h2>出版物</h2>
            <ul>
              {#each data.lawyer.publications as pub}
                <li>{pub}</li>
              {/each}
            </ul>
          </section>
        {/if}
      </div>
    </div>
  </Section>
</div>


<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .lawyer-profile {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: $spacing-2xl;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }

    &__sidebar {
      display: flex;
      flex-direction: column;
      gap: $spacing-xl;
    }
  }

  .lawyer-photo {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .lawyer-contact {
    padding: 20px;
    background: $color-white;
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 8px;

    h3 {
      font-size: 18px;
      font-weight: 500;
      color: $color-text-primary;
      margin-bottom: 16px;
    }
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm 0;
    font-size: $font-size-sm;

    svg {
      color: $color-primary;
    }

    a {
      color: $color-text;
      text-decoration: none;

      &:hover {
        color: $color-primary;
      }
    }
  }

  .lawyer-header {
    margin-bottom: 48px;

    &__name {
      font-size: 42px;
      font-weight: 500;
      color: $color-text-primary;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }

    &__title {
      font-size: 20px;
      color: $color-primary;
      font-weight: 500;
      margin-bottom: 16px;
    }

    &__meta {
      display: flex;
      gap: 24px;
      color: $color-text-tertiary;
      font-size: 14px;
    }
  }

  .lawyer-section {
    margin-bottom: 48px;

    h2 {
      font-size: 24px;
      font-weight: 500;
      color: $color-text-primary;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    }

    p {
      font-size: 16px;
      line-height: 1.8;
      color: $color-text-secondary;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: $spacing-sm 0;
        padding-left: $spacing-lg;
        position: relative;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: $color-primary;
          font-weight: 700;
        }
      }
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    display: inline-block;
    padding: 6px 14px;
    background: $color-primary;
    color: $color-white;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;

    &--outline {
      background: transparent;
      color: $color-primary;
      border: 1px solid rgba($color-primary, 0.3);
    }
  }
</style>
