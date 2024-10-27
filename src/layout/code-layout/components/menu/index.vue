<!------------------------------------  菜单栏  ------------------------------------------------->

<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'

import { listenerRouteChange } from '@/utils/route-listener'

import SubMenu from './sub-menu.vue'

import useMenuTree from './use-menu-tree'

const { menuTree } = useMenuTree()

/**
 * 设置菜单折叠状态
 */
function setCollapse(val: boolean) {
  // 如果是桌面设备
  if (appStore.state.device === 'desktop') {
  // 更新菜单折叠状态
    appStore.updateSettings({
      menuCollapse: val,
    })
  }
}

/**
 *  计算属性：菜单是否折叠
 */
const collapsed = computed({
  get() {
    if (appStore.state.device === 'desktop') {
      // 如果是桌面设备

      // 返回菜单折叠状态
      return appStore.state.menuCollapse
    }

    return false // 移动设备不折叠
  },
  set(value: boolean) {
    // 更新菜单折叠状态
    appStore.updateSettings({
      menuCollapse: value,
    })
  },
})

/**
 *  菜单展开的项
 */
const openKeys = ref<string[]>([])

/**
 *  选中的菜单项
 */
const selectedKey = ref<string[]>([])

/**
 * 查找菜单展开项数组
 * @param {string} target - 目标路由名称
 */
function findMenuOpenKeys(target: string) {
  const result: string[] = [] // 存储结果的数组

  let isFind = false // 是否找到目标

  /**
   * 递归回溯查找目标路由
   * @param {RouteRecordRaw} item - 当前路由项
   * @param {string[]} keys - 当前路径的 keys
   */
  const backtrack = (item: RouteRecordRaw, keys: string[]) => {
    if (item.name === target) { // 如果找到目标
      isFind = true // 设置找到目标
      result.push(...keys) // 将路径 keys 添加到结果数组
      return // 终止函数
    }

    // 如果有子路由
    if (item.children?.length) {
      item.children.forEach((el) => {
        // 递归查找子路由
        backtrack(el, [...keys, el.name as string])
      })
    }
  }

  // 遍历菜单树
  menuTree.value.forEach((el: RouteRecordRaw) => {
    // 如果已经找到目标，终止遍历
    if (isFind) {
      return
    }

    // 回溯查找
    backtrack(el, [el.name as string])
  })

  // 返回结果数组
  return result
}

/**
 *  监听路由变化事件
 */
listenerRouteChange((newRoute) => {
  // 获取路由的 meta 信息
  const { activeMenu, hideInMenu } = newRoute.meta

  // 如果需要认证且没有隐藏在菜单中或者有激活菜单
  if (!hideInMenu || activeMenu) {
    /**
     *  菜单展开项数组
     */
    const menuOpenKeys = findMenuOpenKeys((activeMenu || newRoute.name) as string)

    /**
     *  合并当前展开项和新找到的展开项
     */
    const keySet = new Set([...menuOpenKeys, ...openKeys.value])

    /**
     *  更新展开项
     */
    openKeys.value = [...keySet]

    /**
     *  更新选中的菜单项
     */
    selectedKey.value = [(activeMenu as string) || (menuOpenKeys[menuOpenKeys.length - 1] as string)]
    console.log('%c Line:121111111 🍣 selectedKey.value', 'color:#3f7cff', selectedKey.value)
    console.log('%c Line:129 🍢 selectedKey.value', 'color:#6ec1c2', selectedKey.value)
  }
}, true)

watchEffect (() => {
  console.log('%c Line:129 🍣 selectedKey.value', 'color:#e41a6a', selectedKey.value)
})

</script>

<template>
  <a-menu
    v-model:collapsed="collapsed"
    v-model:open-keys="openKeys"
    class="h-full w-full"
    :mode="appStore.state.topMenu ? 'horizontal' : 'vertical'"
    :show-collapse-button="appStore.state.device !== 'mobile'"
    :auto-open="false"
    :selected-keys="selectedKey"
    :auto-open-selected="true"
    :level-indent="34"
    @collapse="setCollapse"
  >
    <SubMenu
      v-model:selected-key="selectedKey"
      :menu-tree="menuTree"
    />
  </a-menu>
</template>

<style lang="less" scoped>

</style>
