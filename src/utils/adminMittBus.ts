/**
 * 全局事件总线，用于全局事件的发布与订阅
 * 用法：
 * adminMittBus.on('event', callback)
 * adminMittBus.emit('event', data)
 */
import mitt from 'mitt'

export const adminMittBus = mitt()

export const homeMittBus = mitt()
