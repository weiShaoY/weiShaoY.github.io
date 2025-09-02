<!-- 表格组件 -->
<!-- 支持：el-table 全部属性、事件、插槽，同官方文档写法 -->
<!-- 扩展功能：分页组件、渲染自定义列、loading、表格全局边框、斑马纹、表格尺寸、表头背景配置 -->
<!-- 获取 ref：默认暴露了 elTableRef 外部通过 ref.value.elTableRef 可以调用 el-table 方法 -->
<script setup lang="ts">
import type { TableProps } from 'element-plus'

import { useElementSize, useWindowSize } from '@vueuse/core'

import {
  ElEmpty,
  ElPagination,
  ElTable,
  ElTableColumn,
} from 'element-plus'

import { storeToRefs } from 'pinia'

import {
  computed,
  nextTick,
  ref,
} from 'vue'

import { useTableStore } from '@/stores'

defineOptions({
  name: 'ArtTable',
})

const props = withDefaults(defineProps<ArtTableProps>(), {
  columns: () => [],
  fit: true,
  showHeader: true,
  stripe: undefined,
  border: undefined,
  size: undefined,
  emptyHeight: '360px',
  emptyText: '暂无数据',
  showTableHeader: true,
})

const emit = defineEmits<{
  (e: 'paginationSizeChange', val: number): void
  (e: 'paginationCurrentChange', val: number): void
}>()

const { width } = useWindowSize()

const elTableRef = ref<InstanceType<typeof ElTable> | null>(null)

const paginationRef = ref<HTMLElement>()

const tableStore = useTableStore()

const { isBorder, isZebra, tableSize, isFullScreen, isHeaderBackground } = storeToRefs(tableStore)

/** 分页配置接口 */
type PaginationConfig = {

  /** 当前页码 */
  current: number

  /** 每页显示条目个数 */
  size: number

  /** 总条目数 */
  total: number
}

/** 分页器配置选项接口 */
type PaginationOptions = {

  /** 每页显示个数选择器的选项列表 */
  pageSizes?: number[]

  /** 分页器的对齐方式 */
  align?: 'left' | 'center' | 'right'

  /** 分页器的布局 */
  layout?: string

  /** 是否显示分页器背景 */
  background?: boolean

  /** 只有一页时是否隐藏分页器 */
  hideOnSinglePage?: boolean

  /** 分页器的大小 */
  size?: 'small' | 'default' | 'large'

  /** 分页器的页码数量 */
  pagerCount?: number
}

/** ArtTable 组件的 Props 接口 */
type ArtTableProps = {

  /** 加载状态 */
  loading?: boolean

  /** 列渲染配置 */
  columns?: ComponentType.TableType.ColumnType[]

  /** 分页状态 */
  pagination?: PaginationConfig

  /** 分页配置 */
  paginationOptions?: PaginationOptions

  /** 空数据表格高度 */
  emptyHeight?: string

  /** 空数据时显示的文本 */
  emptyText?: string

  /** 是否开启 ArtTableHeader，解决表格高度自适应问题 */
  showTableHeader?: boolean
} & TableProps<Record<string, any>>

const LAYOUT = {
  MOBILE: 'prev, pager, next, sizes, jumper, total',
  IPAD: 'prev, pager, next, jumper, total',
  DESKTOP: 'total, prev, pager, next, sizes, jumper',
}

const layout = computed(() => {
  if (width.value < 768) {
    return LAYOUT.MOBILE
  }
  else if (width.value < 1024) {
    return LAYOUT.IPAD
  }
  else {
    return LAYOUT.DESKTOP
  }
})

// 默认分页常量
const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
  pageSizes: [10, 20, 30, 50, 100],
  align: 'center',
  background: true,
  layout: layout.value,
  hideOnSinglePage: false,
  size: 'default',
  pagerCount: width.value > 1200 ? 7 : 5,
}

/**
 *  合并分页配置
 *  @returns 合并后的分页配置
 */
const mergedPaginationOptions = computed(() => ({
  ...DEFAULT_PAGINATION_OPTIONS,
  ...props.paginationOptions,
}))

// 边框 (优先级：props > store)
/**
 *  边框
 *  @returns 边框
 */
const border = computed(() => props.border ?? isBorder.value)

/**
 *  斑马纹
 *  @returns 斑马纹
 */
const stripe = computed(() => props.stripe ?? isZebra.value)

/**
 *  表格尺寸
 *  @returns 表格尺寸
 */
const size = computed(() => props.size ?? tableSize.value)

/**
 *  数据是否为空
 *  @returns 数据是否为空
 */
const isEmpty = computed(() => props.data?.length === 0)

/**
 *  分页高度
 *  @returns 分页高度
 */
const { height: paginationHeight } = useElementSize(paginationRef)

/**
 *  容器高度计算
 *  @returns 容器高度
 */
const containerHeight = computed(() => {
  let offset = 0

  if (!props.showTableHeader) {
    offset = paginationHeight.value === 0 ? 0 : 45
  }
  else {
    offset = paginationHeight.value === 0 ? 25 : 84
  }

  return {
    height: offset === 0 ? '100%' : `calc(100% - ${offset}px)`,
  }
})

