import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
	base: './',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		vue(),
		VueSetupExtend(),
		mockDevServerPlugin(),
		createSvgIconsPlugin({
			// svg path
			iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
			// id
			symbolId: 'icon-[dir]-[name]'
		})
	],
	server: {
		proxy: {
			'^/dev-api': 'http://127.0.0.1:5173/'
		}
	},
	optimizeDeps: {
		include: []
	},
	esbuild: {
		jsxFactory: 'h',
		jsxFragment: 'Fragment'
	}
})
