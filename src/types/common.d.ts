/** 通用类型命名空间 */
declare namespace CommonType {

  /** 策略模式类型 */
  type StrategicPattern = {

    /** 条件判断 */
    condition: boolean

    /** 当条件为 true 时执行的回调函数 */
    callback: () => void
  }

  /** 是或否枚举 */
  type YesOrNo = 'Y' | 'N'

  /** 将对象所有属性转为可空类型 */
  type RecordNullable<T> = {
    [K in keyof T]?: T[K] | undefined;
  }

  /**
   * 通用选项类型
   * @template K 选项值的类型，默认为 string
   * @template T 扩展属性的类型，默认为 Record<string, unknown>
   * @property {K} value 选项值
   * @property {string} label 选项显示文本
   * @property {T} [扩展属性] 可选的额外属性
   */
  type Option<K = string, T extends Record<string, unknown> = Record<string, unknown>> = {

    /**
     *  选项值
     */
    value: K

    /**
     *  选项显示文本
     */
    label: string
  } & T
}
