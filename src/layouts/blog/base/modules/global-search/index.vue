<script lang="ts" setup>
import { useBlogStore } from '@/store'

import { blogMittBus } from '@/utils'

import MenuItem from '../../components/menu-item.vue'

const router = useRouter()

const blogStore = useBlogStore()

/**
 *   搜索历史记录最大存储数量
 */
const HISTORY_MAX_LENGTH = 5

/**
 *  菜单列表
 */
const menuList = computed(() => blogStore.menuList)

/**
 *  是否显示搜索弹窗
 */
const isShowSearchDialog = ref(false)

/**
 *   搜索输入框Ref
 */
const searchInputRef = ref<HTMLInputElement | null>(null)

/**
 *   搜索关键词
 */
const searchVal = ref()

/**
 *   搜索结果列表
 */
const searchResult: any = ref([])

/**
 *  搜索历史记录列表的高亮索引
 */
const historyHIndex = ref(0)

/**
 *   搜索历史记录列表
 */
const searchHistoryList = computed(() => blogStore.searchHistoryList)

/**
 * 当前高亮选项的索引位置
 */
const highlightedIndex = ref(0)

/**
 * 聚焦搜索输入框
 * @desc 使用setTimeout确保弹窗打开后再执行聚焦操作
 */
function focusInput() {
  setTimeout(() => {
    searchInputRef.value?.focus()
  }, 100)
}

/**
 * 模糊查询菜单列表
 * @param  arr - 菜单列表
 * @param  val - 搜索关键字
 * @returns - 所有匹配的项（包括匹配的父级和单独匹配的子级）
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
        searchItem(child) // 递归处理子项
      }
    }

    // 如果当前项匹配，添加到结果中
    if (isSelfMatch) {
      result.push({
        ...item,
        children: item.children ? fuzzyQueryList(item.children, val) : [],
      })
    }
  }

  // 遍历所有项
  for (const item of arr) {
    searchItem(item)
  }

  return result
}

/**
 * 执行搜索操作
 * @param  val - 搜索关键词
 */
function search(val: string) {
  console.log('%c Line:118 🥓 val', 'color:#93c0a4', val)
  if (!val) {
    searchResult.value = []
    return
  }

  // 执行模糊查询
  const filteredList = fuzzyQueryList(menuList.value, val)

  searchResult.value = filteredList
}

// 搜索框键盘向上切换
function highlightPrevious() {
  if (searchVal.value) {
    highlightedIndex.value
      = (highlightedIndex.value - 1 + searchResult.value.length)
        % searchResult.value.length
  }
  else {
    historyHIndex.value
      = (historyHIndex.value - 1 + searchHistoryList.value.length)
        % searchHistoryList.value.length
  }
}

/**
 * 搜索框键盘向下切换高亮项
 */
function highlightNext() {
  if (searchVal.value) {
    highlightedIndex.value
      = (highlightedIndex.value + 1) % searchResult.value.length
  }
  else {
    historyHIndex.value
      = (historyHIndex.value + 1) % searchHistoryList.value.length
  }
}

/**
 * 搜索框键盘回车跳转页面
 */
function selectHighlighted() {
  if (searchVal.value) {
    searchGoPage(searchResult.value[highlightedIndex.value])
  }
  else {
    if (!searchVal.value && searchHistoryList.value.length === 0) {
      return
    }

    searchGoPage(searchHistoryList.value[historyHIndex.value])
  }
}

/**
 * 判断是否高亮
 * @param  index - 索引
 * @returns  - 是否高亮
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
 * @param {RouterType.BlogMenuListType} item - 搜索结果项
 */
