// eslint-disable-next-line ts/consistent-type-definitions
interface ImportMeta {
  readonly env: Env.ImportMeta
}

/**
 * 命名空间 Env
 *
 * 用于声明 import.meta 对象的类型
 */
declare namespace Env {

  /** 路由历史模式 */
  type RouterHistoryMode = 'hash' | 'history'

  /** import.meta 接口 */
  type ImportMeta = {

    /**
     * 应用程序的环境
     */
    readonly VITE_APP_ENV: 'development' | 'production'

    /** 应用程序的基本 URL */
    readonly VITE_BASE_URL: string

    /**
     *  应用的标题，用于页面标题显示
     */
    readonly VITE_APP_TITLE: string

    /**
     *  应用的描述信息，通常用于 SEO 或页面 meta 信息
     */
    readonly VITE_APP_DESC: string

    /**
     * 路由历史模式
     */
    readonly VITE_APP_ROUTER_MODE: 'hash' | 'history'

    /**
     * 应用首页地址
     */
    readonly VITE_APP_HOME_PAGE: string

  } & ImportMetaEnv
}
