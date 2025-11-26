<script setup lang="ts">
import type { MenuTypeEnum } from '@/enums/tool'

import { useToolStore } from '@/stores'

import { useSettingsConfig } from '../composables/useSettingsConfig'

import { useSettingsState } from '../composables/useSettingsState'

import SectionTitle from './SectionTitle.vue'

const toolStore = useToolStore()

const { width } = useWindowSize()

const { configOptions } = useSettingsConfig()

const { switchMenuLayouts } = useSettingsState()
</script>

<template>
  <div
    v-if="width > 1000"
  >
    <!-- 菜单布局标题 -->
    <SectionTitle
      title="菜单布局"
    />

    <div
      class="setting-box-wrap"
    >
      <div
        v-for="(item, index) in configOptions.menuLayoutList"
        :key="item.value"
        class="setting-item"
        @click="switchMenuLayouts(item.value as MenuTypeEnum)"
      >
        <div
          class="box"
          :class="{ 'is-active': item.value === toolStore.settingObj.menuType, 'mt-16': index > 2 }"
        >
          <img
            :src="item.img"
          >
        </div>

        <p
          class="name"
        >
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
</template>
