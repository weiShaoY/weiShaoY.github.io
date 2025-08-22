import { useWindowSize } from '@vueuse/core'

import { computed } from 'vue'

/**
 *  检查是否为移动端
 *  @returns  是否为移动端
 *  @description 返回值为 true 时，表示为移动端
 */
export const isMobile: Ref<boolean> = computed(() => {
  return useWindowSize().width.value < 500
})
