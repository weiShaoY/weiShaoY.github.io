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

  /**
   *  菜单等级
   */
  level?: number
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
    <!-- 包含子菜单的项目 -->
    <el-sub-menu
      v-if="hasChildren(item)"
      :index="item.path"
      :level="level"
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
        :level="level + 1"
      />
    </el-sub-menu>

    <!-- 普通菜单项 -->
    <el-menu-item
      v-else
      :index="item.path"
      :level-item="level + 1"
      class="m-x-auto mb-2 w-[calc(100%-16px)] rounded-3"
      @click="goPage(item)"
    >
      <template
        #title
      >
        <MenuItem
          :menu="item"
        />
      </template>
    </el-menu-item>
  </template>
</template>

<style lang="scss">
@use '@/theme/variables.scss' as *;

.el-sub-menu__title {
  margin: 0 auto !important;
  margin-bottom: 8px !important;
  width: calc(100% - 16px) !important;
  border-radius: 12px !important;
}
// 右侧箭头
.el-sub-menu__icon-arrow {
  right: 20px;
  width: 15px !important;
  font-weight: bold;
}

// 选中颜色
.el-menu-item.is-active {
  color: var(--main-color) !important;
  background-color: var(--el-color-primary-light-9);
  background-image: var(--el-color-primary-custom-14);
}
</style>
