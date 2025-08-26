/**
 * 历史状态类型
 */
type HistoryState = any

/**
 * 历史记录管理类
 * @description 提供撤销/重做功能的状态管理
 * @description 支持状态的前进、后退和跳转操作
 * @description 维护过去、现在、未来三个状态数组
 * @description 适用于编辑器、画布等需要历史记录的场景
 */
export class CreateHistory {
  /**
   * 过去的状态数组
   * @description 存储已撤销的状态历史
   */
  public past: HistoryState[]

  /**
   * 未来的状态数组
   * @description 存储可重做的状态历史
   */
  public future: HistoryState[]

  /**
   * 当前状态
   * @description 当前正在使用的状态
   */
  public present: HistoryState | undefined

  /**
   * 构造函数
   * @description 初始化历史记录管理器
   */
  constructor() {
    this.past = [] // 过去的
    this.future = [] // 未来的
    this.present = undefined // 当前的
  }

  /**
   * 跳转到指定状态
   * @description 根据索引跳转到历史记录中的特定状态
   * @description 重新组织过去、现在、未来的状态数组
   * @param index - 目标状态的索引
   */
  gotoState(index: number): void {
    const allState = [...this.past, this.present, ...this.future]

    this.present = allState[index]
    this.past = allState.slice(0, index)
    this.future = allState.slice(index + 1, allState.length)
  }

  /**
   * 获取当前状态的索引
   * @description 返回当前状态在完整历史记录中的位置
   * @returns 当前状态的索引
   */
  getIndex(): number {
    return this.past.length
  }

  /**
   * 保存当前状态
   * @description 将当前状态推入历史记录
   * @description 清空未来状态数组（因为新的状态会改变历史）
   * @param currentState - 要保存的当前状态
   */
  push(currentState: HistoryState): void {
    // 将当前状态保存到过去数组中
    if (this.present) {
      this.past.push(this.present)
    }

    // 更新当前状态
    this.present = currentState

    // 清空未来状态（因为新的状态会改变历史）
    this.future = []
  }

  /**
   * 撤销操作
   * @description 回退到上一个状态
   * @description 将当前状态移到未来数组，从过去数组取出上一个状态
   */
  undo(): void {
    if (this.past.length !== 0) {
      this.gotoState(this.getIndex() - 1)
    }
  }

  /**
   * 重做操作
   * @description 前进到下一个状态
   * @description 将当前状态移到过去数组，从未来数组取出下一个状态
   */
  redo(): void {
    if (this.future.length !== 0) {
      this.gotoState(this.getIndex() + 1)
    }
  }

  /**
   * 检查是否可以撤销
   * @returns 是否可以执行撤销操作
   */
  canUndo(): boolean {
    return this.past.length > 0
  }

  /**
   * 检查是否可以重做
   * @returns 是否可以执行重做操作
   */
  canRedo(): boolean {
    return this.future.length > 0
  }

  /**
   * 清空历史记录
   * @description 重置所有状态数组，清空历史记录
   */
  clear(): void {
    this.past = []
    this.future = []
    this.present = undefined
  }

  /**
   * 获取历史记录长度
   * @returns 总的历史记录数量（包括过去、现在、未来）
   */
  getHistoryLength(): number {
    return this.past.length + (this.present ? 1 : 0) + this.future.length
  }
}
