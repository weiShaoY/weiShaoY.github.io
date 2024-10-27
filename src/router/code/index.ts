import { formatModules } from '../utils'

/**
 * 获取同级目录下除当前文件外的所有 .ts 文件
 */
const modules = Object.fromEntries(
  Object.entries(import.meta.glob('./*.ts', {
    eager: true,
  }))
    .filter(([path]) => !path.includes(import.meta.url)),
)

/**
 * 生成代码模块路由
 */
const codeRoutes = formatModules(modules, [])

export {

  codeRoutes,

}
