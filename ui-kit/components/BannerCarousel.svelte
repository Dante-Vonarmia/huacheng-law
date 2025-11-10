<script lang="ts">
/**
 * Banner Carousel Component
 * 基于 Pages.Revox.io 设计语言的专业轮播组件
 * 特点：扁平化设计、流畅动画、自动播放、触摸支持
 */

import type { BannerSlide } from '$mocks/data';

// Props
let {
	slides = [],
	autoplay = true,
	interval = 5000,
	showDots = true,
	showArrows = true,
	transition = 'fade',
	height = '700px'
}: {
	slides: BannerSlide[];
	autoplay?: boolean;
	interval?: number;
	showDots?: boolean;
	showArrows?: boolean;
	transition?: 'fade' | 'slide';
	height?: string;
} = $props();

// State
let currentIndex = $state(0);
let isPaused = $state(false);
let isTransitioning = $state(false);
let autoplayTimer: number | null = null;

// Computed
const totalSlides = $derived(slides.length);
const currentSlide = $derived(slides[currentIndex] || slides[0]);

// Auto-play logic
$effect(() => {
	if (!autoplay || isPaused || totalSlides <= 1) return;

	autoplayTimer = window.setTimeout(() => {
		nextSlide();
	}, interval);

	return () => {
		if (autoplayTimer) clearTimeout(autoplayTimer);
	};
});

// Navigation functions
function goToSlide(index: number) {
	if (isTransitioning || index === currentIndex) return;
	isTransitioning = true;
	currentIndex = index;
	
	setTimeout(() => {
		isTransitioning = false;
	}, 500);
}

function nextSlide() {
	const nextIndex = (currentIndex + 1) % totalSlides;
	goToSlide(nextIndex);
}

function prevSlide() {
	const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
	goToSlide(prevIndex);
}

// Pause on hover
function handleMouseEnter() {
	if (autoplay) isPaused = true;
}

function handleMouseLeave() {
	if (autoplay) isPaused = false;
}

// Keyboard navigation
function handleKeydown(event: KeyboardEvent) {
	if (event.key === 'ArrowLeft') prevSlide();
	if (event.key === 'ArrowRight') nextSlide();
}
</script>

<svelte:window onkeydown={handleKeydown} />

<section 
	class="banner-carousel" 
	style="--carousel-height: {height}"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="region"
	aria-label="Banner Carousel"
