import type { Directive, DirectiveBinding } from 'vue'

function animateLines(el: HTMLElement, binding: DirectiveBinding) {
  // 获取文本内容，按换行符分割成多行
  const lines: string[] = (binding.value || el.textContent || '').split('\n')

  el.innerHTML = '' // 清空元素内容

  // 创建每一行的元素并隐藏
  const lineElements: HTMLElement[] = lines.map((line, index) => {
    const lineDiv = document.createElement('div')

    lineDiv.textContent = line
    lineDiv.style.opacity = '0' // 初始隐藏
    lineDiv.style.transform = 'translateY(-20px)' // 初始偏移位置，从上往下
    lineDiv.style.transition = 'opacity 0.6s ease, transform 0.6s ease' // 动画效果
    lineDiv.style.transitionDelay = `${index * 0.6}s` // 每行延迟 600ms
    return lineDiv
  })

  // 将行元素添加到目标元素
  lineElements.forEach(lineEl => el.appendChild(lineEl))

  // 使用 requestAnimationFrame 确保所有元素添加完毕后再开始动画
  requestAnimationFrame(() => {
    lineElements.forEach((lineEl) => {
      lineEl.style.opacity = '1' // 显示
      lineEl.style.transform = 'translateY(0)' // 恢复位置
    })
  })
}

/**
 * 逐行文字加载动画指令
 */
const useAnimatedText: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    animateLines(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    animateLines(el, binding)
  },
}

export default useAnimatedText
