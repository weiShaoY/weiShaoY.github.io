<script lang="ts" setup>
import type { MenuValue } from 'tdesign-vue-next'

import { findParentRoute } from '@/router/utils'

import { useBlogStore } from '@/store'

import { useRoute } from 'vue-router'

import SubMenu from './sub-menu.vue'

const { menuList } = defineProps<Props>()

const route = useRoute()

type Props = {

  /**
   *  菜单
   */
  menuList: RouterType.BlogRouteRecordRaw[]
}

const blogStore = useBlogStore()

const width = `${blogStore.setting.menu.rightMenuWidth}px`

const expanded = ref<MenuValue[]>([])

// 监听路由变化并更新展开状态
watch(() => route.path, (newPath) => {
  // 获取需要展开的新路径
  const newPaths = [newPath]

  let parent = findParentRoute(menuList, newPath)

  while (parent) {
    newPaths.unshift(parent.path)
    parent = findParentRoute(menuList, parent.path)
  }

  // 合并并去重
  expanded.value = [...new Set([...expanded.value, ...newPaths])]
}, {
  immediate: true,
})
</script>

<template>
  <div
    class=""
  >
    <div
      class="h-15 flex items-center justify-center"
    >
      <Logo
        :is-hide-logo="true"
        text-color="dark"
      />
    </div>

    <div
      class="overflow-y-auto !scrollbar-hide"
      :style="{
        height: `calc(100% - ${blogStore.setting.header.height}px)`,
      }"
    >
      <t-menu
        v-model:expanded="expanded"
        :value="route.path"
        theme="light"
        :width="width"
      >
        <SubMenu
          :menu-list="menuList"
        />
      </t-menu>
    </div>
  </div>
</template>

<style lang="scss">

</style>
