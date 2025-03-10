<script setup lang="ts">
import { useTestStore } from '@/store/modules/test'

import { inject, nextTick } from 'vue'

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const router = useRouter()

const testStore = useTestStore()

/**
 * 刷新当前页面
 */
const refreshCurrentPage = inject('refresh') as (val: boolean) => void

function refresh() {
  setTimeout(() => {
    // 如果当前页面需要缓存，则先移除 keepAlive
    if (route.meta.isKeepAlive) {
      testStore.removeKeepAliveName(route.fullPath as string)
    }

    refreshCurrentPage(false)

    nextTick(() => {
      // 重新添加 keepAlive 并刷新页面
      if (route.meta.isKeepAlive) {
        testStore.addKeepAliveName(route.fullPath as string)
      }

      refreshCurrentPage(true)
    })
  }, 0)
}

/**
 * 最大化当前页面
 */
function maximize() {
  testStore.setGlobal('maximize', true)
}

/**
 * 关闭当前标签页
 */
function closeCurrentTab() {
  // 如果当前页面是固定标签（Affix），则不允许关闭
  if (route.meta.isAffix) {
    return
  }

  testStore.removeTabs(route.fullPath)
}

/**
 * 关闭所有标签页并跳转到首页
 */
function closeAllTab() {
  testStore.closeMultipleTab()
  router.push(import.meta.env.VITE_APP_BLOG_HOME_PAGE)
}
</script>

<template>
  <el-dropdown
    trigger="click"
    :teleported="false"
  >
    <div
      class="more-button"
    >
      <i
        class="iconfont icon-xiala"
      />
    </div>

    <template
      #dropdown
    >
      <el-dropdown-menu>
        <el-dropdown-item
          @click="refresh"
        >
          <el-icon>
            <Refresh />
          </el-icon>
          刷新
        </el-dropdown-item>

        <el-dropdown-item
          @click="maximize"
        >
          <el-icon>
            <FullScreen />
          </el-icon>
          最大化
        </el-dropdown-item>

        <el-dropdown-item
          divided
          @click="closeCurrentTab"
        >
          <el-icon>
            <Remove />
          </el-icon>
          关闭当前
        </el-dropdown-item>

        <el-dropdown-item
          @click="testStore.closeTabsOnSide(route.fullPath, 'left')"
        >
          <el-icon>
            <DArrowLeft />
          </el-icon>
          关闭左侧
        </el-dropdown-item>

        <el-dropdown-item
          @click="testStore.closeTabsOnSide(route.fullPath, 'right')"
        >
          <el-icon>
            <DArrowRight />
          </el-icon>
          关闭右侧
        </el-dropdown-item>

        <el-dropdown-item
          divided
          @click="testStore.closeMultipleTab(route.fullPath)"
        >
          <el-icon>
            <CircleClose />
          </el-icon>
          关闭其它
        </el-dropdown-item>

        <el-dropdown-item
          @click="closeAllTab"
        >
          <el-icon>
            <FolderDelete />
          </el-icon>
          关闭所有
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
@import '../index.scss';
</style>
