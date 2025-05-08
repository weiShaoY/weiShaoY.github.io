/**
 * 使用 `<a>` 标签下载图片文件，并动态设置文件名和扩展名
 * @param url - 图片文件的 URL
 * @param [defaultName] - 默认文件名（无文件名时使用）
 * @param [options] - 额外选项
 * @param [options.forceDownload] - 是否强制下载（即使有CORS问题）
 * @param [options.checkImageType] - 是否检查返回的Blob是否为图片类型（默认true）
 */
export function downloadImage(
  url: string,
  defaultName = 'downloaded_image',
  options: { forceDownload?: boolean, checkImageType?: boolean } = {
    checkImageType: true,
  },
): Promise<void> {
  return new Promise((resolve, reject) => {
    // 从 URL 中解析文件名
    const urlParts = url.split('/')

    let fileNameWithExtension = urlParts[urlParts.length - 1] || defaultName

    // 去除查询参数和哈希
    fileNameWithExtension = fileNameWithExtension.split('?')[0].split('#')[0]

    // 支持的图片扩展名
    const validExtensions = [
      '.png',
      '.jpg',
      '.jpeg',
      '.webp',
      '.gif',
      '.bmp',
      '.svg',
    ]

    const lowerCaseName = fileNameWithExtension.toLowerCase()

    // 检查是否有有效扩展名
    const hasValidExtension = validExtensions.some(ext =>
      lowerCaseName.endsWith(ext),
    )

    // 如果没有有效扩展名，添加默认扩展名 .jpg
    const filename = hasValidExtension
      ? fileNameWithExtension
      : `${fileNameWithExtension}.jpg`

    // 处理CORS问题的备用方案
    const handleCorsFallback = () => {
      if (options.forceDownload) {
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
          title: '图片下载已尝试',
          message: '由于CORS限制，浏览器可能阻止了直接下载，请检查下载列表',
        })
        resolve()
      }
      else {
        const error = new Error('跨域资源无法直接下载，请联系管理员配置CORS')

        window.$notification?.error({
          title: '图片下载失败',
          message: error.message,
        })
        reject(error)
      }
    }

    // 尝试通过fetch获取
    fetch(url, {
      mode: 'cors',
      headers: {
        Accept: 'image/*', // 明确请求图片类型
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.blob()
      })
      .then((blob) => {
        // 检查blob类型是否为图片
        if (
          options.checkImageType !== false
          && !blob.type.startsWith('image/')
          && !blob.type.startsWith('application/octet-stream')
        ) {
          throw new Error('下载的内容不是图片文件')
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
          title: '图片下载成功',
          message: `下载文件为: ${filename}`,
        })
        resolve()
      })
      .catch((err) => {
        console.error('图片下载错误:', err)
        if (
          err.message.includes('Failed to fetch')
          || err.message.includes('CORS')
        ) {
          handleCorsFallback()
        }
        else {
          window.$notification?.error({
            title: '图片下载失败',
            message: `下载文件失败：${err.message}`,
          })
          reject(err)
        }
      })
  })
}

