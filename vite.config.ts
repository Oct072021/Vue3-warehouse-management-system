import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function ({ mode }) {
	const env = loadEnv(mode, process.cwd(), '') || {}
	console.log('NODE_ENV: ', env.VITE_ENV)
	return defineConfig({
		base: './',
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		},
		plugins: [
			vue(),
			VueSetupExtend(),
			viteMockServe({
				mockPath: './mock/mock-data',
				localEnabled: env.VITE_ENV === 'development',
				prodEnabled: env.VITE_ENV === 'production',
				logger: true
			}),
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
}
