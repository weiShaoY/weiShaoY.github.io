/**
 *  组件类型
 */
declare namespace ComponentType {

  /**
   *  表格类型
   */
  namespace TableType {

    /**
     *  列选项类型
     */
    export type ColumnType<T = any> = {

      /**  列类型  */
      type?: 'selection' | 'expand' | 'index' | 'globalIndex'

      /**  列属性名  */
      prop?: string

      /**  列标题  */
      label?: string

      /**  列宽度  */
      width?: string | number

      /**  最小列宽度  */
      minWidth?: string | number

      /**  固定列  */
      fixed?: boolean | 'left' | 'right'

      /**  是否可排序  */
      sortable?: boolean

      /**  过滤器选项  */
      filters?: any[]

      /**  过滤方法  */
      filterMethod?: (value: any, row: any) => boolean

      /**  过滤器位置  */
      filterPlacement?: string

      /**  是否禁用  */
      disabled?: boolean

      /**  是否选中显示（可用于隐藏列）  */
      checked?: boolean

      /**  自定义渲染函数  */
      formatter?: (row: T) => any

      /**  插槽相关配置  */
      useSlot?: boolean

      /**  插槽名称（默认为 prop 值）  */
      slotName?: string

      /**  是否使用表头插槽  */
      useHeaderSlot?: boolean

      /**  表头插槽名称（默认为 `${prop}-header`）  */
      headerSlotName?: string

      /**  其他属性  */
      [key: string]: any
    }

    /**  分页配置  */
    export type PaginationType = {

      /**  当前页  */
      currentPage: number

      /**  每页条数  */
      pageSize: number

      /**  总条数  */
      total: number

      /**  每页显示个数选择器的选项  */
      pageSizes?: number[]

      /**  组件布局  */
      layout?: string

      /**  是否为小型分页  */
      small?: boolean
    }

    /**
     *  表格大小枚举
     */
    export enum SizeEnum {
      DEFAULT = 'default',
      SMALL = 'small',
      LARGE = 'large',
    }

  }

}
