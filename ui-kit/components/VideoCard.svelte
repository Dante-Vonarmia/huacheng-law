<script lang="ts">
/**
 * Video Card Component
 * 基于 Pages.Revox.io 设计语言的视频卡片
 * 特点：扁平化、16:9比例、播放按钮悬停效果
 */

import type { Video } from '$mocks/data';

// Props
let {
	video,
	onclick
}: {
	video: Video;
	onclick?: () => void;
} = $props();

let isHovered = $state(false);
</script>

<article 
	class="video-card"
	onmouseenter={() => isHovered = true}
	onmouseleave={() => isHovered = false}
	role="button"
	tabindex="0"
	{onclick}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			onclick?.();
		}
	}}
>
	<!-- Thumbnail -->
	<div class="video-card__thumbnail">
		<img 
			src={video.thumbnail} 
			alt={video.title_zh}
			loading="lazy"
		/>
		
		<!-- Overlay & Play Button -->
		<div class="video-card__overlay" class:hovered={isHovered}>
			<button class="play-button" aria-label="Play video">
				<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
					<circle cx="24" cy="24" r="24" fill="rgba(255, 255, 255, 0.95)" />
					<path d="M19 15L33 24L19 33V15Z" fill="currentColor" />
				</svg>
			</button>
		</div>

		<!-- Duration Badge -->
		<div class="video-card__duration">
			{video.duration}
		</div>
	</div>

	<!-- Content -->
	<div class="video-card__content">
		<!-- Category -->
		{#if video.category_zh}
			<span class="video-card__category">{video.category_zh}</span>
		{/if}

		<!-- Title -->
		<h3 class="video-card__title">{video.title_zh}</h3>

		<!-- Description -->
		{#if video.description_zh}
			<p class="video-card__description">{video.description_zh}</p>
		{/if}

		<!-- Date -->
		<time class="video-card__date" datetime={video.publish_date}>
			{new Date(video.publish_date).toLocaleDateString('zh-CN', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</time>
	</div>
</article>

<style lang="scss">
	@use '$ui/styles/variables.scss' as *;
	@use '$ui/styles/mixins.scss' as *;

	.video-card {
		@include button-reset;
		display: block;
		background: $color-white;
		border: 1px solid $border-color;
		border-radius: $radius-base;
		overflow: hidden;
		cursor: pointer;
		transition: $transition-all;
		text-align: left;
		width: 100%;

		&:hover {
			border-color: $color-secondary;
			transform: translateY(-4px);
			box-shadow: 0 8px 24px rgba($color-primary, 0.12);
		}

		&:focus-visible {
			outline: 2px solid $color-secondary;
			outline-offset: 2px;
		}
	}

	// Thumbnail
	.video-card__thumbnail {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: $color-master-lightest;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.4s $transition-ease;
		}
	}

	.video-card:hover .video-card__thumbnail img {
		transform: scale(1.05);
	}

	// Overlay
	.video-card__overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		@include flex-center;
		background: rgba($color-primary, 0.3);
		opacity: 0;
		transition: opacity $transition-base $transition-ease;

		&.hovered {
			opacity: 1;
		}
	}

	// Play Button
	.play-button {
		@include button-reset;
		color: $color-secondary;
		transform: scale(0.9);
		transition: transform $transition-base $transition-ease;

		svg {
			filter: drop-shadow(0 4px 12px rgba($color-primary, 0.2));
		}
	}

	.video-card__overlay.hovered .play-button {
		transform: scale(1);
	}

	// Duration Badge
	.video-card__duration {
		position: absolute;
		bottom: $spacing-sm;
		right: $spacing-sm;
		background: rgba($color-primary, 0.9);
		color: $color-white;
		padding: 4px 8px;
		border-radius: $radius-sm;
		font-size: $font-size-xs;
		font-weight: $font-weight-medium;
		font-family: $font-family-en;
	}

	// Content
	.video-card__content {
		padding: $spacing-md;
	}

	.video-card__category {
		@include small-text;
		display: inline-block;
		color: $color-secondary;
		font-weight: $font-weight-medium;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: $spacing-xs;
	}

	.video-card__title {
		@include heading(h5);
		font-size: $font-size-h5;
		line-height: $line-height-h5;
		color: $color-master-dark;
		margin-bottom: $spacing-xs;
		@include text-ellipsis(2);
	}

	.video-card__description {
		@include body-text;
		font-size: $font-size-small;
		color: $color-master;
		line-height: $line-height-relaxed;
		margin-bottom: $spacing-sm;
		@include text-ellipsis(2);
	}

	.video-card__date {
		@include small-text;
		color: mix($color-master, #fff, 50%);
		display: block;
	}

	// Responsive
	@include respond-to(mobile) {
		.video-card__content {
			padding: $spacing-sm;
		}

		.video-card__title {
			font-size: $font-size-p;
		}
	}
</style>
