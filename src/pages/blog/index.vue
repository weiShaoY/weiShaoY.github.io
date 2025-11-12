<!------  2025-11-12---16:24---星期三  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { isMobile } from '@/utils'

import Sidebar from './components/sidebar/index.vue'

import Renderer from './renderer.vue'

import { transformMarkdownFiles } from './transformMarkdownFiles'

// 在需要的地方动态获取
async function getMarkdownList() {
  const markdownFiles = import.meta.glob('./models/**/*.md', {
    as: 'raw',
    eager: true,
  })

  return transformMarkdownFiles(markdownFiles)
}

const mdFile = ref<BlogType.MdFile> ({
  name: '',
  content: '',
  type: 'file',
  key: '',
})

/**
 *  文件数组
 */
const fileList: BlogType.Folder[] = await getMarkdownList()

/**
 *  是否显示抽屉
 */
const isShowDrawer = ref(false)

/**
 *  切换显示抽屉
 */
function switchShowDrawer() {
  isShowDrawer.value = !isShowDrawer.value
}

/**
 *  文件选择
 */
function handleFileSelect(file: BlogType.MdFile) {
  mdFile.value = file

  isShowDrawer.value = false
}
</script>

<template>

  <el-drawer
    v-if="isMobile"
    v-model="isShowDrawer"
    :with-header="false"
    direction="ltr"
    size="80%"
  >
    <el-scrollbar
      class="h-full w-full bg-[#FFFFFF] bg-fuchsia scrollbar-hide"
    >
      <Sidebar
        :file-list="fileList"
        @file-select="handleFileSelect"
      />
    </el-scrollbar>
  </el-drawer>

  <div
    class="mt-20 h-[calc(100vh-80px)] flex flex-col"
  >

    <div
      class="h-full flex items-center justify-between gap-20 bg-gray-50 p-4 dark:bg-gray-900"
    >

      <el-scrollbar
        v-if="!isMobile"
        class="bg-[#FFFFFF] scrollbar-hide !w-70"
      >
        <Sidebar
          :file-list="fileList"
          @file-select="handleFileSelect"
        />
      </el-scrollbar>

      <div
        class="h-full w-full flex flex-col gap-3"
      >
        <div
          class="rounded-1 from-[#ffe4e6] to-[#ccfbf1] bg-gradient-to-bl p-2"
        >
          <BaseButton
            icon="home-navbar-menu2"
            @click="switchShowDrawer"
          />
        </div>

        <Renderer
          v-if="fileList.length > 0"
          v-model:md-file="mdFile"
        />

      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>

</style>
