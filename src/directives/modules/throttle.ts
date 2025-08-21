import type { Directive, DirectiveBinding } from 'vue'

type ThrottleHandlerType = (...args: any[]) => void

/**
 * 节流指令的参数类型
 */
export type ThrottleParamsType = {

  /**
   * 节流时间（毫秒）
   */
  delay?: number

  /**
   * 回调函数
   */
  handler: ThrottleHandlerType
}

type ElType = {
  __handleClick__: () => any
} & HTMLElement

/**
 *  节流指令
 *  @description 节流指令，用于限制函数在一定时间内的执行次数
 */
export const throttle: Directive = {
  mounted(el: ElType, binding: DirectiveBinding<ThrottleParamsType>) {
    const { delay = 500, handler } = binding.value

    if (typeof handler !== 'function') {
      throw new TypeError('handler 必须是一个函数')
    }

    let lastExecTime = 0 // 上次执行的时间戳

    const timer: NodeJS.Timeout | null = null

    el.__handleClick__ = function () {
      const now = Date.now()

      // 如果距离上次执行的时间小于 delay，则忽略本次点击
      if (now - lastExecTime < delay) {
        return
      }

      // 更新上次执行时间
      lastExecTime = now

      // 清除之前的定时器
      if (timer) {
        clearTimeout(timer)
      }

      // 执行回调函数
      handler()
    }

    el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__)
  },
}
