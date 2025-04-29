<script lang="ts" setup>
import { copyText } from '@/utils'

import { ref, watch } from 'vue'

import VueJsonPretty from 'vue-json-pretty'

import 'vue-json-pretty/lib/styles.css'

/**
 *  是否格式错误
 */
const isError = ref<boolean>(false)

/**
 * 用户输入的 JSON 字符串
 */
const inputJson = ref<string>('')

/**
 * 格式化后的 JSON 字符串
 */
const formattedJson = ref<string>('')

/**
 * 解析后的 JSON 对象
 */
const parsedJson = ref<Record<string, any>>({
})

/**
 * 格式化 JSON 字符串
 */
function formatJson() {
  isError.value = false
  try {
    const parsed = JSON.parse(inputJson.value)

    parsedJson.value = parsed
    formattedJson.value = JSON.stringify(parsed, null, 2)
  }
  catch {
    isError.value = true
    parsedJson.value = {
    }
  }
}

// 页面初始化时自动格式化一次
formatJson()

// 监听用户输入实时格式化
watch(inputJson, (newVal) => {
  if (newVal.trim().length > 0) {
    formatJson()
  }
})

function handleCopy() {
  copyText(formattedJson.value, false)

  try {
    window.$notification?.success({
      title: '复制成功',
      message: 'JSON 数据已复制到剪贴板',
    })
  }
  catch {
    window.$notification?.error({
      title: '复制失败',
      message: '请手动复制 JSON 数据',
    })
  }
}
</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <div
      class="flex items-center gap-10"
    >
      <el-select
        placeholder="JSON 格式化"
        size="large"
        class="!w-60"
        disabled
      />

    </div>

    <div
      class="h-[calc(100vh-200px)] flex items-center justify-center gap-15"
    >
      <el-input
        v-model="inputJson"
        type="textarea"
        placeholder="请输入 JSON 数据"
        class="!h-full !flex-1"
        :input-style="{ height: '100%' }"
      />

      <div
        class="h-full flex flex-1 items-center justify-center !relative"
      >

        <div
          v-if="!isError"
          class="z-100 !absolute !right-2 !top-2"
        >
          <ButtonIcon
            :size="40"
            icon="copy"
            tooltip-content="点击复制"
            @click="handleCopy"
          />
        </div>

        <el-alert
          v-if="isError && inputJson.length > 0"
          title="JSON 格式错误，请检查输入"
          type="error"
          class="!w-1/2"
        />

        <VueJsonPretty
          v-else
          :data="parsedJson"
          :deep="3"
          show-line
          show-length
          show-line-number
          :collapsed-on-click-bracket="true"
          :editable="true"
          class="overflow-auto border rounded-2 bg-white p-3 !h-full !w-full"
        />

      </div>
    </div>
  </div>
</template>
