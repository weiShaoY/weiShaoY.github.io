/**
 * 使用 `<a>` 标签下载文件，并动态设置文件名和扩展名
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

  // 如果没有有效扩展名，添加默认扩展名 .jpg
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
