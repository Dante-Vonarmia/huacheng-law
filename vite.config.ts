import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		// 生产构建优化
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true, // 移除console.log
				drop_debugger: true,
				pure_funcs: ['console.log', 'console.info']
			}
		},
		rollupOptions: {
			output: {
				manualChunks: {
					// 代码分割优化
					'vendor-svelte': ['svelte', '@sveltejs/kit'],
					'vendor-ui': ['$ui/components']
				}
			}
		},
		cssCodeSplit: true,
		sourcemap: false, // 生产环境关闭sourcemap
		chunkSizeWarningLimit: 1000
	},
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
				api: 'modern-compiler', // 使用现代 Sass API，避免 legacy-js-api 警告
				silenceDeprecations: ['legacy-js-api', 'global-builtin'] // 暂时静默已知的弃用警告
			}
		}
	},
	optimizeDeps: {
		// 优化依赖预构建
		include: ['svelte', '@sveltejs/kit'],
		exclude: ['@sveltejs/kit', '$ui', '$lib']
	}
});
