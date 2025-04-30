// @unocss-include

/** 初始化渐变旋转加载动画，并设置主题颜色与暗黑模式 */
export function setupLoading() {
  const loadingText = 'LOADING'

  const charAnimations = loadingText.split('').map((char, index) => {
    const delay = index * 200

    return `<span class="char text-6 font-bold" style="animation-delay: ${delay}ms">${char}</span>`
  })
.join('\n')

  const loading = `
  <div id="global-loading" class="fixed inset-0 flex items-center justify-center bg-black z-[100000]">
    <div class="loading relative h-60 w-60 animate-spin rounded-full from-teal-200 via-yellow-300 to-pink-500 bg-gradient-to-r">
      <div class="absolute inset-2.5 z-1 rounded-full bg-black"></div>
      <span class="absolute h-full w-full rounded-full from-teal-200 via-yellow-300 to-pink-500 bg-gradient-to-r blur-sm"></span>
      <span class="absolute h-full w-full rounded-full from-teal-200 via-yellow-300 to-pink-500 bg-gradient-to-r blur-md"></span>
      <span class="absolute h-full w-full rounded-full from-teal-200 via-yellow-300 to-pink-500 bg-gradient-to-r blur-2xl"></span>
      <span class="absolute h-full w-full rounded-full from-teal-200 via-yellow-300 to-pink-500 bg-gradient-to-r blur-3xl"></span>
    </div>
    <div class="absolute left-1/2 top-1/2 z-10 transform text-lg text-cyan-400 tracking-wide font-sans -translate-x-1/2 -translate-y-1/2">
      ${charAnimations}
    </div>
  </div>`

  const style = document.createElement('style')

  style.textContent = `
    @keyframes fade {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .char {
      animation: fade 3s ease-in-out infinite;
    }
  `
  document.head.appendChild(style)

  // 不替换 Vue 的挂载容器，而是插入到 body 最后
  document.body.insertAdjacentHTML('beforeend', loading)

  // 返回一个函数，用于移除加载动画
  // return () => {
  //   const loadingElement = document.getElementById('global-loading')

  //   if (loadingElement) {
  //     loadingElement.remove()
  //   }
  // }

  //  获取 #app 元素
  const appElement = document.getElementById('app')

  // 如果 #app 存在，则移除它
  if (appElement) {
    const loadingElement = document.getElementById('global-loading')

    if (loadingElement) {
      setTimeout(() => {
        loadingElement.remove()
      }, 300)
    }
  }
}
