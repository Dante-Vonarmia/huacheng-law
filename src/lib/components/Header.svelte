<script lang="ts">
import { page } from '$app/stores';
import { onMount, onDestroy } from 'svelte';
import { mainNavigation, languages } from '$lib/data/navigation';

let currentPath = $state('');
let currentLang = $state('zh');
let isMenuOpen = $state(false);
let isScrolled = $state(false);
let activeDropdown = $state<string | null>(null);

$effect(() => {
	currentPath = $page.url.pathname;
});

function handleScroll() {
	if (typeof window !== 'undefined') {
		isScrolled = window.scrollY > 50;
	}
}

onMount(() => {
	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', handleScroll);
		handleScroll();
	}
});

onDestroy(() => {
	if (typeof window !== 'undefined') {
		window.removeEventListener('scroll', handleScroll);
		// 清理：确保页面卸载时恢复滚动
		document.body.style.overflow = '';
	}
});

function handleLangChange(langCode: string) {
	currentLang = langCode;
}

function toggleMenu() {
	isMenuOpen = !isMenuOpen;
	// 防止背景滚动
	if (typeof document !== 'undefined') {
		document.body.style.overflow = isMenuOpen ? 'hidden' : '';
	}
}

function closeMenu() {
	isMenuOpen = false;
	// 恢复背景滚动
	if (typeof document !== 'undefined') {
		document.body.style.overflow = '';
	}
}

function isActive(path: string) {
	return currentPath === path || currentPath.startsWith(path + '/');
}

function handleNavMouseEnter(navId: string) {
	activeDropdown = navId;
}

function handleNavMouseLeave() {
	activeDropdown = null;
}
</script>

