<script lang="ts" setup>

const isLoading = ref(false)

const apiUrl = ref('https://api.pearktrue.cn/api/goldprice/')

/**
 *  是否启动三方代理
 */
const isProxy = ref(false)

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

    // 构建请求URL
    const requestUrl = isProxy.value
      ? `${import.meta.env.VITE_API_PROXY_URL}${apiUrl.value}`
      : apiUrl.value

    const response = await fetch(requestUrl)

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
    window.$notification?.error({
      title: '获取数据失败，请稍后重试',
      message: error.message,
    })
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
        class="!max-w-[70%] !overflow-hidden"
        @keydown.enter.prevent="getData"
        @clear="clearData"
        @blur="getData"
      >
        <template
          #append
        >
          <BaseButton
            icon="search"
            :loading="isLoading"
            @click="getData"
          />
        </template>
      </el-input>

      <el-switch
        v-model="isProxy"
        size="large"
        inline-prompt
        style="--el-switch-on-color: #F3B03D;"
        active-text="启用三方代理"
        inactive-text="不启用三方代理"
      />
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
          class="w-12 font-bold"
          :type="data.http.code === 200 ? 'success' : (data.http.code > 0 ? 'danger' : 'info')"
        >
          {{ data.http.code ? data.http.code : '' }}
        </el-link>

        <span
          v-if="!!isProxy"
          class="color-red font-bold"
        >
          已启用代理
        </span>
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
