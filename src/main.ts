import type { App as VueApp } from 'vue'

import { createApp } from 'vue'

import App from './App.vue'

import directives from './directives'

import {
  setupLoading,
  setupNProgress,
  setupUI,
} from './plugins'

import { setupRouter } from './router'

import pinia from './store'

import './theme/index'

/**
 * 初始化应用程序
 * @description 设置并启动 Vue 应用
 * @returns {Promise<void>}
 * @throws {Error} 当应用初始化失败时抛出错误
 */
async function setupApp(): Promise<void> {
  try {
    // 初始化基础功能
    setupLoading()

    // 设置顶部进度条
    setupNProgress()

    // 创建应用实例
    const app: VueApp = createApp(App)

    // 注册指令
    app.use(directives)

    // 注册状态管理
    app.use(pinia)

    // 设置 UI 框架
    setupUI(app)

    // 设置路由
    await setupRouter(app)

    // 挂载应用
    app.mount('#app')
  }
  catch (error) {
    console.error('应用初始化或挂载失败:', error)
    throw error
  }
}

setupApp()
