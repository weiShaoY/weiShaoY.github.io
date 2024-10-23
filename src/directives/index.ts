// src/directives/index.ts

import useLightCard from './use-light-card'

// 创建一个对象来存放所有指令
const directives = {
  lightCard: useLightCard,

}

/**
 *  注册自定义指令
 */
export default {
  install(app: any) {
    // 使用 keyof typeof directives 来确保 key 是来自于 directives 的键类型
    (Object.keys(directives) as Array<keyof typeof directives>).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}

// 另一种写法
// export default {
//   install(Vue: App) {
//     Vue.directive('lightCard', useLightCard)
//   },
// }
