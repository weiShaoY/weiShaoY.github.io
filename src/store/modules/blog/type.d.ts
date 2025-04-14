// // 空间

// /**
//  * 代码模块类型定义
//  */
// declare namespace BlogType11 {

//   /**
//    * 布局类型定义
//    * @description 用于定义页面的布局方式，以适应不同的用户界面需求。常见的布局方式包括垂直布局、经典布局、横向布局以及多列布局。
//    */
//   export type LayoutType =

//   /**
//    * 垂直布局
//    * @description 将内容从上到下排列，适用于导航栏在页面左侧的布局。
//    */
//     | 'vertical'

//   /**
//    * 经典布局
//    * @description 采用常规的导航和内容布局，适用于大多数应用程序的标准界面。
//    */
//     | 'classic'

//   /**
//    * 横向布局
//    * @description 将内容横向排列，适用于横屏或宽屏设备，导航栏通常在页面顶部。
//    */
//     | 'transverse'

//   /**
//    * 多列布局
//    * @description 将内容分成多个列，以便同时展示更多信息，适合于数据密集型的应用程序。
//    */
//     | 'columns'

// /**
//  * 组件尺寸类型定义
//  * @description 用于指定组件的尺寸，适应不同的布局和界面需求。
//  */
// type AssemblySizeType =

//   /**
//    * 大尺寸
//    * @description 提供更大的组件尺寸，适用于小屏幕或触摸设备，以便于用户操作。
//    */
//   | 'large'

//   /**
//    * 默认尺寸
//    * @description 适用于大多数情况的标准组件尺寸。
//    */
//   | 'default'

//   /**
//    * 小尺寸
//    * @description 提供紧凑的组件尺寸，适用于内容较多、空间较小的界面。
//    */
//   | 'small'

//   type Global = {

//     /**
//      * 页面布局类型
//      */
//     layout: LayoutType
//     /**
//      * 组件大小
//      */
//     assemblySize: AssemblySizeType

//     /**
//      * 系统语言
//      */
//     language: LanguageType

//     /**
//      * 是否最大化窗口
//      */
//     maximize: boolean

//     /**
//      * 主题主色调
//      */
//     primary: string

//     /**
//      * 是否开启深色模式
//      */
//     isDark: boolean

//     /**
//      * 是否开启灰色模式
//      */
//     isGrey: boolean

//     /**
//      * 是否开启色弱模式
//      */
//     isWeak: boolean

//     /**
//      * 侧边栏颜色是否反转
//      */
//     asideInverted: boolean

//     /**
//      * 顶部导航栏颜色是否反转
//      */
//     headerInverted: boolean

//     /**
//      * 是否折叠侧边栏
//      */
//     isCollapse: boolean

//     /**
//      * 是否开启手风琴模式（仅展开一个面板）
//      */
//     accordion: boolean

//     /**
//      * 是否显示水印
//      */
//     watermark: boolean

//     /**
//      * 是否显示面包屑导航
//      */
//     breadcrumb: boolean

//     /**
//      * 是否在面包屑导航中显示图标
//      */
//     breadcrumbIcon: boolean

//     /**
//      * 是否显示标签页
//      */
//     tabs: boolean

//     /**
//      * 是否在标签页中显示图标
//      */
//     tabsIcon: boolean

//     /**
//      * 是否显示页脚
//      */
//     footer: boolean
//   }
// }

/**
 *  代码模块类型定义
 */
declare namespace BlogType1111 {

  /**
   *  标签属性类型
   */
  export type TagProps = {

    /**
     *  标签的标题
     */
    title: string

    /**
     *  标签的名称
     */
    name: string

    /**
     *  标签的完整路径
     */
    fullPath: string

    /**
     *  可选的查询参数
     */
    query?: any

    /**
     *  是否忽略缓存，默认值为 false
     */
    ignoreCache?: boolean
  }

  /**
   *  标签栏状态类型
   */
  export type TabBarState = {

    /**
     *  当前打开的标签列表
     */
    tagList: TagProps[]

    /**
     *  缓存的标签列表
     */
    cacheTabList: Set<string>
  }

}
