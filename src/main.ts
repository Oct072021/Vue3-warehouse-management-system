import { createApp } from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import ElementPlus from 'element-plus'
// import './styles/element-variables.module.scss'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import SvgIcon from '@/components/SvgIcon/index.vue' // global components
import 'virtual:svg-icons-register'

import './permission'

import i18n from './lang'

import { setupProdMockServer } from '../mock/prod/mock-server'

if (import.meta.env.VITE_ENV === 'production') {
	setupProdMockServer()
}

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.component('SvgIcon', SvgIcon)

app.mount('#app')
