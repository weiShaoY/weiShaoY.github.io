<script lang="ts" setup>
import { useRoute } from 'vue-router'

import { useAdminStore } from '@/stores'

import SubMenu from './sub-menu.vue'

const { menuList } = defineProps<Props>()

const route = useRoute()

type Props = {

  /**
   *  菜单
   */
  menuList: RouterType.AdminRoute[]
}

const adminStore = useAdminStore()

const width = `${adminStore.setting.menu.rightMenuWidth}px`

const homePath = import.meta.env.VITE_ROUTER_ADMIN_HOME_PATH

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
      <TextLogo
        :size="120"
        color="dark"
        :url="homePath"
      />
    </div>

    <el-scrollbar
      :style="{
        height: `calc(100% - ${adminStore.setting.header.height}px)`,
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
