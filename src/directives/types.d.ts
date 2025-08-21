import type { Directive } from 'vue'

import type { UseCanvasLoadingParamsType } from './modules/canvasLoading'

import type { UseCopyParamsType } from './modules/copy'

import type { DebounceParamsType } from './modules/debounce'

import type { UseLightParamsType } from './modules/light'

import type { ThrottleParamsType } from './modules/throttle'

import type { WaterMarkerParamsType } from './modules/waterMarker'

/**
 *  vue指令类型
 */
export type DirectivesType = {

  /**
   *  逐行文字加载动画指令
   *  @description 用于在绑定的元素上添加逐行文字加载动画效果
   */
  vAnimatedText: Directive<HTMLElement>

  /**
   *  Canvas加载动画指令
   *  @description 用于在绑定的Canvas元素上添加 3D 加载动画效果
   */
  vCanvasLoading: Directive<HTMLElement, UseCanvasLoadingParamsType>

  /**
   *  点击复制指令
   *  @description 用于复制文本到剪贴板
   */
  vCopy: Directive<HTMLElement, UseCopyParamsType>

  /**
   *  防抖指令
   *  @description 防抖指令，用于防止按钮重复点击(输入框防抖)
   */
  vDebounce: Directive<HTMLElement, DebounceParamsType>

  /**
   *  节流指令
   *  @description 节流指令，用于限制函数在一定时间内的执行次数
   */
  vThrottle: Directive<HTMLElement, ThrottleParamsType>

  /**
   *  光源卡片指令
   *  @description 用于在绑定元素上添加光源效果
   */
  vLight: Directive<HTMLElement, UseLightParamsType>

  /**
   *  水印指令
   *  @description 用于在绑定元素上添加水印效果
   */
  vWaterMarker: Directive<HTMLElement, WaterMarkerParamsType>

  /**
   *  代码高亮指令
   *  @description 用于在绑定元素上添加代码高亮效果
   */
  vHighlight: Directive<HTMLElement>
}
