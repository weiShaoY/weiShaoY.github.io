<script setup lang="ts">
import { ref, watch } from 'vue'

/**
 *  导入路由相关API
 */
import { useRoute } from 'vue-router'

import MenuItem from '../../components/menu-item.vue'

import { blogMenuJump } from '../utils'

/**
 *  面包屑项类型定义
 */
type BreadcrumbItem = {
  name: string
  path: string
  meta: RouterType.BlogRouteRecordRaw['meta']
  children?: BreadcrumbItem[]
}

/**
 *  路由实例
 */
const route = useRoute()

/**
 *  面包屑数据
 */
const breadList = ref<BreadcrumbItem[]>([])

/**
 *  获取面包屑数据
 *  @description 根据当前路由生成面包屑导航
 */
function getBreadcrumb() {
  const { matched } = route

  if (matched.length === 2) {
    breadList.value = [matched[1]] as any[]
  }

  breadList.value = matched.slice(1).map(({ name, path, meta, children }) => ({
    name,
    path,
    meta,
    children,
  })) as BreadcrumbItem[]
}

/**
 *  监听路由变化
 *  @description 路由变化时重新生成面包屑
 */
watch(() => route.path, getBreadcrumb, {
  immediate: true,
})
</script>

<template>

  <t-breadcrumb>
    <template
      #default
    >
      <!-- 第一个面包屑，有下拉菜单 -->
      <t-breadcrumb-item
        v-for="item in breadList"
        :key="item.path"
        :to="{ path: item.path }"
      >
        <MenuItem
          v-if="item.children?.length === 0"
          :menu="item"
        />

        <t-dropdown
          v-else
          placement="bottom"
          :min-column-width="160"
        >
          <MenuItem
            :menu="item"
          />

          <t-dropdown-menu>
            <t-dropdown-item
              v-for="sub in item.children"
              :key="sub.path"
              :divider="Array.isArray(sub?.children) && sub.children.length > 0"
              @click="blogMenuJump(sub)"
            >
              <MenuItem
                :menu="sub"
              />
            </t-dropdown-item>

          </t-dropdown-menu>
        </t-dropdown>
      </t-breadcrumb-item>
    </template>

    <template
      #separator
    >
      <SvgIcon
        icon="arrow-right"
        :size="16"
      />
    </template>
  </t-breadcrumb>
</template>

<style lang="scss">
:deep(.el-dropdown-menu__item) {
  min-width: 100px;
  padding: 10px 20px;
}
</style>
