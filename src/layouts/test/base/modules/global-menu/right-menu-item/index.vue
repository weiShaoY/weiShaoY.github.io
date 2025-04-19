<script lang="ts" setup>
import { useTestStore } from '@/store'

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

const testStore = useTestStore()

const width = `${testStore.setting.menu.rightMenuWidth}px`

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

    <el-menu
      :default-active="route.path"
    >
      <SubMenu
        :menu-list="menuList"
      />
    </el-menu>
  </div>
</template>

<style lang="scss">

// 展开的宽度
.el-menu:not(.el-menu--collapse) {
  width: v-bind(width);
}
</style>
