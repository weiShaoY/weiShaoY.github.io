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

      <el-select
        v-model="type"
        placeholder="请选择"
        size="large"
        class="!w-60"
        disabled
      >
        <el-option
          value="code"
          label="Md5-加密"
        />
      </el-select>
    </div>

    <el-input
      v-model="inputText"
      :rows="3"
      type="textarea"
      placeholder="请输入要加密的内容"
    />

    <el-divider />

    <div
      class="text-4 font-bold"
    >
      加密结果
    </div>

    <div
      v-copy="encodedText"
      class="h-[40%] min-h-25 flex flex-col cursor-pointer border p-2"
    >

      <span
        v-if="encodedText"
      >
        {{ encodedText }}
      </span>

    </div>
  </div>
</template>
