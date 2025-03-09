import type { Directive } from 'vue'

import type { UseCanvasLoadingParamsType } from './modules/canvas-loading'

import type { UseCopyParamsType } from './modules/copy'

import type { DebounceParamsType } from './modules/debounce'

import type { UseLightParamsType } from './modules/light'

import type { ThrottleParamsType } from './modules/throttle'

/**
 *  vue指令类型
 */
export type DirectivesType = {

  /**
   *  动画文字指令
   */
  vAnimatedText: Directive<HTMLElement>

  /**
   *  Canvas 加载指令
   */
  vCanvasLoading: Directive<HTMLElement, UseCanvasLoadingParamsType>

  /**
   *  点击复制指令
   */
  vCopy: Directive<HTMLElement, UseCopyParamsType>

  /**
   *  按钮防抖指令
   */
  vDebounce: Directive<HTMLElement, DebounceParamsType>

  /**
   *  鼠标光源指令
   */
  vLight: Directive<HTMLElement, UseLightParamsType>

  /**
   *  按钮节流指令
   */
  vThrottle: Directive<HTMLElement, ThrottleParamsType>
}