function searchGoPage(item: RouterType.BlogRouteRecordRaw) {
  isShowSearchDialog.value = false

  addHistory(item)

  router.push(item.path)
  searchVal.value = ''
  searchResult.value = []
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
 * @param  item - 搜索结果项
 */
function cleanItem(item: RouterType.BlogRouteRecordRaw) {
  delete item.children
}

/**
 * 添加搜索历史
 * @param  item - 搜索结果项
 */
function addHistory(item: RouterType.BlogRouteRecordRaw) {
  const hasItemIndex = searchHistoryList.value.findIndex(
    (historyItem: RouterType.BlogRouteRecordRaw) => historyItem.path === item.path,
  )

  if (hasItemIndex !== -1) {
    searchHistoryList.value.splice(hasItemIndex, 1) // 如果存在则删除
  }
  else if (searchHistoryList.value.length >= HISTORY_MAX_LENGTH) {
    searchHistoryList.value.pop() // 超过最大记录数则删除最后一个
  }

  cleanItem(item)
  searchHistoryList.value.unshift(item) // 添加新的 item 到头部
  updateHistory()
}

/**
 * 删除搜索历史
 * @param  index - 历史记录索引
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
 * @param  index - 索引
 */
function highlightOnHover(index: number) {
  highlightedIndex.value = index
}

/**
 * 打开搜索弹窗
 */
function openSearchDialog() {
  isShowSearchDialog.value = true
  focusInput()
}

/**
 * 处理全局键盘事件
 * @param  event - 键盘事件对象
 * @desc 监听 Command/Ctrl + K 组合键打开搜索弹窗
 */
function handleKeydown(event: KeyboardEvent) {
  const isMac = navigator.platform.toUpperCase().includes('MAC')

  const isCommandKey = isMac ? event.metaKey : event.ctrlKey

  if (isCommandKey && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    isShowSearchDialog.value = true
    focusInput()
  }
}

onMounted(() => {
  blogMittBus.on('openSearchDialog', openSearchDialog)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

/**
 * 处理键盘按下事件（只关心事件对象）
 * @param _value 当前输入框值（不使用）
 * @param context 键盘事件上下文
 * @param context.e - 键盘事件对象
 */
function onKeydown(_value: string, context: { e: KeyboardEvent }) {
  const { e } = context

  // 上箭头
  if (e.key === 'ArrowUp') {
    highlightPrevious()
    e.preventDefault()
  }
  else if (e.key === 'ArrowDown') {
    highlightNext()
    e.preventDefault()
  }
}
</script>

<template>
  <t-dialog
    v-model:visible="isShowSearchDialog"
    :close-btn="false"
    :on-close="closeSearchDialog"
    :width="600"
  >
    <t-input
      ref="searchInputRef"
      v-model.trim="searchVal"
      input-class="!bg-[#F4F4F6] rounded-2 !border-[#DCDFE8] !focus:border-[#DCDFE8] shadow-none"
      size="large"
      placeholder="搜索页面"
      clearable
      autofocus
      @change="search"
      @blur="searchBlur"
      @enter="selectHighlighted"
      @keydown="onKeydown"
    >
      <template
        #prefixIcon
      >
        <SvgIcon
          icon="search"
          :size="24"
        />
      </template>

      <template
        #suffixIcon
      >
        <SvgIcon
          icon="blog-search-esc"
          :size="24"
        />
      </template>

    </t-input>
    <!-- 搜索结果 -->
    <div
      v-show="searchResult.length"
      class="mt-5"
    >
      <p
        class="text-4 color-[#78829d] font-bold"
      >
        <span>
          搜索
        </span>

        <span
          class="text-5 color-violet"
        >
          结果
        </span>
      </p>

      <div
        class="max-h-[50vh] w-full overflow-auto"
      >
        <div
          v-for="(item, index) in searchResult"
          :key="index"
          class="mt-2 h-12 flex cursor-pointer items-center justify-between rounded-3 bg-[#F9F9F9] px-4 text-4 color-[#4b5675] leading-none"
          :class="{
            '!bg-primary !color-white': isHighlighted(index),
          }"
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
      v-show="
        !searchVal
          && searchResult.length === 0
          && searchHistoryList.length > 0
      "
      class="mt-5"
    >
      <p
        class="text-4 color-[#78829d] font-bold"
      >
        <span>
          搜索
        </span>

        <span
          class="text-5 color-emerald"
        >
          历史
        </span>
      </p>

      <div
        class="max-h-[50vh] w-full overflow-auto"
      >
        <div
          v-for="(item, index) in searchHistoryList"
          :key="index"
          class="mt-2 h-12 flex cursor-pointer items-center justify-between rounded-3 bg-[#F9F9F9] px-4 text-4 color-[#252f4a] leading-none"
          :class="{
            '!bg-primary !color-white': historyHIndex === index,
          }"
          @click="searchGoPage(item)"
          @mouseenter="historyHIndex = index"
        >

          <!-- 左侧 -->
          <MenuItem
            :menu="item"
          />

          <!-- 右侧 -->
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
  </t-dialog>

</template>
