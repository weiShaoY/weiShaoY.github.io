<script lang="ts" setup>
import { ref, watch } from 'vue' // 导入 ref

import VueJsonPretty from 'vue-json-pretty'

import 'vue-json-pretty/lib/styles.css'

// 存储用户输入的 JSON 数据
const inputJson = ref('')

// 存储格式化后的 JSON 数据
const formattedJson = ref('')

// 新增解析后的JSON对象
const parsedJson = ref({
})

function formatJson() {
  try {
    parsedJson.value = JSON.parse(inputJson.value)
    formattedJson.value = JSON.stringify(parsedJson.value, null, 2)
  }
  catch (error) {
    console.log('json解析错误', error)
    formattedJson.value = '❌ 格式错误'
    parsedJson.value = {
    }
  }
}

// 添加输入内容实时监听
watch(inputJson, (newVal) => {
  if (newVal.trim().length > 0) {
    formatJson()
  }
})

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

      <button
        class="format-button"
        @click="formatJson"
      >
        格式化
      </button>

      <div
        class="h-full flex-1 items-center justify-center"
      >
        <!-- <VueJsonPretty
          :data="formattedJson"
          :deep="3"
          show-line
          show-length
          show-line-number
          collapsed-on-click-bracket
          theme="light"
          class="h-full"
        /> -->
        <VueJsonPretty
          v-if="!formattedJson.startsWith('❌')"
          :data="parsedJson"
          :deep="3"
          show-line
          show-length
          show-line-number
          :collapsed-on-click-bracket="true"
          theme="dark"
          class="h-full overflow-auto rounded-2"
        />
        <!-- v-if="!formattedJson.startsWith('❌')" -->

        <!-- <el-alert
          v-else
          class="!w-1/2"
          title="Warning alert"
          type="warning"
        /> -->

      </div>
    </div>

  </div>

  <!-- <div
    class="json-formatter-container"
  >

    <div
      class="tool-wrapper"
    >
      <div
        class="input-section"
      >
        <textarea
          v-model="inputJson"
          placeholder="请输入 JSON 数据"
          class="input-textarea"
        />
      </div>

      <div
        class="button-group"
      >
        <button
          class="format-button"
          @click="formatJson"
        >
          格式化
        </button>
      </div>

      <div
        class="output-section"
      >
        <VueJsonPretty
          v-if="!formattedJson.startsWith('❌')"
          :data="parsedJson"
          :deep="3"
          show-line
          show-length
          show-line-number
          collapsed-on-click-bracket
          theme="light"
          class="json-output"
        />

        <div
          v-else
          class="error-message"
        >
          {{ formattedJson }}
        </div>
      </div>
    </div>
  </div> -->
</template>

<style scoped>

</style>
