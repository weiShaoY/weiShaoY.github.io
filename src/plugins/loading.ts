import loadingSvg from '@/assets/svgs/loading.svg?raw'

import { ElLoading } from 'element-plus'

export function setupLoading() {
  const sizedSvg = loadingSvg.replace('<svg', '<svg width="50" height="50"')

  const loading = ElLoading.service({
    svg: sizedSvg,
    lock: true,
    background: 'rgba(0, 0, 0, 0)',
  })

  const app = document.getElementById('app')

  if (app) {
    // app.innerHTML = loading
    setTimeout(() => {
      loading.close()
    }, 1000)
  }
}
