// index.ts
import type { App } from 'vue'

export default async function directives(app: App) {
  // 项目是用 vite 创建，import.meta.glob 用于导入 /modules 下所有指令实现代码
  const files = import.meta.glob('./modules/*.ts')

  for (const key in files) {
    const file: any = await files[key]()

    if (file) {
      // 用文件名作为指令名 来注册指令
      const directiveName = key
        .replace('./modules/', '')
        .replace('.ts', '')

      app.directive(directiveName, file.default)
    }
  }
}

// 另外两种种写法

// export default {
//   install(app: any) {
//     // 使用 keyof typeof directives 来确保 key 是来自于 directives 的键类型
//     (Object.keys(directives) as Array<keyof typeof directives>).forEach((key) => {
//       app.directive(key, directives[key])
//     })
//   },
// }
// export default {
//   install(Vue: App) {
//     Vue.directive('lightCard', useLightCard)
//   },
// }
