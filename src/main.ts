import { createApp } from 'vue'

import App from './App.vue'

import router from './router'

import '@unocss/reset/tailwind.css'

import 'uno.css'

import './assets/iconFont'

import './assets/styles/index.less'

const app = createApp(App)

app.use(router)

app.mount('#app')
