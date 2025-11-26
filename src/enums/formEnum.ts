/**
 * 表单相关枚举定义模块
 *
 * ## 主要功能
 *
 * - 页面模式枚举（新增、编辑）
 * - 表格尺寸枚举（默认、紧凑、宽松）
 *
 * @module enums/formEnum
 */

/**
 * 页面模式枚举（新增、编辑）
 */
export enum PageModeEnum {

  /** 新增 */
  Add, // 新增
  /** 编辑 */
  Edit, // 编辑
}

/**
 * 表格尺寸枚举（默认、紧凑、宽松）
 */
export enum TableSizeEnum {

  /** 默认尺寸 */
  DEFAULT = 'default',

  /** 紧凑尺寸 */
  SMALL = 'small',

  /** 宽松尺寸 */
  LARGE = 'large',
}
