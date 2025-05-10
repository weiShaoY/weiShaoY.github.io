<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { BlogApi } from '@/api'

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

      BlogApi.getRealTimeGoldPrice(),
    ])

    goldData.value = {
      marketGold: marketGoldPrice,

      domesticTopGoldStores: realTimeGoldPrice['国内十大金店'],
      domesticGold: realTimeGoldPrice['国内黄金'],
      internationalGold: realTimeGoldPrice['国际黄金'],
    }

    console.log(
      '%c Line:64 🍆 goldData.value',
      'color:#7f2b82',
      goldData.value,
    )
  }
  catch (error: any) {
    window.$notification?.error({
      title: '获取数据失败，请稍后重试',
      message: error.message,
    })
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
      key="1"
      label="大盘黄金"
    >
      <div
        class="h-[calc(100vh-200px)]"
      >
        <el-table
          class="!w-full"
          :data="goldData.marketGold"
          height="100%"
        >
          <el-table-column
            prop="id"
            label="ID"
            :width="100"
          />

          <el-table-column
            prop="dir"
            label="商品目录"
            align="center"
            sortable
          />

          <el-table-column
            prop="title"
            label="商品名称"
            align="center"
            sortable
          />

          <el-table-column
            prop="price"
            label="当前价格"
            align="center"
            sortable
          />

          <el-table-column
            prop="changepercent"
            label="涨跌幅"
            align="center"
            sortable
          />

          <el-table-column
            prop="maxprice"
            label="最高价"
            align="center"
            sortable
          />

          <el-table-column
            prop="minprice"
            label="最低价"
            align="center"
            sortable
          />

          <el-table-column
            prop="openingprice"
            label="开盘价"
            align="center"
            sortable
          />

          <el-table-column
            prop="lastclosingprice"
            label="收盘价"
            align="center"
            sortable
          />
        </el-table>
      </div>
    </el-tab-pane>

    <el-tab-pane
      key="2"
      label="国内十大金店"
    >
      <div
        class="h-[calc(100vh-200px)]"
      >
        <el-table
          class="!w-full"
          :data="goldData.domesticTopGoldStores"
          height="100%"
        >
          <el-table-column
            prop="品牌"
            label="品牌"
            align="center"
            sortable
          />

          <el-table-column
            prop="黄金价格"
            label="黄金价格"
            align="center"
            sortable
          />

          <el-table-column
            prop="铂金价格"
            label="铂金价格"
            align="center"
            sortable
          />

          <el-table-column
            prop="金条价格"
            label="金条价格"
            align="center"
            sortable
          />

          <el-table-column
            prop="单位"
            label="单位"
            align="center"
          />

          <el-table-column
            prop="报价时间"
            label="报价时间"
            align="center"
            sortable
          />
        </el-table>
      </div>
    </el-tab-pane>

    <el-tab-pane
      key="3"
      label="国内黄金"
    >
      <div
        class="h-[calc(100vh-200px)]"
      >
        <el-table
          class="!w-full"
          :data="goldData.domesticGold"
          height="100%"
        >
          <el-table-column
            prop="品种"
            label="品种"
            align="center"
            sortable
          />

          <el-table-column
            prop="最新价"
            label="最新价"
            align="center"
            sortable
          />

          <el-table-column
            prop="最低价"
            label="最低价"
            align="center"
            sortable
          />

          <el-table-column
            prop="最高价"
            label="最高价"
            align="center"
            sortable
          />

          <el-table-column
            prop="涨跌"
            label="涨跌"
            align="center"
            sortable
          />

          <el-table-column
            prop="幅度"
            label="幅度"
            align="center"
            sortable
          />

          <el-table-column
            prop="报价时间"
            label="报价时间"
            align="center"
            sortable
          />
        </el-table>
      </div>
    </el-tab-pane>

    <el-tab-pane
      key="4"
      label="国际黄金"
    >
      <div
        class="h-[calc(100vh-200px)]"
      >
        <el-table
          class="!w-full"
          :data="goldData.internationalGold"
          height="100%"
        >
          <el-table-column
            prop="品种"
            label="品种"
            align="center"
            sortable
          />

          <el-table-column
            prop="最新价"
            label="最新价"
            align="center"
            sortable
          />

          <el-table-column
            prop="最低价"
            label="最低价"
            align="center"
            sortable
          />

          <el-table-column
            prop="最高价"
            label="最高价"
            align="center"
            sortable
          />

          <el-table-column
            prop="涨跌"
            label="涨跌"
            align="center"
            sortable
          />

          <el-table-column
            prop="幅度"
            label="幅度"
            align="center"
            sortable
          />

          <el-table-column
            prop="报价时间"
            label="报价时间"
            align="center"
            sortable
          />
        </el-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
