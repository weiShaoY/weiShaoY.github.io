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
  if (type.value === 'code') {
    encodedText.value = base64Encode(inputText.value)
  }
  else {
    encodedText.value = base64Decode(inputText.value)
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
          Base64-编码
        </a-option>

        <a-option
          value="doCode"
        >
          Base64-解码
        </a-option>

      </a-select>

      <a-button
        type="primary"
        @click="isShowModel = true"
      >
        Base64编码对照表
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
