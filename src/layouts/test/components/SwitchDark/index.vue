<script setup lang="ts" name="SwitchDark">
import { useBlogTheme } from '@/hooks'

import { useTestStore } from '@/store/modules/test'

import { Moon, Sunny } from '@element-plus/icons-vue'

const { switchDark } = useBlogTheme()

const testStore = useTestStore()
</script>

<template>
  <el-switch
    v-model="testStore.global.isDark"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    @change="switchDark"
  />
</template>
