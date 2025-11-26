<script setup lang="ts">
import type { MenuThemeEnum } from '@/enums/tool'

import { TOOL_CONFIG } from '@/configs'

import { MenuTypeEnum } from '@/enums/tool'

import { useToolStore } from '@/stores'

import SectionTitle from './SectionTitle.vue'

const toolStore = useToolStore()

const isTopMenu = computed(() => toolStore.settingObj.menuType === MenuTypeEnum.TOP)

const isDualMenu = computed(() => toolStore.settingObj.menuType === MenuTypeEnum.DUAL_MENU)

const disabled = computed(() => isTopMenu.value || isDualMenu.value || toolStore.settingObj.isDark)

// 菜单样式切换
function switchMenuStyles(theme: MenuThemeEnum) {
  if (isDualMenu.value || isTopMenu.value || toolStore.settingObj.isDark()) {
    return
  }

  toolStore.settingObj.switchMenuStyles(theme)
}
</script>

<template>
  <SectionTitle
    title="菜单风格"
  />

  <div
    class="setting-box-wrap"
  >
    <div
      v-for="item in TOOL_CONFIG.themeList"
      :key="item.theme"
      class="setting-item"
      @click="switchMenuStyles(item.theme)"
    >
      <div
        class="box"
        :class="{ 'is-active': item.theme === toolStore.settingObj.menuThemeType }"
        :style="{
          cursor: disabled ? 'no-drop' : 'pointer',
        }"
      >
        <img
          :src="item.img"
        >
      </div>
    </div>
  </div>
</template>
