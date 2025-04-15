// src/stores/index.ts
// 2025-04-14---17:00---星期一

import { router as vueRouter } from '@/router'

import { testRouterList } from '@/router/modules/test'

import { getPaletteColorByNumber } from '@sa/color'

import {
  breakpointsTailwind,
  useBreakpoints,
} from '@vueuse/core'

import { defineStore } from 'pinia'

import { ref } from 'vue'

import {
  extractTabsByAllRoutes,
  filterTabsByIds,
  filterTabsByPath,
  findBlogRouteByPath,
  getCacheRouteNames,
  getFixedTabPaths,
  getTabByRoute,
  getTabPathByRoute,
  isTabInTabs,
  transformMenuToSearchMenuList,
} from './shared'

const breakpoints = useBreakpoints(breakpointsTailwind)

const osTheme = usePreferredColorScheme()

/**
 *  Index模块
 */
export const useTestStore = defineStore(
  'test',
  () => {
    const theme = ref<BlogType.Theme.Setting>({
      themeScheme: 'light',
      grayscale: false,
      colourWeakness: false,
      recommendColor: false,
      themeColor: '#646cff',
      otherColor: {
        info: '#2080f0',
        success: '#52c41a',
        warning: '#faad14',
        error: '#f5222d',
      },
      isInfoFollowPrimary: true,
      resetCacheStrategy: 'close',
      layout: {
        mode: 'vertical',
        scrollMode: 'content',
        reverseHorizontalMix: false,
      },
      page: {
        animate: true,
        animateMode: 'fade-slide',
      },
      header: {
        height: 56,
        breadcrumb: {
          visible: true,
          showIcon: true,
        },
      },
      tab: {
        visible: true,
        cache: true,
        height: 44,
        mode: 'chrome',
      },
      fixedHeaderAndTab: true,
      sider: {
        inverted: false,
        width: 220,
        collapsedWidth: 64,
        mixWidth: 90,
        mixCollapsedWidth: 64,
        mixChildMenuWidth: 200,
      },
      footer: {
        visible: true,
        fixed: false,
        height: 48,
        right: true,
      },
      watermark: {
        visible: false,
        text: 'SoybeanAdmin',
      },
      tokens: {
        light: {
          colors: {
            'container': 'rgb(255, 255, 255)',
            'layout': 'rgb(247, 250, 252)',
            'inverted': 'rgb(0, 20, 40)',
            'base-text': 'rgb(31, 31, 31)',
          },
          boxShadow: {
            header: '0 1px 2px rgb(0, 21, 41, 0.08)',
            sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
            tab: '0 1px 2px rgb(0, 21, 41, 0.08)',
          },
        },
        dark: {
          colors: {
            'container': 'rgb(28, 28, 28)',
            'layout': 'rgb(18, 18, 18)',
            'base-text': 'rgb(224, 224, 224)',
          },
        },
      },
    })

    /**
     *  主题-函数集合
     */
    const themeFUNC = {
      /**
       * 获取当前是否暗黑模式
       * @returns  是否暗黑模式
       */
      get darkMode() {
        if (theme.value.themeScheme === 'auto') {
          return osTheme.value === 'dark'
        }

        return theme.value.themeScheme === 'dark'
      },

      /**
       *  主题颜色
       */
      get themeColors() {
        const { themeColor, otherColor, isInfoFollowPrimary } = theme.value

        const colors: BlogType.Theme.ThemeColor = {
          primary: themeColor,
          ...otherColor,
          info: isInfoFollowPrimary ? themeColor : otherColor.info,
        }

        return colors
      },

      /**
       * 设置主题方案
       * @param themeScheme 主题方案
       */
      setThemeScheme(themeScheme: BlogType.Theme.Setting['themeScheme']) {
        theme.value.themeScheme = themeScheme
      },

      /** 切换主题方案 */
      toggleThemeScheme() {
        const themeSchemes: BlogType.Theme.Setting['themeScheme'][] = [
          'light',
          'dark',
          'auto',
        ]

        const index = themeSchemes.findIndex(
          item => item === theme.value.themeScheme,
        )

        const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1

        const nextThemeScheme = themeSchemes[nextIndex]

        themeFUNC.setThemeScheme(nextThemeScheme)
      },

      /**
       * 更新主题颜色
       *
       * @param key 主题颜色键
       * @param color 主题颜色
       */
      updateThemeColors(key: BlogType.Theme.ThemeColorKey, color: string) {
        let colorValue = color

        if (theme.value.recommendColor) {
          // get a color palette by provided color and color name, and use the suitable color

          colorValue = getPaletteColorByNumber(color, 500, true)
        }

        if (key === 'primary') {
          theme.value.themeColor = colorValue
        }
        else {
          theme.value.otherColor[key] = colorValue
        }
      },
    }

    const app = ref({
      /**
       *   侧边栏是否折叠
       */
      siderCollapse: false,

      /**
       *  是否为移动布局
       */
      isMobile: breakpoints.smaller('sm') || false,

      /**
       *  主题设置抽屉是否可见
       */
      themeDrawerVisible: false,

      /**
       *  刷新标识
       */
      reloadFlag: true,

      /**
       *  全屏
       */
      fullContent: false,

      /**
       *   内容是否可横向滚动
       */
      contentXScrollable: false,

      /**
       *   侧边栏是否固定
       */
      mixSiderFixed: false,
    })

    const appFUNC = {
      /**
       * 重新加载页面
       * @param  duration 持续时间
       */
      async reloadPage(duration = 300) {
        app.value.reloadFlag = false

        const d = theme.value.page.animate ? duration : 40

        await new Promise((resolve) => {
          setTimeout(resolve, d)
        })

        app.value.reloadFlag = true

        if (theme.value.resetCacheStrategy === 'refresh') {
          // eslint-disable-next-line ts/no-use-before-define
          routerFUNC.resetCacheRouteList()
        }
      },
    }

    /**
     *
     *  菜单列表
     */
    const menuList = ref<BlogType.MenuItem[]>([])

    /**
     *  搜索菜单列表
     */
    const searchMenuList = computed(() =>
      transformMenuToSearchMenuList(menuList.value),
    )

    /**
     *  tab
     */
    const tab = ref<{
      tabList: BlogType.Global.Tab[]

      homeTab: BlogType.Global.Tab

      activeTabPath: string
    }>({
      tabList: [],
      homeTab: {
        path: '/test/home',
        label: 'home',
        fullPath: '/test/home',
      },
      activeTabPath: '',
    })

    /**
     *  tab 函数
     */
    const tabFUNC = {
      /**
       *   初始化 Tab
       */
      initTab(currentRoute: RouterType.BlogRouteRecordRaw) {
        if (theme.value.tab.cache && tab.value.tabList.length > 0) {
          // 根据当前所有路由信息，提取有效的标签页（排除无效或不存在的路由）
          const extractedTabs = extractTabsByAllRoutes(vueRouter, tab.value.tabList)

          // 更新标签页状态
          tab.value.tabList = extractedTabs
        }

        // 把当前路由添加为一个新标签页
        tabFUNC.addTab(currentRoute)
      },

      /**
       * 设置当前激活的 Tab 路径
       * @param path Tab 路径
       */
      setActiveTabPath(path: string) {
        tab.value.activeTabPath = path
      },

      /**
       * 添加 Tab
       * @param route 路由信息
       * @param active 是否激活该 Tab
       */
      addTab(route: RouterType.BlogRouteRecordRaw, active = true) {
        const currentTab = getTabByRoute(route)

        const isHomeTab = currentTab.path === tab.value.homeTab?.path

        if (!isHomeTab && !isTabInTabs(currentTab.path, tab.value.tabList)) {
          tab.value.tabList.push(currentTab)
        }

        if (active) {
          tabFUNC.setActiveTabPath(currentTab.path)
        }
      },

      /**
       * 移除 Tab
       *
       * @param tabPath Tab 路径
       */
      async  removeTab(tabPath: string) {
        const isRemoveActiveTab = tab.value.activeTabPath === tabPath

        const updatedTabs = filterTabsByPath(tabPath, tab.value.tabList)

        function update() {
          tab.value.tabList = updatedTabs
        }

        if (!isRemoveActiveTab) {
          update()
          return
        }

        const activeTab = updatedTabs.at(-1) || tab.value.homeTab

        if (activeTab) {
          await tabFUNC.switchRouteByTab(activeTab)
          update()
        }
      },

      /**
       * 移除当前激活的 Tab
       */
      async  removeActiveTab() {
        await tabFUNC.removeTab(tab.value.activeTabPath)
      },

      /**
       * 清除所有 Tab（排除指定的 Tab）
       *
       * @param excludes 需要排除的 Tab ID 列表
       */
      async  clearTabs(excludes: string[] = []) {
        const remainTabPaths = [...getFixedTabPaths(tab.value.tabList), ...excludes]

        const removedTabsPaths = tab.value.tabList
          .map(tab => tab.path)
          .filter(path => !remainTabPaths.includes(path))

        const isRemoveActiveTab = removedTabsPaths.includes(tab.value.activeTabPath)

        const updatedTabs = filterTabsByIds(removedTabsPaths, tab.value.tabList)

        function update() {
          tab.value.tabList = updatedTabs
        }

        if (!isRemoveActiveTab) {
          update()
          return
        }

        const activeTab = updatedTabs[updatedTabs.length - 1] || tab.value.homeTab

        await tabFUNC.switchRouteByTab(activeTab)
        update()
      },

      /**
       * 根据 Tab 切换路由
       * @param tab Tab 信息
       */
      async  switchRouteByTab(tab: BlogType.Global.Tab) {
        const fail = await routerPush(tab.fullPath)

        if (!fail) {
          tabFUNC.setActiveTabPath(tab.path)
        }
      },

      /**
       * 清除左侧 Tab
       *
       * @param tabPath 当前 Tab 路径
       */
      async  clearLeftTabs(tabPath: string) {
        const tabPathList = tab.value.tabList.map(tab => tab.path)

        const index = tabPathList.indexOf(tabPath)

        if (index === -1) {
          return
        }

        const excludes = tabPathList.slice(index)

        await tabFUNC.clearTabs(excludes)
      },

      /**
       * 清除右侧 Tab
       *
       * @param tabPath 当前 Tab 路径
       */
      async  clearRightTabs(tabPath: string) {
        const isHomeTab = tabPath === tab.value.homeTab?.path

        if (isHomeTab) {
          tabFUNC.clearTabs()
          return
        }

        const tabPathList = tab.value.tabList.map(tab => tab.path)

        const index = tabPathList.indexOf(tabPath)

        if (index === -1) {
          return
        }

        const excludes = tabPathList.slice(0, index + 1)

        await tabFUNC.clearTabs(excludes)
      },

      /**
       * 判断 Tab 是否固定
       *
       * @param tabPath Tab 路径
       */
      isTabRetain(tabPath: string) {
        if (tabPath === tab.value.homeTab?.path) {
          return true
        }

        const fixedTabPathList = getFixedTabPaths(tab.value.tabList)

        return fixedTabPathList.includes(tabPath)
      },

      /** 根据路由获取 Tab path */
      getTabPathByRoute,
    }

    const router = ref<{

      /**
       *   路由-博客模块首页路径
       */
      routeHomePath: string

      /**
       *  缓存路由数组
       */
      cacheRouteList: string[]

      /**
       *  排除缓存路由数组，用于重置路由缓存
       */
      excludeCacheRouteList: string[]
    }>({

      routeHomePath: import.meta.env.VITE_ROUTER_BLOG_HOME_PATH,
      cacheRouteList: [],
      excludeCacheRouteList: [],
    })

    const routerFUNC = {

      /**
       * 获取缓存路由
       *
       * @param routeList Vue 路由数组
       */
      getCacheRouteList(routeList: RouterType.BlogRouteRecordRaw[]) {
        router.value.cacheRouteList = getCacheRouteNames(routeList)
      },

      /**
       * 重置路由缓存
       *
       * @param routePath 路由键，默认值为当前路由名
       */
      async resetCacheRouteList(routePath?: string) {
        const routeName = routePath
          ? findBlogRouteByPath(testRouterList, routePath)?.name
          : (vueRouter.currentRoute.value.name as string)

        router.value.excludeCacheRouteList.push(routeName as string)

        await nextTick()

        router.value.excludeCacheRouteList = []
      },
    }

    /**
     *  初始化函数
     */
    function initTest() {
      //  获取缓存路由
      routerFUNC.getCacheRouteList(testRouterList)
    }

    initTest()
    return {
      /**
       *   主题
       */
      theme,

      /**
       *   主题函数
       */
      themeFUNC,

      /**
       *   应用
       */
      app,

      appFUNC,

      /**
       *  菜单列表
       */
      menuList,

      /**
       *  搜索菜单列表
       */
      searchMenuList,

      tab,
      tabFUNC,

      router,

      routerFUNC,
    }
  },
  {
    persist: true,
  },
)
