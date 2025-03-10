/* Menu */
declare namespace Menu {
  type MenuOptions = {

    /**
     *  路由路径
     */
    path: string

    /**
     *  路由名称
     */
    name: string
    /**
     *  组件，可以是字符串路径或异步加载函数
     */
    component?: string | (() => Promise<{ default: unknown }>)

    /**
     *  跳转重定向路径
     */
    redirect?: string

    /**
     *  路由元信息
     */
    meta: MetaProps

    /**
     *  子菜单
     */
    children?: MenuOptions[]
  }

  type MetaProps = {

    /**
     *  图标
     */
    icon: string

    /**
     *  标题
     */
    title: string

    /**
     *  高亮的菜单路径
     */
    activeMenu?: string

    /**
     *  外链地址
     */
    isLink?: string

    /**
     *  是否隐藏
     */
    isHide: boolean

    /**
     *  是否全屏
     */
    isFull: boolean

    /**
     *  是否固定在标签页
     */
    isAffix: boolean

    /**
     *  是否缓存
     */
    isKeepAlive: boolean
  }
}
