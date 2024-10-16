import { createApp } from 'vue'

// import { createRouter, createWebHistory } from 'vue-router/auto'

import App from './App.vue'

// import NProgressPlugin from './utils/nporgress'

import router from './router'

import '@unocss/reset/tailwind.css'

import 'uno.css'

import './assets/iconFont'

import './assets/styles/index.less'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
// })

// // beforeEach路由切换之前触发
// router.beforeEach(() => {
//   NProgressPlugin.start() // 开始进度条
// })

// // afterEach路由切换之后触发
// router.afterEach(() => {
//   NProgressPlugin.close() // 结束进度条
// })
const app = createApp(App)

app.use(router)

app.mount('#app')
