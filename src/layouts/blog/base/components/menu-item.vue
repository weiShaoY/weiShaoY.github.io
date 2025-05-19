<!------  2025-04-21---01:08---星期一  ------>
<!------------------------------------    ------------------------------------------------->

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge'

type Props = {

  /**
   *  菜单项
   */
  menu: WxChatType.BlogRouteRecordRaw

  /**
   *  额外的 CSS 类名
   */
  class?:
    | string
    | Record<string, boolean>
    | Array<string | Record<string, boolean>>
}

const props = defineProps<Props>()

/**
 * 基础类名
 */
const BASE_CLASSES = 'flex items-center gap-2 text-4'

/**
 * 计算合并后的类名
 * 现在支持字符串、对象和数组形式的class
 */
const computedClass = computed(() => {
  // 处理字符串形式的class
  if (typeof props.class === 'string') {
    return twMerge(BASE_CLASSES, props.class)
  }

  // 处理对象或数组形式的class
  if (props.class) {
    return [BASE_CLASSES, props.class]
  }

  return BASE_CLASSES
})
</script>

<template>
  <div
    :class="computedClass"
  >
    <SvgIcon
      v-if="menu.meta?.icon"
      :icon="menu.meta.icon"
      :size="20"
    />

    <div
      class="flex items-center gap-2"
    >
      <span
        class=""
      >
        {{ menu.meta.title }}
      </span>

      <!-- 外链徽标 -->
      <SvgIcon
        v-if="menu.meta.externalUrl"
        icon="blog-menu-externalUrl"
        :size="16"
      />

      <!-- 文本徽标 -->
      <div
        v-else-if="menu.meta.textBadge"
        class="m-auto h-[16px] min-w-5 flex items-center justify-center rounded-[5px] bg-[#fd4e4e] p-x-1 text-center text-[10px] text-white leading-5"
      >
        {{ menu.meta.textBadge }}
      </div>

      <!-- 图标徽标 -->
      <SvgIcon
        v-else-if="menu.meta.iconBadge"
        :icon="menu.meta.iconBadge"
        :size="16"
      />
    </div>
  </div>
</template>
