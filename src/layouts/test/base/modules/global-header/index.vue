<script setup lang="ts">

import { useTestStore } from '@/store'

import { useFullscreen } from '@vueuse/core'

import { GLOBAL_HEADER_MENU_ID } from '../../app'

import FullScreen from '../../components/fullScreen/index.vue'

import MenuToggler from '../../components/menuToggler/index.vue'

import ThemeButton from '../../components/themeButton/index.vue'

import ThemeSchemaSwitch from '../../components/themeSchemaSwitch/index.vue'

import GlobalBreadcrumb from '../global-breadcrumb/index.vue'

// import { useThemeStore } from '@/store/modules/theme'

import GlobalLogo from '../global-logo/index.vue'

import GlobalSearch from '../global-search/index.vue'

defineOptions({
  name: 'GlobalHeader',
})

const props = defineProps<Props>()

console.log('%c Line:24 🍒 props', 'color:#ea7e5c', props)

type Props = {

  /**
   * 是否显示 Logo
   */
  showLogo?: BlogType.App.HeaderProps['showLogo']

  /**
   *  是否显示菜单切换按钮
   */
  showMenuToggler?: BlogType.App.HeaderProps['showMenuToggler']

  /**
   *  是否显示菜单
   */
  showMenu?: BlogType.App.HeaderProps['showMenu']
}

const testStore = useTestStore()

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <DarkModeContainer
    class="flex-y-center shadow-header h-full px-[12px]"
  >
    <!-- 全局Logo -->
    <GlobalLogo
      v-if="showLogo"
      class="h-full"
      :style="{ width: `${testStore.theme.sider.width}px` }"
    />

    <!-- 菜单切换按钮 -->
    <MenuToggler
      v-if="showMenuToggler"
      :collapsed="testStore.app.siderCollapse"
      @click="testStore.app.siderCollapse = !testStore.app.siderCollapse"
    />

    <!-- <el-button>
      菜单切换按钮
    </el-button> -->

    <!-- 菜单 -->
    <div
      v-if="showMenu"
      :id="GLOBAL_HEADER_MENU_ID"
      class="flex-y-center flex-1-hidden h-full"
    />

    <!-- 面包屑导航 -->
    <div
      v-else
      class="flex-y-center flex-1-hidden h-full"
    >
      <GlobalBreadcrumb
        v-if="!testStore.app.isMobile"
        class="ml-[12px]"
      />
    </div>

    <!-- 右侧操作区 -->
    <div
      class="flex-y-center h-full justify-end"
    >
      <GlobalSearch />

      <!-- 全屏按钮 -->
      <div>
        <FullScreen
          v-if="!testStore.app.isMobile"
          :full="isFullscreen"
          @click="toggle"
        />
      </div>
      <!-- 主题色切换按钮 -->
      <ThemeSchemaSwitch
        :theme-schema="testStore.theme.themeScheme"
        :is-dark="testStore.themeFUNC.darkMode"
        @switch="testStore.themeFUNC.toggleThemeScheme"
      />

      <div>
        <!-- 主题按钮 -->
        <ThemeButton
          @click="testStore.app.themeDrawerVisible = !testStore.app.themeDrawerVisible"
        />
      </div>
    </div>
  </DarkModeContainer>
</template>

<style scoped></style>
