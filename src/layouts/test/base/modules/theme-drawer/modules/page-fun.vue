<script setup lang="ts">
import { useTestStore } from '@/store'

import { translateOptions } from '@/utils'

import { computed } from 'vue'

import {
  resetCacheStrategyOptions,
  themePageAnimationModeOptions,
  themeScrollModeOptions,
  themeTabModeOptions,
} from '../../../app'

import SettingItem from '../components/setting-item.vue'

defineOptions({
  name: 'PageFun',
})

const testStore = useTestStore()

/**
 * 获取当前布局模式
 * @returns 当前的布局模式
 */
const layoutMode = computed(() => testStore.theme.layout.mode)

/**
 * 判断当前是否为混合布局模式
 * @returns 是否为混合模式
 */
const isMixLayoutMode = computed(() => layoutMode.value.includes('mix'))

/**
 * 判断当前是否使用包装器滚动模式
 * @returns 是否使用包装器滚动模式
 */
const isWrapperScrollMode = computed(() => testStore.theme.layout.scrollMode === 'wrapper')
</script>

<template>
  <ElDivider>
    页面功能
  </ElDivider>

  <TransitionGroup
    tag="div"
    name="setting-list"
    class="flex-col-stretch gap-[12px]"
  >
    <SettingItem
      key="1"
      label="重置缓存策略"
    >
      <ElSelect
        v-model="testStore.theme.resetCacheStrategy"
        size="small"
        class="w-[120px]"
      >
        <ElOption
          v-for="{ label, value } in translateOptions(resetCacheStrategyOptions)"
          :key="value"
          :label="label"
          :value="value"
        />
      </ElSelect>
    </SettingItem>

    <SettingItem
      key="1"
      label="滚动模式"
    >
      <ElSelect
        v-model="testStore.theme.layout.scrollMode"
        size="small"
        class="w-[120px]"
      >
        <ElOption
          v-for="{ label, value } in translateOptions(themeScrollModeOptions)"
          :key="value"
          :label="label"
          :value="value"
        />
      </ElSelect>
    </SettingItem>

    <SettingItem
      key="1-1"
      label="页面切换动画"
    >
      <ElSwitch
        v-model="testStore.theme.page.animate"
      />
    </SettingItem>

    <SettingItem
      v-if="testStore.theme.page.animate"
      key="1-2"
      label="页面切换动画类型"
    >
      <ElSelect
        v-model="testStore.theme.page.animateMode"
        size="small"
        class="w-[120px]"
      >
        <ElOption
          v-for="{ label, value } in translateOptions(themePageAnimationModeOptions)"
          :key="value"
          :label="label"
          :value="value"
        />
      </ElSelect>
    </SettingItem>

    <SettingItem
      v-if="isWrapperScrollMode"
      key="2"
      label="固定头部和标签栏"
    >
      <ElSwitch
        v-model="testStore.theme.fixedHeaderAndTab"
      />
    </SettingItem>

    <SettingItem
      key="3"
      label="头部高度"
    >
      <ElInputNumber
        v-model="testStore.theme.header.height"
        size="small"
        :step="1"
        class="w-[120px]"
      />
    </SettingItem>

    <SettingItem
      key="4"
      label="显示面包屑"
    >
      <ElSwitch
        v-model="testStore.theme.header.breadcrumb.visible"
      />
    </SettingItem>

    <SettingItem
      v-if="testStore.theme.header.breadcrumb.visible"
      key="4-1"
      label="显示面包屑图标"
    >
      <ElSwitch
        v-model="testStore.theme.header.breadcrumb.showIcon"
      />
    </SettingItem>

    <SettingItem
      key="5"
      label="显示标签栏"
    >
      <ElSwitch
        v-model="testStore.theme.tab.visible"
      />
    </SettingItem>

    <SettingItem
      v-if="testStore.theme.tab.visible"
      key="5-1"
      label="标签栏信息缓存"
    >
      <ElSwitch
        v-model="testStore.theme.tab.cache"
      />
    </SettingItem>

    <SettingItem
      v-if="testStore.theme.tab.visible"
      key="5-2"
      label="标签栏高度"
    >
      <ElInputNumber
        v-model="testStore.theme.tab.height"
        size="small"
        :step="1"
        class="w-[120px]"
      />
    </SettingItem>

    <SettingItem
      v-if="testStore.theme.tab.visible"
      key="5-3"
      label="标签栏风格"
    >
      <ElSelect
        v-model="testStore.theme.tab.mode"
        size="small"
        class="w-[120px]"
      >
        <ElOption
          v-for="{ label, value } in translateOptions(themeTabModeOptions)"
          :key="value"
          :label="label"
          :value="value"
        />
      </ElSelect>
    </SettingItem>

    <SettingItem
      v-if="layoutMode === 'vertical'"
      key="6-1"
      label="侧边栏宽度"
    >
      <ElInputNumber
        v-model="testStore.theme.sider.width"
        size="small"
        :step="1"
        class="w-[120px]"
      />
    </SettingItem>

    <SettingItem
      v-if="layoutMode === 'vertical'"
      key="6-2"
      label="侧边栏折叠宽度"
    >
      <ElInputNumber
        v-model="testStore.theme.sider.collapsedWidth"
        size="small"
        :step="1"
        class="w-[120px]"
      />
    </SettingItem>

    <SettingItem
      v-if="isMixLayoutMode"
      key="6-3"
      label="混合布局侧边栏宽度"
    >
      <ElInputNumber
        v-model="testStore.theme.sider.mixWidth"
        size="small"
        :step="1"
        class="w-[120px]"
      />
    </SettingItem>

    <SettingItem
      v-if="isMixLayoutMode"
      key="6-4"
      label="混合布局侧边栏折叠宽度"
    >
      <ElInputNumber
        v-model="testStore.theme.sider.mixCollapsedWidth"
        size="small"
        :step="1"
        class="w-[120px]"
      />
    </SettingItem>

    <SettingItem
      v-if="layoutMode === 'vertical-mix'"
      key="6-5"
      label="混合布局子菜单宽度"
    >
      <ElInputNumber
        v-model="testStore.theme.sider.mixChildMenuWidth"
        size="small"
        :step="1"
        class="w-[120px]"
      />
    </SettingItem>

    <SettingItem
      key="7"
      label="显示底部"
    >
      <ElSwitch
        v-model="testStore.theme.footer.visible"
      />
    </SettingItem>

    <SettingItem
      v-if="testStore.theme.footer.visible && isWrapperScrollMode"
      key="7-1"
      label="固定底部"
    >
      <ElSwitch
        v-model="testStore.theme.footer.fixed"
      />
    </SettingItem>

    <SettingItem
      v-if="testStore.theme.footer.visible"
      key="7-2"
      label="底部高度"
    >
      <ElInputNumber
        v-model="testStore.theme.footer.height"
        size="small"
        :step="1"
        class="w-[120px]"
      />
    </SettingItem>

    <SettingItem
      v-if="testStore.theme.footer.visible && layoutMode === 'horizontal-mix'"
      key="7-3"
      label="底部局右"
    >
      <ElSwitch
        v-model="testStore.theme.footer.right"
      />
    </SettingItem>

    <SettingItem
      key="8"
      label="显示全屏水印"
    >
      <ElSwitch
        v-model="testStore.theme.watermark.visible"
      />
    </SettingItem>

    <SettingItem
      v-if="testStore.theme.watermark.visible"
      key="8-1"
      label="水印文本"
    >
      <ElInput
        v-model="testStore.theme.watermark.text"
        autosize
        type="text"
        size="small"
        class="w-[120px]"
        placeholder="SoybeanAdmin"
      />
    </SettingItem>
  </TransitionGroup>
</template>

<style scoped>
.setting-list-move,
.setting-list-enter-active,
.setting-list-leave-active {
  --uno: transition-all-300;
}

.setting-list-enter-from,
.setting-list-leave-to {
  --uno: opacity-0 -translate-x-30px;
}

.setting-list-leave-active {
  --uno: absolute;
}
</style>
