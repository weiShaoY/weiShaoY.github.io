import type { DirectiveBinding } from 'vue'

/**
 * 自定义指令: v-light-card
 */
const useLightCard = {
  beforeMount(el: any, binding: DirectiveBinding) {
    const option = binding.value || {}

    // 生成光源元素
    const lightRef = document.createElement('div')

    lightRef.style.position = 'absolute'

    // 初始状态隐藏光源
    lightRef.style.display = 'none'

    // 禁止光源的鼠标事件

    lightRef.style.pointerEvents = 'none'
    const setLightStyle = () => {
      const { width = 60, height = 60, color = '#ff4132', blur = 40 } = option.light ?? {}

      lightRef.style.width = `${width}px`
      lightRef.style.height = `${height}px`
      lightRef.style.background = color
      lightRef.style.filter = `blur(${blur}px)`

      // 确保光源不会重复添加
      if (!el.contains(lightRef)) {
        // 确保父元素的定位
        el.style.position = 'relative'
        el.appendChild(lightRef)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      const { x, y, width: boxWidth, height: boxHeight } = el.getBoundingClientRect()

      const { width: lightWidth, height: lightHeight } = lightRef.getBoundingClientRect()

      // 计算光源的相对位置
      let left = clientX - x - lightWidth / 2

      let top = clientY - y - lightHeight / 2

      // 限制光源位置，确保不会超出盒子的边界
      const maxLeft = boxWidth - lightWidth

      const maxTop = boxHeight - lightHeight

      left = Math.max(0, Math.min(left, maxLeft))
      top = Math.max(0, Math.min(top, maxTop))

      // 设置光源的位置
      lightRef.style.left = `${left}px`
      lightRef.style.top = `${top}px`

      // 显示光源
      lightRef.style.display = 'block'
    }

    /**
     *   鼠标进入时显示光源
     */
    const onMouseEnter = () => {
      lightRef.style.display = 'block'
    }

    /**
     *  鼠标离开时隐藏光源
     */
    const onMouseLeave = () => {
      lightRef.style.display = 'none'
    }

    // 设置光源样式
    setLightStyle()

    // 绑定事件
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)

    // 将事件处理器和光源元素保存到 DOM 元素上，便于在卸载时清理
    el._lightCardHandlers = { onMouseMove, onMouseLeave, onMouseEnter, lightRef }
  },
  unmounted(el: any) {
    const handlers = el._lightCardHandlers

    if (handlers) {
      const { onMouseMove, onMouseLeave, onMouseEnter, lightRef } = handlers

      // 移除事件监听器
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)

      // 移除光源元素
      if (lightRef && el.contains(lightRef)) {
        el.removeChild(lightRef)
      }

      // 清理引用
      delete el._lightCardHandlers
    }
  },
}

export default useLightCard
