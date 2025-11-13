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

const selectedKey = ref('1-1-1') // 你想要选中的 key

const tree = ref(null) as any

onMounted(() => {
  tree?.value?.setCurrentKey(props.selectedKey)
})
</script>

<template>
  <el-tree
    ref="tree"
    class="min-h-full"
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
        />

        <span>{{ data.label }}</span>

        <span>{{ data.fileType }}</span>
      </div>
    </template>
  </el-tree>
</template>

<style lang="scss" scoped>
/* 你的样式 */

::deep(.el-tree) {
  .el-tree-node > .el-tree-node__children {
    overflow: visible;
  }
}
</style>

<style>

</style>
