import type {
  createApp,
  Directive,
  DirectiveBinding,
} from 'vue'

import directivesLoadingErrorSvg from '@/assets/svgs/directives-loading-error.svg'

import directivesLoadingSvg from '@/assets/svgs/directives-loading.svg' // 使用正确的加载 SVG 路径

/**
 * CanvasLoading指令的参数类型
 */
export type UseCanvasLoadingParamsType = {

  /**
   * 是否处于加载状态
   */
  isLoading: boolean

  /**
   * 加载loading svg和错误 svg的大小
   * @default 20
   */
  size?: number

  /**
   * 错误信息的选项
   */
  error?: {

    /**
     * 是否显示错误文本
     * @default false
     */
    isShow: boolean

    /**
     * 错误文本
     * @default '模型加载失败'
     */
    text?: string

    /**
     * 错误超时时间 (ms)
     * @default 10000
     */
    timeout?: number
  } | boolean
} | boolean

/**
 * 自定义元素类型
 */
type CustomHTMLElementType = {

  /**
   * 保存加载动画的 Vue 应用实例
   */
  _loadingApp?: ReturnType<typeof createApp>

  /**
   * 保存加载动画的 DOM 元素
   */
  _loadingSpinner?: HTMLElement

  /**
   * 保存定时器的 ID
   */
  _timeoutId?: number

  /**
   * 保存错误信息的容器 DOM 元素
   */
  _errorContainer?: HTMLElement
} & HTMLElement // 继承自原生的 HTMLElement

/**
 *  CanvasLoading指令
 */
const useCanvasLoading: Directive = {
  /**
   * 在元素挂载时调用的钩子，初始化加载状态并创建加载动画。
   * @param {CustomHTMLElementType} el - 绑定指令的元素。
   * @param {DirectiveBinding<UseCanvasLoadingParamsType>} binding - 指令绑定的值。
   */
  mounted(el: CustomHTMLElementType, binding: DirectiveBinding<UseCanvasLoadingParamsType>) {
    const parent = el.parentNode as HTMLElement

    const normalizedOptions = normalizeBinding(binding.value)

    if (!parent) {
      console.warn('未找到元素的父节点。')
      return
    }

    // 确保父节点设置相对定位
    if (getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative'
    }

    // 创建容器，包含加载 SVG 和可能的错误信息
    const container = document.createElement('div')

    Object.assign(container.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '10',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    })

    /**
     * 加载 SVG 元素
     */
    const loadingSvg = document.createElement('img')

    loadingSvg.src = directivesLoadingSvg

    Object.assign(loadingSvg.style, {
      width: `${normalizedOptions.size}px`,
      height: `${normalizedOptions.size}px`,
      animation: 'spin 2s linear infinite', // 添加动画属性
    })

    // 定义旋转动画
    const styleSheet = document.styleSheets[0]

    const keyframes
      = `@keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }`

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length)

    container.appendChild(loadingSvg)

    // 放到父节点里
    parent.appendChild(container)

    // 保存实例以便后续清理
    el._loadingSpinner = container

    // 初始化加载状态
    setLoadingState(el, normalizedOptions)
  },

  /**
   * 在元素更新时调用的钩子，根据新的绑定值更新加载状态。
   * @param {CustomHTMLElementType} el - 绑定指令的元素。
   * @param {DirectiveBinding<UseCanvasLoadingParamsType>} binding - 更新后的指令绑定值。
   */
  updated(el: CustomHTMLElementType, binding: DirectiveBinding<UseCanvasLoadingParamsType>) {
    const normalizedOptions = normalizeBinding(binding.value)

    // 动态控制显示和隐藏
    setLoadingState(el, normalizedOptions)
  },

  /**
   * 在元素卸载时调用的钩子，清理动态挂载的实例和 DOM。
   * @param {CustomHTMLElementType} el - 绑定指令的元素。
   */
  unmounted(el: CustomHTMLElementType) {
    // 清理动态挂载的实例和 DOM
    if (el._loadingSpinner) {
      el._loadingSpinner.remove()
    }

    if (el._errorContainer) {
      el._errorContainer.remove()
    }

    clearTimeout(el._timeoutId)

    el._loadingSpinner = undefined
    el._timeoutId = undefined
    el._errorContainer = undefined
  },
}

/**
 * 规范化指令绑定值，返回标准化的加载选项对象。
 * @param {UseCanvasLoadingParamsType} bindingValue - 指令绑定的值。
 * @returns {object} 标准化的加载选项对象。
 */
function normalizeBinding(
  bindingValue: UseCanvasLoadingParamsType,
): { isLoading: boolean, size: number, error: { isShow: boolean, text: string, timeout: number } } {
  if (typeof bindingValue === 'boolean') {
    return {
      isLoading: bindingValue,
      size: 30,
      error: {
        isShow: false,
        text: '模型加载失败',
        timeout: 10000,
      },
    }
  }

  return {
    isLoading: bindingValue.isLoading,
    size: bindingValue.size ?? 30,
    error: typeof bindingValue.error === 'boolean'
      ? {
          isShow: bindingValue.error,
          text: '模型加载失败',
          timeout: 10000,
        }
      : {
          isShow: bindingValue.error?.isShow ?? false,
          text: bindingValue.error?.text ?? '模型加载失败',
          timeout: bindingValue.error?.timeout ?? 10000,
        },
  }
}

/**
 * 设置加载状态，根据 isLoading 控制加载动画和错误信息的显示。
 * @param {CustomHTMLElementType} el - 绑定指令的元素。
 * @param {{ isLoading: boolean, size: number, error: { isShow: boolean, text: string, timeout: number } }} options - 加载状态和选项。
 */
function setLoadingState(
  el: CustomHTMLElementType,
  options: { isLoading: boolean, size: number, error: { isShow: boolean, text: string, timeout: number } },
) {
  const { isLoading, size, error } = options

  if (el._loadingSpinner) {
    // 根据 isLoading 动态控制显示和隐藏
    el._loadingSpinner.style.display = isLoading ? 'flex' : 'none'
    el.style.opacity = isLoading ? '0' : '1'

    if (isLoading) {
      clearTimeout(el._timeoutId) // 清除之前的定时器

      if (error.isShow) {
        el._timeoutId = window.setTimeout(() => {
          if (el._loadingSpinner) {
            // 移除加载 SVG
            el._loadingSpinner.innerHTML = ''

            // 创建错误内容容器
            const errorContent = document.createElement('div')

            // 创建错误 SVG 元素
            const errorSvg = document.createElement('img')

            errorSvg.src = directivesLoadingErrorSvg
            errorSvg.style.width = `${size}px`
            errorSvg.style.height = `${size}px`

            errorContent.appendChild(errorSvg)

            // 创建错误文本元素
            const errorTextElement = document.createElement('div')

            errorTextElement.textContent = error.text
            errorContent.appendChild(errorTextElement)

            Object.assign(errorContent.style, {
              zIndex: '10',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              marginTop: '10px',
              fontSize: '14px',
            })
            el._errorContainer = errorContent

            el._loadingSpinner.appendChild(errorContent)

            el.style.opacity = '1'
          }
        }, error.timeout)
      }
    }
    else {
      clearTimeout(el._timeoutId)
      if (el._errorContainer) {
        el._errorContainer.remove()
        el._errorContainer = undefined
      }
    }
  }
}

export default useCanvasLoading
