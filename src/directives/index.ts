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

export function setDirective(app: App<Element>) {
  Object.keys(directivesMap).forEach((name) => {
    app.directive(name, directivesMap[name])
  })
}
