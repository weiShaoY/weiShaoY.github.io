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

onMounted(async () => {
  await getData()
})

</script>

<template>

  <el-tabs
    v-loading="isLoading"
    class="h-full w-full"
  >
    <el-tab-pane
      label="全国油价"
    >
      <div
        class="h-[calc(100vh-200px)]"
      >
        <el-table
          class="!w-full"
          :data="oilData"
          height="100%"
        >

          <el-table-column
            prop="id"
            label="ID"
            align="center"
          />

          <el-table-column
            prop="province"
            label="省份"
            align="center"
            sortable
          />

          <el-table-column
            prop="92"
            label="92号"
            align="center"
            sortable
          />

          <el-table-column
            prop="95"
            label="95号"
            align="center"
            sortable
          />

          <el-table-column
            prop="98"
            label="98号"
            align="center"
            sortable
          />

          <el-table-column
            prop="0"
            label="0号"
            align="center"
            sortable
          />

        </el-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="less" scoped></style>
