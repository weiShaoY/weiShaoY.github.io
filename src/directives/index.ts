import type { App, Directive } from 'vue'

import { animatedText } from './modules/animatedText'

import { canvasLoading } from './modules/canvasLoading'

import { copy } from './modules/copy'

import debounce from './modules/debounce'

import { light } from './modules/light'

import { throttle } from './modules/throttle'

import { waterMarker } from './modules/waterMarker'

// 指令映射表

/**
 * 指令映射表
 */
const directivesMap: DirectiveType.DirectivesMapType = {
  animatedText,
  canvasLoading,
  copy,
  debounce,
  light,
  throttle,
  waterMarker,
}

// 指令安装器
// const directives = {
//   install(app: App<Element>) {
//     ;(Object.keys(directivesMap) as Array<keyof DirectiveType.DirectivesMapType>).forEach((name) => {
//       const directive = directivesMap[name]

//       // 不同指令的绑定值类型不同，统一按 Directive 注册
//       app.directive(name as string, directive as Directive)
//     })
//   },
// }

export function setDirective(app: App<Element>) {
  ;(Object.keys(directivesMap) as Array<keyof DirectiveType.DirectivesMapType>).forEach((name) => {
    const directive = directivesMap[name]

    // 不同指令的绑定值类型不同，统一按 Directive 注册
    app.directive(name as string, directive as Directive)
  })
}
