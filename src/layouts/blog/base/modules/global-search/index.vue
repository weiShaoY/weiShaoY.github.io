<script lang="ts" setup>
import { useBlogStore } from '@/store'

import { blogMittBus } from '@/utils'

import MenuItem from '../../components/menu-item.vue'

import { blogMenuJump } from '../utils'

const blogStore = useBlogStore()

/** 搜索历史记录最大存储数量 */
const HISTORY_MAX_LENGTH = 10

/** 菜单列表 */
const menuList = computed(() => blogStore.menuList)

/** 是否显示搜索弹窗 */
const isShowSearchDialog = ref(false)

/** 搜索输入框Ref */
const searchInputRef = ref<HTMLInputElement | null>(null)

/** 搜索关键词 */
const searchVal = ref('')

/** 搜索结果列表 */
const searchResult = ref<RouterType.BlogRouteRecordRaw[]>([])

/** 搜索历史记录列表的高亮索引 */
const historyHIndex = ref(0)

/** 搜索历史记录列表 */
const searchHistoryList = computed(() => blogStore.searchHistoryList)

/** 当前高亮选项的索引位置 */
const highlightedIndex = ref(0)

/**
 * 聚焦搜索输入框
 */
function focusInput() {
  nextTick(() => {
    if (searchInputRef.value) {
      searchInputRef.value.focus()
    }
  })
}

/**
 * 处理键盘导航事件
 */
function handleKeyboardNavigation(event: KeyboardEvent) {
  if (!isShowSearchDialog.value) {
    return
  }

  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      highlightPrevious()
      break
    case 'ArrowDown':
      event.preventDefault()
      highlightNext()
      break
    case 'Enter':
      event.preventDefault()
      selectHighlighted()
      break
    case 'Escape':
      event.preventDefault()
      closeSearchDialog()
      break
  }
}

/**
 * 处理全局快捷键
 */
function handleGlobalShortcut(event: KeyboardEvent) {
  const isMac = navigator.platform.toUpperCase().includes('MAC')

  const isCommandKey = isMac ? event.metaKey : event.ctrlKey

  if (isCommandKey && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    openSearchDialog()
  }
}

/**
 * 模糊查询菜单列表
 */
function fuzzyQueryList(
  arr: RouterType.BlogRouteRecordRaw[],
  val: string,
): RouterType.BlogRouteRecordRaw[] {
  const lowerVal = val.toLowerCase()

  const result: RouterType.BlogRouteRecordRaw[] = []

  const searchItem = (item: RouterType.BlogRouteRecordRaw) => {
    if (item.meta.isHideInMenu) {
      return
    }

    const lowerItemTitle = item.meta.title.toLowerCase()

    const isSelfMatch = lowerItemTitle.includes(lowerVal)

    if (item.children) {
      for (const child of item.children) {
        searchItem(child)
      }
    }

    if (isSelfMatch) {
      const { meta, ...rest } = item

      if ('externalUrl' in meta || 'iframeUrl' in meta) {
        result.push({
          ...rest,
          meta,
          children: undefined,
        } as RouterType.BlogRouteRecordRaw)
      }
      else {
        result.push({
          ...rest,
          meta: {
            ...meta,
            externalUrl: undefined,
            iframeUrl: undefined,
          },
          children: item.children ? fuzzyQueryList(item.children, val) : undefined,
        } as RouterType.BlogRouteRecordRaw)
      }
    }
  }

  for (const item of arr) {
    searchItem(item)
  }

  return result
}

/**
 * 执行搜索操作
 */
function search(val: string) {
  if (!val) {
    searchResult.value = []
    return
  }

  searchResult.value = fuzzyQueryList(menuList.value, val)
  console.log('%c Line:117 🍭 searchResult.value', 'color:#6ec1c2', searchResult.value)
}

/**
 * 搜索框键盘向上切换
 */
function highlightPrevious() {
  if (searchVal.value) {
    highlightedIndex.value = (highlightedIndex.value - 1 + searchResult.value.length) % searchResult.value.length
  }
  else {
    historyHIndex.value = (historyHIndex.value - 1 + searchHistoryList.value.length) % searchHistoryList.value.length
  }
}

/**
 * 搜索框键盘向下切换高亮项
 */
function highlightNext() {
  if (searchVal.value) {
    highlightedIndex.value = (highlightedIndex.value + 1) % searchResult.value.length
  }
  else {
    historyHIndex.value = (historyHIndex.value + 1) % searchHistoryList.value.length
  }
}

/**
 * 搜索框键盘回车跳转页面
 */
function selectHighlighted() {
  if (searchVal.value) {
    searchGoPage(searchResult.value[highlightedIndex.value])
  }
  else if (searchHistoryList.value.length > 0) {
    searchGoPage(searchHistoryList.value[historyHIndex.value])
  }
}

/**
 * 判断是否高亮
 */
function isHighlighted(index: number) {
  return highlightedIndex.value === index
}

/**
 * 搜索框失去焦点
 */
function searchBlur() {
  highlightedIndex.value = 0
}

/**
 * 跳转到搜索结果页面
 */
function searchGoPage(item: RouterType.BlogRouteRecordRaw) {
  blogMenuJump(item)
  addHistory(item)
  searchVal.value = ''
  searchResult.value = []
  isShowSearchDialog.value = false
}

/**
 * 更新搜索历史
 */
