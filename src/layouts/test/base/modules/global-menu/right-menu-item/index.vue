<script lang="ts" setup>
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

</script>

<template>
  <div
    class="pl-"
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

</style>
