import { ElLoading } from 'element-plus'

import loadingSvg from '@/assets/svgs/loading.svg?raw'

/**
 * 首次加载配置
 */
const INITIAL_LOADING_CONFIG = {
  size: 50,
  background: 'rgba(0, 0, 0, 0)',
} as const

/**
 * 设置网站首次加载状态
 * @description 在网站首次加载时显示 loading 动画
 */
export function setupInitialLoading(): void {
  try {
    // 设置加载图标大小
    const sizedSvg = loadingSvg.replace(
      '<svg',
      `<svg width="${INITIAL_LOADING_CONFIG.size}" height="${INITIAL_LOADING_CONFIG.size}"`,
    )

    // 创建首次加载实例
    const loading = ElLoading.service({
      svg: sizedSvg,
      lock: true,
      background: INITIAL_LOADING_CONFIG.background,
    })

    // 监听 #app 元素，网站加载完成后自动关闭
    const checkAppLoaded = () => {
      const app = document.getElementById('app')

      if (app && app.children.length > 0) {
        loading.close()
        return
      }

      // 继续检查
      requestAnimationFrame(checkAppLoaded)
    }

    checkAppLoaded()
  }
  catch (error) {
    console.error('Initial loading setup failed:', error)
  }
}
