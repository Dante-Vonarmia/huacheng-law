<script lang="ts">
/**
 * Event Card Component  
 * 基于 Pages.Revox.io 设计语言的活动卡片
 */

import type { Event } from '$mocks/data';

let {
	event,
	onclick
}: {
	event: Event;
	onclick?: () => void;
} = $props();

// 格式化日期
const eventDate = new Date(event.start_date);
const month = eventDate.toLocaleDateString('zh-CN', { month: 'short' });
const day = eventDate.getDate();

// 状态颜色
const statusColors = {
	upcoming: '#D4AF37',
	ongoing: '#1a73e8',
	completed: '#7a8a99'
};
</script>

<article 
	class="event-card"
	role="button"
	tabindex="0"
	{onclick}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			onclick?.();
		}
	}}
>
	<!-- Date Badge -->
	<div class="event-card__date-badge">
		<div class="event-card__month">{month}</div>
		<div class="event-card__day">{day}</div>
	</div>

	<!-- Content -->
	<div class="event-card__content">
		<div class="event-card__header">
			<span class="event-card__type">{event.type_zh}</span>
			<span class="event-card__status" data-status={event.status}>
				{event.status === 'upcoming' ? '即将举办' : event.status === 'ongoing' ? '进行中' : '已结束'}
			</span>
		</div>

		<h3 class="event-card__title">{event.title_zh}</h3>
		<p class="event-card__description">{event.description_zh}</p>

		<div class="event-card__info">
			<div class="event-card__location">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="2"/>
					<circle cx="12" cy="10" r="3" stroke-width="2"/>
				</svg>
				<span>{event.location_zh}</span>
			</div>
			{#if event.capacity && event.registered}
				<div class="event-card__capacity">
					{event.registered} / {event.capacity} 人
				</div>
			{/if}
		</div>
	</div>
</article>

<style lang="scss">
	@use '$ui/styles/variables.scss' as *;
	@use '$ui/styles/mixins.scss' as *;

	.event-card {
		@include button-reset;
		display: flex;
		gap: $spacing-md;
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

	// Date Badge
	.event-card__date-badge {
		flex-shrink: 0;
		width: 64px;
		height: 64px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, $color-secondary 0%, mix($color-secondary, $color-primary, 70%) 100%);
		color: $color-white;
		border-radius: $radius-base;
	}

	.event-card__month {
		font-size: $font-size-xs;
		font-weight: $font-weight-medium;
		text-transform: uppercase;
		opacity: 0.9;
	}

	.event-card__day {
		font-size: 24px;
		font-weight: $font-weight-bold;
		line-height: 1;
	}

	// Content
	.event-card__content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: $spacing-xs;
	}

	.event-card__header {
		@include flex-between;
		gap: $spacing-sm;
	}

	.event-card__type {
		@include small-text;
		color: $color-master;
		font-weight: $font-weight-medium;
	}

	.event-card__status {
		@include small-text;
		padding: 2px 8px;
		border-radius: $radius-sm;
		font-weight: $font-weight-medium;

		&[data-status='upcoming'] {
			background: rgba($color-complete, 0.1);
			color: $color-complete;
		}

		&[data-status='ongoing'] {
			background: rgba($color-success, 0.1);
			color: $color-success;
		}

		&[data-status='completed'] {
			background: rgba($color-master, 0.1);
			color: $color-master;
		}
	}

	.event-card__title {
		@include heading(h6);
		color: $color-master-dark;
		margin: 0;
		@include text-ellipsis(2);
	}

	.event-card__description {
		@include body-text;
		font-size: $font-size-small;
		color: $color-master;
		line-height: $line-height-relaxed;
		margin: 0;
		@include text-ellipsis(2);
	}

	.event-card__info {
		@include flex-between;
		gap: $spacing-sm;
		padding-top: $spacing-xs;
		margin-top: auto;
	}

	.event-card__location {
		@include flex-center;
		gap: 6px;
		font-size: $font-size-xs;
		color: mix($color-master, #fff, 50%);

		svg {
			flex-shrink: 0;
		}
	}

	.event-card__capacity {
		@include small-text;
		color: $color-secondary;
		font-weight: $font-weight-medium;
	}

	// Responsive
	@include respond-to(mobile) {
		.event-card__date-badge {
			width: 56px;
			height: 56px;
		}

		.event-card__day {
			font-size: 20px;
		}
	}
</style>
