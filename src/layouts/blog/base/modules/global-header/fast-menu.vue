<!-- 快速入口 -->

<script setup lang="ts">
import { blogFastMenuList } from '@/router/modules/blog'

import { ref } from 'vue'

import { useRouter } from 'vue-router'

import { blogMenuJump } from '../utils'

const router = useRouter()

const popoverRef = ref()

type QuickLink = {
  name: string
  path: string
}

const quickLinks: QuickLink[] = [
  {
    name: '返回首页',
    path: '/',
  },
]

function handleAppClick(item: WxChatType.BlogRouteRecordRaw) {
  blogMenuJump(item)
  popoverRef.value?.hide()
}
</script>

<template>
  <el-popover
    ref="popoverRef"
    :width="700"
    popper-class="fast-enter-popover"
    :show-arrow="false"
    placement="bottom-start"
    :offset="0"
    popper-style="border: 1px solid var(--art-border-dashed-color); border-radius: 10px); "
  >
    <template
      #reference
    >
      <BaseButton
        class="fast-enter-trigger"
        icon="blog-topBar-fast"
      />
    </template>

    <div
      class="grid grid-cols-[2fr_0.8fr]"
    >
      <div
        class="grid grid-cols-2 gap-1 grid-content-start"
      >
        <!-- 左侧应用列表 -->
        <div
          v-for="item in blogFastMenuList"
          :key="item.name"
          class="mr-3 max-h-15 flex cursor-pointer items-center gap-3 rounded-2 px-3 py-2 hover:bg-[rgba(241,241,244,0.7)]"
          @click="handleAppClick(item)"
        >
          <div
            class="h-12 w-12 flex items-center justify-center rounded-2 bg-[rgba(241,241,244,0.7)]"
          >
            <SvgIcon
              v-if="item.meta.icon"
              :icon="item.meta.icon"
              :size="26"
              class="rounded-2"
            />

          </div>

          <h3
            class="m-0 color-[#252f4a] font-bold"
          >
            {{ item.meta.title }}
          </h3>

          <div
            class="flex items-center gap-2"
          >

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
        </div>
      </div>

      <div
        class="border-l-[1px] border-l-[#ebeef5] border-solid pl-6 pt-2"
      >
        <h3
          class="m-0 mb-2.5 text-base text-[#b5b7c8] font-medium"
        >
          标题
        </h3>

        <ul>
          <li
            v-for="link in quickLinks"
            :key="link.name"
            class="cursor-pointer py-2 hover:[&>span]:text-primary"
            @click="router.push(link.path)"
          >
            <span>{{ link.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </el-popover>
</template>
