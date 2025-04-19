<script lang="ts" setup>

import { useTestStore } from '@/store'

import { blogMittBus } from '@/utils'

const router = useRouter()

const testStore = useTestStore()

/**
 *   搜索历史记录最大存储数量
 */
const HISTORY_MAX_LENGTH = 5

/**
 *  菜单列表
 */
const menuList = computed(() => testStore.menuList)

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
const searchHistoryList = computed(() => testStore.searchHistoryList)

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
 * 执行搜索操作
 * @param  val - 搜索关键词
 * @desc 根据输入值进行模糊搜索并更新搜索结果列表
 */
function search(val: string) {
  if (!val) {
    searchResult.value = []
    return
  }

  /**
   * 递归处理菜单项扁平化
   * @param items 要处理的菜单项数组
   * @returns 扁平化后的菜单项数组
   */
  const flattenItems = (
    items: RouterType.BlogRouteRecordRaw[],
  ): RouterType.BlogRouteRecordRaw[] => {
    return items.flatMap((item) => {
      // 包含在主体容器中的项直接保留
      // if (item.meta.isInMainContainer) {
      //   return [item]
      // }

      // 不包含在主体容器中的项需要展开自身及其子项
      const children = item.children ? flattenItems(item.children) : []

      return [item, ...children]
    })
  }

  // 执行模糊查询
  const filteredList = fuzzyQueryList(menuList.value, val)

  // 处理结果扁平化
  searchResult.value = filteredList.flatMap((category) => {
    // 分类下没有子项时直接返回空数组
    if (!category.children?.length) {
      return []
    }

    // 处理当前分类的扁平化
    return flattenItems([category])
  })

  console.log(
    '%c Line:101 🍊 searchResult.value',
    'color:#42b983',
    searchResult.value,
  )
}

