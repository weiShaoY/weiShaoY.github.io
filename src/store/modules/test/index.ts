import { router } from '@/router'

import { testRouterList } from '@/router/modules/test'

import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 *  Index模块
 */
export const useTestStore = defineStore('test', () => {
  /**
   *  路由-博客模块首页路径
   */
  const BLOG_HOME = import.meta.env.VITE_ROUTER_BLOG_HOME_PATH

  /**
   *  index
   */
  const setting = ref({

    /**
     *  菜单
     */
    menu: {
      leftMenuWidth: 80,
      rightMenuWidth: 252,
    },

    /**
     *  水印
     */
    watermark: {
      isShow: false,
      text: import.meta.env.VITE_APP_TITLE,
    },

    /**
     *  头部
     */
    header: {
      height: 60,
    },

    // /**
    //  *  选项卡
    //  */
    tab: {
      height: 45,
    },

    // 135
    /**
     *  容器
     */
    container: {
      maxWidth: '100%', //  100% 1200px
      minHeight: `calc(100vh - 139px)`,
    },
  })

  /**
   *  是否刷新
   */
  const isRefresh = ref(true)

  /**
   *  菜单列表
   */
  const menuList = ref<RouterType.BlogRouteRecordRaw[]>(testRouterList)

  /**
   *  搜索历史列表
   */
  const searchHistoryList = ref<RouterType.BlogRouteRecordRaw[]>([])

  /**
   *  已经打开的选项卡
   */
  const openedTabList = ref<BlogType.Tab[]>([])

  /**
   *  当前激活的选项卡
   */
  const currentTab = ref<Partial<BlogType.Tab>>({
  })

  /**
   *  需要排除缓存的组件名称
   */
  const keepAliveExclude = ref<string[]>([])

  /**
   * 将指定选项卡添加到 keepAlive 排除列表中，只有当该选项卡的 keepAlive 为 true 时才进行添加
   * @param tab 选项卡对象
   */
  const addKeepAliveExclude = (tab: BlogType.Tab) => {
    if (tab.keepAlive && tab.name && !keepAliveExclude.value.includes(tab.name)) {
      keepAliveExclude.value.push(tab.name)
    }
  }

  /**
   * 将传入的一组选项卡的组件名称标记为排除缓存
   * @param tabs 需要标记的选项卡数组
   */
  const markTabsToRemove = (tabs: BlogType.Tab[]) => {
    tabs.forEach((tab) => {
      if (tab.name) {
        addKeepAliveExclude(tab)
      }
    })
  }

  // 核心操作函数

  /**
   * 关闭指定的选项卡，并处理激活状态和路由跳转
   * @param path 要关闭的路由路径
   */
  const removeTab = (path: string) => {
    const noCurrentTab = openedTabList.value.find(tab => tab.path === path)

    const index = openedTabList.value.findIndex(tab => tab.path === path)

    if (index === -1) {
      return
    }

    openedTabList.value.splice(index, 1)

    // 若关闭后无选项卡，且关闭的不是首页，则跳转首页
    if (!openedTabList.value.length && path !== BLOG_HOME) {
      router.push(BLOG_HOME)
      return
    }

    // 若关闭的是当前激活标签，则标记其为缓存排除，并激活相邻标签
    if (currentTab.value.path === path) {
      if (currentTab.value.name) {
        addKeepAliveExclude(currentTab.value as BlogType.Tab)
      }

      const newIndex = index >= openedTabList.value.length ? openedTabList.value.length - 1 : index

      currentTab.value = openedTabList.value[newIndex]
      router.push(currentTab.value.path as string)
    }
    else if (noCurrentTab?.name) {
      addKeepAliveExclude(noCurrentTab)
    }
  }

  /**
   * 关闭当前标签左侧（不包括首页）的所有选项卡
   * @param path 当前选项卡的路由路径
   */
  const removeLeft = (path: string) => {
    const index = openedTabList.value.findIndex(tab => tab.path === path)

    if (index > 1) {
      const tabsToRemove = openedTabList.value.slice(1, index)

      markTabsToRemove(tabsToRemove)
      openedTabList.value.splice(1, index - 1)
    }
  }

  /**
   * 关闭当前标签右侧的所有选项卡
   * @param path 当前选项卡的路由路径
   */
  const removeRight = (path: string) => {
    const index = openedTabList.value.findIndex(tab => tab.path === path)

    if (index !== -1 && index < openedTabList.value.length - 1) {
      const tabsToRemove = openedTabList.value.slice(index + 1)

      markTabsToRemove(tabsToRemove)
      openedTabList.value.splice(index + 1)
    }
  }

  /**
   * 关闭除当前标签和首页外的所有选项卡
   * @param path 当前选项卡的路由路径
   */
  const removeOthers = (path: string) => {
    const tabsToRemove = openedTabList.value.filter(
      tab => tab.path !== path && tab.path !== BLOG_HOME,
    )

    markTabsToRemove(tabsToRemove)
    openedTabList.value = openedTabList.value.filter(tab => tab.path === path || tab.path === BLOG_HOME)
  }

  /**
   * 关闭所有选项卡（当传入的 path 不是首页时关闭全部；首页时只保留首页）
   * @param path 当前选项卡的路由路径
   */
  const removeAll = (path: string) => {
    if (path !== BLOG_HOME) {
      markTabsToRemove(openedTabList.value)
      currentTab.value = {
      }
      openedTabList.value = []
      router.push(BLOG_HOME)
    }
    else {
      const tabsToRemove = openedTabList.value.filter(tab => tab.path !== BLOG_HOME)

      markTabsToRemove(tabsToRemove)
      openedTabList.value = openedTabList.value.filter(tab => tab.path === BLOG_HOME)
      if (openedTabList.value.length === 0) {
        router.push(BLOG_HOME)
      }
    }
  }

  // 辅助函数
  /**
   * 辅助函数：比较两个查询参数是否相等
   * @param query1 第一个查询参数
   * @param query2 第二个查询参数
   * @returns 是否相等
   */
  const areQueriesEqual = (query1: any, query2: any): boolean => {
    return JSON.stringify(query1) === JSON.stringify(query2)
  }

  /**
   * 从 keepAlive 排除列表中移除指定组件名称
   * @param name 路由组件名称
   */
  const removeKeepAliveExclude = (name: string) => {
    keepAliveExclude.value = keepAliveExclude.value.filter(item => item !== name)
  }

  /**
   * 打开一个新的标签页或激活已存在的标签页
   * @param tab - 要打开的路由标签页对象，类型为BlogRouteRecordRaw
   */
  const openTab = (tab: BlogType.Tab): void => {
    console.log('%c Line:236 🥛 tab', 'color:#fca650', tab)
    removeKeepAliveExclude(tab.name as string)

    // 从keep-alive的排除列表中移除当前标签页名称
    // 这样该组件可以被缓存
    const index = openedTabList.value.findIndex(item => item.path === tab.path)

    // 如果不存在相同路径的标签页(-1表示未找到)
    if (index === -1) {
      openedTabList.value.push({
        ...tab,
      })
    }
    else {
      // 获取已存在的标签页对象
      const existingTab = openedTabList.value[index]

      if (!areQueriesEqual(existingTab.query, tab.query)) {
        openedTabList.value[index] = {
          ...existingTab,
          query: tab.query,
          title: tab.title || existingTab.title,
        }
      }
    }

    currentTab.value = openedTabList.value[index === -1 ? openedTabList.value.length - 1 : index]
  }

  // /**
  //  * 检查第一个选项卡是否为首页，否则清空所有标签并跳转首页
  //  */
  const checkFirstHomePage = () => {
    if (openedTabList.value.length && openedTabList.value[0].path !== BLOG_HOME) {
      removeAll(BLOG_HOME)
    }
  }

  function init() {
    checkFirstHomePage()
  }

  init()

  return {
    setting,
    isRefresh,

    menuList,
    searchHistoryList,

    openedTabList,
    currentTab,
    keepAliveExclude,

    openTab,
    removeTab,
    removeLeft,
    removeRight,
    removeOthers,
    removeAll,

    // checkFirstHomePage,
    addKeepAliveExclude,
    removeKeepAliveExclude,
    markTabsToRemove,

  }
}, {
  persist: true,
})
