<script lang="ts">
  /**
   * Section 组件 - 通用内容分区
   * 用于组织页面内容，支持多种背景和间距
   */

  export let variant: 'white' | 'light' | 'primary' | 'secondary' = 'white';
  export let padding: 'sm' | 'md' | 'lg' | 'xl' | 'none' = 'lg';
  export let narrow: boolean = false;
  export let centered: boolean = false;
  export let className: string = '';

  $: classes = [
    'section',
    `section--${variant}`,
    `section--padding-${padding}`,
    narrow && 'section--narrow',
    centered && 'section--centered',
    className
  ].filter(Boolean).join(' ');
</script>

<section class={classes}>
  <div class="section__container {narrow ? 'container-narrow' : 'container'}">
    {#if $$slots.header}
      <div class="section__header">
        <slot name="header" />
      </div>
    {/if}

    <div class="section__content">
      <slot />
    </div>

    {#if $$slots.footer}
      <div class="section__footer">
        <slot name="footer" />
      </div>
    {/if}
  </div>
</section>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .section {
    position: relative;

    // 背景变体
    &--white {
      background: $color-white;
      color: $color-text;
    }

    &--light {
      background: $color-background;
      color: $color-text;
    }

    &--primary {
      background: $color-primary;
      color: $color-white;
    }

    &--secondary {
      background: linear-gradient(135deg, rgba($color-primary, 0.05) 0%, rgba($color-secondary, 0.05) 100%);
      color: $color-text;
    }

    // 间距变体
    &--padding-none {
      padding: 0;
    }

    &--padding-sm {
      padding: $spacing-xl 0;

      @include respond-to(mobile) {
        padding: $spacing-lg 0;
      }
    }

    &--padding-md {
      padding: $spacing-2xl 0;

      @include respond-to(mobile) {
        padding: $spacing-xl 0;
      }
    }

    &--padding-lg {
      padding: $spacing-3xl 0;

      @include respond-to(mobile) {
        padding: $spacing-2xl 0;
      }
    }

    &--padding-xl {
      padding: 120px 0;

      @include respond-to(mobile) {
        padding: $spacing-3xl 0;
      }
    }

    // 居中布局
    &--centered {
      text-align: center;
    }

    // Header
    &__header {
      margin-bottom: $spacing-2xl;

      @include respond-to(mobile) {
        margin-bottom: $spacing-xl;
      }

      .section--centered & {
        text-align: center;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
    }

    // Content
    &__content {
      // Main content area
    }

    // Footer
    &__footer {
      margin-top: $spacing-2xl;

      @include respond-to(mobile) {
        margin-top: $spacing-xl;
      }

      .section--centered & {
        text-align: center;
      }
    }
  }
</style>
