<script lang="ts" setup>
import { ref } from 'vue'

import { BlogApi } from '@/apis'

const isLoading = ref(false)

const cigaretteName = ref('白沙')

const cigaretteData = ref<any>([])

/**
 *  清空数据
 */
function clearData() {
  cigaretteData.value = []
}

async function getData() {
  try {
    if (!cigaretteName.value) {
      throw new Error('请输入香烟名称')
    }

    clearData()

    isLoading.value = true

    const response = await BlogApi.getCigarettePrice(cigaretteName.value)

    cigaretteData.value = response
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
        v-model.trim="cigaretteName"
        clearable
        size="large"
        placeholder="请输入香烟名称"
        class="!max-w-[30%] !overflow-hidden"
        @keydown.enter.prevent="getData"
        @clear="clearData"
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
    </div>

    <div
      v-loading="isLoading"
      class="h-[calc(100vh-200px)]"
    >
      <el-table
        class="!w-full"
        :data="cigaretteData"
        height="100%"
      >

        <el-table-column
          prop="id"
          label="ID"
          align="center"
        />

        <el-table-column
          prop="name"
          label="香烟名称"
          align="center"
          sortable
        />

        <el-table-column
          prop="单盒参考价"
          label="单盒参考价"
          align="center"
          sortable
        />

        <el-table-column
          prop="条盒参考价"
          label="条盒参考价"
          align="center"
          sortable
        />

        <el-table-column
          prop="香烟类型"
          label="香烟类型"
          align="center"
          sortable
        />

        <el-table-column
          prop="烟碱量"
          label="烟碱量"
          align="center"
          sortable
        />

        <el-table-column
          prop="焦油量"
          label="焦油量"
          align="center"
          sortable
        />

        <el-table-column
          prop="烟支规格"
          label="烟支规格"
          align="center"
          sortable
        />

      </el-table>
    </div>
  </div>
</template>
