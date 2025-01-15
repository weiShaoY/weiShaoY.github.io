// types.ts
import type { Directive } from 'vue'

import type { useCanvasLoadingParamsType } from './modules/canvas-loading'

import type { useLightParamsType } from './modules/light'

export type Directives = {

  /**
   *  光源指令
   */
  vLight: Directive<HTMLElement, useLightParamsType >

  /**
   *  动画文字指令
   */
  vAnimatedText: Directive<HTMLElement>

  /**
   *  加载指令
   */
  vLoading: Directive< HTMLElement, useCanvasLoadingParamsType>
}
