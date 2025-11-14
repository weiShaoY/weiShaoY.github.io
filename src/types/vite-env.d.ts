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
     * 运行环境
     * @default development
     */
    readonly VITE_APP_ENV: 'development' | 'production'

    /**
     * 应用部署基路径 (影响构建产物的资源路径)
     * @default /
     */
    readonly VITE_APP_BASE_URL: string

    /**
     * 应用开发服务器端口号
     * @default 1819
     */
    readonly VITE_APP_PORT: number

    /**
     * 应用显示名称 (用于页面标题和浏览器标签)
     */
    readonly VITE_APP_TITLE: string

    /**
     * 应用描述信息 (用于 SEO 和社交媒体分享)
     */
    readonly VITE_APP_DESC: string

    /**
     * 应用全局字体家族 (需在 CSS 中定义对应字体)
     */
    readonly VITE_APP_FONT_FAMILY: string

    /**
     * 应用内图标名称的前缀 (用于统一管理Svg图标命名)
     * @default icon
     */
    readonly VITE_APP_ICON_PREFIX: string

    /**
     * 路由模式 (hash: 带#号路径 | history: 标准路径)
     * @default history
     */
    readonly VITE_ROUTER_MODE: RouterHistoryMode

    /**
     * 路由根路径 (应用入口页面)
     * @default /home/about
     */
    readonly VITE_ROUTER_ROOT_PATH: string

    /**
     * 管理模块路由前缀
     * @default /admin
     */
    readonly VITE_ROUTER_ADMIN_PATH: string

    /**
     * 管理模块默认首页
     * @default /admin/workbench
     */
    readonly VITE_ROUTER_ADMIN_HOME_PATH: string

    /**
     * 应用的在线演示地址
     */
    readonly VITE_APP_DEMO_URL: string

    /**
     * 应用的 Github 仓库地址
     */
    readonly VITE_APP_REPO_URL: string

    /**
     * 个人的 Github 主页地址
     */
    readonly VITE_GITHUB_URL: string

    /**
     * 个人的邮箱地址 (外部联系方式)
     */
    readonly VITE_CONTACT_EMAIL: string

    /**
     * 接口-第三方代理地址 (ThingProxy 最快的免费代理服务，重要，影响接口访问)
     *
     * @description
     * ThingProxy 是一个免费的跨域代理服务，用于解决前端开发中的 CORS 限制问题。
     * 特性：
     * - 无需后端配置 CORS 头
     * - 支持 GET/POST 等常见 HTTP 方法
     * - 免费且响应速度较快
     *
     * @example
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
