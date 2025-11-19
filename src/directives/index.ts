import type { App, Directive } from 'vue'

import { animatedText } from './modules/animatedText'

import { canvasLoading } from './modules/canvasLoading'

import { copy } from './modules/copy'

import debounce from './modules/debounce'

import { light } from './modules/light'

import { throttle } from './modules/throttle'

import { waterMarker } from './modules/waterMarker'

/**
 * 指令映射表
 */
const directivesMap: { [key: string]: Directive } = {
  animatedText,
  canvasLoading,
  copy,
  debounce,
  light,
  throttle,
  waterMarker,
}

/**
 * 注册指令
 * @description 遍历指令映射表，将每个指令注册到 Vue 应用实例中
 * @param {App<Element>} app - Vue 应用实例
 */
export function setDirectives(app: App<Element>) {
  Object.keys(directivesMap).forEach((name) => {
    app.directive(name, directivesMap[name])
  })
}
