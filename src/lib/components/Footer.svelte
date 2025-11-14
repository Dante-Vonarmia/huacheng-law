<script lang="ts">
import { companyInfo, offices, footerLinks } from '$mocks/data';

let currentLang = $state('zh');
let currentYear = new Date().getFullYear();
// Force reload
</script>

<footer class="footer">
	<div class="footer-main">
		<div class="container">
			<!-- Top Section: Brand + Navigation -->
			<div class="footer-top">
				<!-- Left: Brand Info -->
				<div class="footer-brand">
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

				<!-- Right: Navigation Grid -->
				<div class="footer-nav-grid">
					<!-- About -->
					<div class="footer-nav-col">
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

					<!-- Services -->
					<div class="footer-nav-col">
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

					<!-- Resources -->
					<div class="footer-nav-col">
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
				</div>
			</div>

			<!-- Bottom Section: Contact Info -->
			<div class="footer-contact-bar">
				<div class="footer-contact-item">
					<strong>{currentLang === 'zh' ? '上海总部' : 'Shanghai HQ'}</strong>
					<span>{offices[0].tel}</span>
					<span>{offices[0].email}</span>
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
		background: #0e1b3a; // 使用律所主色调深色版
		color: rgba($color-white, 0.8);
		margin-top: auto;
		position: relative;
		overflow: hidden;

		// 顶部装饰线 - 细腻的金色渐变
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 2px;
			background: linear-gradient(
				90deg,
				transparent 0%,
				rgba($color-secondary, 0.2) 20%,
				rgba($color-secondary, 0.5) 50%,
				rgba($color-secondary, 0.2) 80%,
				transparent 100%
			);
		}

		// 背景装饰图案（可选）
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			right: 0;
			width: 600px;
			height: 600px;
			background: radial-gradient(
				circle at center,
				rgba($color-secondary, 0.03) 0%,
				transparent 70%
			);
			pointer-events: none;
		}
	}

	.footer-main {
		padding: 4rem 0 3rem;
		position: relative;
		z-index: 1;

		@include respond-to(mobile) {
			padding: 3rem 0 2rem;
		}
	}

	.footer-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 4rem;
		margin-bottom: 3rem;

		@media (max-width: 1024px) {
			flex-direction: column;
			gap: 3rem;
		}
	}

	.footer-brand {
		flex: 0 0 auto;
		max-width: 420px;

		@media (max-width: 1024px) {
			max-width: 100%;
		}
	}

	.footer-nav-grid {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;

		@media (max-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}

		@media (max-width: 480px) {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	.footer-nav-col {
		min-width: 0; // Prevent overflow
	}

	.footer-contact-bar {
		padding: 2rem 0;
		border-top: 1px solid rgba($color-white, 0.1);
		display: flex;
		justify-content: flex-start;
		gap: 3rem;

		@media (max-width: 768px) {
			flex-direction: column;
			gap: 1.5rem;
		}
	}

	.footer-contact-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		strong {
			color: rgba($color-white, 0.95);
			font-weight: 600;
			font-size: 0.9375rem;
			margin-bottom: 0.25rem;
		}

		span {
			color: rgba($color-white, 0.65);
			font-size: 0.875rem;
			font-weight: 300;
			transition: color 0.2s ease;

			&:hover {
				color: rgba($color-white, 0.85);
			}
		}
	}

	.footer-logo {
		height: 38px;
		width: auto;
		margin-bottom: 1.25rem;
		filter: brightness(0) invert(1);
		opacity: 0.95;
		transition: opacity 0.3s ease;

		&:hover {
			opacity: 1;
		}
	}

	.footer-desc {
		font-size: 0.9375rem;
		line-height: 1.7;
		margin-bottom: 1.5rem;
		max-width: 400px;
		color: rgba($color-white, 0.7);
		font-weight: 300;
		letter-spacing: 0.01em;

		@media (max-width: 480px) {
			font-size: 0.875rem;
			line-height: 1.65;
		}
	}

	.social-links {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.75rem;

		a {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			background: rgba($color-white, 0.05);
			border: 1px solid rgba($color-white, 0.12);
			border-radius: 50%;
			color: rgba($color-white, 0.65);
			transition: all 0.3s ease;
			position: relative;
			overflow: hidden;

			// 悬停发光效果
			&::before {
				content: '';
				position: absolute;
				inset: 0;
				border-radius: 50%;
				background: radial-gradient(circle, rgba($color-secondary, 0.2) 0%, transparent 70%);
				opacity: 0;
				transition: opacity 0.3s ease;
			}

			&:hover {
				background: rgba($color-secondary, 0.15);
				border-color: rgba($color-secondary, 0.4);
				color: $color-secondary;
				transform: translateY(-3px) scale(1.05);
				box-shadow: 0 4px 12px rgba($color-secondary, 0.2);

				&::before {
					opacity: 1;
				}
			}

			&:active {
				transform: translateY(-1px) scale(1);
			}
		}

		.social-icon {
			font-size: 1rem;
			position: relative;
			z-index: 1;
		}
	}

	.footer-title {
		font-size: 0.8125rem;
		font-weight: 700;
		color: rgba($color-white, 0.95);
		margin-bottom: 1.25rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		position: relative;
		padding-bottom: 0.75rem;

		// 底部装饰线
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 32px;
			height: 2px;
			background: linear-gradient(90deg, $color-secondary 0%, transparent 100%);
		}

		@media (max-width: 480px) {
			font-size: 0.75rem;
		}
	}

	.footer-links {
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			margin-bottom: 0.625rem;

			a {
				font-size: 0.875rem;
				font-weight: 400;
				color: rgba($color-white, 0.65);
				text-decoration: none;
				display: inline-block;
				position: relative;
				transition: all 0.25s ease;
				padding-left: 0;

				// 悬停下划线动画
				&::after {
					content: '';
					position: absolute;
					bottom: -2px;
					left: 0;
					width: 0;
					height: 1px;
					background: $color-secondary;
					transition: width 0.3s ease;
				}

				&:hover {
					color: rgba($color-white, 0.95);
					padding-left: 8px;

					&::after {
						width: calc(100% - 8px);
					}
				}

				@media (max-width: 480px) {
					font-size: 0.8125rem;
				}
			}
		}
	}


	.footer-bottom {
		border-top: 1px solid rgba($color-white, 0.08);
		padding: 1.75rem 0;
		background: rgba(0, 0, 0, 0.25);
		backdrop-filter: blur(10px);
		position: relative;
		z-index: 1;

		@media (max-width: 480px) {
			padding: 1.5rem 0;
		}
	}

	.footer-bottom-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;

		@media (max-width: 768px) {
			flex-direction: column;
			text-align: center;
			gap: 1rem;
		}
	}

	.copyright {
		font-size: 0.8125rem;
		color: rgba($color-white, 0.5);
		margin: 0;
		font-weight: 300;
		letter-spacing: 0.01em;

		@media (max-width: 480px) {
			font-size: 0.75rem;
		}
	}

	.footer-legal {
		display: flex;
		align-items: center;
		gap: 1rem;

		a {
			font-size: 0.8125rem;
			font-weight: 400;
			color: rgba($color-white, 0.55);
			text-decoration: none;
			position: relative;
			transition: color 0.25s ease;

			&::after {
				content: '';
				position: absolute;
				bottom: -3px;
				left: 0;
				width: 0;
				height: 1px;
				background: linear-gradient(90deg, $color-secondary, rgba($color-secondary, 0.4));
				transition: width 0.3s ease;
			}

			&:hover {
				color: rgba($color-white, 0.9);

				&::after {
					width: 100%;
				}
			}

			@media (max-width: 480px) {
				font-size: 0.75rem;
			}
		}

		.divider {
			color: rgba($color-white, 0.25);
			font-weight: 300;
		}
	}
</style>
