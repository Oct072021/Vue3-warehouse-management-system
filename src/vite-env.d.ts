/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

interface ImportMetaEnv {
	readonly VITE_ENV: string
	readonly VITE_APP_BASE_API: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare module '*.mjs'

declare module 'vue-cropperjs'
