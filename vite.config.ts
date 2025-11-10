import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 9000,
		host: true, // 支持网络访问
		strictPort: true, // 端口固定为9000，被占用时报错而不是自动切换
		hmr: {
			// 开启 HMR (Hot Module Replacement)
			overlay: true, // 显示错误覆盖层
			clientPort: 9000
		},
		watch: {
			// 优化文件监听
			usePolling: false,
			interval: 100
		},
		fs: {
			allow: [
				path.resolve('./'),
				path.resolve('./ui-kit'),
				path.resolve('./src'),
				path.resolve('./node_modules')
			]
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				// 注释掉全局注入，改为在组件中按需导入
				// additionalData: `@use "$ui/styles/variables.scss" as *;`
			}
		}
	},
	optimizeDeps: {
		// 优化依赖预构建
		include: ['svelte', '@sveltejs/kit'],
		exclude: ['@sveltejs/kit', '$ui', '$lib']
	}
});
