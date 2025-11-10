<script lang="ts">
  /**
   * Testimonial 组件 - 客户评价
   * 支持单个展示和轮播模式
   */

  import { onMount } from 'svelte';

  export let testimonials: Array<{
    quote: string;
    author: string;
    title: string;
    company: string;
    avatar?: string;
    rating?: number;
  }>;
  export let variant: 'single' | 'carousel' | 'grid' = 'carousel';
  export let autoplay: boolean = true;
  export let interval: number = 5000;
  export let className: string = '';

  let currentIndex = 0;
  let intervalId: number;

  $: classes = [
    'testimonial',
    `testimonial--${variant}`,
    className
  ].filter(Boolean).join(' ');

  $: currentTestimonial = testimonials[currentIndex];

  onMount(() => {
    if (autoplay && variant === 'carousel' && testimonials.length > 1) {
      startAutoplay();
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  });

  function startAutoplay() {
    intervalId = setInterval(() => {
      next();
    }, interval);
  }

  function next() {
    currentIndex = (currentIndex + 1) % testimonials.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  }

  function goTo(index: number) {
    currentIndex = index;
    if (intervalId) {
      clearInterval(intervalId);
      if (autoplay) startAutoplay();
    }
  }
</script>

<div class={classes}>
  {#if variant === 'carousel'}
    <div class="testimonial__carousel">
      <div class="testimonial__track">
        {#each testimonials as testimonial, index}
          <div
            class="testimonial__slide"
            class:testimonial__slide--active={index === currentIndex}
          >
            <div class="testimonial__content">
              <svg class="testimonial__quote-icon" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M12 24C12 19.5817 15.5817 16 20 16V10C12.268 10 6 16.268 6 24V36H18V24H12ZM30 24C30 19.5817 33.5817 16 38 16V10C30.268 10 24 16.268 24 24V36H36V24H30Z" fill="currentColor"/>
              </svg>

              <blockquote class="testimonial__quote">
                {testimonial.quote}
              </blockquote>

              <div class="testimonial__author">
                {#if testimonial.avatar}
                  <img src={testimonial.avatar} alt={testimonial.author} class="testimonial__avatar" />
                {/if}
                <div class="testimonial__author-info">
                  <div class="testimonial__author-name">{testimonial.author}</div>
                  <div class="testimonial__author-title">
                    {testimonial.title} · {testimonial.company}
                  </div>
                  {#if testimonial.rating}
                    <div class="testimonial__rating">
                      {#each Array(5) as _, i}
                        <svg
                          class="testimonial__star"
                          class:testimonial__star--filled={i < testimonial.rating}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path d="M8 1L10.163 5.38L15 6.08L11.5 9.48L12.326 14.28L8 12L3.674 14.28L4.5 9.48L1 6.08L5.837 5.38L8 1Z" fill="currentColor"/>
                        </svg>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>

      {#if testimonials.length > 1}
        <div class="testimonial__controls">
          <button class="testimonial__control" on:click={prev} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="testimonial__dots">
            {#each testimonials as _, index}
              <button
                class="testimonial__dot"
                class:testimonial__dot--active={index === currentIndex}
                on:click={() => goTo(index)}
                aria-label="Go to testimonial {index + 1}"
              />
            {/each}
          </div>

          <button class="testimonial__control" on:click={next} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      {/if}
    </div>
  {:else if variant === 'grid'}
    <div class="testimonial__grid">
      {#each testimonials as testimonial}
        <div class="testimonial__card">
          <blockquote class="testimonial__quote testimonial__quote--compact">
            {testimonial.quote}
          </blockquote>
          <div class="testimonial__author testimonial__author--compact">
            {#if testimonial.avatar}
              <img src={testimonial.avatar} alt={testimonial.author} class="testimonial__avatar testimonial__avatar--small" />
            {/if}
            <div class="testimonial__author-info">
              <div class="testimonial__author-name">{testimonial.author}</div>
              <div class="testimonial__author-title">{testimonial.title}</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="testimonial__single">
      <div class="testimonial__content">
        <blockquote class="testimonial__quote">
          {currentTestimonial.quote}
        </blockquote>
        <div class="testimonial__author">
          {#if currentTestimonial.avatar}
            <img src={currentTestimonial.avatar} alt={currentTestimonial.author} class="testimonial__avatar" />
          {/if}
          <div class="testimonial__author-info">
            <div class="testimonial__author-name">{currentTestimonial.author}</div>
            <div class="testimonial__author-title">
              {currentTestimonial.title} · {currentTestimonial.company}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .testimonial {
    width: 100%;

    // 轮播模式
    &__carousel {
      position: relative;
      max-width: 900px;
      margin: 0 auto;
    }

    &__track {
      position: relative;
      overflow: hidden;
      min-height: 400px;

      @include respond-to(mobile) {
        min-height: 500px;
      }
    }

    &__slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0;
      transform: translateX(100px);
      transition: all $transition-slow $transition-ease;
      pointer-events: none;

      &--active {
        opacity: 1;
        transform: translateX(0);
        pointer-events: auto;
      }
    }

    &__content {
      text-align: center;
      padding: $spacing-2xl;

      @include respond-to(mobile) {
        padding: $spacing-lg;
      }
    }

    &__quote-icon {
      color: $color-secondary;
      opacity: 0.3;
      margin-bottom: $spacing-lg;
    }

    &__quote {
      @include body-text;
      font-size: $font-size-xl;
      line-height: $line-height-relaxed;
      color: $color-text;
      margin: 0 0 $spacing-xl;
      position: relative;

      @include respond-from(tablet) {
        font-size: $font-size-2xl;
      }

      &--compact {
        font-size: $font-size-base;
        margin-bottom: $spacing-md;
      }
    }

    &__author {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-md;

      &--compact {
        justify-content: flex-start;
      }
    }

    &__avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid $color-white;
      box-shadow: $shadow-md;

      &--small {
        width: 48px;
        height: 48px;
      }
    }

    &__author-info {
      text-align: left;
    }

    &__author-name {
      @include heading(base);
      font-weight: 600;
      color: $color-primary;
      margin-bottom: 4px;
    }

    &__author-title {
      @include caption;
      color: $color-text-light;
    }

    &__rating {
      display: flex;
      gap: 4px;
      margin-top: $spacing-xs;
    }

    &__star {
      color: $color-text-light;

      &--filled {
        color: $color-secondary;
      }
    }

    // 控制按钮
    &__controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-lg;
      margin-top: $spacing-xl;
    }

    &__control {
      @include button-reset;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: $color-white;
      color: $color-primary;
      box-shadow: $shadow-base;
      transition: all $transition-base $transition-ease;

      &:hover {
        background: $color-secondary;
        color: $color-white;
        box-shadow: $shadow-md;
        transform: scale(1.1);
      }

      &:focus-visible {
        outline: 2px solid $color-secondary;
        outline-offset: 2px;
      }
    }

    &__dots {
      display: flex;
      gap: $spacing-xs;
    }

    &__dot {
      @include button-reset;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba($color-primary, 0.2);
      transition: all $transition-base $transition-ease;

      &:hover {
        background: rgba($color-secondary, 0.5);
      }

      &--active {
        background: $color-secondary;
        width: 32px;
        border-radius: 6px;
      }
    }

    // 网格模式
    &__grid {
      @include grid-responsive(3, $spacing-lg);
    }

    &__card {
      @include card;
      padding: $spacing-lg;
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
    }
  }
</style>
