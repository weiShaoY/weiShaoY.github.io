<script lang="ts" setup>
import { useAppStore, useBlogStore } from '@/store'

const emit = defineEmits(['cancel'])

const appStore = useAppStore()

const blogStore = useBlogStore()

/**
 *  取消
 */
function cancel() {
  appStore.state.globalSetting.visible = false
  emit('cancel')
}

/**
 *  显示页面配置
 */
function setVisible() {
  appStore.state.globalSetting.visible = true
}

/**
 *  切换是否色弱模式
 */
function toggleColorWeak(value: any) {
  document.body.style.filter = value ? 'invert(80%)' : 'none'
}
</script>

<template>
  <div
    v-if="!blogStore.state.navbar.visible"
    class="fixed right-0 top-70"
    @click="setVisible"
  >
    <a-button
      type="primary"
    >
      <template
        #icon
      >
        <icon-settings />
      </template>
    </a-button>
  </div>

  <a-drawer
    :width="300"
    unmount-on-close
    cancel-text="关闭"
    :visible="appStore.state.globalSetting.visible"
    @cancel="cancel"
    @ok="cancel"
  >
    <template
      #title
    >
      系统配置
    </template>

    <!--  全局设置 start -->
    <div
      class="m-b-8"
    >
      <h5
        class="m-y-2 p-0 text-4 font-700"
      >
        全局设置
      </h5>

      <div
        class="h-8 flex items-center justify-between"
      >
        <span>
          色弱模式
        </span>

        <a-switch
          v-model="appStore.state.theme.colorWeak"
          size="small"
          @change="toggleColorWeak"
        />
      </div>
    </div>
    <!-- 全局设置  end -->

    <div
      class="m-b-8"
    >
      <h5
        class="m-y-2 p-0 text-4 font-700"
      >
        Code设置
      </h5>

      <div
        class="h-10 flex items-center justify-between"
      >
        <span>
          导航栏是否显示
        </span>

        <a-switch
          v-model="blogStore.state.navbar.visible"
          size="small"
        />
      </div>

      <div
        class="h-10 flex items-center justify-between"
      >
        <span>
          多页签是否显示
        </span>

        <a-switch
          v-model="blogStore.state.tabBar.visible"
          size="small"
        />
      </div>

      <div
        class="h-10 flex items-center justify-between"
      >
        <span>
          面包屑是否显示
        </span>

        <a-switch
          v-model="blogStore.state.breadcrumb.visible"
          size="small"
        />
      </div>

      <div
        class="h-10 flex items-center justify-between"
      >
        <span>
          底部栏是否显示
        </span>

        <a-switch
          v-model="blogStore.state.footer.visible"
          size="small"
        />
      </div>

      <div
        class="h-10 flex items-center justify-between"
      >
        <span>
          菜单栏是否显示
        </span>

        <a-switch
          v-model="blogStore.state.menu.visible"
          size="small"
        />
      </div>

      <div
        class="h-10 flex items-center justify-between"
      >
        <span>
          菜单栏显示位置
        </span>

        <a-select
          v-model="blogStore.state.menu.position"
          class="w-20"
        >
          <a-option
            value="left"
          >
            左侧
          </a-option>

          <a-option
            value="top"
          >
            顶部
          </a-option>
        </a-select>
      </div>

      <div
        class="h-10 flex items-center justify-between"
      >
        <span>
          左侧菜单宽度 (px)
        </span>

        <a-input-number
          v-model="blogStore.state.menu.expandedWidth"
          size="small"
          class="w-20"
        />
      </div>
    </div>
  </a-drawer>
</template>

<style scoped lang="less">
.arco-switch {
  background-color: var(--color-fill-4);
}
.arco-switch-checked {
  background-color: rgb(var(--primary-6));
}
</style>
