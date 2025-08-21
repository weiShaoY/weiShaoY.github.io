import type { Directive, DirectiveBinding } from 'vue'

import directivesLoadingErrorSvg from '@/assets/svgs/directives-loading-error.svg'

import directivesLoadingSvg from '@/assets/svgs/directives-loading.svg'

/**
 * CanvasLoading内部标准化参数
 */
type NormalizedOptions = {
  isLoading: boolean
  size: number
  error: {
    isShow: boolean
    text: string
    timeout: number
  }
}

/**
 * 自定义HTMLElement类型
 */
type CustomHTMLElementType = {
  _loadingSpinner?: HTMLElement
  _timeoutId?: number
  _errorContainer?: HTMLElement
} & HTMLElement

/**
 * 是否已经插入了旋转动画
 */
let isSpinAnimationInjected = false

/**
 * 标准化指令绑定值
 * @param {DirectiveType.CanvasLoadingParamsType} bindingValue - 指令绑定的值
 * @returns {NormalizedOptions} - 标准化后的参数
 */
function normalizeBinding(bindingValue: DirectiveType.CanvasLoadingParamsType): NormalizedOptions {
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
 * 控制加载动画和错误信息显示
 * @param {CustomHTMLElementType} el - 绑定指令的元素
 * @param {NormalizedOptions} options - 标准化后的参数
 */
function setLoadingState(el: CustomHTMLElementType, options: NormalizedOptions) {
  const { isLoading, size, error } = options

  if (!el._loadingSpinner) {
    return
  }

  el._loadingSpinner.style.display = isLoading ? 'flex' : 'none'
  el.style.opacity = isLoading ? '0' : '1'

  if (isLoading) {
    if (el._timeoutId) {
      clearTimeout(Number(el._timeoutId))
    }

    if (error.isShow) {
      el._timeoutId = window.setTimeout(() => {
        if (el._loadingSpinner) {
          el._loadingSpinner.innerHTML = ''

          const errorContent = document.createElement('div')

          const errorSvg = document.createElement('img')

          errorSvg.src = directivesLoadingErrorSvg
          errorSvg.style.width = `${size}px`
          errorSvg.style.height = `${size}px`
          errorContent.appendChild(errorSvg)

          const errorText = document.createElement('div')

          errorText.textContent = error.text
          errorContent.appendChild(errorText)

          Object.assign(errorContent.style, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginTop: '10px',
            fontSize: '14px',
          })

          el._loadingSpinner.appendChild(errorContent)
          el._errorContainer = errorContent
          el.style.opacity = '1'
        }
      }, error.timeout)
    }
  }
  else {
    if (el._timeoutId) {
      clearTimeout(Number(el._timeoutId))
    }

    el._errorContainer?.remove()
    el._errorContainer = undefined
  }
}

/**
 * 只插入一次旋转动画
 */
function injectSpinAnimationOnce() {
  if (isSpinAnimationInjected) {
    return
  }

  const style = document.createElement('style')

  style.innerHTML = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`
  document.head.appendChild(style)
  isSpinAnimationInjected = true
}

/**
 * Canvas加载动画指令
 */
export const canvasLoading: Directive = {
  /**
   * 元素挂载时调用
   */
  mounted(el: CustomHTMLElementType, binding: DirectiveBinding<DirectiveType.CanvasLoadingParamsType>) {
    const parent = el.parentNode as HTMLElement | null

    const normalizedOptions = normalizeBinding(binding.value)

    if (!parent) {
      console.warn('CanvasLoading：未找到元素的父节点。')
      return
    }

    if (getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative'
    }

    injectSpinAnimationOnce()

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

    const loadingSvg = document.createElement('img')

    loadingSvg.src = directivesLoadingSvg
    Object.assign(loadingSvg.style, {
      width: `${normalizedOptions.size}px`,
      height: `${normalizedOptions.size}px`,
      animation: 'spin 2s linear infinite',
    })

    container.appendChild(loadingSvg)
    parent.appendChild(container)

    el._loadingSpinner = container

    setLoadingState(el, normalizedOptions)
  },

  /**
   * 元素更新时调用
   */
  updated(el: CustomHTMLElementType, binding: DirectiveBinding<DirectiveType.CanvasLoadingParamsType>) {
    const normalizedOptions = normalizeBinding(binding.value)

    setLoadingState(el, normalizedOptions)
  },

  /**
   * 元素卸载时调用
   */
  unmounted(el: CustomHTMLElementType) {
    el._loadingSpinner?.remove()
    el._errorContainer?.remove()
    if (el._timeoutId) {
      clearTimeout(Number(el._timeoutId))
    }

    el._loadingSpinner = undefined
    el._timeoutId = undefined
    el._errorContainer = undefined
  },
}
