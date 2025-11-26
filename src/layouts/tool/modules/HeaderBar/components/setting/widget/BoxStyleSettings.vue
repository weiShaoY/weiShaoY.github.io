<script setup lang="ts">

import { useToolStore } from '@/stores'

import { useSettingsConfig } from '../composables/useSettingsConfig'

import { useSettingsHandlers } from '../composables/useSettingsHandlers'

import SectionTitle from './SectionTitle.vue'

const toolStore = useToolStore()

const { boxStyleOptions } = useSettingsConfig()

const { boxStyleHandlers } = useSettingsHandlers()

/**
 * 判断当前选项是否激活
 */
function isActive(type: 'border-mode' | 'shadow-mode') {
  return type === 'border-mode' ? toolStore.settingObj.boxBorderMode : !toolStore.settingObj.boxBorderMode
}
</script>

<template>

  <div>
    <SectionTitle
      title="盒子样式"
      class="mt-10"
    />

    <div
      class="mt-5 box-border flex items-center justify-between rounded-lg bg-[#f2f4f5] p-1"
    >
      <div
        v-for="option in boxStyleOptions"
        :key="option.value"
        class="h-8.5 w-[calc(50%-3px)] cursor-pointer select-none rounded-md text-center text-sm leading-8.5 transition-all duration-200"
        :class="
          isActive(option.type)
            ? 'text-[#383853] bg-[var(--default-box-color)] dark:!text-white dark:bg-[#393946]'
            : 'text-[#383853] hover:text-[#383853] hover:bg-black/[0.04] dark:hover:bg-black/20'
        "
        @click="boxStyleHandlers.setBoxMode(option.type)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
