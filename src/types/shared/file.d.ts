/**
 * 文件类型
 */
declare namespace FileType {

  /**
   * 图片 MIME 类型
   * 定义了常见的图片文件类型及其对应的 MIME 类型字符串。
   * 这些类型可以用于文件上传、下载或其他文件处理场景。
   */
  type ImageType
    = | 'image/apng' // APNG 动画图片
      | 'image/bmp' // BMP 位图图片
      | 'image/gif' // GIF 动画图片
      | 'image/jpeg' // JPEG 图片
      | 'image/pjpeg' // 渐进式 JPEG 图片
      | 'image/png' // PNG 图片
      | 'image/svg+xml' // SVG 矢量图片
      | 'image/tiff' // TIFF 图片
      | 'image/webp' // WebP 图片
      | 'image/x-icon' // ICO 图标文件

  /**
   * Excel 文件 MIME 类型
   * 定义了 Excel 文件及其对应的 MIME 类型字符串。
   * 这些类型通常用于处理 Excel 文件的上传、下载或解析。
   */
  type ExcelType
    = | 'application/vnd.ms-excel' // 旧版 Excel 文件（.xls）
      | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // 新版 Excel 文件（.xlsx）
}
