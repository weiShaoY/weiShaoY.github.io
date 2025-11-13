<script lang="ts" setup>

import { onMounted, ref } from 'vue'

// import SidebarItem from './sidebar-item.vue'

const props = defineProps<{

  /**
   * 文件夹数组
   */
  fileList: BlogType.Folder[]

  /**
   *  选中的 key
   */
  selectedKey: string
}>()

const emit = defineEmits<{
  fileSelect: [file: BlogType.MdFile]
}>()

function handleFileSelect(file: BlogType.MdFile) {
  emit('fileSelect', file) // 这里要 emit 到父组件
}

function handleNodeClick(data: BlogType.Folder | BlogType.MdFile) {
  if (data.fileType === 'markdown') {
    handleFileSelect(data)
  }
}

const tree = ref(null) as any

onMounted(() => {
  tree?.value?.setCurrentKey(props.selectedKey)
})
</script>

<template>
  <el-tree
    ref="tree"
    class="h-full overflow-auto rounded-2xl bg-white p-3 shadow-2xl max-sm:w-full dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50"
    :data="fileList"
    node-key="id"
    highlight-current
    @node-click="handleNodeClick"
  >
    <template
      #default="{ data }"
    >
      <div
        class="custom-tree-node flex items-center gap-2 p-2"
      >
        <SvgIcon
          :icon="data.fileType === 'folder' ? 'folder' : 'markdown'"
          :size="data.fileType === 'folder' ? 30 : 24"
        />

        <span>
          {{ data.label }}
        </span>
      </div>
    </template>
  </el-tree>

</template>

<style lang="scss" scoped>
</style>

<style>

.el-drawer__body {
  padding: 0 !important;
}

.el-tree-node__content {
  overflow: auto;
  height: 40px !important;
}

.el-tree-node__content::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}
</style>
