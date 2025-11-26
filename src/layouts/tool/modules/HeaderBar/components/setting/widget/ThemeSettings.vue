<script setup lang="ts">

// import { useTheme } from '@/hooks/core/useTheme'

import { useToolStore } from '@/stores'

import { useSettingsConfig } from '../composables/useSettingsConfig'

import SectionTitle from './SectionTitle.vue'

const toolStore = useToolStore()

const { configOptions } = useSettingsConfig()

// const { switchThemeStyles } = useTheme()
</script>

<template>
  <SectionTitle
    title="主题风格"
  />

  <div
    class="setting-box-wrap"
  >
    <div
      v-for="(item) in configOptions.themeList"
      :key="item.theme"
      class="setting-item"
      @click="switchThemeStyles(item.theme)"
    >
      <div
        class="box"
        :class="{ 'is-active': item.theme === toolStore.settingObj.systemThemeMode }"
      >
        <img
          :src="item.img"
        >
      </div>

      <p
        class="name"
      >
        {{ }}
      </p>
    </div>
  </div>
</template>
