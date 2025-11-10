<script lang="ts">
import { companyInfo, offices, footerLinks } from '$mocks/data';

let currentLang = $state('zh');
let currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer-main">
		<div class="container">
			<div class="footer-grid">
				<!-- Company Info -->
				<div class="footer-col">
					<img src="/images/logo.png" alt="Watson & Band" class="footer-logo" height="32" />
					<p class="footer-desc">
						{currentLang === 'zh'
							? companyInfo.description_zh
							: companyInfo.description_en}
					</p>
					<!-- Social Links -->
					<div class="social-links">
						{#each companyInfo.social as social}
							<a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
								<span class="social-icon">{social.icon}</span>
							</a>
						{/each}
					</div>
				</div>

				<!-- Quick Links - About -->
				<div class="footer-col">
					<h4 class="footer-title">
						{currentLang === 'zh' ? footerLinks.about.title_zh : footerLinks.about.title_en}
					</h4>
					<ul class="footer-links">
						{#each footerLinks.about.links as link}
							<li>
								<a href={link.path}>
									{currentLang === 'zh' ? link.label_zh : link.label_en}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Quick Links - Services -->
				<div class="footer-col">
					<h4 class="footer-title">
						{currentLang === 'zh'
							? footerLinks.services.title_zh
							: footerLinks.services.title_en}
					</h4>
					<ul class="footer-links">
						{#each footerLinks.services.links as link}
							<li>
								<a href={link.path}>
									{currentLang === 'zh' ? link.label_zh : link.label_en}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Quick Links - Resources -->
				<div class="footer-col">
					<h4 class="footer-title">
						{currentLang === 'zh'
							? footerLinks.resources.title_zh
							: footerLinks.resources.title_en}
					</h4>
					<ul class="footer-links">
						{#each footerLinks.resources.links as link}
							<li>
								<a href={link.path}>
									{currentLang === 'zh' ? link.label_zh : link.label_en}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Contact -->
				<div class="footer-col">
					<h4 class="footer-title">
						{currentLang === 'zh' ? '联系我们' : 'Contact Us'}
					</h4>
					<ul class="footer-contact">
						<li>
							<strong>{currentLang === 'zh' ? '上海总部' : 'Shanghai HQ'}</strong>
							<span>{offices[0].tel}</span>
							<span>{offices[0].email}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- Footer Bottom -->
	<div class="footer-bottom">
		<div class="container">
			<div class="footer-bottom-content">
				<p class="copyright">
					© {currentYear} Watson & Band. {currentLang === 'zh'
						? '版权所有'
						: 'All rights reserved'}.
				</p>
				<div class="footer-legal">
					<a href="/privacy">{currentLang === 'zh' ? '隐私政策' : 'Privacy Policy'}</a>
					<span class="divider">|</span>
					<a href="/terms">{currentLang === 'zh' ? '使用条款' : 'Terms of Use'}</a>
				</div>
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	@use '$ui/styles/variables.scss' as *;
	@use '$ui/styles/mixins.scss' as *;

	.footer {
		background: linear-gradient(180deg, #1a1f2e 0%, #0f1419 100%);
		color: rgba($color-white, 0.75);
		margin-top: auto;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 1px;
			background: linear-gradient(90deg, transparent, rgba($color-secondary, 0.3), transparent);
		}
	}

	.footer-main {
		padding: $spacing-section-top 0 $spacing-section-bottom;

		@include respond-to(mobile) {
			padding: $spacing-2xl 0;
		}
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 2fr repeat(4, 1fr);
		gap: $spacing-xl;

		@include respond-to(md) {
			grid-template-columns: repeat(3, 1fr);
		}

		@include respond-to(sm) {
			grid-template-columns: 1fr;
			gap: $spacing-lg;
		}
	}

	.footer-col {
		&:first-child {
			@include respond-to(md) {
				grid-column: 1 / -1;
			}
		}
	}

	.footer-logo {
		height: 32px;
		width: auto;
		margin-bottom: $spacing-md;
		filter: brightness(0) invert(1); // 转为白色
		opacity: 0.9;
	}

	.footer-desc {
		@include body-text;
		font-size: $font-size-small;
		line-height: $line-height-relaxed;
		margin-bottom: $spacing-md;
		max-width: 360px;
	}

	.social-links {
		@include flex-center;
		justify-content: flex-start;
		gap: $spacing-sm;

		a {
			@include flex-center;
			width: 36px;
			height: 36px;
			background: rgba($color-white, 0.08);
			border: 1px solid rgba($color-white, 0.1);
			border-radius: $radius-full;
			color: rgba($color-white, 0.7);
			transition: $transition-fast;

			&:hover {
				background: rgba($color-secondary, 0.15);
				border-color: rgba($color-secondary, 0.3);
				color: $color-secondary;
				transform: translateY(-2px);
			}
		}

		.social-icon {
			font-size: $font-size-p;
		}
	}

	.footer-title {
		@include block-title;
		color: $color-white;
		margin-bottom: $spacing-md;
	}

	.footer-links {
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			margin-bottom: $spacing-xs;

			a {
				@include body-text;
				font-size: $font-size-small;
				color: rgba($color-white, 0.65);
				transition: $transition-fast;
				display: inline-block;
				position: relative;

				&::before {
					content: '';
					position: absolute;
					left: -12px;
					top: 50%;
					transform: translateY(-50%);
					width: 0;
					height: 1px;
					background: $color-secondary;
					transition: width $transition-fast;
				}

				&:hover {
					color: $color-white;
					transform: translateX(4px);

					&::before {
						width: 6px;
					}
				}
			}
		}
	}

	.footer-contact {
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			@include body-text;
			font-size: $font-size-small;
			line-height: $line-height-relaxed;

			strong {
				display: block;
				color: $color-white;
				margin-bottom: $spacing-xs;
			}

			span {
				display: block;
				color: rgba($color-white, 0.7);
				margin-bottom: 4px;
			}
		}
	}

	.footer-bottom {
		border-top: 1px solid rgba($color-white, 0.06);
		padding: $spacing-md 0;
		background: rgba(0, 0, 0, 0.2);
	}

	.footer-bottom-content {
		@include flex-between;

		@include respond-to(mobile) {
			flex-direction: column;
			text-align: center;
			gap: $spacing-sm;
		}
	}

	.copyright {
		@include body-text;
		font-size: $font-size-xs;
		color: rgba($color-white, 0.5);
		margin: 0;
	}

	.footer-legal {
		@include flex-center;
		gap: $spacing-sm;

		a {
			@include body-text;
			font-size: $font-size-xs;
			color: rgba($color-white, 0.5);
			transition: $transition-fast;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				bottom: -2px;
				left: 0;
				width: 0;
				height: 1px;
				background: $color-secondary;
				transition: width $transition-fast;
			}

			&:hover {
				color: $color-secondary;

				&::after {
					width: 100%;
				}
			}
		}

		.divider {
			color: rgba($color-white, 0.2);
		}
	}
</style>
