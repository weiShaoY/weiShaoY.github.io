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
