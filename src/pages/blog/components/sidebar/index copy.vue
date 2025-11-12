<script lang="ts" setup>

import {
  computed,
  defineProps,
} from 'vue'

const props = defineProps<{

  /**
   * 文件夹数组
   */
  fileList: BlogType.Folder[]
}>()

const emit = defineEmits<{
  fileSelect: [file: BlogType.MdFile]
}>()

/**
 * 类型守卫函数
 */
function isFolderStructure(item: BlogType.FileNode): item is BlogType.Folder {
  return 'children' in item
}

/**
 * 递归渲染菜单项
 */
const menuItems = computed(() => {
  const renderItems = (nodes: BlogType.FileNode[]) => {
    return nodes.map((node): any => {
      if (isFolderStructure(node)) {
        return {
          key: node.key,
          type: 'submenu',
          name: node.name,
          children: renderItems(node.children),
        }
      }
      else {
        return {
          key: node.key,
          type: 'item',
          name: node.name,
          content: node.content,
        }
      }
    })
  }

  return renderItems(props.fileList)
})

console.log('%c Line:12 🍭 props', 'color:#42b983', props.fileList)
function handleOpen(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}

function handleClose(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}

function onFileSelect(file: BlogType.MdFile) {
  console.log('%c Line:64 🎂 file', 'color:#3f7cff', file)
  emit('fileSelect', file)
}
</script>

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <template
      v-for="item in menuItems"
      :key="item.key"
    >
      <el-sub-menu
        v-if="item.type === 'submenu'"
        :index="item.key"
      >
        <template
          #title
        >
          <span>{{ item.name }}</span>
        </template>

        <template
          v-for="child in item.children"
          :key="child.key"
        >
          <el-sub-menu
            v-if="child.type === 'submenu'"
            :index="child.key"
          >
            <template
              #title
            >
              <span>{{ child.name }}</span>
            </template>

            <el-menu-item
              v-for="grandChild in child.children"
              :key="grandChild.key"
              :index="grandChild.key"
            >
              {{ grandChild.name }}
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item
            v-else
            :index="child.key"
            @click="onFileSelect(child)"
          >
            {{ child.name }}
          </el-menu-item>
        </template>
      </el-sub-menu>

      <el-menu-item
        v-else
        :index="item.key"
        @click="onFileSelect(item)"
      >
        {{ item.name }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