/**
 * 模糊查询菜单列表
 * @param  arr - 菜单列表
 * @param  val - 搜索关键字
 * @returns  - 查询结果
 */ function fuzzyQueryList(
  arr: RouterType.BlogRouteRecordRaw[],
  val: string,
): RouterType.BlogRouteRecordRaw[] {
  const lowerVal = val.toLowerCase() // 将查询值转换为小写

  const searchItem = (
    item: RouterType.BlogRouteRecordRaw,
  ): RouterType.BlogRouteRecordRaw | null => {
    // 如果当前项有 isHide: true，直接过滤掉
    if (item.meta.isHideInMenu) {
      return null
    }

    // 将 item.meta.title 转换为小写进行比较
    const lowerItemTitle = item.meta.title.toLowerCase()

    // 查找子项并过滤符合条件的子项
    const children = item.children ? fuzzyQueryList(item.children, val) : []

    // 如果子项符合条件或当前项标题包含查询值，返回该项
    if (children.length || lowerItemTitle.includes(lowerVal)) {
      return {
        ...item,
        children,
      }
    }

    // 否则过滤掉
    return null
  }

  // 使用 map 和 filter 来优化处理逻辑，排除 null 结果
  return arr
    .map(searchItem)
    .filter((item): item is RouterType.BlogRouteRecordRaw => item !== null)
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
    testStore.searchHistoryList = searchHistoryList.value
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
</script>

<template>
  <div
    class="search-widget"
  >
    <el-dialog
      v-model="isShowSearchDialog"
      width="600"
      :show-close="false"
      :lock-scroll="false"
      modal-class="search-modal"
      @close="closeSearchDialog"
    >
      <el-input
        ref="searchInputRef"
        v-model.trim="searchVal"
        placeholder="搜索页面"
        clearable
        @input="search"
        @blur="searchBlur"
        @keydown.up.prevent="highlightPrevious"
        @keydown.down.prevent="highlightNext"
        @keydown.enter.prevent="selectHighlighted"
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
        class="result"
      >
        <div
          v-for="(item, index) in searchResult"
          :key="index"
          class="box"
        >
          <div
            :class="{
              highlighted: isHighlighted(index),
            }"
            @click="searchGoPage(item)"
            @mouseenter="highlightOnHover(index)"
          >
            <!-- 左侧 -->
            <div
              class="flex items-center gap-5"
            >
              <SvgIcon
                v-if="item.meta.icon"
                :icon="item.meta.icon"
                :size="20"
              />

              <span
                class="text-4"
              >
                {{ item.meta.title }}
              </span>

              <!-- 外链徽标 -->
              <SvgIcon
                v-if="item.meta.externalUrl"
                icon="blog-menu-externalUrl"
                :size="16"
              />

              <!-- 文本徽标 -->
              <div
                v-else-if="item.meta.textBadge"
                class="m-auto h-[16px] min-w-5 flex items-center justify-center rounded-[5px] bg-[#fd4e4e] p-x-1 text-center text-[10px] text-white leading-5"
              >
                {{ item.meta.textBadge }}
              </div>

              <!-- 图标徽标 -->
              <SvgIcon
                v-else-if="item.meta.iconBadge"
                :icon="item.meta.iconBadge"
                :size="16"
              />
            </div>

            <!-- 右侧 -->
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
        class="history-box"
      >
        <p
          class="title"
        >
          搜索历史
        </p>

        <div
          class="history-result"
        >
          <div
            v-for="(item, index) in searchHistoryList"
            :key="index"
            class="box"
            :class="{
              highlighted: historyHIndex === index,
            }"
            @click="searchGoPage(item)"
            @mouseenter="historyHIndex = index"
          >

            <!-- 左侧 -->
            <div
              class="flex items-center gap-5"
            >
              <SvgIcon
                v-if="item.meta.icon"
                :icon="item.meta.icon"
                :size="20"
              />

              <span
                class="text-4"
              >
                {{ item.meta.title }}
              </span>

              <!-- 外链徽标 -->
              <SvgIcon
                v-if="item.meta.externalUrl"
                icon="blog-menu-externalUrl"
                :size="16"
              />

              <!-- 文本徽标 -->
              <div
                v-else-if="item.meta.textBadge"
                class="m-auto h-[16px] min-w-5 flex items-center justify-center rounded-[5px] bg-[#fd4e4e] p-x-1 text-center text-[10px] text-white leading-5"
              >
                {{ item.meta.textBadge }}
              </div>

              <!-- 图标徽标 -->
              <SvgIcon
                v-else-if="item.meta.iconBadge"
                :icon="item.meta.iconBadge"
                :size="16"
              />
            </div>

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
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-widget {
  :deep(.search-modal) {
    background-color: #0003;
  }

  :deep(.el-dialog__header) {
    padding: 5px 0;
  }

  :deep(.el-dialog) {
    padding: 0 15px;
    border-radius: 10px !important;
  }
  :deep(.el-dialog__body) {
    padding: 25px 10px !important;
  }

  :deep(.el-dialog__footer) {
    padding: 10px !important;
  }

  .el-input {
    height: 48px;

    :deep(.el-input__wrapper) {
      background-color: rgba(241, 241, 244, 0.8);
      border: 1px solid #dbdfe9;
      border-radius: 10px !important;
      box-shadow: none;
    }

    :deep(.el-input__inner) {
      color: #808290 !important;
    }
  }

  .result {
    width: 100%;
    margin-top: 30px;

    .box {
      margin-top: 0 !important;
      font-size: 16px;
      font-weight: 500;
      line-height: 1;
      cursor: pointer;

      // .menu-icon {
      //   margin-right: 5px;
      //   font-size: 18px;
      // }

      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 16px;
        margin-top: 8px;
        font-size: 15px;
        font-weight: 400;
        color: #4b5675;
        background: #f9f9f9;
        border-radius: 10px !important;

        &.highlighted {
          color: #fff !important;
          background-color: #e9b354 !important;
        }
      }
    }
  }

  .history-box {
    margin-top: 20px;

    .title {
      font-size: 13px;
      color: #78829d;
    }

    .history-result {
      width: 100%;
      margin-top: 5px;

      .box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 16px;
        margin-top: 8px;
        font-size: 15px;
        font-weight: 400;
        color: #252f4a;
        cursor: pointer;
        background: #f9f9f9;
        border-radius: 10px !important;

        &.highlighted {
          color: #fff !important;
          background-color: #e9b354 !important;
        }
      }
    }
  }
}
</style>
