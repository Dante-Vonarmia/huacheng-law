<script lang="ts">
/**
 * Publication Card Component
 * 基于 Pages.Revox.io 设计语言的出版物卡片
 */

import type { Publication } from '$mocks/data';

let {
	publication,
	onclick
}: {
	publication: Publication;
	onclick?: () => void;
} = $props();
</script>

<article 
	class="publication-card"
	role="button"
	tabindex="0"
	{onclick}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			onclick?.();
		}
	}}
>
	<div class="publication-card__header">
		<span class="publication-card__category">{publication.category_zh}</span>
		<span class="publication-card__read-time">{publication.read_time} min</span>
	</div>

	<h3 class="publication-card__title">{publication.title_zh}</h3>
	<p class="publication-card__summary">{publication.summary_zh}</p>

	<div class="publication-card__footer">
		<span class="publication-card__author">{publication.author_zh}</span>
		<time datetime={publication.publish_date}>
			{new Date(publication.publish_date).toLocaleDateString('zh-CN', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})}
		</time>
	</div>
</article>

<style lang="scss">
	@use '$ui/styles/variables.scss' as *;
	@use '$ui/styles/mixins.scss' as *;

	.publication-card {
		@include button-reset;
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
		padding: $spacing-md;
		background: $color-white;
		border: 1px solid $border-color;
		border-radius: $radius-base;
		cursor: pointer;
		transition: $transition-all;
		text-align: left;

		&:hover {
			border-color: $color-secondary;
			transform: translateY(-2px);
			box-shadow: 0 8px 20px rgba($color-primary, 0.1);
		}
	}

	.publication-card__header {
		@include flex-between;
		gap: $spacing-sm;
	}

	.publication-card__category {
		@include small-text;
		color: $color-secondary;
		font-weight: $font-weight-medium;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.publication-card__read-time {
		@include small-text;
		color: mix($color-master, #fff, 50%);
	}

	.publication-card__title {
		@include heading(h6);
		color: $color-master-dark;
		margin: 0;
		@include text-ellipsis(2);
	}

	.publication-card__summary {
		@include body-text;
		font-size: $font-size-small;
		color: $color-master;
		line-height: $line-height-relaxed;
		margin: 0;
		flex: 1;
		@include text-ellipsis(3);
	}

	.publication-card__footer {
		@include flex-between;
		gap: $spacing-sm;
		padding-top: $spacing-sm;
		border-top: 1px solid $border-color-light;
		font-size: $font-size-xs;
		color: mix($color-master, #fff, 50%);
	}

	.publication-card__author {
		font-weight: $font-weight-medium;
		color: $color-master;
	}
</style>
