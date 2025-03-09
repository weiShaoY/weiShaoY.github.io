import type { Handler } from 'mitt'

import type { RouteLocationNormalized } from 'vue-router'

import mitt from 'mitt'

/**
 * code模块 路由变更事件管理类
 * @description 用于管理代码模块的路由变更事件
 * @description 采用发布订阅模式管理路由变化
 */
export class BlogGuard {
  /**
   * 路由事件发射器实例，用于管理事件的发布和订阅
   * @private
   */
  private emitter = mitt()

  /**
   * 存储最新的路由信息，用于立即触发回调
   * @private
   */
  private latestRoute: RouteLocationNormalized | null = null

  /**
   * 路由变更事件的唯一标识符，用于标识路由变化事件
   * @private
   * @readonly
   */
  private readonly ROUTE_CHANGE_EVENT = Symbol('ROUTE_CHANGE')

  /**
   * 发射路由变化事件并更新路由信息
   * @param {RouteLocationNormalized} to - 目标路由
   */
  emitRouteChange(to: RouteLocationNormalized) {
    // 检查目标路由是否属于 `code` 模块
    if (!to.path.startsWith('/blog')) {
      return
    }

    this.emitter.emit(this.ROUTE_CHANGE_EVENT, to)
    this.latestRoute = to
  }

  /**
   * 订阅路由变化事件
   * @param handler - 处理路由变化的回调函数
   * @param immediate - 是否立即执行回调函数
   */
  listenerRouteChange(
    handler: (route: RouteLocationNormalized) => void,
    immediate = true,
  ) {
    this.emitter.on(this.ROUTE_CHANGE_EVENT, handler as Handler)

    // 如果 immediate 为 true 且存在最新路由，则立即执行回调函数
    if (immediate && this.latestRoute && this.latestRoute.path.startsWith('/blog')) {
      handler(this.latestRoute)
    }
  }

  /**
   * 移除路由变化事件的监听器
   */
  removeRouteChange(handler?: Handler) {
    if (handler) {
      this.emitter.off(this.ROUTE_CHANGE_EVENT, handler)
    }
    else {
      this.emitter.off(this.ROUTE_CHANGE_EVENT)
    }
  }
}

export default new BlogGuard()
