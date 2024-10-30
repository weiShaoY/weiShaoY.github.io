<!------------------------------------ 优化后的代码 ------------------------------------>
<script lang="ts" setup>

const router = useRouter()

/**
 *  是否显示下拉菜单
 */
const dropdownVisible = ref(false)

/**
 *  当前选中路径
 */
const currentRoutePath = ref(router.currentRoute.value.path)

/**
 *  定义下拉菜单选项
 */
const dropdownList = [
  {
    label: 'About',
    value: '/home/about',
  },
  {
    label: 'Resume',
    value: '/home/resume',
  },
]

/**
 * 处理选项选择事件，切换路由到指定路径
 * @param value - 被选中的路由路径
 */
function handleSelect(value: string) {
  dropdownVisible.value = false

  currentRoutePath.value = value

  router.push(value)
}

</script>

<template>
  <a-dropdown
    v-model:popup-visible="dropdownVisible"
    position="br"
    @select="handleSelect"
  >
    <!-- 按钮区域 -->
    <a-button
      class="group rounded-3 !h-12 !w-12 !hover:bg-#45464950"
      type="text"
    >
      <template
        #icon
      >
        <SvgIcon
          :icon="dropdownVisible ? 'guanBi' : 'zhanKai'"
          :size="36"
          class="group-hover:color-primary"
          :class="isDark ? 'color-white' : 'color-#333'"
        />
      </template>
    </a-button>

    <!-- 下拉内容 -->
    <template
      #content
    >
      <a-doption
        v-for="option in dropdownList"
        :key="option.value"
        :value="option.value"
        :class="{ 'bg-primary': currentRoutePath === option.value }"
      >
        <span
          class="text-5 font-600"
        >
          {{ option.label }}
        </span>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<style lang="less" scoped></style>
