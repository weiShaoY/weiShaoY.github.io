<!------  2025-11-12---16:24---星期三  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

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
 *  文件选择
 */
function handleFileSelect(file: BlogType.MdFile) {
  mdFile.value = file
}

</script>

<template>

  <div
    class="mt-20 h-[calc(100vh-80px)] flex flex-col"
  >

    <div
      class="h-full flex items-center justify-between bg-gray-50 p-4 dark:bg-gray-900"
    >

      <el-scrollbar
        class="bg-amber scrollbar-hide !w-70"
      >
        <Sidebar
          :file-list="fileList"
          @file-select="handleFileSelect"
        />
      </el-scrollbar>

      <Renderer
        v-if="fileList.length > 0"
        v-model:md-file="mdFile"
      />

      <div
        flex-1
      >
        1
      </div>
    </div>

  </div>

</template>

<style lang="scss" scoped>

</style>
