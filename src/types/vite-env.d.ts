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
     *  当前环境
     */
    readonly VITE_APP_NODE_ENV: 'development' | 'production'

    /**
     *  应用的端口号
     */
    readonly VITE_APP_PORT: number

    /**
     * 应用的基本 URL，用于构建和部署应用时的路径
     */
    readonly VITE_APP_BASE_URL: string

    /**
     *  应用的标题，用于页面标题显示
     */
    readonly VITE_APP_TITLE: string

    /**
     *  应用的描述信息，通常用于 SEO 或页面 meta 信息
     */
    readonly VITE_APP_DESC: string

    /**
     *  图标名称的前缀，用于统一应用内的图标命名规则
     */
    readonly VITE_APP_ICON_PREFIX: string

    /**
     *  应用字体家族
     */
    readonly VITE_APP_FONT_FAMILY: string

    /**
     *  Github仓库地址
     */
    readonly VITE_GITHUB_URL: string

    /**
     *  邮箱地址
     */
    readonly VITE_EMAIL_URL: string

    /**
     * 路由-模式
     */
    readonly VITE_ROUTER_MODE: 'hash' | 'history'

    /**
     * 路由-根路径
     */
    readonly VITE_ROUTER_ROOT_PATH: string

    /**
     * 路由-博客模块路径
     */
    readonly VITE_ROUTER_BLOG_PATH: string

    /**
     *  路由-博客模块首页路径
     */
    readonly VITE_ROUTER_BLOG_HOME_PATH: string

  } & ImportMetaEnv
}
