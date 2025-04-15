import type { RouteRecordRaw } from 'vue-router'

import { TEST_BASE_LAYOUT } from '@/layouts'

import { formatModules } from '../../utils/index'

/**
 *  获取当前文件名
 */
const currentFileName = import.meta.url.split('/').pop() || ''

/**
 *  获取同级目录下除当前文件外的所有 .ts 文件
 *  @description  使用 eager: true 同步导入模块并过滤当前文件
 */
const modules = Object.fromEntries(
  Object.entries(
    import.meta.glob('./*.ts', {
      eager: true,
    }),
  ).filter(([path]) => {
    /**
     *  排除当前文件
     */
    return !path.endsWith(`/${currentFileName}`)
  }),
)

/**
 * 代码模块 所有子路由格式化后的数组
 * @constant
 * @description 通过调用 `formatModules` 函数格式化模块化路由，并排除当前文件，以便生成代码模块的子路由列表。
 */
const testRouterList = formatModules(modules, []) as any

/**
 *  testRouter (代码模块路由)
 */
const testRouter: RouteRecordRaw[] = [
  {
    path: '/test',
    name: 'Test',
    redirect: import.meta.env.VITE_ROUTER_BLOG_HOME_PATH,
    component: TEST_BASE_LAYOUT,
    children: [...testRouterList],
  },
]

export default testRouter

export {
  testRouterList,
}

console.log('%c Line:55 🌽 testRouterList', 'color:#7f2b82', testRouterList)
