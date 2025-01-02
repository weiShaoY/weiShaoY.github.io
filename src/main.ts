import { createHead } from '@unhead/vue'

import { createApp } from 'vue'

import App from './App.vue'

import directives from './directives'

import router from './router'

import pinia from './store'

import '@unocss/reset/tailwind.css'

import 'uno.css'

import './theme/index.less'

// vite-plugin-svg-icons
import 'virtual:svg-icons-register'

const app = createApp(App)

/**
 *  unhead 通用文档 <head> 标签管理器
 *  @see  https://github.com/unjs/unhead
 */
app.use(createHead())

app.use(pinia)

app.use(router)

app.use(directives)

app.mount('#app')
