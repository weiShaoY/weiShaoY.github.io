import { useDark } from '@vueuse/core'

/**
 * 统一管理应用暗黑模式：
 * 首次访问默认进入 dark，后续尊重本地持久化结果。
 */
export function useAppDark() {
  return useDark({
    initialValue: 'dark',
    storageKey: 'app-color-scheme',
  })
}
