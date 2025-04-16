<!------  2025-04-16---15:03---星期三  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { blogMenuJump } from '../utils'

defineOptions({
  name: 'Submenu',
})

const props = withDefaults(defineProps<Props>(), {
  menuList: () => [],
  level: 0,
})

type Props = {

  /**
   *  菜单
   */
  menuList?: RouterType.BlogRouteRecordRaw[]

  /**
   *  菜单等级
   */
  level?: number
}

// 判断是否有子菜单
function hasChildren(item: RouterType.BlogRouteRecordRaw): boolean {
  return Boolean(item.children?.length)
}

// 过滤菜单项
function filterRoutes(
  items: RouterType.BlogRouteRecordRaw[],
): RouterType.BlogRouteRecordRaw[] {
  return items
    .filter(item => !item.meta.isHideInMenu)
    .map(item => ({
      ...item,
      children: item.children ? filterRoutes(item.children) : undefined,
    }))
}

// 计算属性
const filteredMenuItems = computed(() => filterRoutes(props.menuList))

// 跳转页面
function goPage(item: RouterType.BlogRouteRecordRaw) {
  console.log('%c Line:50 🥝 item', 'color:#93c0a4', item)
  blogMenuJump(item)
}
</script>

<template>
  <template
    v-for="item in filteredMenuItems"
    :key="item.path"
  >
    <!-- 包含子菜单的项目 -->
    <el-sub-menu
      v-if="hasChildren(item)"
      :index="item.path"
      :level="level"
    >
      <template
        #title
      >
        <SvgIcon
          v-if="item.meta.icon"
          :icon="item.meta.icon"
        />

        <span
          class="menu-name"
        >{{ item.meta.title }}</span>

        <!-- <div
              v-if="item.meta.showBadge"
              class="badge"
              style="right: 35px"
            /> -->
      </template>

      <Submenu
        :menu-list="item.children"
        :level="level + 1"
      />
    </el-sub-menu>

    <!-- 普通菜单项 -->
    <el-menu-item
      v-else
      :index="item.path"
      :level-item="level + 1"
      @click="goPage(item)"
    >
      <SvgIcon
        v-if="item.meta.icon"
        :icon="item.meta.icon"
      />

      <template
        #title
      >
        <span
          class="menu-name"
        >
          {{ item.meta.title }}
        </span>

        <!-- <div
              v-if="item.meta.showBadge"
              class="badge"
            />

            <div
              v-if="item.meta.showTextBadge"
              class="text-badge"
            >
              {{ item.meta.showTextBadge }}
            </div> -->
      </template>
    </el-menu-item>
  </template>
</template>

<style lang="scss">
// 重新修改菜单样式

.el-popper.is-pure {
  border: 0.5px solid var(--art-border-dashed-color) !important;
  border-radius: 12px;
}

// 菜单折叠 hover 弹窗样式
.el-menu--vertical,
.el-menu--popup-container {
  .el-menu--popup {
    padding: 8px;

    .el-sub-menu__title:hover,
    .el-menu-item:hover {
      background-color: var(--art-gray-200) !important;
      border-radius: 6px;
    }

    .el-menu-item {
      height: 40px;
      margin-bottom: 10px;
      border-radius: 6px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    .el-menu-item.is-active {
      color: var(--art-gray-900) !important;
      background-color: var(--art-gray-200) !important;
    }
  }
}

.el-sub-menu__title,
.el-menu-item {
  width: 100%;
  border-radius: 0;
}

.el-sub-menu__title {
  .iconfont-sys {
    margin-left: 3px !important;
  }
}

.el-sub-menu__icon-arrow {
  color: var(--art-gray-600);
}

// 选中颜色
.el-menu-item.is-active {
  color: var(--main-color) !important;
  background-color: var(--el-color-primary-light-9);
  background-image: var(--el-color-primary-custom-14);

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    content: '';
    background: var(--main-color);
  }
}

// 鼠标移入背景色
.el-sub-menu__title:hover,
.el-menu-item:not(.is-active):hover {
  background: var(--art-gray-100) !important;
}

.el-menu-design {
  .el-sub-menu__title,
  .el-menu-item {
    width: calc(100% - 16px);
    margin: 0 auto;
    margin-bottom: 5px;
    border-radius: 6px;
  }

  .el-sub-menu__icon-arrow {
    color: var(--art-gray-600);
  }

  // 选中颜色
  .el-menu-item.is-active {
    color: var(--main-color) !important;
    background-color: var(--el-color-primary-light-9);
    background-image: var(--el-color-primary-custom-14);
  }

  // 鼠标移入背景色
  .el-sub-menu__title:hover,
  .el-menu-item:not(.is-active):hover {
    background: var(--art-gray-100) !important;
  }
}
</style>
