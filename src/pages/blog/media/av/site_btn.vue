<!-- eslint-disable vue/require-prop-comment -->
<script setup lang="ts">

import duoJieGuo from './svg/tag/duoJieGuo.svg'

import wuMaSvg from './svg/tag/wuMa.svg'

import ziMuSvg from './svg/tag/ziMu.svg'

import { fetcher } from './utils/xhr'

type Props = {
  siteItem: OnlinePlayType.SiteItem
  code: string
  multipleNavi?: boolean
  hiddenError?: boolean
}

const props = defineProps<Props>()

/**
 *  计算格式化后的 CODE，如果有 codeFormater 函数则使用它格式化
 */
const formatCode = computed(() => {
  return props.siteItem.codeFormater ? props.siteItem.codeFormater(props.code) : props.code
})

/**
 *  定义组件的状态，使用 ref 创建响应式对象
 */
const fetchRes = ref<OnlinePlayType.FetchResult>({
  isSuccess: false,
  resultLink: '',
  tag: '',
  multipleRes: false,
})

const originLink = computed(() => {
  return props.siteItem.url.replace('{{code}}', formatCode.value)
})

const multipleFlag = computed(() => {
  return props.multipleNavi && fetchRes.value?.multipleRes
})

const tag = computed(() => {
  return multipleFlag.value ? '多结果' : fetchRes.value?.tag
})

const resultLink = computed(() => {
  return multipleFlag.value ? originLink.value : fetchRes.value?.resultLink
})

// 定义一个异步函数来获取数据
async function fetchData() {
  fetcher({
    siteItem: props.siteItem,
    targetLink: originLink.value,
    CODE: formatCode.value,
  }).then(
    (res) => {
      fetchRes.value = res
    },
  )
}

onMounted(() => {
  // 调用获取数据的函数
  fetchData()
})

watch(
  () => props.code,
  () => {
    // 当 code 变化时，重新调用获取数据的函数
    fetchData()
  },
)

watchEffect(() => {

})

/**
 *   跳转到目标链接
 */
function go() {
  window.open(resultLink.value || originLink.value, '_blank')
}

/**
 *  跳转到站点主页
 */
function openSiteHomepage(siteItem: OnlinePlayType.SiteItem) {
  /**
   *  添加协议
   */
  const fullUrl = `https://${siteItem.hostname}`

  window.open(fullUrl, '_blank')
}
</script>

<template>
  <div
    class="group relative flex cursor-pointer items-center justify-center rounded-2"
  >
    <div
      class="aspect-square flex items-center gap-1 rounded-2 bg-white p-x-1"

      :style="{
        border: `4px solid ${fetchRes.isSuccess ? '#67c23a' : '#FF1166'}`,
      }"
      @click="go"
    >
      <img
        v-if="tag === '字幕'"
        :src="ziMuSvg"
        class="h-10 w-10"
      >

      <img
        v-if="tag === '无码'"
        :src="wuMaSvg"
        class="h-10 w-10"
      >

      <img
        v-if="tag === '多结果'"
        :src="duoJieGuo"
        class="h-10 w-10"
      >

      <div
        class="m-x-2 w-auto text-dark font-semibold"
      >

        <img
          v-if="siteItem.icon"
          :src="siteItem.icon"
          class="!h-10 !min-h-10 !min-w-10 !w-10"
        >

        <span
          v-else
        >
          {{ siteItem.name }}
        </span>

      </div>
    </div>

    <span
      class="absolute left-1/2 z-20 scale-0 transform rounded-lg bg-gray-900 p-x-4 p-y-2 text-sm text-white font-bold shadow-lg transition-transform duration-300 ease-in-out -top-9 -translate-x-1/2 group-hover:scale-100"

      @click="openSiteHomepage(siteItem)"
    >
      {{ siteItem.name }}
    </span>
  </div>
</template>

<style lang="less" scoped>

</style>
