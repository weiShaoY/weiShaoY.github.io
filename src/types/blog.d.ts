/**
 * 博客模块命名类型
 */
declare namespace BlogType {

  /**
   * Markdown 文件类型
   */
  type MdFile = {

    /**
     * 文件名称（不包含扩展名）
     */
    name: string

    /**
     * 文件内容
     */
    content: string

    /**
     * 类型标识，固定为 'file'
     */
    type: 'file'

    /**
     *  唯一键
     */
    key: string

    /**
     *  完整路径
     */
    fullPath: string
  }

  /**
   * 文件夹类型
   */
  type Folder = {

    /**
     * 文件夹名称
     */
    name: string

    /**
     * 子项数组，可以是文件夹或文件
     */
    children: Array<Folder | MdFile>

    /**
     * 类型标识，固定为 'folder'
     */
    type: 'folder'

    /**
     *  唯一键
     */
    key: string

    /**
     *  完整路径
     */
    fullPath: string
  }

  /**
   * 文件系统节点：文件夹或文件
   */
  type FileNode = Folder | MdFile

}
