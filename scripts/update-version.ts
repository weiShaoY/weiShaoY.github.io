// 引入 Node.js 的 Promise 版文件系统 API，用于异步读写文件
import fs from 'node:fs/promises'

// 匹配 index.html 中的 app-version meta 标签，用于判断是更新还是新增
const APP_VERSION_META_RE = /<meta\s+name="app-version"\s+content=".*?"\s*\/?>/

// 定位项目根目录下的 index.html；当前脚本在 scripts 目录，所以需要 ../
const INDEX_HTML_URL = new URL('../index.html', import.meta.url)

// 主函数：读取 index.html，写入最新版本时间戳
async function run() {
  // 使用当前时间戳作为版本号，保证每次运行都会生成不同值
  const version = Date.now().toString()

  // 读取 index.html 文件内容
  const content = await fs.readFile(INDEX_HTML_URL, 'utf8')

  // 生成新的 app-version meta 标签
  const meta = `<meta name="app-version" content="${version}" />`

  // 如果已存在 app-version，则替换；否则插入到 <head> 后面
  const nextContent = APP_VERSION_META_RE.test(content)
    ? content.replace(APP_VERSION_META_RE, meta)
    : content.replace('<head>', `<head>\n    ${meta}`)

  // 把更新后的 HTML 内容写回 index.html
  await fs.writeFile(INDEX_HTML_URL, nextContent, 'utf8')

  // 输出执行结果
  console.log('✅ 版本已更新')
}

// 执行主函数
run()
