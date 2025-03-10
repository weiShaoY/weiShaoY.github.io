<script setup lang="ts">

import { useTestStore } from '@/store/modules/test'

import { ArrowRight } from '@element-plus/icons-vue'

import { computed } from 'vue'

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const router = useRouter()

const testStore = useTestStore()

const breadcrumbList = computed(() => {
  let breadcrumbData
  = testStore.breadcrumbListGet()[route.matched[route.matched.length - 1].path]
    ?? []

  // 🙅‍♀️不需要首页面包屑可删除以下判断
  if (breadcrumbData[0].path !== import.meta.env.VITE_APP_BLOG_HOME_PAGE) {
    breadcrumbData = [{
      path: import.meta.env.VITE_APP_BLOG_HOME_PAGE,
      meta: {
        icon: 'HomeFilled',
        title: '首页',
      },
    }, ...breadcrumbData]
  }

  return breadcrumbData
})

// Click Breadcrumb
function onBreadcrumbClick(item: Menu.MenuOptions, index: number) {
  if (index !== breadcrumbList.value.length - 1) {
    router.push(item.path)
  }
}
</script>

<template>
  <!-- 面包屑导航容器 -->
  <div
    class="breadcrumb-box mask-image"
    :class="[!testStore.global.breadcrumbIcon && 'no-icon']"
  >
    <!-- 面包屑组件，使用箭头图标作为分隔符 -->
    <el-breadcrumb
      :separator-icon="ArrowRight"
    >
      <transition-group
        name="breadcrumb"
      >
        <!-- 遍历面包屑列表，渲染每一项 -->
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
        >
          <el-dropdown
            v-if="index !== 0 && index !== breadcrumbList.length - 1"
          >
            <div
              class="el-breadcrumb__inner is-link"
              :class="{ 'item-no-icon': !item.meta.icon }"
            >
              <!-- 如果该项有图标且全局设置开启，则显示图标 -->
              <el-icon
                v-if="item.meta.icon && testStore.global.breadcrumbIcon"
                class="breadcrumb-icon"
              >
                <component
                  :is="item.meta.icon"
                />
              </el-icon>
              <!-- 显示面包屑标题 -->
              <span
                class="breadcrumb-title"
              > {{ item.meta.title }}</span>
            </div>

            <template
              #dropdown
            >
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="subItem in item.children"
                  :key="subItem.path"
                  @click="onBreadcrumbClick(subItem, index)"
                >
                  <!-- {{ subItem.meta.title }} -->
                  <div
                    class="el-breadcrumb__inner is-link"
                    :class="{ 'item-no-icon': !item.meta.icon }"
                  >
                    <!-- 如果该项有图标且全局设置开启，则显示图标 -->
                    <el-icon
                      v-if="subItem.meta.icon && testStore.global.breadcrumbIcon"
                      class="breadcrumb-icon"
                    >
                      <component
                        :is="subItem.meta.icon"
                      />
                    </el-icon>
                    <!-- 显示面包屑标题 -->
                    <span
                      class="breadcrumb-title"
                    > {{ subItem.meta.title }}</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <div
            v-else
            class="el-breadcrumb__inner is-link"
            :class="{ 'item-no-icon': !item.meta.icon }"
            @click="onBreadcrumbClick(item, index)"
          >
            <!-- 如果该项有图标且全局设置开启，则显示图标 -->
            <el-icon
              v-if="item.meta.icon && testStore.global.breadcrumbIcon"
              class="breadcrumb-icon"
            >
              <component
                :is="item.meta.icon"
              />
            </el-icon>
            <!-- 显示面包屑标题 -->
            <span
              class="breadcrumb-title"
            > {{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb-box {
  display: flex;
  align-items: center;
  overflow: hidden;
  .el-breadcrumb {
    white-space: nowrap;
    .el-breadcrumb__item {
      position: relative;
      display: inline-block;
      float: none;
      .item-no-icon {
        transform: translateY(-3px);
      }
      .el-breadcrumb__inner {
        display: inline-flex;
        &.is-link {
          color: var(--el-header-text-color);
          &:hover {
            color: var(--el-color-primary);
          }
        }
        .breadcrumb-icon {
          margin-top: 1px;
          margin-right: 6px;
          font-size: 16px;
        }
        .breadcrumb-title {
          margin-top: 2px;
        }
      }
      &:last-child .el-breadcrumb__inner,
      &:last-child .el-breadcrumb__inner:hover {
        color: var(--el-header-text-color-regular);
      }
      :deep(.el-breadcrumb__separator) {
        transform: translateY(-1px);
      }
    }
  }
}
.no-icon {
  .el-breadcrumb {
    .el-breadcrumb__item {
      top: -2px;
      :deep(.el-breadcrumb__separator) {
        top: 4px;
      }
      .item-no-icon {
        transform: translateY(0);
      }
    }
  }
}
</style>
