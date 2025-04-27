<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

const isLoading = ref(false)

/**
 *  数据
 */
const goldData = ref<{

  /**
   *  大盘黄金
   */
  marketGold: []

  /**
   *  国内十大金店
   */
  domesticTopGoldStores: []

  /**
   *  国内黄金
   */
  domesticGold: []

  /**
   *  国际黄金
   */
  internationalGold: []

}>({
  marketGold: [],
  domesticTopGoldStores: [],
  domesticGold: [],
  internationalGold: [],
})

/**
 * 获取壁纸数据
 */
async function getData() {
  try {
    isLoading.value = true

    // 并行获取数据，提高性能
    const [marketGoldPrice, realTimeGoldPrice] = await Promise.all([

      BlogApi.getMarketGoldPrice(),

      // BlogApi.getRealTimeGoldPrice(),
    ])

    goldData.value = {
      marketGold: marketGoldPrice,

      // domesticTopGoldStores: realTimeGoldPrice['国内十大金店'],
      // domesticGold: realTimeGoldPrice['国内黄金'],
      // internationalGold: realTimeGoldPrice['国际黄金'],
    }

    console.log('%c Line:64 🍆 goldData.value', 'color:#7f2b82', goldData.value)
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
  <a-tabs
    class="w-full"
    default-active-key="1"
  >
    <a-tab-pane
      key="1"
      title="大盘黄金"
    >
      <a-table
        :data="goldData.marketGold"
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
            title="商品目录"
            data-index="dir"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="商品名称"
            data-index="title"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="当前价格"
            data-index="price"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="涨跌幅"
            data-index="changepercent"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="最高价"
            data-index="maxprice"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="最低价"
            data-index="minprice"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="开盘价"
            data-index="openingprice"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="收盘价"
            data-index="lastclosingprice"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="日期"
            data-index="date"
            align="center"
          />
        </template>
      </a-table>
    </a-tab-pane>

    <a-tab-pane
      key="2"
      title="国内十大金店"
    >
      <a-table
        :data="goldData.domesticTopGoldStores"
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
            title="品牌"
            data-index="品牌"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="黄金价格"
            data-index="黄金价格"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="铂金价格"
            data-index="铂金价格"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="金条价格"
            data-index="金条价格"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="单位"
            data-index="单位"
            align="center"
          />

          <a-table-column
            title="报价时间"
            data-index="报价时间"
            align="center"
          />
        </template>
      </a-table>
    </a-tab-pane>

    <a-tab-pane
      key="3"
      title="国内黄金"
    >
      <a-table
        :data="goldData.domesticGold"
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
            title="品种"
            data-index="品种"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="最新价"
            data-index="最新价"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="最低价"
            data-index="最低价"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="最高价"
            data-index="最高价"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="涨跌"
            data-index="涨跌"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="幅度"
            data-index="幅度"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="报价时间"
            data-index="报价时间"
            align="center"
          />
        </template>
      </a-table>
    </a-tab-pane>

    <a-tab-pane
      key="4"
      title="国际黄金"
    >
      <a-table
        :data="goldData.internationalGold"
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
            title="品种"
            data-index="品种"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="最新价"
            data-index="最新价"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="最低价"
            data-index="最低价"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="最高价"
            data-index="最高价"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="涨跌"
            data-index="涨跌"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="幅度"
            data-index="幅度"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="报价时间"
            data-index="报价时间"
            align="center"
          />
        </template>
      </a-table>
    </a-tab-pane>
  </a-tabs>
</template>
