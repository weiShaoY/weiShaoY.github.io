/* eslint-disable eslint-comments/no-unlimited-disable */
const opt = Object.prototype.toString

/**
 * 判断对象是否为数组
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果是数组，返回 true，否则返回 false
 */
export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === '[object Array]'
}

/**
 * 判断对象是否为普通对象
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果是普通对象，返回 true，否则返回 false
 */
export function isObject(obj: any): obj is { [key: string]: any } {
  return opt.call(obj) === '[object Object]'
}

/**
 * 判断对象是否为字符串
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果是字符串，返回 true，否则返回 false
 */
export function isString(obj: any): obj is string {
  return opt.call(obj) === '[object String]'
}

/**
 * 判断对象是否为数字
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果是数字，返回 true，否则返回 false
 */
export function isNumber(obj: any): obj is number {
  return opt.call(obj) === '[object Number]' && obj === obj; // eslint-disable-line
}

/**
 * 判断对象是否为正则表达式
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果是正则表达式，返回 true，否则返回 false
 */
export function isRegExp(obj: any) {
  return opt.call(obj) === '[object RegExp]'
}

/**
 * 判断对象是否为文件
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果是文件，返回 true，否则返回 false
 */
export function isFile(obj: any): obj is File {
  return opt.call(obj) === '[object File]'
}

/**
 * 判断对象是否为 Blob
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果是 Blob，返回 true，否则返回 false
 */
export function isBlob(obj: any): obj is Blob {
  return opt.call(obj) === '[object Blob]'
}

/**
 * 判断对象是否为 undefined
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果是 undefined，返回 true，否则返回 false
 */
export function isUndefined(obj: any): obj is undefined {
  return obj === undefined
}

/**
 * 判断对象是否为 null
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果是 null，返回 true，否则返回 false
 */
export function isNull(obj: any): obj is null {
  return obj === null
}

/**
 * 判断对象是否为函数
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果是函数，返回 true，否则返回 false
 */
export function isFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === 'function'
}

/**
 * 判断对象是否为空对象
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果是空对象，返回 true，否则返回 false
 */
export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0
}

/**
 * 判断对象是否存在
 * @param {any} obj - 待检测的对象
 * @returns {boolean} 如果对象存在（不为 null 或 undefined），返回 true，否则返回 false
 */
export function isExist(obj: any): boolean {
  return obj || obj === 0
}

/**
 * 判断对象是否为窗口对象
 * @param {any} el - 待检测的对象
 * @returns {boolean} 如果是窗口对象，返回 true，否则返回 false
 */
export function isWindow(el: any): el is Window {
  return el === window
}
