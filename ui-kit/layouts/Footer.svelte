<script lang="ts">
  /**
   * Footer 组件 - 国际律所页脚
   * 包含联系信息、快速链接、版权信息
   */

  import { _ } from 'svelte-i18n';

  export let logo: string = '';
  export let className: string = '';

  const currentYear = new Date().getFullYear();
</script>

<footer class="footer {className}">
  <div class="footer__main">
    <div class="footer__container container">
      <!-- Brand Section -->
      <div class="footer__brand">
        {#if logo}
          <img src={logo} alt="Watson & Band" class="footer__logo" />
        {:else}
          <h3 class="footer__logo-text">Watson & Band</h3>
        {/if}
        <p class="footer__tagline">
          {$_('home.hero_subtitle')}
        </p>
      </div>

      <!-- Quick Links -->
      <div class="footer__links">
        <div class="footer__column">
          <h4 class="footer__title">{$_('nav.about')}</h4>
          <ul class="footer__list">
            <li><a href="/about" class="footer__link">关于华诚</a></li>
            <li><a href="/about#history" class="footer__link">发展历程</a></li>
            <li><a href="/about#awards" class="footer__link">荣誉奖项</a></li>
            <li><a href="/careers" class="footer__link">招贤纳士</a></li>
          </ul>
        </div>

        <div class="footer__column">
          <h4 class="footer__title">{$_('nav.practices')}</h4>
          <ul class="footer__list">
            <li><a href="/practices" class="footer__link">业务领域</a></li>
            <li><a href="/team" class="footer__link">律师团队</a></li>
            <li><a href="/publications" class="footer__link">出版物</a></li>
            <li><a href="/events" class="footer__link">讲座活动</a></li>
          </ul>
        </div>

        <div class="footer__column">
          <h4 class="footer__title">{$_('contact.title')}</h4>
          <ul class="footer__list">
            <li class="footer__info">{$_('footer.address')}</li>
            <li class="footer__info">电话: {$_('footer.phone')}</li>
            <li class="footer__info">邮箱: {$_('footer.email')}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Copyright Bar -->
  <div class="footer__bottom">
    <div class="footer__container container">
      <p class="footer__copyright">
        © {currentYear} Watson & Band 版权所有
      </p>
      <p class="footer__icp">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="footer__link">
          {$_('footer.icp')}
        </a>
      </p>
    </div>
  </div>
</footer>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .footer {
    background: $color-primary;
    color: $color-white;

    &__main {
      padding: $spacing-3xl 0 $spacing-2xl;

      @include respond-to(mobile) {
        padding: $spacing-2xl 0;
      }
    }

    &__container {
      display: grid;
      grid-template-columns: 1fr;
      gap: $spacing-xl;

      @include respond-from(tablet) {
        grid-template-columns: 1fr 2fr;
        gap: $spacing-2xl;
      }

      @include respond-from(desktop) {
        grid-template-columns: 1fr 3fr;
      }
    }

    // Brand Section
    &__brand {
      max-width: 360px;
    }

    &__logo {
      height: 56px;
      width: auto;
      margin-bottom: $spacing-md;
    }

    &__logo-text {
      @include heading(h3);
      color: $color-white;
      font-weight: 700;
      margin-bottom: $spacing-md;
      letter-spacing: -0.02em;
    }

    &__tagline {
      @include body-text;
      color: rgba($color-white, 0.8);
      line-height: $line-height-relaxed;
    }

    // Links Section
    &__links {
      display: grid;
      grid-template-columns: 1fr;
      gap: $spacing-xl;

      @include respond-from(mobile) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include respond-from(tablet) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    &__column {
      // Grid item
    }

    &__title {
      @include heading(h5);
      color: $color-secondary;
      font-weight: 600;
      margin-bottom: $spacing-md;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    &__list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;
    }

    &__link {
      color: rgba($color-white, 0.9);
      text-decoration: none;
      transition: color $transition-base $transition-ease;
      font-size: $font-size-sm;

      &:hover {
        color: $color-secondary;
      }
    }

    &__info {
      color: rgba($color-white, 0.8);
      font-size: $font-size-sm;
      line-height: $line-height-relaxed;
    }

    // Bottom Section
    &__bottom {
      border-top: 1px solid rgba($color-white, 0.1);
      padding: $spacing-lg 0;

      .footer__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: $spacing-md;

        @include respond-to(mobile) {
          flex-direction: column;
          text-align: center;
        }
      }
    }

    &__copyright,
    &__icp {
      font-size: $font-size-sm;
      color: rgba($color-white, 0.7);
      margin: 0;
    }

    &__icp a {
      color: inherit;

      &:hover {
        color: $color-secondary;
      }
    }
  }
</style>
