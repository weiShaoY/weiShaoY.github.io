/**
 * 窗口打开选项配置
 */
type WindowOpenOptions = {

  /**
   * 目标窗口上下文
   * @default '_blank'
   */
  target?: '_self' | '_parent' | '_blank' | '_top'

  /**
   * 其他窗口特性参数
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/open#window_features
   */
  [key: string]: any
}

/**
 * 在新窗口/标签页中打开URL
 * @param url - 要打开的URL地址
 * @param options - 窗口配置选项
 * @example
 * // 默认在新标签页打开
 * openUrlInWindow('https://example.com');
 *
 * // 在当前窗口打开并设置窗口特性
 * openUrlInWindow('https://example.com', {
 *   target: '_self',
 *   width: 800,
 *   height: 600
 * });
 */
export function openUrlInWindow(url: string, options?: WindowOpenOptions): Window | null {
  const {
    target = '_blank',
    ...windowFeatures
  } = options || {
  }

  // 将窗口特性对象转换为特征字符串
  const features = Object.entries(windowFeatures)
    .map(([key, value]) => `${key}=${value}`)
    .join(',')

  return window.open(url, target, features)
}
