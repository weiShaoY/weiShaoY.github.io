<!------  2025-11-12---16:24---星期三  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { isMobile } from '@/utils'

import Renderer from './components/renderer/index.vue'

import Sidebar from './components/sidebar/index.vue'

import { transformMarkdownFiles } from './transformMarkdownFiles'

const loading = ref(true)

async function getMarkdownList() {
  const markdownFiles = import.meta.glob('./models/**/*.md', {
    as: 'raw',
    eager: true,
  })

  return transformMarkdownFiles(markdownFiles)
}

const mdFile = ref<BlogType.MdFile> ({
  label: '',
  content: '',
  fileType: 'markdown',
  id: '1-1-1',
  fullPath: '',
})

/**
 *  文件数组
 */
// const fileList: BlogType.Folder[] = await getMarkdownList().then((res) => {
//   loading.value = false
//   return res
// })

const fileList = ref<BlogType.Folder[]>([])

await getMarkdownList().then((res: any) => {
  if (res.length) {
    mdFile.value = res[0].children[0].children[0] as any
  }

  fileList.value = res

  loading.value = false
  return res
})

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

  <div
    v-loading="loading"
    class="h-full flex flex-col"
  >
    <el-splitter>
      <el-splitter-panel
        v-if="!isMobile"
        min="15%"
        size="25%"
        class="h-full w-full flex flex-col gap-3 p-3 p-r-6"
      >
        <Sidebar
          :file-list="fileList"
          :selected-key="mdFile.id"
          @file-select="handleFileSelect"
        />

      </el-splitter-panel>

      <el-splitter-panel
        min="50%"
        class="h-full w-full flex flex-col gap-3 p-3 p-l-6"
      >

        <!-- 移动端 -->
        <template
          v-if="isMobile"
        >
          <el-drawer
            v-model="isShowDrawer"
            :with-header="false"
            direction="ltr"
            size="80%"
          >
            <Sidebar
              :file-list="fileList"
              :selected-key="mdFile.id"
              @file-select="handleFileSelect"
            />
          </el-drawer>

          <div
            v-if="isMobile"
            class="flex items-center gap-2 rounded-1 from-[#ffe4e6] to-[#ccfbf1] bg-gradient-to-bl p-2"
          >
            <BaseButton
              icon="home-navbar-menu2"
              @click="switchShowDrawer"
            />

            <span
              class="break-normal text-3"
            >
              {{ mdFile.fullPath }}
            </span>
          </div>
        </template>

        <!-- 主渲染器 -->
        <Renderer
          v-if="fileList.length > 0"
          v-model:md-file="mdFile"
        />
      </el-splitter-panel>
    </el-splitter>
  </div>

</template>

<style lang="scss" scoped>

</style>
