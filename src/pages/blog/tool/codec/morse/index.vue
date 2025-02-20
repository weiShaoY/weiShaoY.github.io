<script lang="ts" setup>

import { decode, encode } from 'xmorse'

import Modal from './modal.vue'

const isShowModel = ref(false)

const type = ref('code')

const inputText = ref('Hello Word! 代码改变世界！')

const encodedText = ref('')

function handleSelectChange() {
  inputText.value = ''
}

watchEffect(() => {
  if (type.value === 'code') {
    encodedText.value = encode(inputText.value)
  }
  else {
    encodedText.value = decode(inputText.value)
  }
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
      :placeholder="type === 'code' ? '请输入要编码的内容' : '请输入要解码的内容'"
    />

    <a-divider />

    <div
      v-copy="encodedText"
      class="h-[40%] flex cursor-pointer border p-2"
    >

      <span
        v-if="encodedText"
      >
        {{ encodedText }}
      </span>

      <span
        v-else
        class="m-auto text-6"
      >
        {{ type === 'code' ? '编码结果' : '解码结果' }}
      </span>

    </div>
  </div>
</template>
