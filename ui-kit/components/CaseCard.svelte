<script lang="ts">
/**
 * Case Card Component
 * 基于 Pages.Revox.io 设计语言的案例卡片
 * 特点：扁平化、左侧色块、结果标签
 */

import type { Case } from '$mocks/data';

// Props
let {
	caseItem,
	onclick
}: {
	caseItem: Case;
	onclick?: () => void;
} = $props();

let isHovered = $state(false);
</script>

<article 
	class="case-card"
	class:featured={caseItem.featured}
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
	<!-- Color Accent Bar -->
	<div class="case-card__accent"></div>

	<!-- Content -->
	<div class="case-card__content">
		<!-- Practice Area Badge -->
		<div class="case-card__badge">
			{#if caseItem.practice_area === 'intellectual-property'}
				知识产权
			{:else if caseItem.practice_area === 'corporate-commercial'}
				公司法务
			{:else}
				专业领域
			{/if}
		</div>

		<!-- Title -->
		<h3 class="case-card__title">{caseItem.title_zh}</h3>

		<!-- Summary -->
		<p class="case-card__summary">{caseItem.summary_zh}</p>

		<!-- Meta Info -->
		<div class="case-card__meta">
			<!-- Result -->
			<div class="case-card__result">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-width="2" />
					<polyline points="22 4 12 14.01 9 11.01" stroke-width="2" />
				</svg>
				<span>{caseItem.result_zh}</span>
			</div>

			<!-- Date -->
			<time class="case-card__date" datetime={caseItem.date}>
				{caseItem.date}
			</time>
		</div>

		<!-- Read More Arrow -->
		<div class="case-card__arrow" class:hovered={isHovered}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" />
			</svg>
		</div>
	</div>
</article>

<style lang="scss">
	@use '$ui/styles/variables.scss' as *;
	@use '$ui/styles/mixins.scss' as *;

	.case-card {
		@include button-reset;
		display: flex;
		background: $color-white;
		border: 1px solid $border-color;
		border-radius: $radius-base;
		overflow: hidden;
		cursor: pointer;
		transition: $transition-all;
		text-align: left;
		width: 100%;
		position: relative;

		&:hover {
			border-color: $color-secondary;
			transform: translateY(-4px);
			box-shadow: 0 12px 28px rgba($color-primary, 0.15);
		}

		&:focus-visible {
			outline: 2px solid $color-secondary;
			outline-offset: 2px;
		}

		// Featured case - larger
		&.featured {
			grid-column: span 2;

			@include respond-to(md) {
				grid-column: span 1;
			}

			.case-card__title {
				font-size: $font-size-h4;
			}
		}
	}

	// Color Accent Bar
	.case-card__accent {
		width: 4px;
		background: linear-gradient(
			180deg,
			$color-secondary 0%,
			mix($color-secondary, $color-primary, 50%) 100%
		);
		flex-shrink: 0;
		transition: width $transition-base;
	}

	.case-card:hover .case-card__accent {
		width: 6px;
	}

	// Content
	.case-card__content {
		padding: $spacing-md;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
	}

	// Badge
	.case-card__badge {
		@include small-text;
		display: inline-block;
		align-self: flex-start;
		background: rgba($color-secondary, 0.1);
		color: $color-secondary;
		padding: 4px 12px;
		border-radius: $radius-sm;
		font-weight: $font-weight-medium;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	// Title
	.case-card__title {
		@include heading(h5);
		font-size: $font-size-h5;
		line-height: $line-height-h5;
		color: $color-master-dark;
		margin: 0;
		@include text-ellipsis(2);
	}

	// Summary
	.case-card__summary {
		@include body-text;
		font-size: $font-size-base;
		color: $color-master;
		line-height: $line-height-relaxed;
		margin: 0;
		flex: 1;
		@include text-ellipsis(3);
	}

	// Meta
	.case-card__meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: $spacing-md;
		padding-top: $spacing-sm;
		border-top: 1px solid $border-color-light;
		margin-top: auto;
	}

	.case-card__result {
		@include flex-center;
		gap: 6px;
		color: $color-success;
		font-size: $font-size-small;
		font-weight: $font-weight-medium;

		svg {
			flex-shrink: 0;
		}

		span {
			@include text-ellipsis(1);
		}
	}

	.case-card__date {
		@include small-text;
		color: mix($color-master, #fff, 50%);
		white-space: nowrap;
	}

	// Arrow
	.case-card__arrow {
		position: absolute;
		top: $spacing-md;
		right: $spacing-md;
		color: $color-secondary;
		opacity: 0;
		transform: translateX(-10px);
		transition: all $transition-base;

		&.hovered {
			opacity: 1;
			transform: translateX(0);
		}
	}

	// Responsive
	@include respond-to(mobile) {
		.case-card__content {
			padding: $spacing-sm;
		}

		.case-card__title {
			font-size: $font-size-p;
		}

		.case-card__summary {
			font-size: $font-size-small;
		}
	}
</style>
