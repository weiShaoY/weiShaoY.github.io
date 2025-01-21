/**
 * 表示具有 $message 属性的 Window 对象。
 */
type Window = {
  $message: any
}

/**
 * 一个通用类型，表示具有字符串键和值类型为 T 的对象。
 */
declare type Recordable<T = any> = Record<string, T>

/**
 * 表示在 Vite 项目中使用的环境变量。
 */
// declare type ViteEnv = {
//   VITE_PORT: number // Vite 服务器的端口号
//   VITE_USE_PWA: boolean // 是否使用 PWA（渐进式 Web 应用）的标志
//   VITE_PUBLIC_PATH: string // 项目的公共路径
//   VITE_PROXY: [string, string][] // 代理设置，数组形式的 [source, target] 对
//   VITE_GLOB_APP_TITLE: string // 全局应用程序标题
//   VITE_GLOB_APP_SHORT_NAME: string // 应用程序的短名称
//   VITE_USE_CDN: boolean // 是否使用 CDN（内容分发网络）的标志
//   VITE_DROP_CONSOLE: boolean // 是否移除控制台语句的标志
//   VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none' // 构建时使用的压缩方法
//   VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean // 是否在压缩后删除原始文件的标志
//   VITE_LEGACY: boolean // 是否启用遗留支持的标志
//   VITE_USE_IMAGEMIN: boolean // 是否使用图片压缩的标志
//   VITE_GENERATE_UI: string // 表示 UI 生成设置的字符串
//   VITE_CDN: string // CDN 的 URL
// }

/**
 * 表示模块键与字符串数组的映射关系。
 */
export type ModuleKeyType = {
  [key: string]: string[]
}

/**
 * 表示 NodeJS 中的超时属性。
 */
export type TimeProp = NodeJS.Timeout

/**
 * 表示父组件的数据结构。
 * - 用于定义需要从父组件传递给子组件的数据。
 */
export type ParentDataType = {

  /**
   * 视频数据数组
   * - 存储视频数据的数组，具体数据结构由实际需求决定。
   */
  videoList: any

  /**
   * 显示更多内容的方法
   * - 用于控制是否展示更多内容的函数，具体实现由父组件定义。
   */
  showMore: (type: number) => void // 修改为接收一个 number 类型的参数

  /**
   * 播放视频的方法
   * - 用于播放指定视频的函数，具体实现由父组件定义。
   */
  playVideo: () => void
}
