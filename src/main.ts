import type { App as VueApp } from 'vue'

import { createApp } from 'vue'

import App from './App.vue'

import { setDirective } from './directives'

import { setupPlugins } from './plugins'

import { setupRouter } from './router'

import pinia from './stores'

import './themes/index'

/**
 * 初始化应用程序
 * @description 设置并启动 Vue 应用
 * @returns {Promise<void>}
 * @throws {Error} 当应用初始化失败时抛出错误
 */
async function setupApp(): Promise<void> {
  try {
    // 创建应用实例
    const app: VueApp = createApp(App)

    // 注册状态管理
    app.use(pinia)

    // 设置路由
    await setupRouter(app)

    // 注册指令
    setDirective(app)

    // 设置插件
    setupPlugins(app)

    // 挂载应用
    app.mount('#app')
  }
  catch (error) {
    window.$notification.error('应用初始化或挂载失败:')
    throw error
  }
}

setupApp()
