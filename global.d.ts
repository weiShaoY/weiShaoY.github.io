/* FileType */
declare namespace File {
  type ImageMimeType =
    | 'image/apng'
    | 'image/bmp'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/pjpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/tiff'
    | 'image/webp'
    | 'image/x-icon'

  type ExcelMimeType = 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}

/* Vite */
declare type Recordable<T = any> = Record<string, T>

type ImportMetaEnv = {
  __: unknown
} & ViteEnv

declare type ViteEnv = {

  /**
   *  用户环境
   */
  VITE_NODE_ENV: 'development' | 'production'

  /**
   *  路由模式
   */
  VITE_ROUTER_MODE: 'hash' | 'history'

  /**
   *  打包时是否删除 console
   */
  VITE_DROP_CONSOLE: boolean
}
