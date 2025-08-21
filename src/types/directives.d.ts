/* 全局指令类型命名空间 */

declare namespace DirectiveType {

  /**
   * 基础指令类型
   */
  type BaseDirectiveType = import('vue').Directive<HTMLElement>

  /**
   * v-canvasLoading 指令的参数类型
   */
  type CanvasLoadingParamsType = {

    /** 是否处于加载状态 */
    isLoading: boolean

    /** 加载loading svg和错误 svg的大小 @default 20 */
    size?: number

    /** 错误信息的选项 */
    error?: {

      /** 是否显示错误文本 @default false */
      isShow: boolean

      /** 错误文本 @default '模型加载失败' */
      text?: string

      /** 错误超时时间 (ms) @default 10000 */
      timeout?: number
    } | boolean
  } | boolean

  /**
   * v-copy 指令参数类型
   */
  type CopyParamsType = {

    /** 要复制的文本 */
    text: string

    /** 复制成功后的提示消息 */
    message?: string
  }

  /**
   * v-debounce 指令的参数类型
   * @description 防抖指令的参数类型
   */
  type DebounceParamsType = {

    /** 防抖时间（毫秒） */
    delay?: number

    /** 回调函数 */
    handler: (...args: any[]) => void
  }

  /**
   * v-light 指令的参数类型
   * @description 光源卡片指令参数
   */
  type LightParamsType = {

    /** 宽 */
    width?: number

    /** 高 */
    height?: number

    /** 颜色 */
    color?: string

    /** 模糊 */
    blur?: number

    /** 是否旋转 */
    rotate?: boolean
  }

  /**
   * v-throttle 指令的参数类型
   * @description 节流指令的参数类型
   */
  type ThrottleParamsType = {

    /** 节流时间（毫秒） */
    delay?: number

    /** 回调函数 */
    handler: (...args: any[]) => void
  }

  /**
   * v-waterMarker 指令的参数类型
   * @description 水印指令的参数类型
   */
  type WaterMarkerParamsType = {

    /** 水印文字 */
    text: string

    /** 文字颜色 */
    textColor?: string

    /** 字体样式 */
    font?: string
  }

  /**
   * 指令映射类型
   */
  type DirectivesMapType = {
    animatedText: BaseDirectiveType
    canvasLoading: import('vue').Directive<HTMLElement, CanvasLoadingParamsType>
    copy: import('vue').Directive<HTMLElement, CopyParamsType>
    debounce: import('vue').Directive<HTMLElement, DebounceParamsType>
    light: import('vue').Directive<HTMLElement, LightParamsType>
    throttle: import('vue').Directive<HTMLElement, ThrottleParamsType>
    waterMarker: import('vue').Directive<HTMLElement, WaterMarkerParamsType>
  }

}
