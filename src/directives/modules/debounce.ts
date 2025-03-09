import type { Directive, DirectiveBinding } from 'vue'

type DebounceHandlerType = (...args: any[]) => void

/**
 * 防抖指令的参数类型
 */
export type DebounceParamsType = {

  /**
   * 防抖时间（毫秒）
   */
  delay?: number

  /**
   * 回调函数
   */
  handler: DebounceHandlerType
}

type ElType = {
  __handleClick__: () => any
} & HTMLElement

/**
 *  防抖指令
 */
const debounce: Directive = {
  mounted(el: ElType, binding: DirectiveBinding<DebounceParamsType>) {
    const { delay = 500, handler } = binding.value

    if (typeof handler !== 'function') {
      throw new TypeError('handler 必须是一个函数')
    }

    let timer: NodeJS.Timeout | null = null

    el.__handleClick__ = function () {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        handler()
      }, delay)
    }

    el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__)
  },
}

export default debounce
