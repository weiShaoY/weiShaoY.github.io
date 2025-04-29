<script lang="ts" setup>
import { decode, encode } from 'xmorse'

import Modal from './modal.vue'

const isShowModel = ref(false)

const type = ref('code')

const inputText = ref('Hello Word! 代码改变世界！')

const encodedText = ref('')

/**
 *  是否格式错误
 */
const isError = ref<boolean>(false)

function handleSelectChange() {
  inputText.value = ''
}

watchEffect(() => {
  isError.value = false

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
    isError.value = true
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

    <div
      class="h-[calc(100vh-200px)] flex items-center justify-center gap-15"
    >
      <el-input
        v-model="inputText"
        type="textarea"
        :placeholder="type === 'code' ? '请输入要摩斯密码编码的内容' : '请输入要摩斯密码解码的内容'"
        class="!h-full !flex-1"
        :input-style="{ height: '100%' }"
        clearable
      />

      <div
        class="h-full flex flex-1 items-center justify-center rounded-2 bg-white !relative"
      >
        <div
          v-if="!isError"
          class="z-100 !absolute !right-2 !top-2"
        >
          <ButtonIcon
            v-copy="{
              text: encodedText,
              message: `${type === 'code' ? '摩斯密码编码结果' : '摩斯密码解码结果'} 已经复制到剪切板`,
            }"
            :size="40"
            icon="copy"
            tooltip-content="点击复制"
          />
        </div>

        <el-alert
          v-if="isError && inputText.length > 0"
          title=" 格式错误，请检查输入"
          type="error"
          class="!w-1/2"
        />

        <div
          v-else
          class="overflow-y-auto break-words break-all border rounded-2 bg-white p-3 !h-full !w-full"
        >
          {{ encodedText }}

        </div>

      </div>
    </div>
  </div>
</template>
