/** 通用类型命名空间 */
declare namespace CommonType {

  /** 策略模式类型 */
  type StrategicPattern = {

    /** 条件判断 */
    condition: boolean

    /** 当条件为 true 时执行的回调函数 */
    callback: () => void
  }

  /**
   * 选项类型
   *
   * @property value 选项值
   * @property label 选项显示文本
   */
  type Option<K = string> = { value: K, label: string }

  /** 是或否枚举 */
  type YesOrNo = 'Y' | 'N'

  /** 将对象所有属性转为可空类型 */
  type RecordNullable<T> = {
    [K in keyof T]?: T[K] | undefined;
  }
}
