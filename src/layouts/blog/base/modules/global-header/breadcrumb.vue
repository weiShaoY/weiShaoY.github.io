<script setup lang="ts">
import { ref, watch } from 'vue'

/**
 *  导入路由相关API
 */
import { useRoute } from 'vue-router'

import MenuItem from '../../components/menu-item.vue'

import { blogMenuJump } from '../utils'

/**
 *  路由实例
 */
const route = useRoute()

/**
 *  面包屑数据
 */
const breadList = ref<WxChatType.BlogRouteRecordRaw[]>([])

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

  breadList.value = matched.slice(1).map(item => ({
    ...item,
  })) as unknown as WxChatType.BlogRouteRecordRaw[]
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
              :divided="Array.isArray(sub?.children) && sub.children.length > 0"
              class="!mb-1 !px-4 !py-3"
              @click="blogMenuJump(sub)"
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
