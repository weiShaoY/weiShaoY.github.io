<!------  2025-11-22---03:54---星期六  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

/**
 *  主题切换功能
 */
const isDark = useDark() // 使用暗色主题

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
  <!-- 切换主题 -->
  <!-- <label
    class="relative inline-flex cursor-pointer items-center"
  >
    <input
      class="peer sr-only"
      type="checkbox"
      :checked="isDark"
      @click="themeAnimation"
    >

    <div
      class="h-10 w-20 rounded-full from-yellow-300 to-orange-400 bg-gradient-to-r transition-all duration-500 after:absolute after:left-1 after:top-1 after:h-8 after:w-8 after:flex after:items-center after:justify-center after:rounded-full after:bg-white peer-checked:from-blue-400 peer-checked:to-indigo-500 after:text-lg after:shadow-md after:transition-all after:duration-500 after:content-['☀️'] peer-checked:after:translate-x-10 peer-checked:after:content-['🌙']"
    />

  </label> -->

  <BaseButton
    class="z-99"
    :icon="isDark ? 'theme-dark' : 'theme-light'"
    :size="34"
    @click="themeAnimation"
  />
</template>

<style lang="scss" scoped>

</style>
