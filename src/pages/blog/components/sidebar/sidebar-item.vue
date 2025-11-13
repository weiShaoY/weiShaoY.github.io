<!-- MenuTree.vue -->
<script lang="ts" setup>

defineProps<{

  /**
   *  文件系统节点：文件夹或文件
   */
  nodes: BlogType.FileNode[]
}>()

const emit = defineEmits<{
  fileItemSelect: [file: BlogType.MdFile]
}>()

/**
 * 类型守卫函数
 */
function isFolderStructure(item: BlogType.FileNode): item is BlogType.Folder {
  return 'children' in item
}

function handleFileSelect(file: BlogType.MdFile) {
  console.log('%c Line:25 🍩 file', 'color:#e41a6a', file)
  emit('fileItemSelect', file) // 向上传递事件
}

</script>

<template>
  <template
    v-for="node in nodes"
    :key="node.id"
  >
    <el-sub-menu
      v-if="isFolderStructure(node)"
      :index="node.id"
    >
      <template
        #title
      >
        <span
          class="flex items-center gap-2 text-4 font-medium"
        >
          <SvgIcon
            icon="folder"
          />

          <span>
            {{ node.label }}
          </span>
        </span>
      </template>

      <SidebarItem
        :nodes="node.children"
        @file-item-select="handleFileSelect"
      />
    </el-sub-menu>

    <el-menu-item
      v-else
      :index="node.id"
      @click=" handleFileSelect(node) "
    >
      <span
        class="flex items-center gap-2 text-4 font-medium"
      >
        <SvgIcon
          icon="markdown"
        />

        <span>
          {{ node.label }}
        </span>      </span>
    </el-menu-item>
  </template>
</template>
