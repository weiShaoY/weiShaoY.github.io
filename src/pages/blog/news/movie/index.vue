<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

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
      v-for="(movies, key) in movieData"
      :key="key"
      :label="key === 'comingSoon' ? '即将上映' : '院线热播'"
    >
      <div
        class="h-[calc(100vh-200px)]"
      >
        <el-table
          class="!w-full"
          :data="movies"
          height="100%"
        >
          <el-table-column
            prop="id"
            label="ID"
            :width="100"
          />

          <el-table-column
            prop="img"
            label="海报"
            :width="120"
          >
            <template
              #default="{ row }"
            >
              <PreviewImg
                :width="50"
                :src="row.img"
              />
            </template>
          </el-table-column>

          <el-table-column
            prop="nm"
            label="电影名称"
            align="center"
          />

          <el-table-column
            prop="rt"
            label="上映日期"
            align="center"
            sortable
          />

          <el-table-column
            prop="wish"
            label="期待值"
            align="center"
            sortable
          />

          <el-table-column
            prop="sc"
            label="评分"
            align="center"
            sortable
          >
            <template
              #default="{ row }"
            >
              <span
                class="text-red"
              >
                {{ row.sc > 0 ? row.sc.toFixed(1) : "暂无评分" }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>

    <el-tab-pane
      label="解析"
    >
      <Parse />
    </el-tab-pane>
  </el-tabs>
</template>
