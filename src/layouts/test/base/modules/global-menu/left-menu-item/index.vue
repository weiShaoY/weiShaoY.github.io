<script setup lang="ts">
import { useTestStore } from '@/store'

import { useRoute } from 'vue-router'

import { findTopRouteByPath } from '../utils'

const { menuList } = defineProps<Props>()

const emits = defineEmits<{

  /**
   * 博客菜单跳转事件
   * @param menu 菜单项
   * @param jumpToFirst 是否跳转到第一个子菜单
   */
  blogMenuJump: [menu: RouterType.BlogRouteRecordRaw, jumpToFirst: boolean]
}>()

const testStore = useTestStore()

const route = useRoute()

type Props = {

  /**
   *  菜单
   */
  menuList: RouterType.BlogRouteRecordRaw[]

}

/**
 *  是否显示菜单文字
 */
const dualMenuShowText = ref(true)

/**
 *  当前所在的路由
 */
/**
 * 当前路由对应的第一级菜单项
 */
const currentRoute = computed<RouterType.BlogRouteRecordRaw | undefined>(() => {
  return findTopRouteByPath(route.path, menuList)
})

</script>

<template>

  <!-- 左侧菜单 -->
  <div
    class="relative h-full border border-r-[1px] border-[#EAECF1]"
    :style="{
      width: `${testStore.setting.menu.leftMenuWidth}px`,
    }"
  >
    <!-- logo -->
    <div
      class="h-15 w-full flex items-center justify-center"
    >
      <Logo
        :is-hide-text="true"
      />
    </div>

    <el-scrollbar
      class="h-[calc(100%-135px)]"
    >
      <ul>
        <li
          v-for="menu in menuList"
          :key="menu.path"

          @click="emits('blogMenuJump', menu, true)"
        >
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="menu.meta.title"
            placement="right"
            :offset="25"
            :hide-after="0"
            :disabled="dualMenuShowText"
          >
            <div
              class="flex-col items-center justify-center rounded-1 text-center transition-all duration-300 hover:cursor-pointer"
              :class="[
                currentRoute?.path === menu.path ? 'bg-[#F3B03D] color-white' : '',
                dualMenuShowText ? 'm-[5px] h-15' : 'm-[15px] h-12',
              ]"
            >
              <SvgIcon
                v-if="menu.meta.icon"
                :icon="menu.meta.icon"
                :size=" dualMenuShowText ? 18 : 22"
                :style="{
                  marginBottom: dualMenuShowText ? '5px' : '0',
                }"
              />

              <span
                v-if="dualMenuShowText"
                class="max-w-12 text-ellipsis"
              >
                {{ menu.meta.title }}
              </span>
            </div>
          </el-tooltip>
        </li>
      </ul>

    </el-scrollbar>

    <div
      class="absolute bottom-3 left-0 right-0 flex items-center justify-center hover:cursor-pointer"
      @click="dualMenuShowText = !dualMenuShowText"
    >
      <div
        class="h-10 w-10 flex transform items-center justify-center rounded-1 transition-all duration-500 hover:cursor-pointer hover:bg-[#f1f1f4]"
      >
        <SvgIcon
          icon="blog-switch"
        />

      </div>

    </div>

  </div>
</template>

<style scoped>
.ib-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}
</style>
