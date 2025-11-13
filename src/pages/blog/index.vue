<!------  2025-11-12---16:24---星期三  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { isMobile } from '@/utils'

import Sidebar from './components/sidebar/index.vue'

import Renderer from './renderer.vue'

import { transformMarkdownFiles } from './transformMarkdownFiles'

const loading = ref(true)

// 在需要的地方动态获取
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
  console.log('%c Line:45 🍰 res', 'color:#fca650', res)

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
    class="mt-20 h-[calc(100vh-80px)] flex flex-col"
  >

    <div
      class="h-full flex items-center justify-between gap-20 bg-gray-50 p-4 dark:bg-gray-900"
    >
      <!-- pc -->
      <el-scrollbar
        v-if="!isMobile"
        height="100%"
        max-height="100%"
        class="!w-120 !bg-cyan"
        :always="true"
      >
        <Sidebar
          :file-list="fileList"
          :selected-key="mdFile.id"
          @file-select="handleFileSelect"
        />
      </el-scrollbar>

      <!-- mobile -->
      <el-drawer
        v-model="isShowDrawer"
        :with-header="false"
        direction="ltr"
        size="80%"
      >
        <el-scrollbar
          class="h-full w-full"
        >
          <Sidebar
            :file-list="fileList"
            :selected-key="mdFile.id"
            @file-select="handleFileSelect"
          />
        </el-scrollbar>
      </el-drawer>

      <!-- 主体 -->
      <div
        class="h-full w-full flex flex-col gap-3"
      >

        <div
          v-if="isMobile"
          class="flex items-center gap-2 rounded-1 from-[#ffe4e6] to-[#ccfbf1] bg-gradient-to-bl p-2"
        >
          <BaseButton
            icon="home-navbar-menu2"
            @click="switchShowDrawer"
          />

          <span>
            {{ mdFile.fullPath }}
          </span>
        </div>

        <!-- 渲染器 -->
        <Renderer
          v-if="fileList.length > 0"
          v-model:md-file="mdFile"
        />

      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>
::deep(.el-menu) {
  border-right: none !important;
}

:deep(.el-scrollbar__view) {
  height: 100%;
}
</style>
