<script lang="ts" setup>

import { Notification } from '@arco-design/web-vue'

import { ref } from 'vue'

const isLoading = ref(false)

const apiUrl = ref('https://api.pearktrue.cn/api/goldprice/')

const data = ref({
  http: {
    code: 0,
    message: '',
  },
  data: '',
})

/**
 *  清空数据
 */
function clearData() {
  data.value = {
    http: {
      code: 0,
      message: '',
    },
    data: '',
  }
}

async function getData() {
  try {
    if (!apiUrl.value) {
      throw new Error('请输入接口地址')
    }

    clearData()

    isLoading.value = true

    const response = await fetch(apiUrl.value)

    if (!response.ok) {
      throw new Error(
        `网络请求失败: ${response.status} ${response.statusText}`,
      )
    }

    const responseText = await response.text()

    data.value = {
      http: {
        code: response.status,
        message: response.statusText,
      },
      data: responseText || '无返回数据',
    }
  }
  catch (error: any) {
    Notification.error(error.message || '获取数据失败，请稍后重试')

    clearData()
  }
  finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <div
      class="flex items-center gap-5"
    >
      <el-input
        v-model.trim="apiUrl"
        clearable
        size="large"
        placeholder="请输入接口地址"
        class="!max-w-[30%] !overflow-hidden"
        @keydown.enter.prevent="getData"
        @clear="clearData"
      >
        <template
          #append
        >
          <ButtonIcon
            icon="search"
            :loading="isLoading"
            @click="getData"
          />
        </template>
      </el-input>
    </div>

    <el-card
      v-loading="isLoading"
      class="h-full w-full"
    >

      <template
        #header
      >

        <span>
          Http响应码
        </span>

        <el-link
          class="w-12"
          :type="data.http.code === 200 ? 'success' : (data.http.code > 0 ? 'danger' : 'info')"
        >
          {{ data.http.code ? data.http.code : '' }}
        </el-link>
      </template>

      <el-input
        v-model="data.data"
        :rows="30"
        type="textarea"
        placeholder="接口数据"
        :input-style="{ height: 'calc(100vh - 300px) !important' }"
      />

    </el-card>
  </div>
</template>

<style lang="less" scoped>
:deep(.arco-card-body) {
  height: calc(100% - 60px);
}
</style>
