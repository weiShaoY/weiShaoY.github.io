import { createApp } from 'vue'

import App from './App.vue'

import directives from './directives'

import router from './router'

import pinia from './store'

import '@unocss/reset/tailwind.css'

import 'uno.css'

import './assets/styles/index.less'

// vite-plugin-svg-icons
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(directives)

app.mount('#app')