<header class="header" class:scrolled={isScrolled}>
	<div class="header-inner">
		<!-- Logo -->
		<a href="/" class="logo">
			<img src="/images/logo.png" alt="华诚律师事务所" />
		</a>

		<!-- Desktop Navigation -->
		<nav class="nav">
			{#each mainNavigation as item}
				<div
					class="nav-item"
					class:active={isActive(item.path)}
					class:has-mega={item.megaMenu}
					role="menuitem"
					onmouseenter={() => item.megaMenu && handleNavMouseEnter(item.id)}
					onmouseleave={() => item.megaMenu && handleNavMouseLeave()}
				>
					<a href={item.path} class="nav-link">
						{currentLang === 'zh' ? item.label_zh : item.label_en}
						{#if item.megaMenu}
							<svg width="8" height="5" viewBox="0 0 8 5" class="nav-arrow">
								<path d="M1 1L4 4L7 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							</svg>
						{/if}
					</a>

					{#if item.megaMenu && activeDropdown === item.id}
						<div class="mega-menu">
							<div class="mega-menu-inner">
								<div class="mega-menu-columns">
									{#each item.megaMenu.columns as column}
										<div class="mega-menu-column">
											{#if column.title_zh || column.title_en}
												<h3 class="mega-menu-title">
													{currentLang === 'zh' ? column.title_zh : column.title_en}
												</h3>
											{/if}
											<ul class="mega-menu-list">
												{#each column.items as subItem}
													<li>
														<a
															href={subItem.path}
															class="mega-menu-link"
															class:active={isActive(subItem.path)}
														>
															<span class="link-icon">→</span>
															<span class="link-text">
																{currentLang === 'zh' ? subItem.label_zh : subItem.label_en}
															</span>
														</a>
													</li>
												{/each}
											</ul>
										</div>
									{/each}
								</div>

								<!-- Featured Section (可选) -->
								{#if item.id === 'practices'}
									<div class="mega-menu-featured">
										<div class="featured-card">
											<div class="featured-icon">
												<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
													<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
												</svg>
											</div>
											<h4>专业法律服务</h4>
											<p>为客户提供全方位、高质量的法律解决方案</p>
											<a href="/practices" class="featured-link">查看全部领域 →</a>
										</div>
									</div>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</nav>

		<!-- Right Actions -->
		<div class="actions">
			<button class="lang-btn" onclick={() => handleLangChange(currentLang === 'zh' ? 'en' : 'zh')}>
				{currentLang === 'zh' ? 'EN' : '中'}
			</button>
			<button
				class="mobile-toggle"
				class:active={isMenuOpen}
				onclick={toggleMenu}
				aria-label="Menu"
				aria-expanded={isMenuOpen}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</div>
</header>

<!-- Mobile Menu -->
{#if isMenuOpen}
	<div class="mobile-menu">
		<div class="mobile-inner">
			{#each mainNavigation as item}
				<div class="mobile-item">
					<a href={item.path} class="mobile-link" onclick={closeMenu}>
						{currentLang === 'zh' ? item.label_zh : item.label_en}
					</a>
					{#if item.megaMenu}
						<div class="mobile-children">
							{#each item.megaMenu.columns as column}
								{#if column.title_zh || column.title_en}
									<div class="mobile-group-title">
										{currentLang === 'zh' ? column.title_zh : column.title_en}
									</div>
								{/if}
								{#each column.items as subItem}
									<a href={subItem.path} class="mobile-child-link" onclick={closeMenu}>
										{currentLang === 'zh' ? subItem.label_zh : subItem.label_en}
									</a>
								{/each}
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<div class="mobile-overlay" onclick={closeMenu}></div>
{/if}

<style lang="scss">
@use '$ui/styles/variables.scss' as *;

.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	background: rgba(255, 255, 255, 0.98);
	backdrop-filter: blur(10px);
	border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	transition: all 0.3s ease;

	&.scrolled {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	}
}

.header-inner {
	max-width: 1400px;
	margin: 0 auto;
	padding: 0 40px;
	height: 72px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 1024px) {
		padding: 0 24px;
		height: 64px;
	}
}

// ========================================
// Logo
// ========================================
.logo {
	display: flex;
	align-items: center;
	text-decoration: none;
	transition: opacity 0.2s;

	&:hover {
		opacity: 0.8;
	}

	img {
		height: 42px;
		width: auto;

		@media (max-width: 1024px) {
			height: 36px;
		}
	}
}

// ========================================
// Desktop Navigation
// ========================================
.nav {
	display: flex;
	align-items: center;
	gap: 40px;

	@media (max-width: 1024px) {
		display: none;
	}
}

.nav-item {
	position: relative;
	display: flex;
	align-items: center;
}

.nav-link {
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 8px 0;
	font-size: 15px;
	font-weight: 400;
	color: $color-text-primary;
	text-decoration: none;
	transition: color 0.2s;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: $color-primary;
		transition: width 0.3s ease;
	}

	&:hover {
		color: $color-primary;
	}
}

.nav-item.active .nav-link {
	color: $color-primary;

	&::after {
		width: 100%;
	}
}

.nav-arrow {
	transition: transform 0.2s;
}

.nav-item.has-mega:hover .nav-arrow {
	transform: rotate(180deg);
}

// ========================================
// Mega Menu
// ========================================
.mega-menu {
	position: absolute;
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
	padding-top: 16px;
	animation: fadeInDown 0.3s ease;
	pointer-events: auto;
	min-width: 580px;

	// 针对"业务领域"使用更宽的菜单
	.nav-item#practices & {
		min-width: 720px;
	}

	// 移动端隐藏
	@media (max-width: 1024px) {
		display: none;
	}
}

.mega-menu-inner {
	background: rgba(255, 255, 255, 0.88);
	backdrop-filter: blur(24px) saturate(180%);
	-webkit-backdrop-filter: blur(24px) saturate(180%);
	border-radius: 10px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
	border: 1px solid rgba(255, 255, 255, 0.6);
	padding: 20px;
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 24px;
}

.mega-menu-columns {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 20px;
}

.mega-menu-column {
	// 样式
}

.mega-menu-title {
	font-size: 11px;
	font-weight: 600;
	color: $color-text-primary;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	margin-bottom: 12px;
	padding-bottom: 8px;
	border-bottom: 1.5px solid rgba($color-primary, 0.12);
}

.mega-menu-list {
	list-style: none;
	padding: 0;
	margin: 0;

	li {
		margin-bottom: 2px;
	}
}

.mega-menu-link {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 7px 10px;
	font-size: 13px;
	color: $color-text-secondary;
	text-decoration: none;
	border-radius: 5px;
	transition: all 0.2s;

	.link-icon {
		color: $color-primary;
		opacity: 0;
		transform: translateX(-4px);
		transition: all 0.2s;
		font-size: 12px;
	}

	.link-text {
		transition: transform 0.2s;
	}

	&:hover {
		background: rgba($color-primary, 0.06);
		color: $color-primary;

		.link-icon {
			opacity: 1;
			transform: translateX(0);
		}

		.link-text {
			transform: translateX(4px);
		}
	}

	&.active {
		background: rgba($color-primary, 0.1);
		color: $color-primary;
		font-weight: 500;

		.link-icon {
			opacity: 1;
			transform: translateX(0);
		}
	}
}

// Featured Section
.mega-menu-featured {
	min-width: 200px;
	max-width: 220px;
}

.featured-card {
	background: linear-gradient(135deg, rgba($color-primary, 0.04) 0%, rgba($color-accent, 0.04) 100%);
	border: 1px solid rgba($color-primary, 0.12);
	border-radius: 6px;
	padding: 18px;
	height: 100%;

	.featured-icon {
		width: 40px;
		height: 40px;
		background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		margin-bottom: 12px;

		svg {
			width: 20px;
			height: 20px;
		}
	}

	h4 {
		font-size: 14px;
		font-weight: 600;
		color: $color-text-primary;
		margin: 0 0 6px 0;
	}

	p {
		font-size: 12px;
		color: $color-text-secondary;
		line-height: 1.5;
		margin: 0 0 12px 0;
	}

	.featured-link {
		display: inline-flex;
		align-items: center;
		font-size: 12px;
		font-weight: 500;
		color: $color-primary;
		text-decoration: none;
		transition: gap 0.2s;
		gap: 4px;

		&:hover {
			gap: 7px;
		}
	}
}

@keyframes fadeInDown {
	from {
		opacity: 0;
		transform: translateX(-50%) translateY(-8px);
	}
	to {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
	}
}

// ========================================
// Actions
// ========================================
.actions {
	display: flex;
	align-items: center;
	gap: 16px;
}

.lang-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	background: transparent;
	font-size: 13px;
	font-weight: 500;
	color: $color-text-primary;
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		background: rgba($color-primary, 0.06);
		border-color: $color-primary;
		color: $color-primary;
	}
}

.mobile-toggle {
	display: none;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
	width: 40px;
	height: 40px;
	padding: 0;
	border: none;
	background: transparent;
	cursor: pointer;
	position: relative;

	@media (max-width: 1024px) {
		display: flex;
	}

	span {
		width: 22px;
		height: 2px;
		background: $color-text-primary;
		border-radius: 2px;
		transition: all 0.3s ease;
		margin: 0 auto;
		display: block;
	}

	// Hamburger to X animation
	&.active {
		span:nth-child(1) {
			transform: translateY(7px) rotate(45deg);
		}

		span:nth-child(2) {
			opacity: 0;
			transform: translateX(10px);
		}

		span:nth-child(3) {
			transform: translateY(-7px) rotate(-45deg);
		}
	}
}

// ========================================
// Mobile Menu
// ========================================
.mobile-menu {
	position: fixed;
	top: 64px;
	right: 0;
	bottom: 0;
	width: 320px;
	max-width: 85vw;
	background: white;
	z-index: 999;
	animation: slideInRight 0.3s ease;
	overflow-y: auto;
	overflow-x: hidden;
	box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
	-webkit-overflow-scrolling: touch;

	@media (max-width: 768px) {
		top: 64px;
	}

	@media (max-width: 480px) {
		width: 100vw;
		max-width: 100vw;
	}
}

.mobile-inner {
	padding: 24px;
	padding-bottom: 40px; // 额外底部空间，防止内容被遮挡
}

.mobile-item {
	margin-bottom: 8px;
}

.mobile-link {
	display: block;
	padding: 12px 16px;
	font-size: 15px;
	font-weight: 500;
	color: $color-text-primary;
	text-decoration: none;
	border-radius: 8px;
	transition: all 0.2s;

	&:hover {
		background: rgba($color-primary, 0.06);
		color: $color-primary;
	}
}

.mobile-children {
	padding-left: 16px;
	margin-top: 4px;
}

.mobile-group-title {
	padding: 8px 16px;
	font-size: 11px;
	font-weight: 600;
	color: $color-text-tertiary;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.mobile-child-link {
	display: block;
	padding: 8px 16px;
	font-size: 14px;
	color: $color-text-secondary;
	text-decoration: none;
	border-radius: 6px;
	transition: all 0.2s;

	&:hover {
		background: rgba($color-primary, 0.04);
		color: $color-primary;
	}
}

.mobile-overlay {
	position: fixed;
	top: 64px;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.4);
	z-index: 998;
	animation: fadeIn 0.3s ease;
}

@keyframes slideInRight {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
