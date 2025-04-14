import { createApp } from 'vue'

import App from './App.vue'

import directives from './directives'

import { setupNProgress, setupUI } from './plugins'

import { setupRouter } from './router'

import pinia from './store'

import './theme/index'

/**
 *  设置应用程序
 */
async function setupApp() {
  // 设置顶部进度条
  setupNProgress()

  const app = createApp(App)

  app.use(directives)

  app.use(pinia)

  // 设置 UI (ElementPlus)
  setupUI(app)

  // 设置路由
  await setupRouter(app)

  app.mount('#app')
}

// 初始化应用程序
setupApp()
