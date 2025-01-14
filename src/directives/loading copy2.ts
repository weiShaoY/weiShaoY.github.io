import type { DirectiveBinding } from 'vue'

import directivesLoadingErrorSvg from '@/assets/svgs/directives-loading-error.svg'

import { Spin } from '@arco-design/web-vue'

import { createApp, h } from 'vue'

type CustomHTMLElement = {
  _loadingApp?: ReturnType<typeof createApp>
  _loadingSpinner?: HTMLElement
  _timeoutId?: number
  _errorSvg?: HTMLElement
  _errorTextElement?: HTMLElement
} & HTMLElement

const useLoading = {
  mounted(el: CustomHTMLElement, binding: DirectiveBinding<{ isLoading: boolean, size?: number, showErrorText?: boolean, errorText?: string } | boolean>) {
    const parent = el.parentNode as HTMLElement

    const value = normalizeBinding(binding.value)

    if (!parent) {
      console.warn('Parent node not found for the element.')
      return
    }

    // 确保父节点设置相对定位
    if (getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative'
    }

    // 创建并挂载 Spin 组件
    const app = createApp({
      render: () => h(Spin, {
        size: value.size,
        class: 'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2',
      }), // 设置加载动画大小和样式
    })

    const vm = app.mount(document.createElement('div'))

    parent.appendChild(vm.$el)

    // 保存实例以便后续清理
    el._loadingApp = app
    el._loadingSpinner = vm.$el as HTMLElement

    // 初始化加载状态
    setLoadingState(el, value.isLoading, value.size, value.showErrorText, value.errorText)
  },

  updated(el: CustomHTMLElement, binding: DirectiveBinding<{ isLoading: boolean, size?: number, showErrorText?: boolean, errorText?: string } | boolean>) {
    const value = normalizeBinding(binding.value)

    // 动态控制显示和隐藏
    setLoadingState(el, value.isLoading, value.size, value.showErrorText, value.errorText)
  },

  unmounted(el: CustomHTMLElement) {
    // 清理动态挂载的实例和 DOM
    if (el._loadingApp) {
      el._loadingApp.unmount()
    }

    if (el._loadingSpinner) {
      el._loadingSpinner.remove()
    }

    if (el._errorSvg) {
      el._errorSvg.remove()
    }

    if (el._errorTextElement) {
      el._errorTextElement.remove()
    }

    clearTimeout(el._timeoutId)

    el._loadingApp = undefined
    el._loadingSpinner = undefined
    el._timeoutId = undefined
    el._errorSvg = undefined
    el._errorTextElement = undefined
  },
}

function setLoadingState(el: CustomHTMLElement, isLoading: boolean, size: number, showErrorText?: boolean, errorText?: string) {
  if (el._loadingSpinner) {
    // 根据 isLoading 动态控制显示和隐藏
    el._loadingSpinner.style.display = isLoading ? 'flex' : 'none'
    el.style.opacity = isLoading ? '0' : '1'

    // 如果正在加载，设置定时器
    if (isLoading) {
      clearTimeout(el._timeoutId) // 清除之前的定时器
      el._timeoutId = window.setTimeout(() => {
        if (el._loadingSpinner) {
          el._loadingSpinner.style.display = 'none'

          // 创建错误 SVG 元素
          const errorSvg = document.createElement('img')

          errorSvg.src = directivesLoadingErrorSvg
          errorSvg.style.width = `${size}px`
          errorSvg.style.height = `${size}px`
          errorSvg.className = 'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'

          el._errorSvg = errorSvg
          el.parentNode?.appendChild(errorSvg)
          el.style.opacity = '1'

          // 创建错误文本元素
          if (showErrorText) {
            const errorTextElement = document.createElement('div')

            errorTextElement.innerText = errorText || '加载错误'
            errorTextElement.className = 'absolute left-1/2  z-10 -translate-x-1/2 text-white text-center' // 调整位置
            errorTextElement.style.top = `calc(50% + ${size}px)`

            el._errorTextElement = errorTextElement
            el.parentNode?.appendChild(errorTextElement)
          }
        }
      }, 5000)
    }
    else {
      clearTimeout(el._timeoutId)
      if (el._errorSvg) {
        el._errorSvg.remove()
        el._errorSvg = undefined
      }

      if (el._errorTextElement) {
        el._errorTextElement.remove()
        el._errorTextElement = undefined
      }
    }
  }
}

function normalizeBinding(bindingValue: { isLoading: boolean, size?: number, showErrorText?: boolean, errorText?: string } | boolean): { isLoading: boolean, size: number, showErrorText?: boolean, errorText?: string } {
  if (typeof bindingValue === 'boolean') {
    return {
      isLoading: bindingValue,
      size: 30,
    }
  }

  return {
    isLoading: bindingValue.isLoading,
    size: bindingValue.size ?? 30,
    showErrorText: bindingValue.showErrorText,
    errorText: bindingValue.errorText,
  }
}

export default useLoading
