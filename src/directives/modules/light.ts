import type { Directive, DirectiveBinding } from 'vue'

export type UseLightParamsType = {

  /**
   *  宽
   */
  width?: number

  /**
   *  高
   */
  height?: number

  /**
   *  颜色
   */
  color?: string

  /**
   *   模糊
   */
  blur?: number

  /**
   *  是否旋转
   */
  rotate?: boolean
}

/**
 * 光源卡片指令，用于在绑定元素上添加光源效果
 * @param {HTMLElement} lightDom - 绑定的元素
 * @param {DirectiveBinding} option - 指令绑定的参数对象
 */
function setLightStyle(lightDom: HTMLElement, option: UseLightParamsType) {
  const { width = 60, height = 60, color = '#ffffff', blur = 40 } = option ?? {
  }

  lightDom.style.position = 'absolute'
  lightDom.style.width = `${width}px`
  lightDom.style.height = `${height}px`
  lightDom.style.background = color
  lightDom.style.filter = `blur(${blur}px)`
}

/**
 * 设置卡片的 overflow 为 hidden
 * @param {HTMLElement} el - 绑定的元素
 */
function setCardOverflowHidden(el: HTMLElement) {
  el.dataset.overflow = el.style.overflow
  el.style.overflow = 'hidden'
}

/**
 * 还原卡片的 overflow
 * @param {HTMLElement} el - 绑定的元素
 */
function restoreCardOverflow(el: HTMLElement) {
  if (el.dataset.overflow) {
    el.style.overflow = el.dataset.overflow
  }
}

/**
 * 光源跟随鼠标移动
 * @param {MouseEvent} e - 鼠标事件
 * @param {HTMLElement} el - 绑定的元素
 * @param {HTMLElement} lightDom - 光源元素
 */
function onMouseMove(e: MouseEvent, el: HTMLElement, lightDom: HTMLElement, rotate: boolean) {
  const { clientX, clientY } = e

  const { x, y } = el.getBoundingClientRect()

  const { width, height } = lightDom.getBoundingClientRect()

  lightDom.style.left = `${clientX - x - width / 2}px`

  lightDom.style.top = `${clientY - y - height / 2}px`

  if (!rotate) {
    return
  }

  // 设置旋转效果的参数

  /**
   *  X 轴最大旋转角度
   */
  const maxXRotation = 10

  /**
   *  Y 轴最大旋转角度
   */
  const maxYRotation = 10

  /**
   *  X 轴移动范围的半径
   */
  const rangeX = el.clientWidth / 2

  /**
   *  Y 轴移动范围的半径
   */
  const rangeY = el.clientHeight / 2

  // 计算旋转角度，根据鼠标位置相对于卡片中心的距离来计算

  /**
   *   X 轴旋转角度
   */
  const rotateY = 1 * (((clientX - x - rangeX) / rangeX) * maxXRotation)

  /**
   *   Y 轴旋转角度
   */
  const rotateX = -1 * (((clientY - y - rangeY) / rangeY) * maxYRotation)

  // 设置平滑的过渡效果，0.2s 过渡时间和缓动效果
  el.style.transition = 'transform 0.2s ease-out'

  // 设置卡片的旋转中心和 3D 旋转效果
  el.style.transformOrigin = 'center center'
  el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

/**
 * 光源卡片指令，用于在绑定元素上添加光源效果
 */
const useLight: Directive = {
  mounted<T extends HTMLElement>(el: T, binding: DirectiveBinding<UseLightParamsType>) {
    const lightDom = document.createElement('div')

    setLightStyle(lightDom, binding.value ?? {
    })

    // 确保光源元素不会阻挡鼠标事件
    lightDom.style.pointerEvents = 'none'

    /**
     *   是否旋转
     *   默认为 true
     */
    const rotate = binding.value?.rotate ?? true

    const onMouseEnter = () => {
      setCardOverflowHidden(el)
      el.appendChild(lightDom)
    }

    const onMouseLeave = () => {
      el.removeChild(lightDom)
      restoreCardOverflow(el)
      el.style.transform = ''
    }

    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mousemove', (e: MouseEvent) => onMouseMove(e, el, lightDom, rotate))
    el.addEventListener('mouseleave', onMouseLeave);

    // 类型断言，避免报错
    (el as any)._lightCardCleanup = () => {
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mousemove', (e: MouseEvent) => onMouseMove(e, el, lightDom, rotate))
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  },

  unmounted<T extends HTMLElement>(el: T) {
    (el as any)._lightCardCleanup?.()
  },
}

export default useLight
