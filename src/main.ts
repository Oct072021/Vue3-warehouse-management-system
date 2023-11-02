import { createApp } from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import ElementPlus from 'element-plus'
import './styles/element-variables.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'

import './permission'

import i18n from './lang'

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
