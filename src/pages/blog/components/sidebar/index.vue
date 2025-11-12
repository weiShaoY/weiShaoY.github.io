<script lang="ts" setup>

import SidebarItem from './sidebar-item.vue'

const props = defineProps<{

  /**
   * 文件夹数组
   */
  fileList: BlogType.Folder[]
}>()

const emit = defineEmits<{
  fileSelect: [file: BlogType.MdFile]
}>()

console.log('%c Line:12 🍭 props', 'color:#42b983', props.fileList)

function handleOpen(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}

function handleClose(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}

function handleFileSelect(file: BlogType.MdFile) {
  console.log('%c Line:44444 🍩 file', 'color:#e41a6a', file)
  emit('fileSelect', file) // 这里要 emit 到父组件
}

</script>

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo !w-full"
    @open="handleOpen"
    @close="handleClose"
  >
    <SidebarItem
      :nodes="fileList"
      @file-item-select="handleFileSelect"
    />
  </el-menu>
</template>

<style>

</style>
