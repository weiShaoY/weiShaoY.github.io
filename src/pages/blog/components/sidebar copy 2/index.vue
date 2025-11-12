<script setup lang="ts">

import SidebarItem from './sidebar-item.vue'

// 接收文件结构数据
const props = defineProps<{

  /**
   *  文件夹数组
   */
  fileList: BlogType.Folder[]
}>()

const emit = defineEmits<{
  fileSelect: [file: BlogType.MdFile]
}>()

// 存储打开的文件夹状态
const openFolders = reactive(new Set<string>())

// 切换文件夹展开/收起
function toggleFolder(folder: BlogType.Folder) {
  const key = getFolderKey(folder)

  if (openFolders.has(key)) {
    openFolders.delete(key)
  }
  else {
    openFolders.add(key)
  }
}

// 检查文件夹是否打开
function isFolderOpen(folder: BlogType.Folder) {
  return openFolders.has(getFolderKey(folder))
}

// 生成文件夹的唯一标识
function getFolderKey(folder: BlogType.Folder): string {
  return folder.name
}

// 文件选择事件
function onFileSelect(file: BlogType.MdFile) {
  emit('fileSelect', file)
}
</script>

<template>
  <div
    class="sidebar"
  >
    <div
      class="sidebar-header"
    >
      <h2>
        文档目录
      </h2>
    </div>

    <div
      class="sidebar-content"
    >
      <div
        v-for="folder in fileList"
        :key="folder.name"
        class="folder-item"
      >
        <!-- 文件夹 -->
        <div
          class="folder-header"
          @click="toggleFolder(folder)"
        >
          <div
            class="folder-icon"
          >
            <span
              class="arrow"
              :class="[{ 'arrow-expanded': isFolderOpen(folder) }]"
            >
              ▶
            </span>
            📁
          </div>

          <span
            class="folder-name"
          >{{ folder.name }}</span>
        </div>

        <!-- 文件夹内容（递归渲染） -->
        <div
          v-if="isFolderOpen(folder)"
          class="folder-children"
        >
          <SidebarItem
            :items="folder.children"
            :level="1"
            @file-select="onFileSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background-color: #f8f9fa;
  border-right: 1px solid #e9ecef;
  overflow-y: auto;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
  background-color: #fff;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.sidebar-content {
  padding: 8px 0;
}

.folder-item {
  user-select: none;
}

.folder-header {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.folder-header:hover {
  background-color: #e9ecef;
}

.folder-icon {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.arrow {
  font-size: 10px;
  margin-right: 4px;
  transition: transform 0.2s;
  transform: rotate(0deg);
}

.arrow-expanded {
  transform: rotate(90deg);
}

.folder-name {
  font-weight: 500;
  color: #495057;
}

.folder-children {
  margin-left: 16px;
  border-left: 1px solid #dee2e6;
}
</style>
