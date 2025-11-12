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

// 在组件中使用
const list = await getMarkdownList()

console.log('%c Line:14 🌽 list', 'color:#3f7cff', list)

const fileObj = ref ({

})

function handleFileSelect(file: any) {
  console.log('%c Line:20 🍎 file', 'color:#ff5722', file)
  fileObj.value = file
}

fileObj.value = list[0]

</script>

<template>

  <div
    class="mt-20 h-[calc(100vh-80px)] flex flex-col"
  >

    <div
      class="h-full flex items-center justify-center bg-gray-50 p-4 dark:bg-gray-900"
    >

      <div
        class="mh-[60vh] h-[60vh] flex-1 bg-amber"
      >

        <Sidebar
          :file-structure="list"
          @file-select="handleFileSelect"
        />
      </div>

      <Renderer
        v-if="list.length > 0"
        :file-obj="fileObj"
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
