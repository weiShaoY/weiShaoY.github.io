<!------  2025-04-16---15:03---星期三  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import MenuItem from '../../../components/menu-item.vue'

import { blogMenuJump } from '../../utils'

defineOptions({
  name: 'Submenu',
})

const props = withDefaults(defineProps<Props>(), {
  menuList: () => [],
  level: 0,
})

type Props = {

  /**
   *  菜单
   */
  menuList?: RouterType.BlogRouteRecordRaw[]
}

// 判断是否有子菜单
function hasChildren(item: RouterType.BlogRouteRecordRaw): boolean {
  return Boolean(item.children?.length)
}

// 过滤菜单项
function filterRoutes(
  items: RouterType.BlogRouteRecordRaw[],
): RouterType.BlogRouteRecordRaw[] {
  return items
    .filter(item => !item.meta.isHideInMenu)
    .map(item => ({
      ...item,
      children: item.children ? filterRoutes(item.children) : undefined,
    }))
}

// 计算属性
const filteredMenuItems = computed(() => filterRoutes(props.menuList))

/**
 *  跳转页面
 */
function goPage(item: RouterType.BlogRouteRecordRaw) {
  blogMenuJump(item)
}

</script>

<template>
  <template
    v-for="item in filteredMenuItems"
    :key="item.path"
  >
    <t-submenu
      v-if="hasChildren(item)"
      :value="item.path"
    >
      <template
        #title
      >
        <MenuItem
          :menu="item"
        />
      </template>

      <Submenu
        :menu-list="item.children"
      />
    </t-submenu>

    <t-menu-item
      v-else
      :value="item.path"
      @click="goPage(item)"
    >
      <MenuItem
        :menu="item"
      />
    </t-menu-item>
  </template>
</template>

<style lang="scss">

</style>
