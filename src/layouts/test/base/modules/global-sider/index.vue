<script setup lang="ts">
import { useTestStore } from '@/store'

import { computed } from 'vue'

import { GLOBAL_SIDER_MENU_ID } from '../../app'

import DarkModeContainer from '../../components/darkModeContainer/index.vue'

import GlobalLogo from '../global-logo/index.vue'

defineOptions({
  name: 'GlobalSider',
})

const testStore = useTestStore()

/**
 *  判断是否为垂直混合布局模式
 */
const isVerticalMix = computed(() => testStore.theme.layout.mode === 'vertical-mix')

/**
 *  判断是否为水平混合布局模式
 */
const isHorizontalMix = computed(() => testStore.theme.layout.mode === 'horizontal-mix')

/**
 *  计算是否启用暗色菜单模式
 */
const darkMenu = computed(() => !testStore.themeFUNC.darkMode && !isHorizontalMix.value && testStore.theme.sider.inverted)

/**
 *  计算是否显示 Logo
 */
const showLogo = computed(() => !isVerticalMix.value && !isHorizontalMix.value)

/**
 *  计算菜单容器的 CSS 类
 */
const menuWrapperClass = computed(() => (showLogo.value ? 'flex-1-hidden' : 'h-full'))
</script>

<template>
  <!-- 侧边栏容器，支持暗黑模式 -->
  <DarkModeContainer
    class="size-full flex-col-stretch shadow-sider"
    :inverted="darkMenu"
  >
    <!-- 全局 Logo，控制是否显示标题 -->
    <GlobalLogo
      v-if="showLogo"
      :show-title="!testStore.app.siderCollapse"
      :style="{ height: `${testStore.theme.header.height}px` }"
    />

    <!-- 侧边栏菜单容器 -->
    <div
      :id="GLOBAL_SIDER_MENU_ID"
      :class="menuWrapperClass"
    />
  </DarkModeContainer>
</template>

<style scoped></style>
