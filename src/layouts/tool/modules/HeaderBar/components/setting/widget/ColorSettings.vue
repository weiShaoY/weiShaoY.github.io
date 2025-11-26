<script setup lang="ts">

import { useToolStore } from '@/stores'

import { useSettingsConfig } from '../composables/useSettingsConfig'

import { useSettingsHandlers } from '../composables/useSettingsHandlers'

import SectionTitle from './SectionTitle.vue'

const toolStore = useToolStore()

const { configOptions } = useSettingsConfig()

const { colorHandlers } = useSettingsHandlers()
</script>

<template>

  <div>
    <SectionTitle
      title="系统主题色"
      class="mt-10"
    />

    <div
      class="-mr-4"
    >
      <div
        class="flex flex-wrap"
      >
        <div
          v-for="color in configOptions.mainColors"
          :key="color"
          class="mb-2.5 mr-4 size-[23px] flex cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:opacity-85"
          :style="{ background: `${color} !important` }"
          @click="colorHandlers.selectColor(color)"
        >
          <SvgIcon
            v-show="color === toolStore.settingObj.systemThemeColor"
            icon="selected"
            :size="14"
            class="!text-white"
          />
        </div>
      </div>
    </div>
  </div>
</template>
