<script setup lang="ts">

import { ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

type PropsType = {

  /**
   *  菜单列表
   */
  menuList: HomeType.HeaderRouter[]
}

defineProps<PropsType>()

const router = useRouter()

/**
 *  控制菜单是否打开
 */
const isOpen = ref(false)

const buttonRef = ref(null)

const route = useRoute()

/**
 * 切换菜单显示状态
 */
function toggleMenu() {
  isOpen.value = !isOpen.value
}

/**
 * 关闭菜单
 */
function closeMenu() {
  isOpen.value = false
}

/**
 * 选择菜单项
 */
function handleSelect(item: HomeType.HeaderRouter) {
  closeMenu()

  // 延迟跳转，确保动画完成
  setTimeout(() => {
    // router.push(key)

    if (route.path === item.value) {
      return
    }

    router.push(item.value)
  }, 500) // 500ms 是关闭菜单的动画时间
}
</script>

<template>
  <div
    class="block"
  >
    <!-- 下拉按钮 -->
    <button
      ref="buttonRef"
      class="aspect-square h-10 rounded-md hover:bg-[#333639]"
      :class="[
        isOpen ? 'bg-[#333639]' : '',
      ]"
      type="button"
      @click="toggleMenu"
    >
      <SvgIcon
        :icon="isOpen ? 'home-navbar-menu1' : 'home-navbar-menu2'"
        :size="24"
        color="#fff"
      />
    </button>

    <!-- 弹出层 -->
    <div
      class="fixed bottom-0 left-0 right-0 flex flex-col overflow-hidden bg-black bg-opacity-70 transition-max-height duration-500 ease-in-out"
      :class="[
        isOpen ? 'max-h-screen' : 'max-h-0',
      ]"
      :style="{ top: '80px' }"
    >
      <!-- 操作组 -->
      <div
        class="bg-[#333639]"
      >
        <div
          v-for="item in menuList"
          :key="item.value"
          class="m-3 flex cursor-pointer items-center rounded-md p-3 text-lg text-white font-bold hover:bg-[#D0D2D6]"
          :class="{
            'bg-[#D0D2D6]': route.path === item.value,
          }"
          @click="handleSelect(item)"
        >
          {{ item.label }}
        </div>
      </div>

      <div
        class="flex-1"
        @click="closeMenu"
      />
    </div>
  </div>

</template>
