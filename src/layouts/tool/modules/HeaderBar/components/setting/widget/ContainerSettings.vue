<script setup lang="ts">

import { useToolStore } from '@/stores'

import { useSettingsConfig } from '../composables/useSettingsConfig'

import { useSettingsHandlers } from '../composables/useSettingsHandlers'

import SectionTitle from './SectionTitle.vue'

const toolStore = useToolStore()

const { containerWidthOptions } = useSettingsConfig()

const { containerHandlers } = useSettingsHandlers()
</script>

<template>

  <div>
    <SectionTitle
      title="容器宽度"
      class="mt-10"
    />

    <div
      class="flex"
    >
      <div
        v-for="option in containerWidthOptions"
        :key="option.value"
        class="!text-g-800 mb-3.5 mr-3.5 mt-5 h-16 flex flex-1 cursor-pointer items-center justify-center rounded-lg last:mr-0 !border-2"
        :class="{
          'border-theme [&_i]:!text-theme': toolStore.settingObj.containerWidth === option.value,
          'border-full-d': toolStore.settingObj.containerWidth !== option.value,
        }"
        @click="containerHandlers.setWidth(option.value)"
      >

        <svg-icon
          :icon="option.icon"
          class="mr-2 text-lg"
        />

        <span
          class="text-sm"
        >
          {{ option.label }}
        </span>
      </div>
    </div>
  </div>
</template>
