<script setup lang="ts">
import type { InputInstance } from 'element-plus'

import { useTestStore } from '@/store/modules/test'

import { Search } from '@element-plus/icons-vue'

import { useDebounceFn } from '@vueuse/core'

import {
  computed,
  nextTick,
  ref,
  watch,
} from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const testStore = useTestStore()

/**
 * 过滤掉隐藏的菜单列表
 */
const menuList = computed(() => testStore.flatMenuListGet().filter(item => !item.meta.isHide))

/**
 * 当前激活的菜单路径
 */
const activePath = ref('')

/**
 * 鼠标悬停时更新当前激活的菜单项路径
 */
function mouseoverMenuItem(menu: Menu.MenuOptions) {
  activePath.value = menu.path
}

/**
 * 菜单搜索输入框的引用
 */
const menuInputRef = ref<InputInstance | null>(null)

/**
 * 是否显示搜索框弹窗
 */
const isShowSearch = ref<boolean>(false)

/**
 *  搜索输入框绑定的搜索关键词
 */
const searchMenu = ref<string>('')

/** 监听搜索框显示状态，绑定或移除键盘事件监听器 */
watch(isShowSearch, (val) => {
  if (val) {
    document.addEventListener('keydown', keyboardOperation)
  }
  else {
    document.removeEventListener('keydown', keyboardOperation)
  }
})

/**
 *  打开搜索弹窗并自动聚焦输入框
 */
function handleOpen() {
  isShowSearch.value = true
  nextTick(() => {
    setTimeout(() => {
      menuInputRef.value?.focus()
    })
  })
}

/**
 * 搜索匹配的菜单列表
 */
const searchList = ref<Menu.MenuOptions[]>([])

/** 更新搜索列表，根据搜索关键词匹配菜单项 */
function updateSearchList() {
  searchList.value = searchMenu.value
    ? menuList.value.filter(
        item =>
          (item.path.toLowerCase().includes(searchMenu.value.toLowerCase())
            || item.meta.title.toLowerCase().includes(searchMenu.value.toLowerCase()))
          && !item.meta?.isHide,
      )
    : []
  activePath.value = searchList.value.length ? searchList.value[0].path : ''
}

/** 防抖优化搜索函数，延迟 300ms 执行搜索匹配 */
const debouncedUpdateSearchList = useDebounceFn(updateSearchList, 300)

/** 监听搜索输入框变化，触发搜索更新 */
watch(searchMenu, debouncedUpdateSearchList)

/**
 * 搜索菜单列表 DOM 的引用
 */
const menuListRef = ref<Element | null>(null)

/**
 * 处理键盘方向键的逻辑
 */
function keyPressUpOrDown(direction: number) {
  const length = searchList.value.length

  if (length === 0) {
    return
  }

  const index = searchList.value.findIndex(item => item.path === activePath.value)

  const newIndex = (index + direction + length) % length

  activePath.value = searchList.value[newIndex].path

  nextTick(() => {
    if (!menuListRef.value?.firstElementChild) {
      return
    }

    const menuItemHeight = menuListRef.value.firstElementChild.clientHeight + 12 || 0

    menuListRef.value.scrollTop = newIndex * menuItemHeight
  })
}

/**
 * 处理键盘操作，如上下键选择、回车确认
 */
function keyboardOperation(event: KeyboardEvent) {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    keyPressUpOrDown(-1)
  }
  else if (event.key === 'ArrowDown') {
    event.preventDefault()
    keyPressUpOrDown(1)
  }
  else if (event.key === 'Enter') {
    event.preventDefault()
    handleClickMenu()
  }
}

/**
 * 处理菜单点击事件，跳转或打开新页面
 */
function handleClickMenu() {
  const menu = searchList.value.find(item => item.path === activePath.value)

  if (!menu) {
    return
  }

  if (menu.meta?.isLink) {
    window.open(menu.meta.isLink, '_blank')
  }
  else {
    router.push(menu.path)
  }

  searchMenu.value = ''
  isShowSearch.value = false
}
</script>

<template>
  <div
    class="search-menu"
  >
    <i
      class="iconfont icon-sousuo toolBar-icon"
      @click="handleOpen"
    />

    <el-dialog
      v-model="isShowSearch"
      class="search-dialog"
      :width="600"
      :show-close="false"
      top="10vh"
    >
      <el-input
        ref="menuInputRef"
        v-model="searchMenu"
        placeholder="菜单搜索：支持菜单名称、路径"
        size="large"
        clearable
        :prefix-icon="Search"
      />

      <div
        v-if="searchList.length"
        ref="menuListRef"
        class="menu-list"
      >
        <div
          v-for="item in searchList"
          :key="item.path"
          class="menu-item"
          :class="[{ 'menu-active': item.path === activePath }]"
          @mouseenter="mouseoverMenuItem(item)"
          @click="handleClickMenu()"
        >
          <div
            class="menu-lf"
          >
            <el-icon
              class="menu-icon"
            >
              <component
                :is="item.meta.icon"
              />
            </el-icon>

            <span
              class="menu-title"
            >{{ item.meta.title }}</span>
          </div>

          <i
            class="iconfont icon-huiche menu-enter"
            @click="handleOpen"
          />
        </div>
      </div>

      <el-empty
        v-else
        class="mb-20 mt-20"
        :image-size="100"
        description="暂无菜单"
      />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.search-menu {
  :deep(.el-dialog) {
    border-radius: 4px;
    .el-dialog__header {
      display: none;
    }
  }
  .menu-list {
    max-height: 515px;
    margin-top: 15px;
    overflow: auto;
    .menu-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 45px;
      padding: 0 20px;
      margin: 10px 0;
      color: var(--el-text-color-secondary);
      cursor: pointer;
      background-color: transparent;
      border: 1px solid var(--el-border-color);
      border-radius: 6px;
      transition: all 0.2s ease;
      .menu-lf {
        display: flex;
        align-items: center;
      }
      .menu-icon {
        margin-right: 8px;
        font-size: 16px;
      }
      .menu-title {
        font-size: 14px;
      }
      .menu-enter {
        font-size: 17px;
      }
    }
    .menu-active {
      color: #ffffff;
      background-color: var(--el-color-primary);
      .menu-icon {
        font-size: 18px;
      }
      .menu-title {
        font-size: 16px;
      }
      .menu-enter {
        font-size: 19px;
      }
    }
  }
}
</style>
