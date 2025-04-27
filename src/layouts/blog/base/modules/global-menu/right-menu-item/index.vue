<script lang="ts" setup>
import { useBlogStore } from '@/store'

import { useRoute } from 'vue-router'

import SubMenu from './sub-menu.vue'

const { menuList } = defineProps<Props>()

const route = useRoute()

type Props = {

  /**
   *  菜单
   */
  menuList: RouterType.BlogRouteRecordRaw[]
}

const blogStore = useBlogStore()

const width = `${blogStore.setting.menu.rightMenuWidth}px`

</script>

<template>
  <div
    class=""
  >
    <div
      class="h-15 flex items-center justify-center"
    >
      <!-- 如果是双列菜单 则隐藏 logo  -->
      <!-- 如果是双列菜单 则不隐藏文字  -->
      <Logo
        :is-hide-logo="true"
        text-color="dark"
      />
    </div>

    <el-scrollbar
      :style="{
        height: `calc(100% - ${blogStore.setting.header.height}px)`,
      }"
    >
      <el-menu
        :default-active="route.path"
        :style="{
          width,
        }"
      >
        <SubMenu
          :menu-list="menuList"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
