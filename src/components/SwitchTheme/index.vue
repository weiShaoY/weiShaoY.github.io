<!------  2025-11-22---03:54---星期六  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useAppDark } from '@/hooks/useAppDark'

/**
 *  主题切换功能
 */
const isDark = useAppDark() // 使用暗色主题

/**
 *  当前选中的主题
 */
const selectedCodeTheme = ref('vitesse-dark')

/**
 *  主题切换函数
 */
const toggleTheme = useToggle(isDark)

/**
 * 处理暗色模式切换
 */
// function handleDarkModeToggle() {
//   toggleTheme()
// }

// 监听暗色模式自动切换代码主题
watch(isDark, (dark) => {
  selectedCodeTheme.value = dark ? 'vitesse-dark' : 'vitesse-light'
})

/**
 * 主题切换动画
 * @param e 鼠标点击事件
 */
function themeAnimation(e: any) {
  const x = e.clientX

  const y = e.clientY

  // 计算鼠标点击位置距离视窗的最大圆半径
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  // 设置CSS变量
  document.documentElement.style.setProperty('--x', `${x}px`)
  document.documentElement.style.setProperty('--y', `${y}px`)
  document.documentElement.style.setProperty('--r', `${endRadius}px`)

  if (document.startViewTransition) {
    document.startViewTransition(() => toggleTheme())
  }
  else {
    toggleTheme()
  }
}

</script>

<template>
  <BaseButton
    class="z-99 cursor-pointer rounded-lg text-black transition-colors duration-300 hover:bg-white/90! hover:text-white"
    :icon="isDark ? 'theme-dark' : 'theme-light'"
    :size="34"
    @click="themeAnimation"
  />
</template>
