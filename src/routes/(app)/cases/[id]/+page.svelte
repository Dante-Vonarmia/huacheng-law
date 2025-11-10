<script lang="ts">
import { page } from '$app/stores';
import CaseCard from '$ui/components/CaseCard.svelte';
import { cases } from '$mocks/data';

const caseId = $derived($page.params.id);
const caseItem = $derived(cases.find(c => c.id === caseId));

// Related cases (same practice area, excluding current)
const relatedCases = $derived(
	caseItem
		? cases.filter(c => c.practice_area === caseItem.practice_area && c.id !== caseItem.id).slice(0, 2)
		: []
);

function handleRelatedClick(id: string) {
	window.location.href = `/cases/${id}`;
}

function getAreaName(area: string): string {
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
	<title>{caseItem ? caseItem.title_zh : '案例详情'} - Watson & Band</title>
	<meta name="description" content={caseItem?.summary_zh || '华诚律师事务所案例详情'} />
</svelte:head>

{#if caseItem}
	<!-- Case Hero -->
	<section class="case-hero">
		<div class="container">
			<nav class="breadcrumb">
				<a href="/">首页</a>
				<span>/</span>
				<a href="/cases">成功案例</a>
				<span>/</span>
				<span>{caseItem.title_zh}</span>
			</nav>

			<div class="hero-content">
				<span class="practice-badge">{getAreaName(caseItem.practice_area)}</span>
				<h1 class="case-title">{caseItem.title_zh}</h1>
				<div class="case-meta">
					<div class="meta-item">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-width="2" />
							<polyline points="22 4 12 14.01 9 11.01" stroke-width="2" />
						</svg>
						<span>{caseItem.result_zh}</span>
					</div>
					<time class="meta-item" datetime={caseItem.date}>
						{caseItem.date}
					</time>
				</div>
			</div>
		</div>
	</section>

	<!-- Case Content -->
	<section class="section section--white">
		<div class="container">
			<div class="case-layout">
				<!-- Main Content -->
				<div class="main-content">
					<!-- Summary -->
					<div class="content-block">
						<h2>案例概述</h2>
						<p>{caseItem.summary_zh}</p>
					</div>

					<!-- Full Content (placeholder - would come from API) -->
					<div class="content-block">
						<h2>案例详情</h2>
						<p>{caseItem.summary_zh}</p>
						<p>本案例展示了华诚律师事务所在{getAreaName(caseItem.practice_area)}领域的专业能力。我们的律师团队凭借深厚的法律功底和丰富的实践经验，为客户提供了全方位的法律服务，最终取得了{caseItem.result_zh}的优异成果。</p>
					</div>

					<!-- Challenge Section -->
					<div class="content-block">
						<h2>案件挑战</h2>
						<ul class="challenge-list">
							<li>复杂的法律关系和多方利益协调</li>
							<li>需要深入理解行业特性和商业模式</li>
							<li>时间紧迫，需要高效的团队协作</li>
						</ul>
					</div>

					<!-- Solution Section -->
					<div class="content-block">
						<h2>解决方案</h2>
						<p>华诚团队采取了系统性的法律策略，通过深入分析案情、精准定位法律问题、制定周密的诉讼/非诉方案，为客户争取了最大利益。</p>
					</div>

					<!-- Result Section -->
					<div class="result-highlight">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-width="2" />
							<polyline points="22 4 12 14.01 9 11.01" stroke-width="2" />
						</svg>
						<h3>案件结果</h3>
						<p class="result-text">{caseItem.result_zh}</p>
					</div>
				</div>

				<!-- Sidebar -->
				<aside class="sidebar">
					<div class="info-card">
						<h3>案件信息</h3>
						<dl>
							<dt>业务领域</dt>
							<dd>{getAreaName(caseItem.practice_area)}</dd>

							<dt>结案日期</dt>
							<dd>{caseItem.date}</dd>

							<dt>案件结果</dt>
							<dd class="result-badge">{caseItem.result_zh}</dd>
						</dl>
					</div>

					{#if caseItem.featured}
						<div class="featured-badge">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke-width="2" fill="currentColor"/>
							</svg>
							<span>精选案例</span>
						</div>
					{/if}

					<div class="contact-cta">
						<h4>需要法律咨询？</h4>
						<p>我们的专业团队随时为您服务</p>
						<a href="/contact" class="btn btn-secondary">联系我们</a>
					</div>
				</aside>
			</div>
		</div>
	</section>

	<!-- Related Cases -->
	{#if relatedCases.length > 0}
		<section class="section section--light">
			<div class="container">
				<h2 class="section-title">相关案例</h2>
				<div class="related-cases">
					{#each relatedCases as related (related.id)}
						<CaseCard caseItem={related} onclick={() => handleRelatedClick(related.id)} />
					{/each}
				</div>
			</div>
		</section>
	{/if}
{:else}
	<!-- Case Not Found -->
	<section class="section section--white">
		<div class="container">
			<div class="not-found">
				<h1>案例未找到</h1>
				<p>抱歉，您访问的案例不存在或已被删除。</p>
				<a href="/cases" class="btn btn-primary">返回案例列表</a>
			</div>
		</div>
	</section>
{/if}

<style lang="scss">
	@use '$ui/styles/variables.scss' as *;
	@use '$ui/styles/mixins.scss' as *;

	.case-hero {
		background: linear-gradient(135deg, $color-primary 0%, mix($color-primary, $color-secondary, 80%) 100%);
		color: $color-white;
		padding: $spacing-section-top $spacing-md $spacing-xl;
	}

	.breadcrumb {
		@include flex-center;
		gap: $spacing-xs;
		font-size: $font-size-small;
		color: rgba($color-white, 0.7);
		margin-bottom: $spacing-xl;
		flex-wrap: wrap;

		a {
			color: inherit;
			text-decoration: none;
			transition: color $transition-base;

			&:hover {
				color: $color-white;
			}
		}

		span {
			&:last-child {
				color: rgba($color-white, 0.9);
			}
		}
	}

	.hero-content {
		max-width: 900px;
	}

	.practice-badge {
		@include small-text;
		display: inline-block;
		background: rgba($color-white, 0.2);
		color: $color-white;
		padding: 6px 16px;
		border-radius: $radius-full;
		font-weight: $font-weight-medium;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: $spacing-md;
	}

	.case-title {
		@include heading(h1);
		font-size: $font-size-h1;
		color: $color-white;
		margin-bottom: $spacing-lg;
		line-height: $line-height-h1;

		@include respond-to(mobile) {
			font-size: $font-size-h2;
		}
	}

	.case-meta {
		display: flex;
		gap: $spacing-xl;
		flex-wrap: wrap;
	}

	.meta-item {
		@include flex-center;
		gap: $spacing-xs;
		font-size: $font-size-base;
		color: rgba($color-white, 0.9);

		svg {
			color: $color-success;
			flex-shrink: 0;
		}
	}

	.case-layout {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: $spacing-2xl;
		margin-top: $spacing-xl;

		@include respond-to(md) {
			grid-template-columns: 1fr;
			gap: $spacing-xl;
		}
	}

	.main-content {
		min-width: 0;
	}

	.content-block {
		margin-bottom: $spacing-2xl;

		&:last-child {
			margin-bottom: 0;
		}

		h2 {
			@include heading(h3);
			color: $color-master-dark;
			margin-bottom: $spacing-md;
			padding-bottom: $spacing-sm;
			border-bottom: 2px solid $border-color;
		}

		p {
			@include body-text;
			font-size: $font-size-lg;
			color: $color-master;
			line-height: $line-height-relaxed;
			margin-bottom: $spacing-md;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}

	.challenge-list {
		@include body-text;
		font-size: $font-size-lg;
		color: $color-master;
		line-height: $line-height-relaxed;
		padding-left: $spacing-lg;
		margin: 0;

		li {
			margin-bottom: $spacing-sm;
			padding-left: $spacing-xs;

			&::marker {
				color: $color-secondary;
			}
		}
	}

	.result-highlight {
		@include flex-center;
		flex-direction: column;
		gap: $spacing-md;
		padding: $spacing-xl;
		background: linear-gradient(135deg, rgba($color-success, 0.1) 0%, rgba($color-success, 0.05) 100%);
		border: 2px solid rgba($color-success, 0.2);
		border-radius: $radius-base;
		text-align: center;
		margin-top: $spacing-2xl;

		svg {
			color: $color-success;
		}

		h3 {
			@include heading(h4);
			color: $color-master-dark;
			margin: 0;
		}

		.result-text {
			@include body-text;
			font-size: $font-size-xl;
			font-weight: $font-weight-medium;
			color: $color-success;
			margin: 0;
		}
	}

	.sidebar {
		.info-card {
			background: $color-white;
			border: 1px solid $border-color;
			border-radius: $radius-base;
			padding: $spacing-lg;
			margin-bottom: $spacing-lg;

			h3 {
				@include heading(h6);
				color: $color-master-dark;
				margin: 0 0 $spacing-md;
				padding-bottom: $spacing-sm;
				border-bottom: 1px solid $border-color;
			}

			dl {
				margin: 0;

				dt {
					@include small-text;
					color: mix($color-master, #fff, 50%);
					font-weight: $font-weight-medium;
					text-transform: uppercase;
					letter-spacing: 0.05em;
					margin-bottom: $spacing-xs;
				}

				dd {
					@include body-text;
					color: $color-master;
					margin: 0 0 $spacing-md;

					&:last-child {
						margin-bottom: 0;
					}

					&.result-badge {
						display: inline-block;
						background: rgba($color-success, 0.1);
						color: $color-success;
						padding: 4px 12px;
						border-radius: $radius-sm;
						font-weight: $font-weight-medium;
					}
				}
			}
		}

		.featured-badge {
			@include flex-center;
			gap: $spacing-xs;
			padding: $spacing-md;
			background: linear-gradient(135deg, rgba($color-secondary, 0.1) 0%, rgba($color-secondary, 0.05) 100%);
			border: 1px solid rgba($color-secondary, 0.2);
			border-radius: $radius-base;
			color: $color-secondary;
			font-weight: $font-weight-medium;
			margin-bottom: $spacing-lg;

			svg {
				flex-shrink: 0;
			}
		}

		.contact-cta {
			background: $color-primary;
			color: $color-white;
			padding: $spacing-lg;
			border-radius: $radius-base;
			text-align: center;

			h4 {
				@include heading(h6);
				color: $color-white;
				margin: 0 0 $spacing-xs;
			}

			p {
				@include body-text;
				font-size: $font-size-small;
				color: rgba($color-white, 0.9);
				margin: 0 0 $spacing-md;
			}

			.btn {
				@include btn-base;
				background: $color-secondary;
				border-color: $color-secondary;
				color: $color-white;
				width: 100%;

				&:hover {
					background: mix($color-secondary, $color-white, 90%);
					transform: translateY(-2px);
				}
			}
		}
	}

	.related-cases {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $spacing-lg;

		@include respond-to(md) {
			grid-template-columns: 1fr;
		}
	}

	.not-found {
		text-align: center;
		padding: $spacing-3xl;

		h1 {
			@include heading(h3);
			color: $color-master-dark;
			margin-bottom: $spacing-md;
		}

		p {
			@include body-text;
			color: $color-master;
			margin-bottom: $spacing-xl;
		}

		.btn {
			@include btn-base;
			@include btn-primary;
			padding: $spacing-sm $spacing-xl;
		}
	}
</style>
