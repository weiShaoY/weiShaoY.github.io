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
  try {
    if (type.value === 'code') {
      encodedText.value = encode(inputText.value)
    }
    else {
      encodedText.value = decode(inputText.value)
    }
  }
  catch {
    encodedText.value = ''
    window.$notification?.error('请输入正确的格式!')
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
      <el-select
        v-model="type"
        placeholder="请选择"
        size="large"
        class="!w-60"
        @change="handleSelectChange"
      >
        <el-option
          value="code"
          label="摩斯电码-编码"
        />

        <el-option
          value="doCode"
          label="摩斯电码-解码"
        />
      </el-select>

      <el-button
        type="primary"
        @click="isShowModel = true"
      >
        摩斯密码表
      </el-button>
    </div>

    <el-input
      v-model="inputText"
      :rows="3"
      type="textarea"
      :placeholder="type === 'code' ? '请输入要编码的内容' : '请输入要解码的内容'"
    />

    <el-divider />

    <div
      class="text-4 font-bold"
    >
      {{ type === "code" ? "编码结果" : "解码结果" }}
    </div>

    <div
      v-copy="encodedText"
      class="h-[40%] min-h-25 flex flex-col cursor-pointer border p-2"
    >
      <div
        v-if="encodedText"
      >
        {{ encodedText }}
      </div>
    </div>
  </div>
</template>
