import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';

// 注册语言包
register('zh', () => import('$locales/zh.json'));
register('en', () => import('$locales/en.json'));

// 初始化 i18n
export function initI18n() {
	const initialLocale = typeof window !== 'undefined'
		? getLocaleFromNavigator()
		: 'zh'; // SSR 默认中文

	init({
		fallbackLocale: 'zh',
		initialLocale: initialLocale
	});
}

// 切换语言
export function switchLocale(lang: 'zh' | 'en') {
	locale.set(lang);
	if (typeof window !== 'undefined') {
		localStorage.setItem('locale', lang);
	}
}

// 获取当前语言
export function getCurrentLocale(): string {
	let currentLocale = 'zh';
	locale.subscribe((value) => {
		if (value) currentLocale = value;
	});
	return currentLocale;
}
