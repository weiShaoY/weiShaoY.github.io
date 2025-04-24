/**
 * 使用 `<a>` 标签下载文件,并动态设置文件名和扩展名
 * @param url - 文件的 URL
 * @param [defaultName] - 默认文件名（无文件名时使用）
 */
export function downloadImage(url: string, defaultName = 'downloaded_file') {
  console.log('%c Line:9 🍕 url', 'color:#6ec1c2', url)

  // try {
  //   // 从 URL 中解析文件名
  const urlParts = url.split('/')

  const fileNameWithExtension = urlParts[urlParts.length - 1] || defaultName

  // 确保文件名具有有效扩展名
  const validExtensions = ['.png', '.jpg', '.jpeg']

  const lowerCaseName = fileNameWithExtension.toLowerCase()

  const hasValidExtension = validExtensions.some(ext =>
    lowerCaseName.endsWith(ext),
  )

  // 如果没有有效扩展名,添加默认扩展名 .jpg
  const filename = hasValidExtension
    ? fileNameWithExtension
    : `${fileNameWithExtension}.jpg`

  fetch(url)
    .then(response => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(new Blob([blob]))

      const link = document.createElement('a')

      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(blobUrl)
      link.remove()
      window.$notification?.success({
        title: '图片下载成功',
        message: `下载文件为: ${filename}`,
      })
    })
    .catch((err) => {
      window.$notification?.error({
        title: '文件下载失败',
        message: `下载文件失败： ${err}`,
      })
    })
}

/**
 *  下载视频
 */
/**
 * 使用 `<a>` 标签下载视频文件,并动态设置文件名和扩展名
 * @param url - 视频文件的 URL
 * @param [defaultName] - 默认文件名（无文件名时使用）
 * @param [options] - 额外选项
 * @param [options.forceDownload] - 是否强制下载（即使有CORS问题）
 */
export function downloadVideo(
  url: string,
  defaultName = 'downloaded_video',
  options: { forceDownload?: boolean } = {
  },
) {
  console.log('%c Line:9 🎥 video url', 'color:#6ec1c2', url)

  // 从 URL 中解析文件名
  const urlParts = url.split('/')

  const fileNameWithExtension = urlParts[urlParts.length - 1] || defaultName

  // 支持的视频扩展名
  const validExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv']

  const lowerCaseName = fileNameWithExtension.toLowerCase()

  // 检查是否有有效扩展名
  const hasValidExtension = validExtensions.some(ext =>
    lowerCaseName.endsWith(ext),
  )

  // 如果没有有效扩展名,添加默认扩展名 .mp4
  const filename = hasValidExtension
    ? fileNameWithExtension
    : `${fileNameWithExtension.split('?')[0]}.mp4` // 去除查询参数

  // 处理CORS问题的备用方案
  const handleCorsFallback = () => {
    if (options.forceDownload) {
      // 直接创建链接下载（可能在某些浏览器中不工作）
      const link = document.createElement('a')

      link.href = url
      link.download = filename
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        document.body.removeChild(link)
      }, 100)

      window.$notification?.success({
        title: '视频下载已尝试',
        message: '由于CORS限制,浏览器可能阻止了直接下载,请检查下载列表',
      })
    }
    else {
      window.$notification?.error({
        title: '视频下载失败',
        message: '跨域资源无法直接下载,请联系管理员配置CORS',
      })
    }
  }

  // 尝试通过fetch获取
  fetch(url, {
    mode: 'cors',
    headers: {
      Range: 'bytes=0-', // 尝试获取部分内容
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.blob()
    })
    .then((blob) => {
      // 检查blob类型是否为视频
      if (!blob.type.startsWith('video/') && !blob.type.startsWith('application/octet-stream')) {
        throw new Error('下载的内容不是视频文件')
      }

      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')

      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()

      // 清理
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl)
        document.body.removeChild(link)
      }, 100)

      window.$notification?.success({
        title: '视频下载成功',
        message: `下载文件为: ${filename}`,
      })
    })
    .catch((err) => {
      console.error('视频下载错误:', err)
      if (err.message.includes('Failed to fetch') || err.message.includes('CORS')) {
        handleCorsFallback()
      }
      else {
        window.$notification?.error({
          title: '视频下载失败',
          message: `下载文件失败：${err.message}`,
        })
      }
    })
}
