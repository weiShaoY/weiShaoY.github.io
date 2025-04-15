// src/stores/index.ts
// 2025-04-14---17:00---星期一

import { router } from '@/router'

import {
  breakpointsTailwind,
  useBreakpoints,
  useEventListener,
} from '@vueuse/core'

import { defineStore } from 'pinia'

import { ref } from 'vue'

import {
  extractTabsByAllRoutes,
  filterTabsByIds,
  filterTabsByPath,
  getFixedTabPaths,
  getTabByRoute,
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
    const theme = ref<BlogType.Setting>({
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
    const themeFUNC = ref({
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

      setThemeScheme(themeScheme: BlogType.Setting['themeScheme']) {
        theme.value.themeScheme = themeScheme
      },
      toggleThemeScheme() {
        const themeSchemes: BlogType.Setting['themeScheme'][] = [
          'light',
          'dark',
          'auto',
        ]

        const index = themeSchemes.findIndex(
          item => item === theme.value.themeScheme,
        )

        const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1

        const nextThemeScheme = themeSchemes[nextIndex]

        themeFUNC.value.setThemeScheme(nextThemeScheme)
      },
    })

    const app = ref({
      /**
       *   侧边栏是否折叠
       */
      siderCollapse: false,

      /**
       *  是否为移动布局
       */
      isMobile: breakpoints.smaller('sm'),

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

    const appFUNC = ref({
    })

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
     * Tab 列表
     */
    const tabList = ref<BlogType.Global.Tab[]>([])

    /**
     * 首页 Tab
     */
    const homeTab = ref<BlogType.Global.Tab>({
      path: '/test/home',
      label: 'home',
      fullPath: '/test/home',
    })

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
    const tabFUNC = ref({
      /**
       *   初始化 Tab
       */
      initTab(currentRoute: RouterType.BlogRouteRecordRaw) {
        if (theme.value.tab.cache && tabList.value.length > 0) {
          // 根据当前所有路由信息，提取有效的标签页（排除无效或不存在的路由）
          const extractedTabs = extractTabsByAllRoutes(router, tabList.value)

          // 更新标签页状态
          tabList.value = extractedTabs
        }

        // 把当前路由添加为一个新标签页
        tabFUNC.value.addTab(currentRoute)
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
        const tab = getTabByRoute(route)

        const isHomeTab = tab.path === homeTab.value?.path

        if (!isHomeTab && !isTabInTabs(tab.path, tabList.value)) {
          tabList.value.push(tab)
        }

        if (active) {
          tabFUNC.value.setActiveTabPath(tab.path)
        }
      },

      /**
       * 移除 Tab
       *
       * @param tabPath Tab 路径
       */
      async  removeTab(tabPath: string) {
        const isRemoveActiveTab = tab.value.activeTabPath === tabPath

        const updatedTabs = filterTabsByPath(tabPath, tabList.value)

        function update() {
          tabList.value = updatedTabs
        }

        if (!isRemoveActiveTab) {
          update()
          return
        }

        const activeTab = updatedTabs.at(-1) || homeTab.value

        if (activeTab) {
          await tabFUNC.value.switchRouteByTab(activeTab)
          update()
        }
      },

      /**
       * 移除当前激活的 Tab
       */
      async  removeActiveTab() {
        await tabFUNC.value.removeTab(tab.value.activeTabPath)
      },

      /**
       * 清除所有 Tab（排除指定的 Tab）
       *
       * @param excludes 需要排除的 Tab ID 列表
       */
      async  clearTabs(excludes: string[] = []) {
        const remainTabPaths = [...getFixedTabPaths(tabList.value), ...excludes]

        const removedTabsPaths = tabList.value
          .map(tab => tab.path)
          .filter(path => !remainTabPaths.includes(path))

        const isRemoveActiveTab = removedTabsPaths.includes(tab.value.activeTabPath)

        const updatedTabs = filterTabsByIds(removedTabsPaths, tabList.value)

        function update() {
          tabList.value = updatedTabs
        }

        if (!isRemoveActiveTab) {
          update()
          return
        }

        const activeTab = updatedTabs[updatedTabs.length - 1] || homeTab.value

        await tabFUNC.value.switchRouteByTab(activeTab)
        update()
      },

      /**
       * 根据 Tab 切换路由
       * @param tab Tab 信息
       */
      async  switchRouteByTab(tab: BlogType.Global.Tab) {
        const fail = await routerPush(tab.fullPath)

        if (!fail) {
          tabFUNC.value.setActiveTabPath(tab.path)
        }
      },

      /**
       * 清除左侧 Tab
       *
       * @param tabPath 当前 Tab 路径
       */
      async  clearLeftTabs(tabPath: string) {
        const tabPathList = tabList.value.map(tab => tab.path)

        const index = tabPathList.indexOf(tabPath)

        if (index === -1) {
          return
        }

        const excludes = tabPathList.slice(index)

        await tabFUNC.value.clearTabs(excludes)
      },

      /**
       * 清除右侧 Tab
       *
       * @param tabPath 当前 Tab 路径
       */
      async  clearRightTabs(tabPath: string) {
        const isHomeTab = tabPath === homeTab.value?.path

        if (isHomeTab) {
          tabFUNC.value.clearTabs()
          return
        }

        const tabPathList = tabList.value.map(tab => tab.path)

        const index = tabPathList.indexOf(tabPath)

        if (index === -1) {
          return
        }

        const excludes = tabPathList.slice(0, index + 1)

        await tabFUNC.value.clearTabs(excludes)
      },

      /**
       * 判断 Tab 是否固定
       *
       * @param tabPath Tab 路径
       */
      isTabRetain(tabPath: string) {
        if (tabPath === homeTab.value?.path) {
          return true
        }

        const fixedTabPathList = getFixedTabPaths(tabList.value)

        return fixedTabPathList.includes(tabPath)
      },
    })

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

      tabList,

      homeTab,

      tab,
      tabFUNC,
    }
  },
  {
    persist: true,
  },
)
