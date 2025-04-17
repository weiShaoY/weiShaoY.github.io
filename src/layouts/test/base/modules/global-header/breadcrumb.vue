<script setup lang="ts">

import { ref, watch } from 'vue'

/**
 *  导入路由相关API
 */
import { useRoute, useRouter } from 'vue-router'

/**
 *  面包屑项类型定义
 */
type BreadcrumbItem = {
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

  breadList.value = matched.slice(1).map(({ path, meta, children }) => ({
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
      <div
        v-if="item.children?.length === 0"
        class="flex items-center gap-2"
      >
        <SvgIcon
          v-if="item.meta.icon"
          :icon="item.meta.icon"
          :size="20"
        />

        <span
          class="text-4"
        >
          {{ item.meta.title }}
        </span>

        <!-- 外链徽标 -->
        <SvgIcon
          v-if="item.meta.externalUrl"
          icon="blog-menu-externalUrl"
          :size="16"
        />

        <!-- 文本徽标 -->
        <div
          v-else-if="item.meta.textBadge"
          class="m-auto h-[16px] min-w-5 flex items-center justify-center rounded-[5px] bg-[#fd4e4e] p-x-1 text-center text-[10px] text-white leading-5"
        >
          {{ item.meta.textBadge }}
        </div>

        <!-- 图标徽标 -->
        <SvgIcon
          v-else-if="item.meta.iconBadge"
          :icon="item.meta.iconBadge"
          :size="16"
        />
      </div>

      <el-dropdown
        v-else
      >

        <div
          class="flex items-center gap-2"
        >
          <SvgIcon
            v-if="item.meta.icon"
            :icon="item.meta.icon"
            :size="20"
          />

          <span
            class="text-4"
          >
            {{ item.meta.title }}
          </span>

          <!-- 外链徽标 -->
          <SvgIcon
            v-if="item.meta.externalUrl"
            icon="blog-menu-externalUrl"
            :size="16"
          />

          <!-- 文本徽标 -->
          <div
            v-else-if="item.meta.textBadge"
            class="m-auto h-[16px] min-w-5 flex items-center justify-center rounded-[5px] bg-[#fd4e4e] p-x-1 text-center text-[10px] text-white leading-5"
          >
            {{ item.meta.textBadge }}
          </div>

          <!-- 图标徽标 -->
          <SvgIcon
            v-else-if="item.meta.iconBadge"
            :icon="item.meta.iconBadge"
            :size="16"
          />
        </div>

        <template
          #dropdown
        >
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="sub in item.children"
              :key="sub.path"
              @click="router.push(sub.path)"
            >

              <div
                class="flex items-center gap-2"
              >
                <SvgIcon
                  v-if="sub.meta?.icon"
                  :icon="sub.meta.icon"
                  :size="20"
                />

                <div
                  class="flex items-center gap-2"
                >
                  <span
                    class="text-4"
                  >
                    {{ sub.meta.title }}
                  </span>

                  <!-- 外链徽标 -->
                  <SvgIcon
                    v-if="sub.meta.externalUrl"
                    icon="blog-menu-externalUrl"
                    :size="16"
                  />

                  <!-- 文本徽标 -->
                  <div
                    v-else-if="sub.meta.textBadge"
                    class="m-auto h-[16px] min-w-5 flex items-center justify-center rounded-[5px] bg-[#fd4e4e] p-x-1 text-center text-[10px] text-white leading-5"
                  >
                    {{ sub.meta.textBadge }}
                  </div>

                  <!-- 图标徽标 -->
                  <SvgIcon
                    v-else-if="sub.meta.iconBadge"
                    :icon="sub.meta.iconBadge"
                    :size="16"
                  />
                </div>
              </div>
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