/**
 * 使用 `<a>` 标签下载视频文件，并动态设置文件名和扩展名
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
): Promise<void> {
  return new Promise((resolve, reject) => {
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

    // 如果没有有效扩展名，添加默认扩展名 .mp4
    const filename = hasValidExtension
      ? fileNameWithExtension
      : `${fileNameWithExtension.split('?')[0]}.mp4`

    // 处理CORS问题的备用方案
    const handleCorsFallback = () => {
      if (options.forceDownload) {
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
          message: '由于CORS限制，浏览器可能阻止了直接下载，请检查下载列表',
        })
        resolve()
      }
      else {
        const error = new Error('跨域资源无法直接下载，请联系管理员配置CORS')

        window.$notification?.error({
          title: '视频下载失败',
          message: error.message,
        })
        reject(error)
      }
    }

    // 尝试通过fetch获取
    fetch(url, {
      mode: 'cors',
      headers: {
        Range: 'bytes=0-',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.blob()
      })
      .then((blob) => {
        if (
          !blob.type.startsWith('video/')
          && !blob.type.startsWith('application/octet-stream')
        ) {
          throw new Error('下载的内容不是视频文件')
        }

        const blobUrl = URL.createObjectURL(blob)

        const link = document.createElement('a')

        link.href = blobUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()

        setTimeout(() => {
          URL.revokeObjectURL(blobUrl)
          document.body.removeChild(link)
        }, 100)

        window.$notification?.success({
          title: '视频下载成功',
          message: `下载文件为: ${filename}`,
        })
        resolve()
      })
      .catch((err) => {
        console.error('视频下载错误:', err)
        if (
          err.message.includes('Failed to fetch')
          || err.message.includes('CORS')
        ) {
          handleCorsFallback()
        }
        else {
          window.$notification?.error({
            title: '视频下载失败',
            message: `下载文件失败：${err.message}`,
          })
          reject(err)
        }
      })
  })
}

/**
 * 使用 `<a>` 标签下载音频文件，并动态设置文件名和扩展名
 * @param url - 音频文件的 URL
 * @param [defaultName] - 默认文件名（无文件名时使用）
 * @param [options] - 额外选项
 * @param [options.forceDownload] - 是否强制下载（即使有CORS问题）
 * @param [options.checkAudioType] - 是否检查返回的Blob是否为音频类型（默认true）
 */
export function downloadAudio(
  url: string,
  defaultName = 'downloaded_audio',
  options: { forceDownload?: boolean, checkAudioType?: boolean } = {
    checkAudioType: true,
  },
): Promise<void> {
  return new Promise((resolve, reject) => {
    // 从 URL 中解析文件名
    const urlParts = url.split('/')

    let fileNameWithExtension = urlParts[urlParts.length - 1] || defaultName

    // 去除查询参数和哈希
    fileNameWithExtension = fileNameWithExtension.split('?')[0].split('#')[0]

    // 支持的音频扩展名
    const validExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac']

    const lowerCaseName = fileNameWithExtension.toLowerCase()

    // 检查是否有有效扩展名
    const hasValidExtension = validExtensions.some(ext =>
      lowerCaseName.endsWith(ext),
    )

    // 如果没有有效扩展名，添加默认扩展名 .mp3
    const filename = hasValidExtension
      ? fileNameWithExtension
      : `${fileNameWithExtension}.mp3`

    // 处理CORS问题的备用方案
    const handleCorsFallback = () => {
      if (options.forceDownload) {
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
          title: '音频下载已尝试',
          message: '由于CORS限制，浏览器可能阻止了直接下载，请检查下载列表',
        })
        resolve()
      }
      else {
        const error = new Error('跨域资源无法直接下载，请联系管理员配置CORS')

        window.$notification?.error({
          title: '音频下载失败',
          message: error.message,
        })
        reject(error)
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
        // 检查blob类型是否为音频
        if (
          options.checkAudioType !== false
          && !blob.type.startsWith('audio/')
          && !blob.type.startsWith('application/octet-stream')
        ) {
          throw new Error('下载的内容不是音频文件')
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
          title: '音频下载成功',
          message: `下载文件为: ${filename}`,
        })
        resolve()
      })
      .catch((err) => {
        console.error('音频下载错误:', err)
        if (
          err.message.includes('Failed to fetch')
          || err.message.includes('CORS')
        ) {
          handleCorsFallback()
        }
        else {
          window.$notification?.error({
            title: '音频下载失败',
            message: `下载文件失败：${err.message}`,
          })
          reject(err)
        }
      })
  })
}

/**
 * 将 canvas 元素导出为图片并下载
 * @param  canvas 要下载的 canvas 元素
 * @param filename 下载保存的文件名
 */
export function downloadCanvasAsImage(
  canvas: HTMLCanvasElement,
  filename = 'downloaded_image.png',
) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error('传入的对象不是 HTMLCanvasElement！')
    return
  }

  try {
    const link = document.createElement('a')

    link.href = canvas.toDataURL('image/png')
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.$notification?.success({
      title: '图片下载成功',
      message: `下载文件为: ${filename}`,
    })
  }
  catch (err) {
    window.$notification?.error({
      title: '图片下载失败',
      message: `下载文件失败：${(err as Error).message}`,
    })
  }
}
