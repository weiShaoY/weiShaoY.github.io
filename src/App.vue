<script lang="ts" setup>
import { useTestStore } from '@/store/modules/test'

import { useTitle } from '@vueuse/core'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

const isDevelopment = import.meta.env.VITE_APP_NODE_ENV

const testStore = useTestStore()

// element button config
const buttonConfig = reactive({
  autoInsertSpace: false,
})

useTitle(isDevelopment ? 'Vue-实现' : '代码改变世界')

console.info(
  '%cNiceToMeetYou,我是weiShaoY',
  'color: orange;background:	ivory;font-size:26px;border: 2px solid black;padding:10px;text-shadow:1px 1px grey;border-radius:11px;',
)
</script>

<template>
  <!-- <a-config-provider
    global
  >
    <RouterView />

    <GlobalSetting />
  </a-config-provider> -->

  <el-config-provider
    :locale="zhCn"
    :size="testStore.global.assemblySize"
    :button="buttonConfig"
  >
    <router-view />
  </el-config-provider>
</template>
