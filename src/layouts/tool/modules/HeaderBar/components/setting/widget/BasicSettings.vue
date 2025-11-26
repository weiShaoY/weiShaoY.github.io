<script setup lang="ts">

import { useToolStore } from '@/stores'

import { useSettingsConfig } from '../composables/useSettingsConfig'

import { useSettingsHandlers } from '../composables/useSettingsHandlers'

import SectionTitle from './SectionTitle.vue'

import SettingItem from './SettingItem.vue'

const toolStore = useToolStore()

const { basicSettingsConfig } = useSettingsConfig()

const { basicHandlers } = useSettingsHandlers()

/**
 *  创建设置值映射
 */

const {
  uniqueOpened,
  showMenuButton,
  showFastEnter,
  showRefreshButton,
  showCrumbs,
  showWorkTab,

  // showLanguage,
  // showNprogress,
  colorWeak,
  watermarkVisible,
  menuOpenWidth,
  tabStyle,
  pageTransition,
  customRadius,
} = toRefs(toolStore.settingObj)

// 创建设置值映射
const settingValueMap = {
  uniqueOpened,
  showMenuButton,
  showFastEnter,
  showRefreshButton,
  showCrumbs,
  showWorkTab,

  // showLanguage,
  // showNprogress,
  colorWeak,
  watermarkVisible,
  menuOpenWidth,
  tabStyle,
  pageTransition,
  customRadius,
}

/**
 * 获取设置值的方法
 */
/**
 * 获取设置值的方法
 */

function getSettingValue(key: string) {
  const settingRef = settingValueMap[key as keyof typeof settingValueMap]

  return settingRef?.value ?? null
}

// 统一的设置变更处理
function handleSettingChange(handlerName: string, value: any) {
  const handler = (basicHandlers as any)[handlerName]

  if (typeof handler === 'function') {
    handler(value)
  }
  else {
    console.warn(`Handler "${handlerName}" not found in basicHandlers`)
  }
}
</script>

<template>
  <div>
    <SectionTitle
      title="基础设置"
      class="mt-10"
    />

    <SettingItem
      v-for="config in basicSettingsConfig"
      :key="config.key"
      :config="config"
      :model-value="getSettingValue(config.key)"
      @change="handleSettingChange(config.handler, $event)"
    />
  </div>
</template>
