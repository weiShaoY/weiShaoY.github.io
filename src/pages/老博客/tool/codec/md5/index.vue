<script lang="ts" setup>
import md5 from 'md5-ts'

const type = ref('code')

const inputText = ref('Hello Word! 代码改变世界！')

const encodedText = ref('')

watchEffect(() => {
  if (inputText.value) {
    encodedText.value = md5(inputText.value)
  }
  else {
    encodedText.value = ''
  }
})

</script>

<template>

  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >

    <div
      class="flex items-center gap-5"
    >
      <a-select
        v-model="type"
        class="w-40"
        placeholder="请选择查询类型"
      >
        <a-option
          value="code"
        >
          Md5-加密
        </a-option>
      </a-select>
    </div>

    <a-textarea
      v-model="inputText"
      class="h-[40%] w-full"
      allow-clear
      placeholder="请输入要加密的内容"
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
        加密结果
      </span>

    </div>
  </div>
</template>
