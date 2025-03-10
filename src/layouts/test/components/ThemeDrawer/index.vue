<script setup lang="ts">
import { useBlogTheme } from '@/hooks/blog-theme'

import { useTestStore } from '@/store/modules/test'

import { mittBus } from '@/utils'

import { ref } from 'vue'

import SwitchDark from '../SwitchDark/index.vue'

const { changePrimary, changeGreyOrWeak, setAsideTheme, setHeaderTheme } = useBlogTheme()

const testStore = useTestStore()

/**
 *  预定义主题颜色
 */
const colorList = [
  import.meta.env.VITE_APP_BLOG_THEME_COLOR,
  '#daa96e',
  '#0c819f',
  '#409eff',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6',
]

// 设置布局方式
function setLayout(val: BlogType.LayoutType) {
  testStore.setGlobal('layout', val)
  setAsideTheme()
}

// 打开主题设置
const drawerVisible = ref(false)

mittBus.on('openThemeDrawer', () => (drawerVisible.value = true))
</script>

<template>
  <el-drawer
    v-model="drawerVisible"
    title="布局设置"
    size="290px"
  >
    <!-- 布局样式 -->
    <el-divider
      class="divider"
      content-position="center"
    >
      <el-icon>
        <Notification />
      </el-icon>
      布局样式
    </el-divider>

    <div
      class="layout-box"
    >
      <el-tooltip
        effect="dark"
        content="纵向"
        placement="top"
        :show-after="200"
      >
        <div
          class="layout-item layout-vertical"
          :class="[{ 'is-active': testStore.global.layout === 'vertical' }]"
          @click="setLayout('vertical')"
        >
          <div
            class="layout-dark"
          />

          <div
            class="layout-container"
          >
            <div
              class="layout-light"
            />

            <div
              class="layout-content"
            />
          </div>

          <el-icon
            v-if="testStore.global.layout === 'vertical'"
          >
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>

      <el-tooltip
        effect="dark"
        content="经典"
        placement="top"
        :show-after="200"
      >
        <div
          class="layout-item layout-classic"
          :class="[{ 'is-active': testStore.global.layout === 'classic' }]"
          @click="setLayout('classic')"
        >
          <div
            class="layout-dark"
          />

          <div
            class="layout-container"
          >
            <div
              class="layout-light"
            />

            <div
              class="layout-content"
            />
          </div>

          <el-icon
            v-if="testStore.global.layout === 'classic'"
          >
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>

      <el-tooltip
        effect="dark"
        content="横向"
        placement="top"
        :show-after="200"
      >
        <div
          class="layout-item layout-transverse"
          :class="[{ 'is-active': testStore.global.layout === 'transverse' }]"
          @click="setLayout('transverse')"
        >
          <div
            class="layout-dark"
          />

          <div
            class="layout-content"
          />

          <el-icon
            v-if="testStore.global.layout === 'transverse'"
          >
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>

      <el-tooltip
        effect="dark"
        content="分栏"
        placement="top"
        :show-after="200"
      >
        <div
          class="layout-item layout-columns"
          :class="[{ 'is-active': testStore.global.layout === 'columns' }]"
          @click="setLayout('columns')"
        >
          <div
            class="layout-dark"
          />

          <div
            class="layout-light"
          />

          <div
            class="layout-content"
          />

          <el-icon
            v-if="testStore.global.layout === 'columns'"
          >
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
    </div>

    <div
      class="theme-item"
    >
      <span>
        侧边栏反转色
        <el-tooltip
          effect="dark"
          content="侧边栏颜色变为深色模式"
          placement="top"
        >
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>

      <el-switch
        v-model="testStore.global.asideInverted"
        @change="setAsideTheme"
      />
    </div>

    <div
      class="theme-item mb-50"
    >
      <span>
        头部反转色
        <el-tooltip
          effect="dark"
          content="头部颜色变为深色模式"
          placement="top"
        >
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>

      <el-switch
        v-model="testStore.global.headerInverted"
        @change="setHeaderTheme"
      />
    </div>

    <!-- 全局主题 -->
    <el-divider
      class="divider"
      content-position="center"
    >
      <el-icon>
        <ColdDrink />
      </el-icon>
      全局主题
    </el-divider>

    <div
      class="theme-item"
    >
      <span>主题颜色</span>

      <el-color-picker
        v-model="testStore.global.primary"
        :predefine="colorList"
        @change="changePrimary"
      />
    </div>

    <div
      class="theme-item"
    >
      <span>暗黑模式</span>

      <SwitchDark />
    </div>

    <div
      class="theme-item"
    >
      <span>灰色模式</span>

      <el-switch
        v-model="testStore.global.isGrey"
        @change="changeGreyOrWeak('grey', !!$event)"
      />
    </div>

    <div
      class="theme-item mb-40"
    >
      <span>色弱模式</span>

      <el-switch
        v-model="testStore.global.isWeak"
        @change="changeGreyOrWeak('weak', !!$event)"
      />
    </div>

    <!-- 界面设置 -->
    <el-divider
      class="divider"
      content-position="center"
    >
      <el-icon>
        <Setting />
      </el-icon>
      界面设置
    </el-divider>

    <div
      class="theme-item"
    >
      <span>菜单折叠</span>

      <el-switch
        v-model="testStore.global.isCollapse"
      />
    </div>

    <div
      class="theme-item"
    >
      <span>菜单手风琴</span>

      <el-switch
        v-model="testStore.global.accordion"
      />
    </div>

    <div
      class="theme-item"
    >
      <span>水印</span>

      <el-switch
        v-model="testStore.global.watermark"
      />
    </div>

    <div
      class="theme-item"
    >
      <span>面包屑</span>

      <el-switch
        v-model="testStore.global.breadcrumb"
      />
    </div>

    <div
      class="theme-item"
    >
      <span>面包屑图标</span>

      <el-switch
        v-model="testStore.global.breadcrumbIcon"
      />
    </div>

    <div
      class="theme-item"
    >
      <span>标签栏</span>

      <el-switch
        v-model="testStore.global.tabs"
      />
    </div>

    <div
      class="theme-item"
    >
      <span>标签栏图标</span>

      <el-switch
        v-model="testStore.global.tabsIcon"
      />
    </div>

    <div
      class="theme-item"
    >
      <span>页脚</span>

      <el-switch
        v-model="testStore.global.footer"
      />
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
