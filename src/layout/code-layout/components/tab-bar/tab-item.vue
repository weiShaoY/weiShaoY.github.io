<script lang="ts" setup>
import type { TagProps } from '@/store/modules/tab-bar/types'

import type { PropType } from 'vue'

import config from '@/config'

import { useTabBarStore } from '@/store'

import { computed } from 'vue'

import { useRoute, useRouter } from 'vue-router'

/**
 * 定义组件的 props
 */
const props = defineProps({

  /**
   *  标签数据
   */
  itemData: {
    type: Object as PropType<TagProps>, // 指定 itemData 的类型为 TagProps
    default() {
      return [] // 默认值为空数组
    },
  },

  /**
   *  标签索引
   */
  index: {
    type: Number, // 指定 index 的类型为 Number
    default: 0, // 默认值为 0
  },
})

const router = useRouter()

const route = useRoute()

/**
 * 枚举类型 Eaction，用于表示不同的操作类型
 * @enum {string}
 */
enum Eaction {

  /**
   *  重新加载
   */
  reload = 'reload',

  /**
   *  当前标签
   */
  current = 'current',

  /**
   *  左侧标签
   */
  left = 'left',

  /**
   *  右侧标签
   */
  right = 'right',

  /**
   *  其他标签
   */
  others = 'others',

  /**
   *  所有标签
   */
  all = 'all',
}

const tabBarStore = useTabBarStore()

/**
 * 跳转到指定标签
 * @param {TagProps} tag - 标签属性
 */
function goto(tag: TagProps) {
  router.push({
    ...tag,
  }) // 使用 router.push 方法跳转
}

/**
 * 计算属性，获取标签列表
 * @returns {TagProps[]} 标签列表
 */
const tagList = computed(() => {
  return tabBarStore.getTabList
})

/**
 * 计算属性，判断重新加载按钮是否禁用
 * @returns {boolean} 是否禁用
 */
const disabledReload = computed(() => {
  return props.itemData.fullPath !== route.fullPath
})

/**
 * 计算属性，判断当前标签按钮是否禁用
 * @returns {boolean} 是否禁用
 */
const disabledCurrent = computed(() => {
  return props.index === 0
})

/**
 * 计算属性，判断左侧标签按钮是否禁用
 * @returns {boolean} 是否禁用
 */
const disabledLeft = computed(() => {
  return [0, 1].includes(props.index)
})

/**
 * 计算属性，判断右侧标签按钮是否禁用
 * @returns {boolean} 是否禁用
 */
const disabledRight = computed(() => {
  return props.index === tagList.value.length - 1
})

/**
 * 关闭标签
 * @param {TagProps} tag - 标签属性
 * @param {number} idx - 标签索引
 */
function tagClose(tag: TagProps, idx: number) {
  tabBarStore.deleteTag(idx, tag) // 从标签列表中删除指定标签
  if (props.itemData.fullPath === route.fullPath) { // 如果当前路径等于要关闭的标签路径
    const latest = tagList.value[idx - 1] // 获取队列的前一个标签

    router.push({
      name: latest.name,
    }) // 跳转到前一个标签
  }
}

/**
 * 查找当前路由在标签列表中的索引
 */
function findCurrentRouteIndex() {
  return tagList.value.findIndex(el => el.fullPath === route.fullPath)
}

/**
 * 处理不同的操作类型
 */
async function actionSelect(value: any) {
  const { itemData, index } = props

  /**
   *  复制标签列表
   */
  const copyTagList = [...tagList.value]

  // 关闭当前标签
  if (value === Eaction.current) {
    tagClose(itemData, index)
  }

  // 关闭左侧标签
  else if (value === Eaction.left) {
    const currentRouteIdx = findCurrentRouteIndex()

    copyTagList.splice(1, props.index - 1)
    tabBarStore.freshTabList(copyTagList)
    if (currentRouteIdx < index) {
      router.push({
        name: itemData.name,
      })
    }
  }

  // 关闭右侧标签
  else if (value === Eaction.right) {
    const currentRouteIdx = findCurrentRouteIndex()

    copyTagList.splice(props.index + 1)
    tabBarStore.freshTabList(copyTagList)
    if (currentRouteIdx > index) {
      router.push({
        name: itemData.name,
      })
    }
  }

  // 关闭其他标签页
  else if (value === Eaction.others) {
    const filterList = tagList.value.filter((el, idx) => {
      return idx === 0 || idx === props.index
    })

    tabBarStore.freshTabList(filterList)
    router.push({
      name: itemData.name,
    })
  }

  // 重新加载
  else if (value === Eaction.reload) {
    tabBarStore.deleteCache(itemData)
    await router.push({
      name: config.redirectRouteName,
      params: {
        path: route.fullPath,
      },
    })
    tabBarStore.addCache(itemData.name)
  }

  // 关闭全部标签
  else {
    tabBarStore.resetTabList()

    router.push({
      name: config.code.defaultRouteName,
    })
  }
}
</script>

<template>
  <a-dropdown
    trigger="contextMenu"
    :popup-max-height="false"
    @select="actionSelect"
  >
    <span
      class="arco-tag arco-tag-size-medium arco-tag-checked"
      :class="{ 'link-activated': itemData.fullPath === $route.fullPath }"
      @click="goto(itemData)"
    >
      <span
        class="tag-link"
      >
        {{ itemData.title }}
      </span>

      <span
        class="arco-icon-hover arco-tag-icon-hover arco-icon-hover-size-medium arco-tag-close-btn"
        @click.stop="tagClose(itemData, index)"
      >
        <SvgIcon
          icon="guanBi"
          :size="16"
        />
      </span>
    </span>

    <template
      #content
    >
      <a-doption
        :disabled="disabledReload"
        :value="Eaction.reload"
      >
        <icon-refresh />

        <span>重新加载</span>
      </a-doption>

      <a-doption
        class="sperate-line"
        :disabled="disabledCurrent"
        :value="Eaction.current"
      >
        <icon-close />

        <span>关闭当前标签页</span>
      </a-doption>

      <a-doption
        :disabled="disabledLeft"
        :value="Eaction.left"
      >
        <icon-to-left />

        <span>关闭左侧标签页</span>
      </a-doption>

      <a-doption
        class="sperate-line"
        :disabled="disabledRight"
        :value="Eaction.right"
      >
        <icon-to-right />

        <span>关闭右侧标签页</span>
      </a-doption>

      <a-doption
        :value="Eaction.others"
      >
        <icon-swap />

        <span>关闭其它标签页</span>
      </a-doption>

      <a-doption
        :value="Eaction.all"
      >
        <icon-folder-delete />

        <span>关闭全部标签页</span>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<style scoped lang="less">
  .tag-link {
  color: var(--color-text-2);
  text-decoration: none;
}
.link-activated {
  color: rgb(var(--link-6));
  .tag-link {
    color: rgb(var(--link-6));
  }
  & + .arco-tag-close-btn {
    color: rgb(var(--link-6));
  }
}
:deep(.arco-dropdown-option-content) {
  span {
    margin-left: 10px;
  }
}
.arco-dropdown-open {
  .tag-link {
    color: rgb(var(--danger-6));
  }
  .arco-tag-close-btn {
    color: rgb(var(--danger-6));
  }
}
.sperate-line {
  border-bottom: 1px solid var(--color-neutral-3);
}
</style>
