// 定义更详细的类型
type MarkdownContent = { default: string } | string

type MarkdownFile = {
  name: string
  content: string
  type: 'file'
}

type FolderStructure = {
  name: string
  children: Array<FolderStructure | MarkdownFile>
  type: 'folder'
}

type FileSystemItem = FolderStructure | MarkdownFile

// 类型守卫函数
function isFolderStructure(item: FileSystemItem): item is FolderStructure {
  return 'children' in item
}

/**
 * 将 glob 导入转换为文件结构（优化版）
 */
export function transformMarkdownFiles(files: Record<string, MarkdownContent>): FolderStructure[] {
  const result: FolderStructure[] = []

  for (const [filePath, content] of Object.entries(files)) {
    // 处理文件路径
    const pathParts = filePath.split('/').filter(part => part && part !== '.')

    // 移除 models 和 .md 后缀
    if (pathParts[0] === 'models') {
      pathParts.shift()
    }

    const fileNameWithExt = pathParts.pop()

    if (!fileNameWithExt) {
      continue
    }

    const fileName = fileNameWithExt.replace(/\.md$/, '')

    const fileContent = typeof content === 'string' ? content : content.default

    // 递归构建文件夹结构
    buildFolderStructure(result, pathParts, {
      name: fileName,
      content: fileContent,
      type: 'file',
    })
  }

  return result
}

/**
 * 递归构建文件夹结构
 */
function buildFolderStructure(
  currentLevel: FileSystemItem[],
  pathParts: string[],
  file: MarkdownFile,
): void {
  if (pathParts.length === 0) {
    // 到达目标层级，添加文件
    currentLevel.push(file)
    return
  }

  const [currentFolderName, ...remainingPath] = pathParts

  // 查找或创建当前层级的文件夹
  let folder = currentLevel.find((item): item is FolderStructure =>
    isFolderStructure(item) && item.name === currentFolderName,
  )

  if (!folder) {
    folder = {
      name: currentFolderName,
      children: [],
      type: 'folder',
    }
    currentLevel.push(folder)
  }

  // 递归处理剩余路径
  buildFolderStructure(folder.children, remainingPath, file)
}
