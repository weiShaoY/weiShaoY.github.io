/**
 *  unhead 通用文档 <head> 标签管理器
 *  @see  https://github.com/unjs/unhead
 */
import { useHead } from 'unhead'

/**
 * 设置页面头部信息
 * @param title 页面标题
 * @param options 页面头部的其他元信息
 * @param options.name 元信息的名称属性
 * @param options.content 元信息的内容属性
 */
export function setHead(
  /**
   *  页面标题
   */
  title: string,
  options: {

    /**
     *  元信息的名称属性
     */
    name?: string

    /**
     *  元信息的内容属性
     */
    content?: string
  } = {
  },
): void {
  const { name = '', content = '' } = options

  useHead({
    title,
    meta: [
      {
        name,
        content,
      },
    ],
  })
}

export default setHead
