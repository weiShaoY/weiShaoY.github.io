<script lang="ts" setup>

import { decode, encode } from 'xmorse'

import Modal from './modal.vue'

const isShowModel = ref(false)

const type = ref('code')

const inputText = ref('Hello Word! 代码改变世界！')

const encodedText = ref('')

function handleSelectChange() {
  inputText.value = ''

  // clearData()
}

watchEffect(() => {
  if (type.value === 'code') {
    encodedText.value = encode(inputText.value)
  }
  else {
    encodedText.value = decode(inputText.value)
  }
})

onMounted(() => {
  // getData()
})
</script>

<template>

  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <Modal
      v-if="isShowModel"
      v-model="isShowModel"
    />

    <div
      class="flex items-center gap-5"
    >
      <a-select
        v-model="type"
        class="w-40"
        placeholder="请选择查询类型"
        @change="handleSelectChange"
      >
        <a-option
          value="code"
        >
          摩斯电码-编码
        </a-option>

        <a-option
          value="doCode"
        >
          摩斯电码-解码
        </a-option>

      </a-select>

      <a-button
        type="primary"
        @click="isShowModel = true"
      >
        摩斯密码表
      </a-button>
    </div>

    <a-textarea
      v-model="inputText"
      class="h-[40%] w-full"
      allow-clear
      placeholder="请输入需要编码的文本"
    />

    <a-divider />

    <div
      v-copy="encodedText"
      class="h-[40%] border p-2"
    >
      {{ encodedText || '编码结果' }}
    </div>
  </div>
</template>
