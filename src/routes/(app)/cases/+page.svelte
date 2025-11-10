<script lang="ts">
import CaseCard from '$ui/components/CaseCard.svelte';
import { cases } from '$mocks/data';
import Modal from '$ui/components/Modal.svelte';
import Badge from '$ui/components/Badge.svelte';

let currentArea = $state('all');
let searchQuery = $state('');
let showCaseDetail = $state(false);
let selectedCase = $state(null);

// Practice areas from cases
const practiceAreas = $derived(['all', ...new Set(cases.map(c => c.practice_area))]);

// Filter cases
const filteredCases = $derived(cases.filter(caseItem => {
	const matchesArea = currentArea === 'all' || caseItem.practice_area === currentArea;
	const matchesSearch = searchQuery === '' ||
		caseItem.title_zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
		caseItem.summary_zh.toLowerCase().includes(searchQuery.toLowerCase());
	return matchesArea && matchesSearch;
}));

function handleCaseClick(caseId: string) {
	const caseItem = cases.find(c => c.id === caseId);
	if (caseItem) {
		selectedCase = caseItem;
		showCaseDetail = true;
	}
}

function handleSearch(event: Event) {
	const target = event.target as HTMLInputElement;
	searchQuery = target.value;
}

function getAreaName(area: string): string {
	const areaMap: Record<string, string> = {
		'all': '全部',
		'intellectual-property': '知识产权',
		'corporate-commercial': '公司法务',
		'litigation-arbitration': '诉讼仲裁',
		'banking-finance': '银行金融'
	};
	return areaMap[area] || area;
}

function getPracticeAreaLabel(area: string): string {
	const areaMap: Record<string, string> = {
		'intellectual-property': '知识产权',
		'corporate-commercial': '公司法务',
		'litigation-arbitration': '诉讼仲裁',
		'banking-finance': '银行金融'
	};
	return areaMap[area] || area;
}
</script>

<svelte:head>
	<title>成功案例 - Watson & Band</title>
	<meta name="description" content="华诚律师事务所成功案例展示，专业团队，卓越成果" />
</svelte:head>

<!-- Page Header -->
<section class="page-header">
	<div class="container">
		<h1 class="page-title">成功案例</h1>
		<p class="page-subtitle">专业团队 · 卓越成果</p>
	</div>
</section>

