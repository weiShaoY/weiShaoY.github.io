<script lang="ts" setup>
import md5 from 'md5-ts'

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
      class="flex items-center justify-between"
    >
      <div
        class="flex items-center gap-5"
      >
        <el-select
          placeholder="Md5-加密"
          size="large"
          class="!w-60"
          disabled
        />
      </div>

      <ButtonIcon
        v-if="encodedText.length > 0"
        v-copy="{
          text: encodedText,
          message: `Md5 加密数据 已经复制到剪切板`,
        }"
        :size="40"
        icon="copy"
        tooltip-content="点击复制"
      />
    </div>

    <div
      class="h-[calc(100vh-200px)] flex items-center justify-center gap-15"
    >
      <el-input
        v-model="inputText"
        type="textarea"
        placeholder="请输入要Md5 加密的内容"
        class="!h-full !flex-1"
        :input-style="{ height: '100%' }"
      />

      <div
        class="h-full flex flex-1 items-center justify-center rounded-2 bg-white !relative"
      >

        <div
          class="overflow-y-auto break-words break-all border rounded-2 bg-white p-3 !h-full !w-full"
        >
          {{ encodedText }}

        </div>

      </div>
    </div>
  </div>
</template>
