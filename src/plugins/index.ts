import type { App as VueApp } from 'vue'

import { setElementPlus } from './elementPlus'

import { setupInitialLoading } from './initialLoading'

import { setupNProgress } from './nprogress'

import { setWelcome } from './welcome'

import './svgIcons'

/**
 * 设置插件
 * @param app - Vue 应用实例
 */
export function setupPlugins(app: VueApp) {
  setWelcome()

  setupNProgress()

  setupInitialLoading()

  setElementPlus(app)
}
