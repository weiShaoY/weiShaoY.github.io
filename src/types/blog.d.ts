/**
 * 博客模块命名类型
 */
declare namespace BlogType {

  /**
   *  主题模式类型
   */
  type ThemeType = 'light' | 'inverted' | 'dark'

  /**
   *  颜色模式（灰色模式或弱色模式）
   */
  type GreyOrWeakType = 'grey' | 'weak'

  /**
   * 布局类型
   * 可选值：'vertical' | 'classic' | 'transverse' | 'columns'
   */
  type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'

  /**
   *  Element 组件大小
   */
  type AssemblySizeType = 'large' | 'default' | 'small'

  /**
   * 全局状态接口
   */
  type GlobalType = {

    /**
     * 布局模式
     * 可选值：'vertical' | 'classic' | 'transverse' | 'columns'
     */
    layout: LayoutType

    /**
     * Element 组件大小
     */
    assemblySize: AssemblySizeType

    /**
     * 当前页面是否全屏
     */
    maximize: boolean

    /**
     * 主题颜色
     */
    primary: string

    /**
     * 是否启用深色模式
     */
    isDark: boolean

    /**
     * 是否启用灰色模式
     */
    isGrey: boolean

    /**
     * 是否启用色弱模式
     */
    isWeak: boolean

    /**
     * 侧边栏反转
     */
    asideInverted: boolean

    /**
     * 头部反转
     */
    headerInverted: boolean

    /**
     * 是否折叠菜单
     */
    isCollapse: boolean

    /**
     * 是否启用菜单手风琴模式
     */
    accordion: boolean

    /**
     * 是否启用页面水印
     */
    watermark: boolean

    /**
     * 是否显示面包屑导航
     */
    breadcrumb: boolean

    /**
     * 是否显示面包屑导航图标
     */
    breadcrumbIcon: boolean

    /**
     * 是否启用标签页
     */
    tabs: boolean

    /**
     * 是否显示标签页图标
     */
    tabsIcon: boolean

    /**
     * 是否显示页脚
     */
    footer: boolean

  }

  /**
   * 标签页菜单属性
   */
  type TabsMenuProps = {

    /**
     * 图标
     */
    icon: string

    /**
     * 标题
     */
    title: string

    /**
     * 路由路径
     */
    path: string

    /**
     * 路由名称
     */
    name: string

    /**
     * 是否可关闭
     */
    close: boolean

    /**
     * 是否启用 KeepAlive 缓存
     */
    isKeepAlive: boolean

  }

  type TabsType = {
    tabsMenuList: TabsMenuProps[]
  }

  /**
   * KeepAlive 状态
   */
  type KeepAliveType = {
    /**
     * KeepAlive 缓存的组件名称列表
     */
    keepAliveName: string[]
  }

  type AuthType = {
    routeName: string
    authButtonList: {
      [key: string]: string[]
    }
    authMenuList: MenuType.MenuOptions[]
  }

}
