/**
 * 浏览器前缀数组，用于兼容不同浏览器的 requestAnimationFrame 实现
 */
const prefixes = ['webkit', 'moz', 'ms', 'o']

/**
 * 判断是否在服务端环境
 */
const isServer = typeof window === 'undefined'

/**
 * 记录上次执行时间，用于降级方案
 */
let lastTime = 0

type RAF = (callback: FrameRequestCallback) => number

/**
 * cancelAnimationFrame 类型定义
 */
type CAF = (handle: number) => void

/**
 * 兼容性 requestAnimationFrame 实现
 * 支持各种浏览器前缀，并提供降级方案
 */
const requestAnimationFrame: RAF = (() => {
  // 服务端环境直接返回空函数
  if (isServer) {
    return function () {
      return 0
    }
  }

  // 尝试获取标准的 requestAnimationFrame
  let raf: RAF | undefined = window.requestAnimationFrame

  // 如果标准方法不存在，尝试带前缀的方法
  if (typeof raf !== 'function') {
    for (const prefix of prefixes) {
      raf = (window as any)[`${prefix}RequestAnimationFrame`]
      if (typeof raf === 'function') {
        break
      }
    }
  }

  // 如果所有方法都不存在，使用 setTimeout 降级方案
  if (typeof raf !== 'function') {
    return function (callback: FrameRequestCallback): number {
      const currTime = new Date().getTime()

      // 计算下次调用时间，确保 60fps (16ms 间隔)
      const timeToCall = Math.max(0, 16 - (currTime - lastTime))

      const id = window.setTimeout(() => {
        callback(currTime + timeToCall)
      }, timeToCall)

      lastTime = currTime + timeToCall
      return id
    }
  }

  // 绑定到 window 对象并返回
  return raf.bind(window)
})()

/**
 * 兼容性 cancelAnimationFrame 实现
 * 支持各种浏览器前缀，并提供降级方案
 */
const cancelAnimationFrame: CAF = (() => {
  // 服务端环境直接返回空函数
  if (isServer) {
    return function () {}
  }

  // 尝试获取标准的 cancelAnimationFrame
  let caf: CAF | undefined = window.cancelAnimationFrame

  // 如果标准方法不存在，尝试带前缀的方法
  if (typeof caf !== 'function') {
    for (const prefix of prefixes) {
      caf
        = (window as any)[`${prefix}CancelAnimationFrame`]
          || (window as any)[`${prefix}CancelRequestAnimationFrame`]
      if (typeof caf === 'function') {
        break
      }
    }
  }

  // 如果所有方法都不存在，使用 clearTimeout 降级方案
  if (typeof caf !== 'function') {
    return function (id: number) {
      window.clearTimeout(id)
    }
  }

  // 绑定到 window 对象并返回
  return caf.bind(window)
})()

export {
  cancelAnimationFrame,
  requestAnimationFrame,
}
