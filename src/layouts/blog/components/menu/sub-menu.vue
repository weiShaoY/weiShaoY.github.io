<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { RouteMeta, RouteRecordRaw } from 'vue-router'

import { externalLinkRegex, openUrlInWindow } from '@/utils'

defineProps({
  /**
   *  面包屑
   */
  menuTree: {
    type: Array as PropType<RouteRecordRaw[]>,

    default() {
      return []
    },
  },

})
const route = useRoute()

const router = useRouter()

const selectedKey = defineModel('selectedKey')

function handleGoto(item: RouteRecordRaw) {
  try {
    // 打开外部链接
    if (externalLinkRegex.test(item.path)) {
      openUrlInWindow(item.path)

      selectedKey.value = [item.name as string]

      return
    }

    // 消除外部链接的副作用
    const { hideInMenu, activeMenu } = item.meta as RouteMeta

    if (route.name === item.name && !hideInMenu && !activeMenu) {
      selectedKey.value = [item.name as string]

      return
    }

    router.push({
      name: item.name,
    })
  }
  catch (error) {
    console.error('路由跳转出错:', error)
  }
}
</script>

<template>
  <template
    v-for="item in menuTree"
    :key="item.path"
  >
    <a-sub-menu
      v-if="item.children?.length"
      :key="item.name"
      class="!text-4"
    >
      <template
        #icon
      >
        <SvgIcon
          v-if=" item?.meta?.icon"
          :icon="`${item.meta.icon}`"
          class="!inline-block"
          :size="26"
        />
      </template>

      <template
        #title
      >
        {{ item.meta?.locale || '' }}
      </template>

      <SubMenu
        v-model:selected-key="selectedKey"
        :menu-tree="item.children"
      />
    </a-sub-menu>

    <template
      v-else
    >
      <a-menu-item
        :key="item.name"
        class="!text-4"
        @click="() => handleGoto(item)"
      >
        <template
          #icon
        >
          <SvgIcon
            v-if=" item?.meta?.icon"
            :icon="`${item.meta.icon}`"
            class="!inline-block"
            :size="26"
          />
        </template>

        {{ item.meta?.locale || '' }}
      </a-menu-item>
    </template>
  </template>
</template>

<style lang="less" scoped>

</style>