<!-- Filter Bar -->
<section class="filter-section">
	<div class="container">
		<div class="filter-bar">
			<!-- Practice Area Tabs -->
			<div class="area-tabs">
				{#each practiceAreas as area}
					<button
						class="area-tab"
						class:active={currentArea === area}
						onclick={() => currentArea = area}
					>
						{getAreaName(area)}
					</button>
				{/each}
			</div>

			<!-- Search Box -->
			<div class="search-box">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<circle cx="11" cy="11" r="8" stroke-width="2"/>
					<path d="m21 21-4.35-4.35" stroke-width="2"/>
				</svg>
				<input
					type="text"
					placeholder="搜索案例..."
					value={searchQuery}
					oninput={handleSearch}
				/>
			</div>
		</div>
	</div>
</section>

<!-- Cases Grid -->
<section class="section section--light">
	<div class="container">
		{#if filteredCases.length > 0}
			<div class="cases-grid">
				{#each filteredCases as caseItem (caseItem.id)}
					<CaseCard {caseItem} onclick={() => handleCaseClick(caseItem.id)} />
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-width="2"/>
					<polyline points="14 2 14 8 20 8" stroke-width="2"/>
					<line x1="12" y1="18" x2="12" y2="12" stroke-width="2"/>
					<line x1="9" y1="15" x2="15" y2="15" stroke-width="2"/>
				</svg>
				<h3>暂无案例</h3>
				<p>没有找到符合条件的案例内容</p>
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	@use '$ui/styles/variables.scss' as *;
	@use '$ui/styles/mixins.scss' as *;

	.page-header {
		background: linear-gradient(135deg, $color-primary 0%, mix($color-primary, $color-secondary, 80%) 100%);
		color: $color-white;
		padding: $spacing-section-top $spacing-md $spacing-xl;
		text-align: center;
	}

	.page-title {
		@include heading(h2);
		font-size: $font-size-h2;
		color: $color-white;
		margin-bottom: $spacing-sm;
	}

	.page-subtitle {
		@include body-text;
		font-size: $font-size-lg;
		color: rgba($color-white, 0.9);
	}

	.filter-section {
		background: $color-white;
		border-bottom: 1px solid $border-color;
		padding: $spacing-lg 0;
		position: sticky;
		top: 60px;
		z-index: 10;
	}

	.filter-bar {
		@include flex-between;
		gap: $spacing-lg;
		flex-wrap: wrap;

		@include respond-to(mobile) {
			flex-direction: column;
			gap: $spacing-md;
		}
	}

	.area-tabs {
		display: flex;
		gap: $spacing-xs;
		flex-wrap: wrap;
	}

	.area-tab {
		@include button-reset;
		padding: $spacing-xs $spacing-md;
		border-radius: $radius-full;
		font-size: $font-size-small;
		font-weight: $font-weight-medium;
		color: $color-master;
		background: transparent;
		border: 1px solid $border-color;
		transition: all $transition-base;
		cursor: pointer;
		white-space: nowrap;

		&:hover {
			border-color: $color-secondary;
			color: $color-secondary;
		}

		&.active {
			background: $color-secondary;
			border-color: $color-secondary;
			color: $color-white;
		}
	}

	.search-box {
		@include flex-center;
		gap: $spacing-xs;
		padding: $spacing-xs $spacing-md;
		border: 1px solid $border-color;
		border-radius: $radius-full;
		background: $color-white;
		min-width: 280px;
		transition: border-color $transition-base;

		&:focus-within {
			border-color: $color-secondary;
		}

		svg {
			color: $color-master;
			flex-shrink: 0;
		}

		input {
			border: none;
			outline: none;
			background: transparent;
			font-size: $font-size-base;
			color: $color-master-dark;
			flex: 1;
			min-width: 0;

			&::placeholder {
				color: mix($color-master, #fff, 50%);
			}
		}

		@include respond-to(mobile) {
			width: 100%;
			min-width: 0;
		}
	}

	.cases-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $spacing-lg;

		@include respond-to(md) {
			grid-template-columns: 1fr;
		}
	}

	.empty-state {
		@include flex-center;
		flex-direction: column;
		gap: $spacing-md;
		padding: $spacing-3xl;
		text-align: center;

		svg {
			color: mix($color-master, #fff, 30%);
		}

		h3 {
			@include heading(h5);
			color: $color-master;
			margin: 0;
		}

		p {
			@include body-text;
			color: mix($color-master, #fff, 50%);
			margin: 0;
		}
	}

	// Case Detail Modal Styles
	.case-detail {
		&__header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 24px;
			padding-bottom: 24px;
			border-bottom: 2px solid #e2e8f0;

			h2 {
				font-size: 32px;
				font-weight: 500;
				color: $color-text-primary;
				margin: 0 0 8px 0;
			}

			.title-en {
				font-size: 16px;
				color: $color-text-tertiary;
				margin: 0;
			}
		}

		&__meta {
			display: flex;
			gap: 32px;
			margin-bottom: 32px;
			padding: 20px;
			background: #f8fafc;
			border-radius: 12px;

			.meta-item {
				display: flex;
				align-items: center;
				gap: 8px;
				font-size: 15px;
				color: $color-text-secondary;

				svg {
					color: $color-accent;
					flex-shrink: 0;
				}

				&--result {
					svg {
						color: #10b981;
					}
				}
			}
		}

		&__section {
			margin-bottom: 32px;

			h3 {
				font-size: 20px;
				font-weight: 600;
				color: $color-text-primary;
				margin: 0 0 16px 0;
				display: flex;
				align-items: center;

				&::before {
					content: '';
					width: 4px;
					height: 20px;
					background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
					margin-right: 12px;
					border-radius: 2px;
				}
			}

			p {
				font-size: 16px;
				line-height: 1.8;
				color: $color-text-secondary;
				margin: 0;
			}
		}

		.outcome-box {
			display: flex;
			gap: 20px;
			padding: 24px;
			background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%);
			border: 2px solid rgba(16, 185, 129, 0.2);
			border-radius: 12px;

			.outcome-icon {
				width: 48px;
				height: 48px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: white;
				border-radius: 50%;
				flex-shrink: 0;

				svg {
					color: #10b981;
				}
			}

			p {
				flex: 1;
				font-size: 16px;
				line-height: 1.8;
				color: $color-text-primary;
				margin: 0;
				align-self: center;
			}
		}

		.key-points {
			list-style: none;
			padding: 0;
			margin: 0;

			li {
				position: relative;
				padding-left: 32px;
				margin-bottom: 16px;
				font-size: 16px;
				line-height: 1.8;
				color: $color-text-secondary;

				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 10px;
					width: 8px;
					height: 8px;
					background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
					border-radius: 50%;
				}

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>

<!-- Case Detail Modal -->
{#if selectedCase}
	<Modal bind:open={showCaseDetail} size="xl" title="">
		<div class="case-detail">
			<!-- Case Header -->
			<div class="case-detail__header">
				<div>
					<h2>{selectedCase.title_zh}</h2>
					<p class="title-en">{selectedCase.title_en}</p>
				</div>
				<Badge variant="primary">{getPracticeAreaLabel(selectedCase.practice_area)}</Badge>
			</div>

			<!-- Case Meta -->
			<div class="case-detail__meta">
				<div class="meta-item">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
						<line x1="16" y1="2" x2="16" y2="6"/>
						<line x1="8" y1="2" x2="8" y2="6"/>
						<line x1="3" y1="10" x2="21" y2="10"/>
					</svg>
					<span>{selectedCase.date}</span>
				</div>
				<div class="meta-item meta-item--result">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
						<polyline points="22 4 12 14.01 9 11.01"/>
					</svg>
					<span>{selectedCase.result_zh}</span>
				</div>
			</div>

			<!-- Case Summary -->
			<div class="case-detail__section">
				<h3>案情概要</h3>
				<p>{selectedCase.summary_zh}</p>
			</div>

			<!-- Case Challenge -->
			{#if selectedCase.challenge}
				<div class="case-detail__section">
					<h3>案件挑战</h3>
					<p>{selectedCase.challenge}</p>
				</div>
			{/if}

			<!-- Case Solution -->
			{#if selectedCase.solution}
				<div class="case-detail__section">
					<h3>解决方案</h3>
					<p>{selectedCase.solution}</p>
				</div>
			{/if}

			<!-- Case Outcome -->
			{#if selectedCase.outcome}
				<div class="case-detail__section">
					<h3>案件结果</h3>
					<div class="outcome-box">
						<div class="outcome-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
								<polyline points="22 4 12 14.01 9 11.01"/>
							</svg>
						</div>
						<p>{selectedCase.outcome}</p>
					</div>
				</div>
			{/if}

			<!-- Key Takeaways -->
			{#if selectedCase.key_points && selectedCase.key_points.length > 0}
				<div class="case-detail__section">
					<h3>关键要点</h3>
					<ul class="key-points">
						{#each selectedCase.key_points as point}
							<li>{point}</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</Modal>
{/if}
