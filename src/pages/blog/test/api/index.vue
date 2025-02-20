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

onMounted(async() => {
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
      <a-input-search
        v-model="apiUrl"
        class="w-[60%]"
        allow-clear
        search-button
        placeholder="请输入接口地址"
        :loading="isLoading"
        @search="getData"
        @press-enter="getData"
        @clear="clearData"
      >
        <template
          #button-icon
        >
          <SvgIcon
            icon="blog-search"
          />
        </template>

        <template
          #button-default
        >
          测试 API
        </template>
      </a-input-search>

    </div>

    <a-card
      class="h-full w-full"
      :loading="isLoading"
    >

      <template
        #title
      >

        <span>
          Http响应码
        </span>

        <a-link
          class="w-12"
        >
          <span
            :class="`${data.http.code === 200 ? 'text-green' : (data.http.code > 0 ? 'text-red' : '')}`"
            class="text-5"
          >
            {{ data.http.code ? data.http.code : '' }}
          </span>
        </a-link>

      </template>

      <template
        #extra
      >
        <span>
          Http响应信息
        </span>

        <a-link
          class="w-12"
        >
          <span
            class="text-xl font-bold"
            :class="{
              'text-green': data.http.message === 'OK',
              'text-red': data.http.message !== 'OK' && data.http.code > 0,
              '': data.http.message !== 'OK' && data.http.code <= 0,
            }"
          >
            {{ data.http.message }}
          </span>
        </a-link>
      </template>

      <a-textarea
        v-model="data.data"
        class="h-full w-full"
        placeholder="接口数据"
      />

    </a-card>
  </div>
</template>

<style lang="less" scoped>
:deep(.arco-card-body) {
  height: calc(100% - 60px);
}
</style>
