/**
 * 将图片文件转换为 Base64 格式
 * @param  file - 图片文件对象
 * @returns  返回 Promise 对象
 */
export function imageFileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

/**
 * 将图片 URL 转换为 Base64 格式
 * @param  url - 图片 URL
 * @returns  返回 Promise 对象
 */
export async function imageUrlToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`图片加载失败，状态码: ${response.status}`)
    }

    const blob = await response.blob()

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        }
        else {
          reject(new Error('转换失败，结果不是字符串'))
        }
      }

      reader.onerror = () => {
        reject(new Error('文件读取失败'))
      }

      reader.readAsDataURL(blob)
    })
  }
  catch (error) {
    console.error('urlToBase64 错误:', error)
    throw error // Re-throw the error to allow calling code to handle it
  }
}
