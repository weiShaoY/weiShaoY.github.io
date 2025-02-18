<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

const isLoading = ref(false)

/**
 *  电影列表每一项
 */
type MovieDataItemType = {

  /**
   * 电影唯一标识符
   */
  id: number

  /**
   * 是否有促销标签
   */
  haspromotionTag: boolean

  /**
   * 电影海报图片地址
   */
  img: string

  /**
   * 电影版本描述
   */
  version: string

  /**
   * 电影名称
   */
  nm: string

  /**
   * 是否为点映状态
   */
  preShow: boolean

  /**
   * 电影评分
   */
  sc: number

  /**
   * 是否已在全球范围上映
   */
  globalReleased: boolean

  /**
   * 用户期待值
   */
  wish: number

  /**
   * 主演列表，多个演员名称以逗号分隔
   */
  star: string

  /**
   * 上映日期，格式为 YYYY-MM-DD
   */
  rt: string

  /**
   * 今日上映信息
   */
  showInfo: string

  /**
   * 上映状态，数值为状态枚举
   */
  showst: number

  /**
   * 期待状态，数值为状态枚举
   */
  wishst: number

  /**
   * 上映标题，如 "11月30日 周六"
   */
  comingTitle: string
}

/**
 *  数据
 */
const goldData = ref<{

  /**
   *  大盘黄金
   */
  marketGold: MovieDataItemType[]

  /**
   *  国内十大金店
   */
  domesticTopGoldStores: MovieDataItemType[]

  /**
   *  国内黄金
   */
  domesticGold: MovieDataItemType[]

  /**
   *  国际黄金
   */
  internationalGold: MovieDataItemType[]

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

      BlogApi.getRealTimeGoldPrice(),
    ])

    goldData.value = {
      marketGold: marketGoldPrice,
      domesticTopGoldStores: realTimeGoldPrice['国内十大金店'],
      domesticGold: realTimeGoldPrice['国内黄金'],
      internationalGold: realTimeGoldPrice['国际黄金'],
    }
  }
  catch (error: any) {
    Notification.error(error.message || '获取数据失败，请稍后重试')
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getData()
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

<style lang="less" scoped></style>
