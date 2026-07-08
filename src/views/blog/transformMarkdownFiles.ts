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
      label: fileName,
      content: fileContent,
      fileType: 'markdown',
      id: '',
      fullPath: '', // 初始化完整路径
    }, '')
  }

  // 为所有节点分配 key 和完整路径
  assignKeysAndPaths(result)
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
    const fileFullPath = parentPath ? `${parentPath}/${file.label}` : file.label

    currentLevel.push({
      ...file,
      fullPath: fileFullPath, // 设置文件的完整路径
    })
    return
  }

  const [currentFolderName, ...remainingPath] = pathParts

  const currentPath = parentPath ? `${parentPath}/${currentFolderName}` : currentFolderName

  // 查找或创建当前层级的文件夹
  let folder = currentLevel.find((item): item is BlogType.Folder =>
    isFolderStructure(item) && item.label === currentFolderName,
  )

  if (!folder) {
    folder = {
      label: currentFolderName,
      children: [],
      fileType: 'folder',
      id: currentPath,
      fullPath: currentPath, // 设置文件夹的完整路径
    }
    currentLevel.push(folder)
  }

  // 递归处理剩余路径
  buildFolderStructure(folder.children, remainingPath, file, currentPath)
}

/**
 * 为所有节点分配唯一的 key 和完整路径
 */
function assignKeysAndPaths(nodes: BlogType.FileNode[], parentKey: string = ''): void {
  nodes.forEach((node, index) => {
    const currentKey = parentKey ? `${parentKey}-${index + 1}` : `${index + 1}`

    if (isFolderStructure(node)) {
      // 文件夹节点
      node.id = currentKey

      // 如果还没有完整路径，根据父路径生成
      if (!node.fullPath) {
        const parentPath = parentKey.split('-')
          .slice(0, -1)
          .join('/')

        node.fullPath = parentPath ? `${parentPath}/${node.label}` : node.label
      }

      // 递归为子节点分配 key 和路径
      assignKeysAndPaths(node.children, currentKey)
    }
    else {
      // 文件节点
      node.id = currentKey

      // 如果还没有完整路径，根据父路径生成
      if (!node.fullPath) {
        const parentPath = parentKey.split('-')
          .slice(0, -1)
          .join('/')

        node.fullPath = parentPath ? `${parentPath}/${node.label}` : node.label
      }
    }
  })
}
