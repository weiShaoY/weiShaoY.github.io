import type { RouteLocationNormalized } from 'vue-router'

import type { TagProps } from './types'

import config from '@/config'

import { defineStore } from 'pinia'

import { computed, ref } from 'vue'

// import { isString } from '@/utils'
import { is } from '@/utils'

/**
 * 格式化路由为标签
 * @param {RouteLocationNormalized} route - 路由对象
 * @returns {TagProps} 格式化后的标签属性
 */
function formatTag(route: RouteLocationNormalized): TagProps {
  const { name, meta, fullPath, query } = route

  return {
    title: meta.locale as string || '',
    name: String(name),
    fullPath,
    query,
    ignoreCache: meta.ignoreCache as boolean,
  }
}

const BAN_LIST = [config.redirectRouteName]

/**
 * 使用 Pinia 定义 tabBar 的 store
 */
const useAppStore = defineStore(
  'tabBar',
  () => {
  // 初始化状态
    const cacheTabList = ref<Set<string>>(new Set([config.code.defaultRouteName]))

    /**
     *  标签列表
     */
    const tagList = ref<TagProps[]>([config.code.defaultRoute])

    /**
     * 获取标签列表
     */
    const getTabList = computed(() => tagList.value)

    /**
     * 获取缓存列表
     */
    const getCacheList = computed(() => Array.from(cacheTabList.value))

    /**
     * 更新标签列表
     * @param {RouteLocationNormalized} route - 路由对象
     */
    function updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as string)) {
        return
      }

      tagList.value.push(formatTag(route))
      if (!route.meta.ignoreCache) {
        cacheTabList.value.add(route.name as string)
      }
    }

    /**
     * 删除标签
     * @param {number} idx - 标签索引
     * @param {TagProps} tag - 标签属性
     */
    function deleteTag(idx: number, tag: TagProps) {
      tagList.value.splice(idx, 1)
      cacheTabList.value.delete(tag.name)
    }

    /**
     * 添加缓存
     * @param {string} name - 标签名称
     */
    function addCache(name: string) {
      if (is.isString(name) && name !== '') {
        cacheTabList.value.add(name)
      }
    }

    /**
     * 删除缓存
     * @param {TagProps} tag - 标签属性
     */
    function deleteCache(tag: TagProps) {
      cacheTabList.value.delete(tag.name)
    }

    /**
     * 刷新标签列表
     * @param {TagProps[]} tags - 标签数组
     */
    function freshTabList(tags: TagProps[]) {
      tagList.value = tags
      cacheTabList.value.clear()

      // 添加不忽略缓存的标签到缓存列表
      tagList.value
        .filter(el => !el.ignoreCache)
        .map(el => el.name)
        .forEach(x => cacheTabList.value.add(x))
    }

    /**
     * 关闭全部标签
     * 重置标签列表
     */
    function resetTabList() {
      tagList.value = [config.code.defaultRoute]
      cacheTabList.value.clear()
      cacheTabList.value.add(config.code.defaultRouteName)
    }

    return {
      cacheTabList,
      tagList,
      getTabList,
      getCacheList,
      updateTabList,
      deleteTag,
      addCache,
      deleteCache,
      freshTabList,
      resetTabList,
    }
  },
)

export default useAppStore
