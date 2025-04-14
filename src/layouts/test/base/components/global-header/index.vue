<script setup lang="ts">
import { GLOBAL_HEADER_MENU_ID } from '@/constants/app'

import { useTestStore } from '@/store/modules/app'

import { useThemeStore } from '@/store/modules/theme'

import { useFullscreen } from '@vueuse/core'

import GlobalBreadcrumb from '../global-breadcrumb/index.vue'

import GlobalLogo from '../global-logo/index.vue'

import GlobalSearch from '../global-search/index.vue'

import ThemeButton from './components/theme-button.vue'

defineOptions({
  name: 'GlobalHeader',
})

defineProps<Props>()
type Props = {

  /** 是否显示 Logo */
  showLogo?: BlogType.App.HeaderProps['showLogo']

  /** 是否显示菜单切换按钮 */
  showMenuToggler?: BlogType.App.HeaderProps['showMenuToggler']

  /** 是否显示菜单 */
  showMenu?: BlogType.App.HeaderProps['showMenu']
}
const testStore = useTestStore()

const themeStore = useThemeStore()

// const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <DarkModeContainer
    class="flex-y-center shadow-header h-full px-[12px]"
  >
    <!-- 全局Logo -->
    <GlobalLogo
      v-if="showLogo"
      class="h-full"
      :style="{ width: `${themeStore.sider.width}px` }"
    />
    <!-- 菜单切换按钮 -->
    <!-- <MenuToggler
      v-if="showMenuToggler"
      :collapsed="testStore.siderCollapse"
      @click="testStore.siderCollapse = !testStore.siderCollapse"
    /> -->

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
      <!-- <GlobalBreadcrumb
        v-if="!appStore.isMobile"
        class="ml-[12px]"
      /> -->
    </div>

    <!-- 右侧操作区 -->
    <div
      class="flex-y-center h-full justify-end"
    >
      <GlobalSearch />
      <!-- 全屏按钮 -->
      <div>
        <!-- <FullScreen
          v-if="!appStore.isMobile"
          :full="isFullscreen"
          @click="toggle"
        /> -->
      </div>
      <!-- 主题色切换按钮 -->
      <!-- <ThemeSchemaSwitch
        :theme-schema="themeStore.themeScheme"
        :is-dark="themeStore.darkMode"
        @switch="themeStore.toggleThemeScheme"
      /> -->

      <div>
        <!-- 主题按钮 -->
        <ThemeButton />
      </div>
    </div>
  </DarkModeContainer>
</template>

<style scoped></style>