>
	<!-- Slides Container -->
	<div class="carousel-slides">
		{#each slides as slide, index (slide.id)}
			<div 
				class="carousel-slide"
				class:active={index === currentIndex}
				class:fade={transition === 'fade'}
				class:slide={transition === 'slide'}
				aria-hidden={index !== currentIndex}
			>
				<!-- Background Image -->
				<div class="slide-background">
					<img 
						src={slide.image} 
						alt={slide.title_zh}
						loading={index === 0 ? 'eager' : 'lazy'}
					/>
				</div>

				<!-- Overlay -->
				<div class="slide-overlay"></div>

				<!-- Content -->
				<div class="slide-content">
					<div class="container">
						<div class="content-wrapper">
							<h1 class="slide-title">{slide.title_zh}</h1>
							{#if slide.subtitle_zh}
								<p class="slide-subtitle">{slide.subtitle_zh}</p>
							{/if}
							{#if slide.cta}
								<div class="slide-actions">
									<a href={slide.cta.link} class="btn-cta">
										{slide.cta.text_zh}
									</a>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Navigation Arrows -->
	{#if showArrows && totalSlides > 1}
		<button 
			class="carousel-arrow carousel-arrow--prev"
			onclick={prevSlide}
			aria-label="Previous slide"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<polyline points="15 18 9 12 15 6" stroke-width="2" />
			</svg>
		</button>
		<button 
			class="carousel-arrow carousel-arrow--next"
			onclick={nextSlide}
			aria-label="Next slide"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<polyline points="9 18 15 12 9 6" stroke-width="2" />
			</svg>
		</button>
	{/if}

	<!-- Dots Navigation -->
	{#if showDots && totalSlides > 1}
		<div class="carousel-dots">
			{#each slides as slide, index}
				<button
					class="dot"
					class:active={index === currentIndex}
					onclick={() => goToSlide(index)}
					aria-label="Go to slide {index + 1}"
					aria-current={index === currentIndex}
				></button>
			{/each}
		</div>
	{/if}
</section>

<style lang="scss">
	@use '$ui/styles/variables.scss' as *;
	@use '$ui/styles/mixins.scss' as *;

	.banner-carousel {
		position: relative;
		width: 100%;
		height: var(--carousel-height);
		overflow: hidden;
		background: $color-primary;
	}

	// ========== Slides ==========
	.carousel-slides {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.carousel-slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.6s $transition-ease, visibility 0.6s;

		&.active {
			opacity: 1;
			visibility: visible;
			z-index: 1;
		}

		// Fade transition
		&.fade {
			transform: scale(1);
			
			&.active {
				animation: fadeInScale 0.8s $transition-ease;
			}
		}

		// Slide transition
		&.slide {
			transform: translateX(100%);
			
			&.active {
				transform: translateX(0);
				transition: transform 0.6s $transition-ease, opacity 0.6s;
			}
		}
	}

	.slide-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}
	}

	.slide-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			135deg,
			rgba($color-primary, 0.85) 0%,
			rgba($color-primary, 0.6) 100%
		);
		z-index: 1;
	}

	.slide-content {
		position: relative;
		z-index: 2;
		height: 100%;
		@include flex-center;
		color: $color-white;

		.container {
			width: 100%;
		}
	}

	.content-wrapper {
		max-width: 900px;
		text-align: center;
		animation: slideUpFade 0.8s $transition-ease;
		animation-delay: 0.3s;
		animation-fill-mode: both;
	}

	// ========== Slide Content ==========
	.slide-title {
		@include heading(h1);
		font-size: clamp(36px, 6vw, 64px);
		font-weight: $font-weight-light;
		color: $color-white;
		margin-bottom: $spacing-md;
		letter-spacing: -0.02em;
		line-height: 1.2;

		@include respond-to(mobile) {
			font-size: 32px;
		}
	}

	.slide-subtitle {
		@include body-text;
		font-size: clamp(16px, 2vw, 22px);
		font-weight: $font-weight-normal;
		color: rgba($color-white, 0.9);
		margin-bottom: $spacing-xl;
		line-height: $line-height-relaxed;
	}

	.slide-actions {
		@include flex-center;
		gap: $spacing-md;

		@include respond-to(mobile) {
			flex-direction: column;
			width: 100%;
		}
	}

	// ========== CTA Button ==========
	.btn-cta {
		@include btn-base;
		background: $color-secondary;
		border-color: $color-secondary;
		color: $color-white;
		padding: $spacing-sm $spacing-lg;
		font-size: $font-size-p;
		font-weight: $font-weight-medium;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		min-width: 180px;
		transition: all $transition-base;
		display: inline-block;

		&:hover {
			background: mix($color-secondary, #fff, 90%);
			border-color: mix($color-secondary, #fff, 90%);
			transform: translateY(-2px);
			box-shadow: 0 8px 20px rgba($color-secondary, 0.3);
		}

		@include respond-to(mobile) {
			width: 100%;
		}
	}

	// ========== Navigation Arrows ==========
	.carousel-arrow {
		@include button-reset;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		width: 48px;
		height: 48px;
		@include flex-center;
		background: rgba($color-white, 0.15);
		backdrop-filter: blur(10px);
		border: 1px solid rgba($color-white, 0.2);
		border-radius: $radius-base;
		color: $color-white;
		cursor: pointer;
		transition: $transition-fast;

		&:hover {
			background: rgba($color-secondary, 0.9);
			border-color: $color-secondary;
			transform: translateY(-50%) scale(1.1);
		}

		&--prev {
			left: $spacing-md;

			@include respond-to(mobile) {
				left: $spacing-sm;
			}
		}

		&--next {
			right: $spacing-md;

			@include respond-to(mobile) {
				right: $spacing-sm;
			}
		}

		svg {
			width: 24px;
			height: 24px;
		}

		@include respond-to(mobile) {
			width: 40px;
			height: 40px;

			svg {
				width: 20px;
				height: 20px;
			}
		}
	}

	// ========== Dots Navigation ==========
	.carousel-dots {
		position: absolute;
		bottom: $spacing-lg;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		@include flex-center;
		gap: $spacing-sm;

		@include respond-to(mobile) {
			bottom: $spacing-md;
		}
	}

	.dot {
		@include button-reset;
		width: 12px;
		height: 12px;
		border-radius: $radius-full;
		background: rgba($color-white, 0.4);
		border: 2px solid transparent;
		cursor: pointer;
		transition: $transition-fast;

		&:hover {
			background: rgba($color-white, 0.6);
			transform: scale(1.2);
		}

		&.active {
			background: $color-secondary;
			border-color: rgba($color-white, 0.3);
			width: 32px;
			border-radius: 6px;
		}
	}

	// ========== Animations ==========
	@keyframes fadeInScale {
		from {
			opacity: 0;
			transform: scale(1.05);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes slideUpFade {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	// ========== Responsive ==========
	@include respond-to(mobile) {
		.banner-carousel {
			height: 600px;
		}

		.slide-content {
			padding: 0 $spacing-md;
		}
	}
</style>
