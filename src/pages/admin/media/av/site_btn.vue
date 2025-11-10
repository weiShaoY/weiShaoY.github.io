<!-- eslint-disable vue/require-prop-comment -->
<script setup lang="ts">

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

const isLoading = ref(false)

// 定义更清晰的异步数据获取函数
async function fetchData() {
  try {
    isLoading.value = true
    const res = await fetcher({
      siteItem: props.siteItem,
      targetLink: originLink.value,
      CODE: formatCode.value,
    })

    fetchRes.value = res
  }
  catch {
    window.$notification.error('数据获取失败')

    // 可以在这里添加错误处理逻辑，例如：
    // showErrorToast('加载数据失败，请重试')
  }
  finally {
    isLoading.value = false
  }
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
      v-loading="isLoading"
      class="aspect-square flex items-center gap-1 rounded-2 bg-white p-x-1"

      :style="{
        border: `4px solid ${fetchRes.isSuccess ? '#67c23a' : '#FF1166'}`,
      }"
      @click="go"
    >

      <SvgIcon
        v-if="tag === '字幕'"
        icon="admin-av-tag-ziMu"
        :size="36"
      />

      <SvgIcon
        v-if="tag === '无码'"
        icon="admin-av-tag-wuMa"
        :size="36"
      />

      <SvgIcon
        v-if="tag === '多结果'"
        icon="admin-av-tag-duoJieGuo"
        :size="36"
      />

      <div
        class="m-x-2 w-auto text-dark font-semibold"
      >

        <SvgIcon
          v-if="siteItem.icon"
          :icon="siteItem.icon"
          :size="40"
        />

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

<style lang="scss" scoped>

</style>
