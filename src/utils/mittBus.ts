import mitt from 'mitt'

/**
 * 事件总线实例，用于在不同组件之间传递事件
 */
export const mittBus = mitt()
