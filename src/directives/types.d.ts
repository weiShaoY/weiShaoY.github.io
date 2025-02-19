// types.ts
import type { Directive } from 'vue'

import type { UseCanvasLoadingParamsType } from './modules/canvas-loading'

import type { UseCopyParamsType } from './modules/copy'

import type { UseLightParamsType } from './modules/light'

export type Directives = {

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
   *  鼠标光源指令
   */
  vLight: Directive<HTMLElement, UseLightParamsType>
}
