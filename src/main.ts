import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router/auto'

import NProgressPlugin from './utils/nporgress'

import App from './App.vue'

import '@unocss/reset/tailwind.css'

import './styles/main.less'

import 'uno.css'

import './iconFont'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

// beforeEach路由切换之前触发
router.beforeEach(() => {
  NProgressPlugin.start() // 开始进度条
})

// afterEach路由切换之后触发
router.afterEach(() => {
  NProgressPlugin.close() // 结束进度条
})

app.use(router)
app.mount('#app')
