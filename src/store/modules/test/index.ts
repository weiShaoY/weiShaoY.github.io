import router from '@/router'

import { testChildRouterList } from '@/router/modules/test'

import { defineStore } from 'pinia'

import { ref } from 'vue'

import {
  getAllBreadcrumbList,
  getFlatMenuList,
  getShowMenuList,
} from './utils'

/**
 * 定义名为 'test' 的 store
 */
export const useTestStore = defineStore('test', () => {
  const global = ref<BlogType.GlobalType>({
    /**
     * 布局模式
     * 纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
     */
    layout: 'vertical',

    /**
     * element 组件大小
     */
    assemblySize: 'default',

    /**
     * 当前页面是否全屏
     */
    maximize: false,

    /**
     * 主题颜色
     */
    primary: import.meta.env.VITE_APP_BLOG_THEME_COLOR,

    /**
     * 深色模式
     */
    isDark: false,

    /**
     * 灰色模式
     */
    isGrey: false,

    /**
     * 色弱模式
     */
    isWeak: false,

    /**
     * 侧边栏反转
     */
    asideInverted: false,

    /**
     * 头部反转
     */
    headerInverted: false,

    /**
     * 折叠菜单
     */
    isCollapse: false,

    /**
     * 菜单手风琴
     */
    accordion: true,

    /**
     * 页面水印
     */
    watermark: false,

    /**
     * 面包屑导航
     */
    breadcrumb: true,

    /**
     * 面包屑导航图标
     */
    breadcrumbIcon: true,

    /**
     * 标签页
     */
    tabs: true,

    /**
     * 标签页图标
     */
    tabsIcon: true,

    /**
     * 页脚
     */
    footer: true,
  })

  /**
   * 设置全局状态中的指定属性
   * @param key 要更新的全局状态键
   * @param value 要设置的值
   */
  function setGlobal<T extends keyof BlogType.GlobalType>(
    key: T,
    value: BlogType.GlobalType[T],
  ) {
    global.value[key] = value
  }

  const auth = ref<BlogType.AuthType>({
    /**
     *  按钮权限列表
     */
    authButtonList: {
    },

    /**
     *  菜单权限列表
     */
    authMenuList: testChildRouterList,

    /**
     *  当前页面的 router name，用来做按钮权限筛选
     */
    routeName: '',
  })

  /**
   *  菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
   */
  function showMenuListGet() {
    // return getShowMenuList(auth.value.authMenuList)
    return getShowMenuList(auth.value.authMenuList)
  }

  /**
   *  菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
   */
  function flatMenuListGet() {
    return getFlatMenuList(auth.value.authMenuList)
  }

  /**
   *  递归处理后的所有面包屑导航列表
   */
  function breadcrumbListGet() {
    return getAllBreadcrumbList(auth.value.authMenuList)
  }

  const keepAlive = ref<BlogType.KeepAliveType>({
    keepAliveName: [],
  })

  /**
   * 添加需要缓存的组件名称
   * @param name 组件名称
   */
  function addKeepAliveName(name: string) {
    if (!keepAlive.value.keepAliveName.includes(name)) {
      keepAlive.value.keepAliveName.push(name)
    }
  }

  /**
   * 移除已缓存的组件名称
   * @param name 组件名称
   */
  function removeKeepAliveName(name: string) {
    keepAlive.value.keepAliveName = keepAlive.value.keepAliveName.filter(
      item => item !== name,
    )
  }

  const tabs = ref<BlogType.TabsType>({
    tabsMenuList: [],
  })

  /**
   * 添加标签页
   * @param tabItem - 需要添加的标签项
   */
  function addTabs(tabItem: BlogType.TabsMenuProps) {
    if (tabs.value.tabsMenuList.every(item => item.path !== tabItem.path)) {
      tabs.value.tabsMenuList.push(tabItem)
    }

    // 添加 keepAlive 缓存
    if (
      !keepAlive.value.keepAliveName.includes(tabItem.name)
      && tabItem.isKeepAlive
    ) {
      addKeepAliveName(tabItem.path)
    }
  }

  /**
   * 移除标签页
   * @param  tabPath - 需要移除的标签路径
   * @param   [isCurrent] - 是否为当前激活的标签页
   */
  function removeTabs(tabPath: string, isCurrent: boolean = true) {
    if (isCurrent) {
      tabs.value.tabsMenuList.forEach((item, index) => {
        if (item.path !== tabPath) {
          return
        }

        const nextTab
          = tabs.value.tabsMenuList[index + 1]
            || tabs.value.tabsMenuList[index - 1]

        if (!nextTab) {
          return
        }

        router.push(nextTab.path)
      })
    }

    // 移除 keepAlive 缓存
    const tabItem = tabs.value.tabsMenuList.find(
      item => item.path === tabPath,
    )

    tabItem?.isKeepAlive && removeKeepAliveName(tabItem.path)

    // 更新标签列表
    tabs.value.tabsMenuList = tabs.value.tabsMenuList.filter(
      item => item.path !== tabPath,
    )
  }

  /**
   * 关闭左侧或右侧的标签页
   * @param {string} path - 当前标签页路径
   * @param {"left" | "right"} type - 关闭的方向（左侧或右侧）
   */
  function closeTabsOnSide(path: string, type: 'left' | 'right') {
    const currentIndex = tabs.value.tabsMenuList.findIndex(item => item.path === path)

    if (currentIndex !== -1) {
      const range = type === 'left' ? [0, currentIndex] : [currentIndex + 1, tabs.value.tabsMenuList.length]

      tabs.value.tabsMenuList = tabs.value.tabsMenuList.filter((item, index) => {
        return index < range[0] || index >= range[1] || !item.close
      })
    }

    // 更新 keepAlive 缓存
    const KeepAliveList = tabs.value.tabsMenuList.filter(item => item.isKeepAlive)

    keepAlive.value.keepAliveName = (KeepAliveList.map(item => item.path))
  }

  /**
   * 关闭多个标签页
   * @param  tabsMenuValue - 保留的标签页路径（可选）
   */
  function closeMultipleTab(tabsMenuValue?: string) {
    tabs.value.tabsMenuList = tabs.value.tabsMenuList.filter((item) => {
      return item.path === tabsMenuValue || !item.close
    })

    // 更新 keepAlive 缓存
    const KeepAliveList = tabs.value.tabsMenuList.filter(
      item => item.isKeepAlive,
    )

    keepAlive.value.keepAliveName = KeepAliveList.map(item => item.path)
  }

  return {
    global,
    setGlobal,
    auth,
    showMenuListGet,
    flatMenuListGet,
    breadcrumbListGet,
    keepAlive,
    addKeepAliveName,
    removeKeepAliveName,
    tabs,
    addTabs,
    removeTabs,
    closeTabsOnSide,
    closeMultipleTab,
  }
})
