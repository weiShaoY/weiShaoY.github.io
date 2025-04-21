<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

import { ref } from 'vue'

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
      <a-input-search
        v-model="cigaretteName"
        class="w-[60%]"
        allow-clear
        search-button
        placeholder="请输入香烟名称"
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
          香烟搜索
        </template>
      </a-input-search>
    </div>

    <a-table
      :data="cigaretteData"
      :loading="isLoading"
      scrollbar
      :scroll="{
        maxHeight: 'calc(100vh - 300px)',
      }"
      :pagination="false"
    >
      <template
        #columns
      >
        <a-table-column
          title="ID"
          data-index="id"
          align="center"
          :width="100"
        />

        <a-table-column
          title="香烟名称"
          data-index="name"
          :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"
        />

        <a-table-column
          title="单盒参考价"
          data-index="单盒参考价"
          align="center"
          :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"
        />

        <a-table-column
          title="条盒参考价"
          data-index="条盒参考价"
          align="center"
          :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"
        />

        <a-table-column
          title="香烟类型"
          data-index="香烟类型"
          align="center"
          :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"
        />

        <a-table-column
          title="烟碱量"
          data-index="烟碱量"
          align="center"
          :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"
        />

        <a-table-column
          title="焦油量"
          data-index="焦油量"
          align="center"
          :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"
        />

        <a-table-column
          title="烟支规格"
          data-index="烟支规格"
          align="center"
          :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"
          :width="240"
        />
      </template>
    </a-table>
  </div>
</template>

<style lang="less" scoped>
:deep(.arco-card-body) {
  height: calc(100% - 60px);
}
</style>
