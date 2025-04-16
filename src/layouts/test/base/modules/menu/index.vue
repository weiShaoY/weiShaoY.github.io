<!------  2025-04-16---10:22---星期三  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { router } from '@/router'

import { testRouterList } from '@/router/modules/test'

import { useTestStore } from '@/store'

import { useRoute } from 'vue-router'

import LeftMenuItem from './left-menu-item/index.vue'

import RightMenuItem from './right-menu-item/index.vue'

import { findTopRouteByPath } from './utils'

const testStore = useTestStore()

const route = useRoute()

const menuList = computed(() => testRouterList) as Ref<RouterType.BlogRouteRecordRaw[]>

/**
 *  打开外部链接
 */
function openExternalLink(link: string) {
  window.open(link, '_blank')
}

/**
 * 博客模块菜单跳转
 * @param item 菜单项
 * @param jumpToFirst 是否跳转到第一个子菜单
 */
function blogMenuJump(item: RouterType.BlogRouteRecordRaw, jumpToFirst: boolean = false) {
  // 处理外部链接
  const { externalUrl } = item.meta

  if (externalUrl) {
    return openExternalLink(externalUrl)
  }

  // 如果不需要跳转到第一个子菜单，或者没有子菜单，直接跳转当前路径
  if (!jumpToFirst || !item.children?.length) {
    return router.push(item.path)
  }

  // 获取第一个可见的子菜单，如果没有则取第一个子菜单
  const firstChild = item.children.find(child => !child.meta.isHideInMenu) || item.children[0]

  // 如果第一个子菜单是外部链接 并且不是 iframe，打开外部链接
  if (firstChild.meta?.externalUrl) {
    return openExternalLink(firstChild.meta.externalUrl)
  }

  // 跳转到子菜单路径
  router.push(firstChild.path)
}

/**
 * 右侧菜单列表：根据当前路由路径查找顶级菜单，并返回其子菜单或空数组
 */
const rightMenuList = computed(() => {
  // 获取当前路由的顶级路径，如 '/blog/detail' => '/blog'

  const target = findTopRouteByPath(route.path, testRouterList)

  console.log('%c Line:65 🍧 target', 'color:#3f7cff', target)

  if (target) {
  // 返回该菜单的子项，如果存在
    if (target?.children?.length) {
      return target.children
    }
    else {
      return [target]
    }
  }
  else {
    return []
  }
})

const width = `${testStore.setting.menu.rightMenuWidth}px`
</script>

<template>
  <div
    class="layout-sidebar fixed left-0 top-0 z-101 h-[100vh] flex select-none border-r-1 border-[#EAECF1] bg-white scrollbar-hide"
  >

    <!-- 左侧菜单 -->
    <LeftMenuItem
      :menu-list="menuList"
      @blog-menu-jump="blogMenuJump"
    />

    <!-- 右侧菜单 -->
    <RightMenuItem
      :menu-list="rightMenuList"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-scrollbar__bar.is-vertical) {
  display: none;
}
</style>

<style lang="scss">

.layout-sidebar {
  // 展开的宽度
  .el-menu:not(.el-menu--collapse) {
    width: v-bind(width);
  }
}
</style>
