import bridge from './image/bridge.png'

/**
 * 水波效果类
 * @class WaterRipple
 */
class WaterRipple {
  boxRef: HTMLElement | null = null
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  max_amplitude: number = 1024
  amplitude: number
  background: HTMLImageElement
  load: boolean = false
  img_data: ImageData | null = null
  new_img_data: ImageData | null = null
  animation_idx: number | null = null
  mousemove_interval: number
  ripple_radius: number
  bridge: HTMLImageElement
  buffer: number[]

  /**
   * 初始化 WaterRipple 类实例
   * @param {object} props - 参数对象
   * @param {HTMLElement} props.boxRef - 包含 canvas 的 HTML 元素
   * @param {HTMLCanvasElement} props.canvas - 渲染水波效果的 canvas 元素
   * @param {number} [props.amplitude] - 波纹的振幅
   * @param {number} [props.mousemove_interval] - 鼠标移动触发波纹的时间间隔
   * @param {number} [props.ripple_radius] - 波纹的半径
   * @param {HTMLImageElement} props.background - 背景
   */
  constructor(props: {
    boxRef: HTMLElement
    canvas: HTMLCanvasElement
    amplitude?: number
    mousemove_interval?: number
    ripple_radius?: number
    background: HTMLImageElement
  }) {
    this.canvas = props.canvas
    this.ctx = this.canvas.getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.amplitude = props.amplitude || 512
    this.background = props.background
    this.mousemove_interval = props.mousemove_interval || 50
    this.ripple_radius = props.ripple_radius || 3
    this.bridge = new Image()
    this.bridge.src = bridge

    this.buffer = Array.from({
      length: this.width * this.height,
    }, () => 0)

    if (props.boxRef) {
      this.boxRef = props.boxRef
      this.setResize()
    }
  }

  /**
   * 绘制背景图像
   */
  drawBackground() {
    if (!this.background.complete) {
      return
    }

    this.ctx.drawImage(this.background, 0, 0, this.width, this.height)
    this.img_data = this.ctx.getImageData(0, 0, this.width, this.height)
    this.new_img_data = this.ctx.getImageData(0, 0, this.width, this.height)
    this.load = true
  }

  /**
   * 渲染波纹效果
   */
  render() {
    if (!this.load) {
      this.drawBackground()
      return
    }

    const len = this.new_img_data!.data.length

    for (let i = 0; i < len; i += 4) {
      const x = (i / 4) % this.width

      const y = Math.floor((i / 4) / this.width)

      const buffer_idx = x + y * this.width

      let next_amplitude = 0

      // 计算相邻像素的波动
      if (x > 0) {
        next_amplitude += this.buffer[buffer_idx - 1]
      }

      if (x < this.width - 1) {
        next_amplitude += this.buffer[buffer_idx + 1]
      }

      if (y > 0) {
        next_amplitude += this.buffer[buffer_idx - this.width]
      }

      if (y < this.height - 1) {
        next_amplitude += this.buffer[buffer_idx + this.width]
      }

      next_amplitude = (next_amplitude >> 1) - this.buffer[buffer_idx]
      next_amplitude -= next_amplitude >> 5

      this.buffer[buffer_idx] = next_amplitude
      const ratio = (this.max_amplitude - next_amplitude) / this.max_amplitude

      if (next_amplitude !== 0) {
        const offset_x = Math.min(Math.max((x - this.width / 2) * ratio + this.width / 2, 0), this.width - 1)

        const offset_y = Math.min(Math.max((y - this.height / 2) * ratio + this.height / 2, 0), this.height - 1)

        const img_data_idx = (offset_y * this.width + offset_x) << 2

        this.new_img_data!.data[i] = this.img_data!.data[img_data_idx]
        this.new_img_data!.data[i + 1] = this.img_data!.data[img_data_idx + 1]
        this.new_img_data!.data[i + 2] = this.img_data!.data[img_data_idx + 2]
      }
    }

    this.ctx.putImageData(this.new_img_data!, 0, 0)
    this.ctx.drawImage(this.bridge, 0, this.height * 0.35, this.width, this.height * 0.65)
  }

  /**
   * 启动动画循环
   */
  animate() {
    const update = () => {
      this.render()
      this.animation_idx = requestAnimationFrame(update)
    }

    update()
  }

  /**
   * 鼠标波纹效果
   * @param {number} x - x 坐标
   * @param {number} y - y 坐标
   */
  ripple(x: number, y: number) {
    if (!this.load) {
      return
    }

    const left = Math.max(x - this.ripple_radius, 0)

    const right = Math.min(x + this.ripple_radius, this.width - 1)

    const top = Math.max(y - this.ripple_radius, 0)

    const bottom = Math.min(y + this.ripple_radius, this.height - 1)

    for (let i = left; i <= right; i++) {
      for (let j = top; j <= bottom; j++) {
        this.buffer[i + j * this.width] = this.amplitude
      }
    }
  }

  /**
   * 添加鼠标移动事件监听器
   */
  addMousemove() {
    this.canvas.addEventListener(
      'mousemove',
      this.throttle((e: MouseEvent) => {
        const { top, left } = this.canvas.getBoundingClientRect()

        this.ripple(Math.floor(e.clientX - left), Math.floor(e.clientY - top))
      }, this.mousemove_interval),
    )
  }

  /**
   * 节流函数
   * @param {Function} func - 需要节流的函数
   * @param {number} time - 时间间隔
   */
  throttle<T extends (...args: any[]) => void>(func: T, time: number): (...args: Parameters<T>) => void {
    let start = Date.now()

    return (...args: Parameters<T>): void => {
      const now = Date.now()

      if (now - start >= time) {
        start = now
        func(...args)
      }
    }
  }

  /**
   * 设置窗口大小变化的监听器
   */
  setResize() {
    window.addEventListener('resize', () => {
      if (this.boxRef) {
        const { offsetWidth, offsetHeight } = this.boxRef

        this.canvas.width = offsetWidth
        this.canvas.height = offsetHeight
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.load = false
      }
    })
  }

  /**
   * 停止动画
   */
  stop() {
    if (this.animation_idx !== null) {
      cancelAnimationFrame(this.animation_idx)
    }
  }

  /**
   * 恢复动画
   */
  resume() {
    this.animate()
  }
}

export default WaterRipple
