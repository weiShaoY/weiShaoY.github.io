<script lang="ts" setup>

import type { GlobalConfigProvider } from 'tdesign-vue-next'

import { merge } from 'lodash-es'

import zhConfig from 'tdesign-vue-next/es/locale/zh_CN'

import { useBlogStore } from './store'

defineOptions({
  name: 'App',
})

// console.info(
//   '%cNiceToMeetYou,我是weiShaoY',
//   'color: orange;background:ivory;font-size:26px;border: 2px solid black;padding:10px;text-shadow:1px 1px grey;border-radius:11px;',
// )

const blogStore = useBlogStore()

const empty: GlobalConfigProvider = {
}

const customConfig: GlobalConfigProvider = {
  // 可以在此处定义更多自定义配置，具体可配置内容参看 API 文档
  calendar: {
  },
  table: {
  },
  pagination: {
  },
}

const globalConfig: GlobalConfigProvider = merge(empty, zhConfig, customConfig)

</script>

<template>

  <t-config-provider
    :global-config="globalConfig"
  >
    <t-watermark
      v-if="blogStore.setting.watermark.isShow"
      class="h-full w-full"
      :watermark-content="{ text: `${blogStore.setting.watermark.text}` }"
      :y="120"
      :x="80"
      :width="120"
      :height="60"
    >
      <RouterView />
    </t-watermark>

    <RouterView
      v-else
    />
  </t-config-provider>
</template>
