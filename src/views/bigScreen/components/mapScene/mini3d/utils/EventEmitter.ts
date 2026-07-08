/**
 * 事件回调函数类型
 */
type EventCallback = (...args: any[]) => void

/**
 * 事件映射类型
 */
type EventMap = Map<string, Set<EventCallback>>

/**
 * 事件发射器类
 * @description 提供事件监听、触发和管理的功能
 * @description 支持多个监听器、一次性监听器等功能
 * @description 使用Map和Set数据结构高效管理事件和回调
 * @description 适用于组件间通信、状态管理等场景
 */
export class EventEmitter {
  /**
   * 事件映射表
   * @description 存储事件名称和对应的回调函数集合
   * @description 使用Map存储事件，Set存储回调函数（避免重复）
   */
  public events: EventMap

  /**
   * 构造函数
   * @description 初始化事件发射器
   */
  constructor() {
    // 用一个 map 来存放事件和事件回调
    this.events = new Map()
  }

  /**
   * 监听事件
   * @description 为指定事件添加回调函数
   * @description 支持为同一事件添加多个回调函数
   * @param event - 事件名称
   * @param callback - 事件回调函数
   */
  on(event: string, callback: EventCallback): void {
    let callbacks = this.events.get(event) // 获取事件的回调函数列表

    // 如果不存在该事件的回调函数列表，则新建一个
    if (!callbacks) {
      callbacks = new Set()
      this.events.set(event, callbacks)
    }

    callbacks.add(callback) // 添加回调函数到列表中
  }

  /**
   * 取消监听事件
   * @description 移除指定事件的回调函数
   * @description 如果提供回调函数则只移除该回调，否则移除所有回调
   * @param event - 事件名称
   * @param callback - 要移除的回调函数（可选）
   */
  off(event: string, callback?: EventCallback): void {
    const callbacks = this.events.get(event) // 获取事件的回调函数列表

    if (callbacks) {
      if (callback) {
        // 如果提供了回调函数，则删除指定的回调函数
        callbacks.delete(callback)
      }
      else {
        // 否则，将该事件的所有回调函数都删除
        this.events.delete(event)
      }
    }
  }

  /**
   * 触发事件
   * @description 触发指定事件，调用所有注册的回调函数
   * @description 支持传递任意数量的参数给回调函数
   * @param event - 事件名称
   * @param args - 传递给回调函数的参数
   */
  emit(event: string, ...args: any[]): void {
    const callbacks = this.events.get(event) // 获取事件的回调函数列表

    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(...args) // 依次调用回调函数，并传递参数
      })
    }
  }

  /**
   * 绑定只执行一次的事件监听器
   * @description 为指定事件添加一次性回调函数
   * @description 回调函数执行后会自动移除监听器
   * @param event - 事件名称
   * @param callback - 一次性回调函数
   */
  once(event: string, callback: EventCallback): void {
    // 在一个匿名函数中包裹回调函数，用于在回调函数执行完毕后将其删除
    const onceWrapper = (...args: any[]) => {
      callback(...args)
      this.off(event, onceWrapper)
    }

    this.on(event, onceWrapper)
  }

  /**
   * 获取指定事件的监听器数量
   * @param event - 事件名称
   * @returns 监听器数量
   */
  listenerCount(event: string): number {
    const callbacks = this.events.get(event)

    return callbacks ? callbacks.size : 0
  }

  /**
   * 获取所有事件名称
   * @returns 事件名称数组
   */
  eventNames(): string[] {
    return Array.from(this.events.keys())
  }

  /**
   * 移除所有事件监听器
   * @description 清空所有事件和对应的回调函数
   */
  removeAllListeners(): void {
    this.events.clear()
  }

  /**
   * 检查是否有指定事件的监听器
   * @param event - 事件名称
   * @returns 是否存在监听器
   */
  hasListeners(event: string): boolean {
    const callbacks = this.events.get(event)

    return callbacks ? callbacks.size > 0 : false
  }
}