function updateHistory() {
  if (Array.isArray(searchHistoryList.value)) {
    blogStore.searchHistoryList = searchHistoryList.value
  }
}

/**
 * 清理搜索项
 */
function cleanItem(item: RouterType.BlogRouteRecordRaw) {
  delete item.children
}

/**
 * 添加搜索历史
 */
function addHistory(item: RouterType.BlogRouteRecordRaw) {
  const hasItemIndex = searchHistoryList.value.findIndex(
    historyItem => historyItem.path === item.path,
  )

  if (hasItemIndex !== -1) {
    searchHistoryList.value.splice(hasItemIndex, 1)
  }
  else if (searchHistoryList.value.length >= HISTORY_MAX_LENGTH) {
    searchHistoryList.value.pop()
  }

  cleanItem(item)
  searchHistoryList.value.unshift(item)
  updateHistory()
}

/**
 * 删除搜索历史
 */
function deleteHistory(index: number) {
  searchHistoryList.value.splice(index, 1)
  updateHistory()
}

/**
 * 关闭搜索弹窗
 */
function closeSearchDialog() {
  searchVal.value = ''
  searchResult.value = []
  highlightedIndex.value = 0
  historyHIndex.value = 0
}

/**
 * 鼠标悬停高亮
 */
function highlightOnHover(index: number) {
  highlightedIndex.value = index
}

/**
 * 打开搜索弹窗
 */
function openSearchDialog() {
  isShowSearchDialog.value = true
  setTimeout(() => {
    focusInput()
  }, 100)
}

onMounted(() => {
  blogMittBus.on('openSearchDialog', openSearchDialog)
  document.addEventListener('keydown', handleGlobalShortcut)
  document.addEventListener('keydown', handleKeyboardNavigation)
})

onUnmounted(() => {
  blogMittBus.off('openSearchDialog', openSearchDialog)
  document.removeEventListener('keydown', handleGlobalShortcut)
  document.removeEventListener('keydown', handleKeyboardNavigation)
})
</script>

<template>
  <div
    class="search-widget"
  >
    <el-dialog
      v-model="isShowSearchDialog"
      width="600"
      :show-close="false"
      :lock-scroll="true"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      @opened="focusInput"
      @close="closeSearchDialog"
    >
      <el-input
        ref="searchInputRef"
        v-model.trim="searchVal"
        size="large"
        placeholder="搜索页面"
        clearable
        @input="search"
        @blur="searchBlur"
      >
        <template
          #prefix
        >
          <SvgIcon
            icon="search"
            :size="24"
          />
        </template>

        <template
          #suffix
        >
          <SvgIcon
            icon="blog-search-esc"
            :size="24"
          />
        </template>
      </el-input>

      <!-- 搜索结果 -->
      <div
        v-show="searchResult.length"
        class="mt-5"
      >
        <p
          class="text-4 color-[#78829d] font-bold"
        >
          <span>搜索</span>

          <span
            class="text-5 color-violet"
          >结果</span>
        </p>

        <div
          class="max-h-[50vh] w-full overflow-auto"
        >
          <div
            v-for="(item, index) in searchResult"
            :key="index"
            class="mt-2 h-12 flex cursor-pointer items-center justify-between rounded-3 bg-[#F9F9F9] px-4 text-4 color-[#4b5675] leading-none"
            :class="{ '!bg-primary !color-white': isHighlighted(index) }"
            @click="searchGoPage(item)"
            @mouseenter="highlightOnHover(index)"
          >
            <MenuItem
              :menu="item"
            />

            <SvgIcon
              v-show="isHighlighted(index)"
              icon="blog-search-enter"
            />
          </div>
        </div>
      </div>

      <!-- 搜索历史 -->
      <div
        v-show="!searchVal && searchResult.length === 0 && searchHistoryList.length > 0"
        class="mt-5"
      >
        <p
          class="text-4 color-[#78829d] font-bold"
        >
          <span>搜索</span>

          <span
            class="text-5 color-emerald"
          >历史</span>
        </p>

        <div
          class="max-h-[50vh] w-full overflow-auto"
        >
          <div
            v-for="(item, index) in searchHistoryList"
            :key="index"
            class="mt-2 h-12 flex cursor-pointer items-center justify-between rounded-3 bg-[#F9F9F9] px-4 text-4 color-[#252f4a] leading-none"
            :class="{ '!bg-primary !color-white': historyHIndex === index }"
            @click="searchGoPage(item)"
            @mouseenter="historyHIndex = index"
          >
            <MenuItem
              :menu="item"
            />

            <SvgIcon
              icon="close"
              :size="18"
              @click.stop="deleteHistory(index)"
            />
          </div>
        </div>
      </div>

      <template
        #footer
      >
        <div
          class="flex items-center gap-5 border-t-[1px] border-[#eaebf1] border-solid pt-3"
        >
          <div
            class="flex items-center gap-1"
          >
            <SvgIcon
              icon="blog-search-up"
              :size="24"
              color="#DCDFE8"
            />

            <SvgIcon
              icon="blog-search-down"
              :size="24"
              color="#DCDFE8"
            />

            <span>切换</span>
          </div>

          <div
            class="flex items-center gap-1"
          >
            <SvgIcon
              icon="blog-search-enter"
              :size="24"
              color="#DCDFE8"
            />

            <span>选择</span>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
