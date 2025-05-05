<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { BlogApi } from '@/api'

const isLoading = ref(false)

/**
 *  分类
 */
const category = ref(0)

/**
 *  分类选项
 */
const categoryOptions = [
  {
    value: 0,
    label: '骚话',
  },
  {
    value: 1,
    label: '笑话',
  },
  {
    value: 2,
    label: '情话',
  },
  {
    value: 3,
    label: '一言句子',
  },
  {
    value: 4,
    label: '舔狗日记',
  },
  {
    value: 5,
    label: '励志英语',
  },
]

const data = ref({
  content: '',
  form: '',
})

/**
 * 获取壁纸数据
 */
async function getData() {
  try {
    isLoading.value = true

    if (category.value === 0) {
      const response = await BlogApi.getSexySentence()

      data.value.form = response.form
      data.value.content = response.content
    }
    else if (category.value === 1) {
      const response = await BlogApi.getJokeSentence()

      data.value.form = response.form
      data.value.content = response.content
    }
    else if (category.value === 2) {
      const response = await BlogApi.getLoveSentence()

      data.value.form = response.form
      data.value.content = response.content
    }
    else if (category.value === 3) {
      const response = await BlogApi.getOneSentence()

      data.value.form = response.form
      data.value.content = response.content
    }
    else if (category.value === 4) {
      const response = await BlogApi.getDogSentence()

      data.value.form = response.form
      data.value.content = response.content
    }
    else if (category.value === 5) {
      const response = await BlogApi.getEnglishSentence()

      data.value.form = response.zh
      data.value.content = response.en
    }
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
  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <div
      class="flex items-center gap-5"
    >
      <el-select
        v-model="category"
        placeholder="请选择"
        size="large"
        class="!w-60"
        @change="getData"
      >
        <el-option
          v-for="item in categoryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <ButtonIcon
        tooltip-content="刷新"
        icon="blog-refresh"
        :loading="isLoading"
        @click="getData"
      />
    </div>

    <div
      class="h-[calc(100vh-240px)] flex items-center justify-center"
    >

      <div
        class="absolute z-50 max-w-180 w-3/4 flex overflow-hidden rounded-xl bg-white p-3 shadow-lg"
      >

        <div
          class="mx-2.5 w-full overflow-hidden"
        >
          <p
            class="mr-3 mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xl text-[peru] font-bold leading-8"
          >
            {{ data.form }}
          </p>

          <p
            v-copy="{
              text: data.content,
            }"
            class="max-h-10 overflow-hidden break-all text-zinc-400 leading-5"
          >
            {{ data.content }}

          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<style lang="less" scoped></style>
