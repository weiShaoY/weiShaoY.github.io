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
     * 应用的基本 URL，用于构建和部署应用时的路径
     * @default /
     */
    readonly VITE_APP_BASE_URL: string

    /**
     * 应用的端口号
     * @default 1819
     */
    readonly VITE_APP_PORT: number

    /**
     *  应用的标题，用于页面标题显示
     */
    readonly VITE_APP_TITLE: string

    /**
     *  应用的描述信息，通常用于 SEO 或页面 meta 信息
     */
    readonly VITE_APP_DESC: string

    /**
     *  应用字体家族
     */
    readonly VITE_APP_FONT_FAMILY: string

    /**
     *  图标名称的前缀，用于统一应用内的图标命名规则
     */
    readonly VITE_APP_ICON_PREFIX: string

    /**
     * 路由-模式
     * @default history
     */
    readonly VITE_ROUTER_MODE: 'hash' | 'history'

    /**
     * 路由-根路径
     * @default /
     */
    readonly VITE_ROUTER_ROOT_PATH: string

    /**
     * 路由-博客模块路径
     */
    readonly VITE_ROUTER_ADMIN_PATH: string

    /**
     * 路由-博客模块首页路径
     */
    readonly VITE_ROUTER_ADMIN_HOME_PATH: string

    /**
     *  Github仓库地址
     */
    readonly VITE_GITHUB_URL: string

    /**
     *  网站在线地址
     */
    readonly VITE_WEBSITE_URL: string

    /**
     *  邮箱地址
     */
    readonly VITE_EMAIL_URL: string

    /**
     * 第三方代理服务配置（ThingProxy）
     *
     * @constant {string}
     * @default ''
     *
     * @description
     * ThingProxy 是一个免费的跨域代理服务，用于解决前端开发中的 CORS 限制问题。
     * 特性：
     * - 无需后端配置 CORS 头
     * - 支持 GET/POST 等常见 HTTP 方法
     * - 免费且响应速度较快
     *
     * @example
     * // 在 vite 环境变量中配置
     * VITE_API_PROXY_URL='https://thingproxy.freeboard.io/fetch/'
     *
     * // 使用示例
     * fetch(`${import.meta.env.VITE_API_PROXY_URL}https://target-api.com/data`)
     *
     * @see [ThingProxy 官网](https://thingproxy.freeboard.io/)
     * @warning 仅限开发环境使用，生产环境应配置正式代理服务
     * @security 注意代理可能记录请求数据，敏感信息需加密
     */
    readonly VITE_API_PROXY_URL: string

  } & ImportMetaEnv
}
