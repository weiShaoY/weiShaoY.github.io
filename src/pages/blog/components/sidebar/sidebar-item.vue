<script setup lang="ts">
import type {
  FileSystemItem,
  FolderStructure,
  MarkdownFile,
} from './types'

import { reactive } from 'vue'

defineProps<{
  items: FileSystemItem[]
  level: number
}>()

const emit = defineEmits<{
  fileSelect: [file: MarkdownFile]
}>()

// 类型守卫
function isFolder(item: FileSystemItem): item is FolderStructure {
  return 'children' in item
}

// 文件夹状态管理
const openFolders = reactive(new Set<string>())

function toggleFolder(folder: FolderStructure) {
  const key = getItemKey(folder)

  if (openFolders.has(key)) {
    openFolders.delete(key)
  }
  else {
    openFolders.add(key)
  }
}

function isFolderOpen(folder: FolderStructure) {
  return openFolders.has(getItemKey(folder))
}

function getItemKey(item: FileSystemItem): string {
  return `${item.type}-${item.name}`
}

function selectFile(file: MarkdownFile) {
  emit('fileSelect', file)
}
</script>

<template>
  <div
    class="sidebar-item"
  >
    <div
      v-for="item in items"
      :key="getItemKey(item)"
      class="item"
    >
      <!-- 如果是文件夹 -->
      <div
        v-if="isFolder(item)"
        class="folder-wrapper"
      >
        <div
          class="folder-header"
          :style="{ paddingLeft: `${level * 12 + 8}px` }"
          @click="toggleFolder(item)"
        >
          <div
            class="folder-icon"
          >
            <span
              class="arrow"
              :class="[{ 'arrow-expanded': isFolderOpen(item) }]"
            >
              ▶
            </span>
            📁
          </div>

          <span
            class="folder-name"
          >{{ item.name }}</span>
        </div>

        <!-- 递归渲染子文件夹 -->
        <div
          v-if="isFolderOpen(item)"
          class="folder-children"
        >
          <sidebar-item
            :items="item.children"
            :level="level + 1"
            @file-select="$emit('fileSelect', $event)"
          />
        </div>
      </div>

      <!-- 如果是文件 -->
      <div
        v-else
        class="file-item"
        :style="{ paddingLeft: `${level * 12 + 8}px` }"
        @click="selectFile(item)"
      >
        <span
          class="file-icon"
        >📄</span>

        <span
          class="file-name"
        >{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-item {
  width: 100%;
}

.folder-wrapper {
  width: 100%;
}

.folder-header {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.folder-header:hover {
  background-color: #e9ecef;
}

.folder-icon {
  display: flex;
  align-items: center;
  margin-right: 6px;
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
  font-size: 14px;
  color: #495057;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
}

.file-item:hover {
  background-color: #e9ecef;
}

.file-icon {
  margin-right: 6px;
}

.file-name {
  color: #6c757d;
}

.folder-children {
  border-left: 1px solid #dee2e6;
  margin-left: 12px;
}
</style>
