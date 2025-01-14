// types.ts
import type { Directive } from 'vue'

import type { useLightParamsType } from './modules/light'

import type { useLoadingParamsType } from './modules/loading'

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
  vLoading: Directive< HTMLElement, useLoadingParamsType>
}