/**
 *  表格高度逻辑
 *  @returns 表格高度
 */
const height = computed(() => {
  // 全屏模式下占满全屏
  if (isFullScreen.value) {
    return '100%'
  }

  // 空数据且非加载状态时固定高度
  if (isEmpty.value && !props.loading) {
    return props.emptyHeight
  }

  // 使用传入的高度
  if (props.height) {
    return props.height
  }

  // 默认占满容器高度
  return '100%'
})

/**
 *  表头背景颜色样式
 *  @returns 表头背景颜色样式
 */
const headerCellStyle = computed(() => ({
  background: isHeaderBackground.value
    ? 'var(--el-fill-color-lighter)'
    : 'var(--art-main-bg-color)',
  ...(props.headerCellStyle || {
  }), // 合并用户传入的样式
}))

/**
 *  是否显示分页器
 *  @returns 是否显示分页器
 */
const showPagination = computed(() => props.pagination && !isEmpty.value)

/**
 *  清理列属性，移除插槽相关的自定义属性，确保它们不会被 ElTableColumn 错误解释
 *  @param col 列属性
 *  @returns 清理后的列属性
 */
function cleanColumnProps(col: ComponentType.TableType.ColumnType) {
  const columnProps = {
    ...col,
  }

  // 删除自定义的插槽控制属性
  delete columnProps.useHeaderSlot
  delete columnProps.headerSlotName
  delete columnProps.useSlot
  delete columnProps.slotName
  return columnProps
}

/**
 *  分页大小变化
 *  @param val 分页大小
 */
function handleSizeChange(val: number) {
  emit('paginationSizeChange', val)
}

/**
 *  分页当前页变化
 *  @param val 分页当前页
 */
function handleCurrentChange(val: number) {
  emit('paginationCurrentChange', val)
  scrollToTop() // 页码改变后滚动到表格顶部
}

/**
 *  滚动表格内容到顶部，并可以联动页面滚动到顶部
 */
function scrollToTop() {
  nextTick(() => {
    elTableRef.value?.setScrollTop(0) // 滚动 ElTable 内部滚动条到顶部
    window.scrollTo({
      top: 0,
    })
  })
}

/**
 *  全局序号
 *  @param index 索引
 *  @returns 全局序号
 */
function getGlobalIndex(index: number) {
  if (!props.pagination) {
    return index + 1
  }

  const { current, size } = props.pagination

  return (current - 1) * size + index + 1
}

defineExpose({
  scrollToTop,
  elTableRef,
})
</script>

<template>
  <div
    class="art-table"
    :class="{ 'is-empty': isEmpty }"
    :style="containerHeight"
  >
    <ElTable
      ref="elTableRef"
      v-loading="!!loading"
      v-bind="{ ...$attrs, ...props, height, stripe, border, size, headerCellStyle }"
    >
      <template
        v-for="col in columns"
        :key="col.prop || col.type"
      >
        <!-- 渲染全局序号列 -->
        <ElTableColumn
          v-if="col.type === 'globalIndex'"
          v-bind="{ ...col }"
        >
          <template
            #default="{ $index }"
          >
            <span>{{ getGlobalIndex($index) }}</span>
          </template>
        </ElTableColumn>

        <!-- 渲染展开行 -->
        <ElTableColumn
          v-else-if="col.type === 'expand'"
          v-bind="cleanColumnProps(col)"
        >
          <template
            #default="{ row }"
          >
            <component
              :is="col.formatter ? col.formatter(row) : null"
            />
          </template>
        </ElTableColumn>

        <!-- 渲染普通列 -->
        <ElTableColumn
          v-else
          v-bind="cleanColumnProps(col)"
        >
          <template
            v-if="col.useHeaderSlot && col.prop"
            #header="headerScope"
          >
            <slot
              :name="col.headerSlotName || `${col.prop}-header`"
              v-bind="{ ...headerScope, prop: col.prop, label: col.label }"
            >
              {{ col.label }}
            </slot>
          </template>

          <template
            v-if="col.useSlot && col.prop"
            #default="slotScope"
          >
            <slot
              :name="col.slotName || col.prop"
              v-bind="{
                ...slotScope,
                prop: col.prop,
                value: col.prop ? slotScope.row[col.prop] : undefined,
              }"
            />
          </template>
        </ElTableColumn>
      </template>

      <template
        v-if="$slots.default"
        #default
      >
        <slot />
      </template>

      <template
        #empty
      >
        <div
          v-if="loading"
        />

        <ElEmpty
          v-else
          :description="emptyText"
          :image-size="120"
        />
      </template>
    </ElTable>

    <div
      v-if="showPagination"
      ref="paginationRef"
      class="pagination custom-pagination"
      :class="mergedPaginationOptions?.align"
    >
      <ElPagination
        v-bind="mergedPaginationOptions"
        :total="pagination?.total"
        :disabled="loading"
        :page-size="pagination?.size"
        :current-page="pagination?.current"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use './style';
</style>
