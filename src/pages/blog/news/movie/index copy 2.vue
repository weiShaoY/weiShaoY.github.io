<script lang="ts" setup>
import type { TableProps } from 'tdesign-vue-next'

import { BlogApi } from '@/api'

import { onMounted, ref } from 'vue'

import Parse from './components/parse/index.vue'

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
 * 数据
 */
const movieData = ref<Record<string, MovieDataItemType[]>>({
  comingSoon: [],
  hotTheater: [],
})

/**
 * 获取电影数据
 */
async function getData() {
  try {
    isLoading.value = true

    // 并行获取数据，提高性能
    const [comingSoon, hotTheater] = await Promise.all([
      BlogApi.getComingSoonMovie(),
      BlogApi.getHotTheaterMovie(),
    ])

    movieData.value = {
      comingSoon,
      hotTheater: hotTheater.movieList,
    }

    // await nextTick();
  }
  catch (error: any) {
    window.$message?.error(error.message || '获取数据失败，请稍后重试')
  }
  finally {
    isLoading.value = false
  }
}

const columns = ref<TableProps['columns']>([
  {
    title: 'ID',
    colKey: 'id',
    width: 100,

    // sorter: true,

    sorter: (a, b) => a.id - b.id,
  },
  {
    title: '海报',
    colKey: 'img',
    width: 100,

    //    sorter: true,
  },
  {
    title: '电影名称',
    colKey: 'nm',

    //    sorter: true,
  },
  {
    title: '上映日期',
    colKey: 'rt',

    //    sorter: true,
  },
  {
    title: '期待值',
    colKey: 'wish',

    //    sorter: true,
  },
  {
    title: '评分',
    colKey: 'sc',

    //    sorter: true,
  },

])

const sort = ref({
  sortBy: 'id',

  descending: true,
})

function sortChange(sortVal, options) {
  sort.value = sortVal
  movieData.value.comingSoon = options.currentDataSource
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <t-tabs
    default-value="comingSoon"
    class="h-full w-full"
  >
    <t-tab-panel
      v-for="(movies, key) in movieData"
      :key="key"
      :value="key"
      :label="key === 'comingSoon' ? '即将上映' : '院线热播'"
    >
      <t-table
        row-key="id"
        :data="movies"
        :columns="columns"
        lazy-load
        :loading="isLoading"
        :sort="sort"
        @sort-change="sortChange"
      >
        <template
          #img="{ row }"
        >
          <PreviewImg
            :width="50"
            :src="row.img"
          />
        </template>

        <template
          #sc="{ row }"
        >
          <span
            class="text-red"
          >
            {{ row.sc > 0 ? row.sc.toFixed(1) : "暂无评分" }}
          </span>
        </template>

        <template
          #loading
        >
          <Loading />
        </template>
      </t-table>
    </t-tab-panel>

    <t-tab-panel
      label="解析"
      value="parse"
    >
      <Parse />
    </t-tab-panel>
  </t-tabs>

</template>

<style lang="less" scoped></style>
