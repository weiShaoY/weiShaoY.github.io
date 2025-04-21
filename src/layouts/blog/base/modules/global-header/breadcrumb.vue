<script setup lang="ts">
import { ref, watch } from 'vue'

/**
 *  导入路由相关API
 */
import { useRoute, useRouter } from 'vue-router'

import MenuItem from '../../components/menu-item.vue'

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

const router = useRouter()

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
    breadList.value = [
      matched[1],
    ] as any[]
  }

  breadList.value = matched.slice(1).map(({ name, path, meta, children }) => ({
    name,
    path,
    meta,
    children,
  })) as BreadcrumbItem[]
}

// watchEffect(() => {
//   console.log('%c Line:57 🥒 breadList.value', 'color:#ea7e5c', breadList.value)
// })

/**
 *  监听路由变化
 *  @description 路由变化时重新生成面包屑
 */
watch(() => route.path, getBreadcrumb, {
  immediate: true,
})
</script>

<template>
  <el-breadcrumb
    separator="/"
  >
    <el-breadcrumb-item
      v-for="item in breadList"
      :key="item.path"
      :to="{ path: item.path }"
    >

      <MenuItem
        v-if="item.children?.length === 0"
        :menu="item "
      />

      <el-dropdown
        v-else
      >

        <MenuItem
          :menu="item"
        />

        <template
          #dropdown
        >
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="sub in item.children"
              :key="sub.path"
              @click="router.push(sub.path)"
            >
              <MenuItem
                :menu="sub"
              />
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss">

:deep(.el-dropdown-menu__item) {
  min-width: 100px;
  padding: 10px 20px;
}
</style>
