import type { CallbackDataParams } from 'echarts/types/dist/shared'

export type ToolTipFormatterParams = {

  /**
   *  坐标轴维度
   */
  axisDim: string

  /**
   *  坐标轴索引
   */
  axisIndex: number

  /**
   *  坐标轴类型
   */
  axisType: string

  /**
   *   坐标轴 ID
   */
  axisId: string

  /**
   *   坐标轴值
   */
  axisValue: string

  /**
   *  坐标轴值的标签
   */
  axisValueLabel: string
} & CallbackDataParams
