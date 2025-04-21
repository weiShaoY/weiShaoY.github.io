<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

const isLoading = ref(false)

/**
 *  列表每一项
 */
type oilDataItemType = {

  /**
   *  省份
   */
  province: string

  id: number

  /**
   *  92号
   */
  92: number

  /**
   *  95号
   */
  95: number

  /**
   *  98号
   */
  98: number

  /**
   *  0号
   */
  0: number
}

/**
 *  数据
 */
const oilData = ref<oilDataItemType[]>([])

/**
 * 获取壁纸数据
 */
async function getData() {
  try {
    isLoading.value = true

    const response = await BlogApi.getOilPrices()

    // 优先排序省份
    const priorityProvinces = ['湖南', '广东']

    const sortedData = response.sort((a: oilDataItemType, b: oilDataItemType) => {
      const indexA = priorityProvinces.indexOf(a.province)

      const indexB = priorityProvinces.indexOf(b.province)

      // 逻辑修正
      if (indexA === -1 && indexB === -1) {
        return 0
      } // 都不在优先级列表

      if (indexA === -1) {
        return 1
      } // a 不在优先列表，排后

      if (indexB === -1) {
        return -1
      } // b 不在优先列表，排后

      return indexA - indexB // 按优先级列表排序
    })

    const transformedData = sortedData.map(({ province, prices }: {
      province: string
      prices: { 0: string, 92: string, 95: string, 98: string }
    }, index: number) => ({
      province,
      id: index + 1,
      0: Number(prices[0]),
      92: Number(prices[92]),
      95: Number(prices[95]),
      98: Number(prices[98]),
    }))

    oilData.value = transformedData
  }
  catch (error: any) {
    Notification.error(error.message || '获取数据失败，请稍后重试')
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
  <a-tabs
    class="w-full"
    default-active-key="1"
  >
    <a-tab-pane
      key="1"
      title="全国油价"
    >
      <a-table
        :data="oilData"
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
            title="省份"
            data-index="province"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="92号"
            data-index="92"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="95号"
            data-index="92"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="98号"
            data-index="92"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="0号"
            data-index="0"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

        </template>
      </a-table>
    </a-tab-pane>

  </a-tabs>
</template>

<style lang="less" scoped></style>
