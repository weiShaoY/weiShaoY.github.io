import type { RouteLocationNormalized } from 'vue-router'

import config from '@/config'

import { isString } from '@/utils'

import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 * 禁止重定向的路由名称列表。
 * @default 包含重定向路由名称
 */
const BAN_LIST = [config.redirectRouteName]

/**
 * 格式化路由为标签
 * @param  route - 路由对象
 * @returns  格式化后的标签属性
 */
function formatTag(route: RouteLocationNormalized): CodeType.TagProps {
  const { name, meta, fullPath, query } = route

  return {
    title: meta.locale as string || '',
    name: String(name),
    fullPath,
    query,
    ignoreCache: meta.ignoreCache as boolean,
  }
}

const useCodeStore = defineStore(
  'code',
  () => {
    const state = ref({

      /**
       * 导航栏配置
       * @property {object} navbar - 配置导航栏的可见性和样式
       */
      navbar: {
        /**
         * 是否显示导航栏
         * @type {boolean}
         * @default true
         */
        visible: true,

        /**
         * 导航栏高度（单位：像素）
         * @type {number}
         * @default 60
         */
        height: 60,
      },

      /**
       * 菜单栏配置
       * @property {object} menu - 控制侧边菜单的显示、位置和宽度
       */
      menu: {
        /**
         * 是否显示侧边菜单
         * @type {boolean}
         * @default true
         */
        visible: true,

        /**
         * 菜单栏显示位置
         * @type {'left' | 'right'}
         * @default 'left'
         * @description 指定菜单栏的显示位置，可以是 "left" 或 "right"。
         */
        position: 'left',

        /**
         * 菜单栏是否折叠
         * @type {boolean}
         * @default false
         */
        collapsed: false,

        /**
         * 菜单栏折叠时的宽度（单位：像素）
         * @type {number}
         * @default 48
         */
        collapsedWidth: 48,

        /**
         * 菜单栏展开时的宽度（单位：像素）
         * @type {number}
         * @default 220
         */
        expandedWidth: 220,
      },

      /**
       * 抽屉配置
       * @property {object} drawer - 控制抽屉的显示
       */
      drawer: {
        /**
         * 是否显示抽屉
         * @type {boolean}
         * @default false
         */
        visible: false,
      },

      /**
       *  标签栏配置
       */
      tabBar: {
        /**
         * 是否显示标签栏
         * @type {boolean}
         * @default true
         */
        visible: true,
      },

      /**
       *  面包屑配置
       *  @property {object} breadcrumb - 控制面包屑的显示
       */
      breadcrumb: {
        /**
         * 是否显示面包屑
         * @type {boolean}
         * @default true
         */
        visible: true,
      },

      /**
       *  底部栏配置
       *  @property {object} footer - 控制底部栏的显示
       */
      footer: {
        /**
         * 是否显示底部栏
         * @type {boolean}
         * @default true
         */
        visible: true,
      },
    })

    // / /////////////////////// 标签栏 //////////////////////////////

    /**
     * 标签列表 包含当前打开的标签信息。
     * @default  包含默认路由的标签信息
     */
    const tagList = ref<CodeType.TagProps[]>([config.code.defaultRoute])

    /**
     *  缓存标签列表 使用 Set 存储唯一的标签名称
     *  @default  包含默认路由的标签名称
     */
    const cacheTabList = new Set([config.code.defaultRouteName])

    /**
     * 获取标签列表
     */
    const getTabList = computed(() => tagList.value)

    /**
     * 获取缓存列表
     */
    const getCacheTabList = computed(() => Array.from(cacheTabList))

    /**
     * 更新标签列表
     * @param  route - 路由对象
     */
    function updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as string)) {
        return
      }

      tagList.value.push(formatTag(route))

      if (!route.meta.ignoreCache) {
        cacheTabList.add(route.name as string)
      }
    }

    /**
     * 删除标签
     * @param  idx - 标签索引
     * @param  tag - 标签属性
     */
    function deleteTag(idx: number, tag: CodeType.TagProps) {
      tagList.value.splice(idx, 1)

      cacheTabList.delete(tag.name)
    }

    /**
     * 添加缓存
     * @param  name - 标签名称
     */
    function addCache(name: string) {
      if (isString(name) && name !== '') {
        cacheTabList.add(name)
      }
    }

    /**
     * 删除缓存
     * @param  tag - 标签属性
     */
    function deleteCache(tag: CodeType.TagProps) {
      cacheTabList.delete(tag.name)
    }

    /**
     * 刷新标签列表
     * @param  tags - 标签数组
     */
    function freshTabList(tags: CodeType.TagProps[]) {
      tagList.value = tags
      cacheTabList.clear()

      // 添加不忽略缓存的标签到缓存列表
      tagList.value
        .filter(el => !el.ignoreCache)
        .map(el => el.name)
        .forEach(x => cacheTabList.add(x))
    }

    /**
     * 关闭全部标签
     * 重置标签列表
     */
    function resetTabList() {
      tagList.value = [config.code.defaultRoute]
      cacheTabList.clear()
      cacheTabList.add(config.code.defaultRouteName)
    }

    return {
      state,
      tagList,
      getTabList,
      cacheTabList,
      getCacheTabList,
      updateTabList,
      deleteTag,
      addCache,
      deleteCache,
      freshTabList,
      resetTabList,
    }
  },
  {
    persist: true,
  },
)

export default useCodeStore
