<script lang="ts">
  /**
   * Footer 组件 - Pages.Revox.io 标准页脚
   *
   * 特点：
   * - 多列链接布局
   * - 社交媒体图标
   * - ICP 备案信息
   * - 响应式设计
   *
   * @example
   * <Footer
   *   companyName="华诚律师事务所"
   *   description="专业、诚信、高效的法律服务"
   *   linkGroups={[
   *     {
   *       title: '关于我们',
   *       links: [
   *         { label: '公司简介', href: '/about' },
   *         { label: '团队成员', href: '/team' }
   *       ]
   *     }
   *   ]}
   *   socialLinks={[
   *     { platform: 'wechat', href: '#' },
   *     { platform: 'linkedin', href: 'https://linkedin.com' }
   *   ]}
   *   icpNumber="京ICP备12345678号"
   * />
   */

  import type { FooterLinkGroup, SocialLink } from './Footer.types';

  export let companyName: string = '华诚律师事务所';
  export let copyrightYear: number = new Date().getFullYear();
  export let description: string = '';
  export let linkGroups: FooterLinkGroup[] = [];
  export let socialLinks: SocialLink[] = [];
  export let icpNumber: string = '';
  export let policeNumber: string = '';
  export let className: string = '';

  // 社交媒体图标映射（使用 Unicode 或文字作为占位符）
  const socialIcons: Record<string, string> = {
    wechat: '微信',
    weibo: '微博',
    linkedin: 'in',
    twitter: 'tw',
    facebook: 'fb'
  };

  $: classes = ['footer', className].filter(Boolean).join(' ');
</script>

<footer class={classes}>
  <div class="container">
    <!-- Footer 主体内容 -->
    <div class="footer__main">
      <!-- 公司信息列 -->
      <div class="footer__company">
        <h3 class="footer__company-name">{companyName}</h3>

        {#if $$slots.company}
          <slot name="company" />
        {:else if description}
          <p class="footer__description">{description}</p>
        {/if}

        <!-- 社交媒体链接 -->
        {#if socialLinks.length > 0}
          <div class="footer__social">
            {#each socialLinks as social}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                class="footer__social-link"
                aria-label={social.label || social.platform}
              >
                {social.icon || socialIcons[social.platform] || social.platform}
              </a>
            {/each}
          </div>
        {/if}
      </div>

      <!-- 链接分组列 -->
      {#each linkGroups as group}
        <div class="footer__links-group">
          <h4 class="footer__links-title">{group.title}</h4>
          <ul class="footer__links-list">
            {#each group.links as link}
              <li class="footer__links-item">
                <a
                  href={link.href}
                  target={link.target || '_self'}
                  class="footer__link"
                >
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <!-- Footer 底部 -->
    <div class="footer__bottom">
      <div class="footer__copyright">
        <p class="footer__copyright-text">
          © {copyrightYear}
          {companyName}. All Rights Reserved.
        </p>

        {#if icpNumber || policeNumber}
          <p class="footer__legal">
            {#if icpNumber}
              <a
                href="https://beian.miit.gov.cn"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__legal-link"
              >
                {icpNumber}
              </a>
            {/if}
            {#if policeNumber}
              <span class="footer__legal-separator">|</span>
              <a
                href="http://www.beian.gov.cn"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__legal-link"
              >
                {policeNumber}
              </a>
            {/if}
          </p>
        {/if}
      </div>

      {#if $$slots.bottom}
        <div class="footer__extra">
          <slot name="bottom" />
        </div>
      {/if}
    </div>
  </div>
</footer>

<style lang="scss">
  @use '$ui-kit/styles/variables.scss' as *;
  @use '$ui-kit/styles/mixins.scss' as *;

  // ========================================
  // Footer 基础样式（Pages 标准）
  // ========================================
  .footer {
    background-color: $color-master-dark; // #2c3e50 深灰背景
    color: rgba($color-white, 0.7); // 浅色文字
    padding: $spacing-section-top 0 $spacing-lg 0; // 75px 0 40px 0

    // ========================================
    // Footer 主体布局
    // ========================================
    &__main {
      display: grid;
      grid-template-columns: 2fr repeat(auto-fit, minmax(180px, 1fr));
      gap: $spacing-xl; // 60px
      padding-bottom: $spacing-xl;
      border-bottom: 1px solid rgba($color-white, 0.1);

      @include respond-to(md) {
        grid-template-columns: 1fr; // 移动端单列
        gap: $spacing-lg; // 40px
      }
    }

    // ========================================
    // 公司信息区
    // ========================================
    &__company {
      max-width: 350px;

      @include respond-to(md) {
        max-width: 100%;
      }
    }

    &__company-name {
      font-family: $font-family-heading;
      font-size: $font-size-h5; // 18px
      font-weight: $font-weight-semibold; // 600
      color: $color-white;
      margin-bottom: $spacing-md; // 20px
      letter-spacing: $letter-spacing-heading;
    }

    &__description {
      font-size: $font-size-small; // 12px
      line-height: $line-height-small; // 18px
      color: rgba($color-white, 0.6);
      margin-bottom: $spacing-md;
    }

    // ========================================
    // 社交媒体链接
    // ========================================
    &__social {
      display: flex;
      gap: $spacing-sm; // 10px
      margin-top: $spacing-md;
    }

    &__social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background-color: rgba($color-white, 0.1);
      color: $color-white;
      border-radius: $radius-base; // 3px
      text-decoration: none;
      font-size: $font-size-small;
      transition: background-color $transition-fast;

      &:hover {
        background-color: rgba($color-white, 0.2);
      }
    }

    // ========================================
    // 链接分组
    // ========================================
    &__links-group {
      // 自动适应网格布局
    }

    &__links-title {
      font-family: $font-family-heading;
      font-size: $font-size-base; // 14px
      font-weight: $font-weight-semibold; // 600
      color: $color-white;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      margin-bottom: $spacing-md; // 20px
    }

    &__links-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &__links-item {
      margin-bottom: $spacing-sm; // 10px
    }

    &__link {
      font-size: $font-size-small; // 12px
      color: rgba($color-white, 0.6);
      text-decoration: none;
      transition: color $transition-fast;

      &:hover {
        color: $color-white;
      }
    }

    // ========================================
    // Footer 底部
    // ========================================
    &__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: $spacing-lg; // 40px

      @include respond-to(md) {
        flex-direction: column;
        gap: $spacing-md;
        text-align: center;
      }
    }

    &__copyright {
      // 版权信息
    }

    &__copyright-text {
      font-size: $font-size-xs; // 11px
      color: rgba($color-white, 0.5);
      margin: 0 0 $spacing-xs 0;
    }

    &__legal {
      font-size: $font-size-xs; // 11px
      color: rgba($color-white, 0.4);
      margin: 0;
    }

    &__legal-link {
      color: rgba($color-white, 0.4);
      text-decoration: none;
      transition: color $transition-fast;

      &:hover {
        color: rgba($color-white, 0.6);
      }
    }

    &__legal-separator {
      margin: 0 $spacing-xs;
    }

    &__extra {
      // 额外内容插槽
    }
  }
</style>
