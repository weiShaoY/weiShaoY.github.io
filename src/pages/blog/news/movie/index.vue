<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

import { onMounted, ref } from 'vue'

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
    default-active-key="comingSoon"
  >
    <a-tab-pane
      v-for="(movies, key) in movieData"
      :key="key"
      :title="key === 'comingSoon' ? '即将上映' : '院线热播'"
    >
      <a-table
        :data="movies"
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
            title="海报"
            data-index="img"
            align="center"
            :width="120"
          >
            <template
              #cell="{ record }"
            >
              <PreviewImg
                :width="60"
                :src="record.img"
              />
            </template>
          </a-table-column>

          <a-table-column
            title="电影名称"
            data-index="nm"
            align="center"
          />

          <a-table-column
            title="上映日期"
            data-index="rt"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="主演"
            data-index="star"
            align="center"
          />

          <a-table-column
            title="期待值"
            data-index="wish"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />

          <a-table-column
            title="评分"
            data-index="sc"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          >
            <template
              #cell="{ record }"
            >
              <span
                class="text-red"
              >
                {{ record.sc > 0 ? record.sc.toFixed(1) : "暂无评分" }}
              </span>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-tab-pane>
  </a-tabs>
</template>

<style lang="less" scoped></style>
