<script lang="ts" setup>

import Modal from './modal.vue'

const isShowModel = ref(false)

const type = ref('code')

const inputText = ref('Hello Word! 代码改变世界！')

const encodedText = ref('')

function handleSelectChange() {
  inputText.value = ''
}

/**
 *  base64 编码
 */
function base64Encode(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      (_, p1) => {
        return String.fromCharCode(Number.parseInt(p1, 16))
      },
    ),
  )
}

/**
 *  base64 解码
 */
function base64Decode(base64Str: string) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(base64Str), (c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
      })
      .join(''),
  )
}

watchEffect(() => {
  try {
    if (type.value === 'code') {
      encodedText.value = base64Encode(inputText.value)
    }
    else {
      encodedText.value = base64Decode(inputText.value)
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
          label="Base64-编码"
        />

        <el-option
          value="doCode"
          label="Base64-解码"
        />
      </el-select>

      <el-button
        type="primary"
        @click="isShowModel = true"
      >
        Base64编码对照表
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
