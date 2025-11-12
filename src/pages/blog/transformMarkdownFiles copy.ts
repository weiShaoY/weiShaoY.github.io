/**
 * 类型守卫函数
 */
function isFolderStructure(item: BlogType.FileNode): item is BlogType.Folder {
  return 'children' in item
}

/**
 * 将 glob 导入转换为文件结构（优化版）
 */
export function transformMarkdownFiles(files: Record<string, { default: string } | string>): BlogType.Folder[] {
  const result: BlogType.Folder[] = []

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
      key: '',
      fullPath: filePath,
    }, '')
  }

  // 为所有节点分配 key
  assignKeys(result)
  return result
}

/**
 * 递归构建文件夹结构
 */
function buildFolderStructure(
  currentLevel: BlogType.FileNode[],
  pathParts: string[],
  file: BlogType.MdFile,
  parentPath: string,
): void {
  if (pathParts.length === 0) {
    // 到达目标层级，添加文件
    currentLevel.push(file)
    return
  }

  const [currentFolderName, ...remainingPath] = pathParts

  const currentPath = parentPath ? `${parentPath}/${currentFolderName}` : currentFolderName

  // 查找或创建当前层级的文件夹
  let folder = currentLevel.find((item): item is BlogType.Folder =>
    isFolderStructure(item) && item.name === currentFolderName,
  )

  if (!folder) {
    folder = {
      name: currentFolderName,
      children: [],
      type: 'folder',
      key: currentPath,
      fullPath: currentPath,
    }
    currentLevel.push(folder)
  }

  // 递归处理剩余路径
  buildFolderStructure(folder.children, remainingPath, file, currentPath)
}

/**
 * 为所有节点分配唯一的 key
 */
function assignKeys(nodes: BlogType.FileNode[], parentKey: string = ''): void {
  nodes.forEach((node, index) => {
    const currentKey = parentKey ? `${parentKey}-${index + 1}` : `${index + 1}`

    if (isFolderStructure(node)) {
      // 文件夹节点
      node.key = currentKey

      // 递归为子节点分配 key
      assignKeys(node.children, currentKey)
    }
    else {
      // 文件节点
      node.key = currentKey
    }
  })
}
