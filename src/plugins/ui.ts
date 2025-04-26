import type { App } from 'vue'

import ElementPlus, { ElCard, ElTable } from 'element-plus'

import TDesign from 'tdesign-vue-next'

/**
 * 全局配置表格列对齐方式
 * 默认所有 TableColumn 组件居中对齐
 */
ElTable.TableColumn.props.align = {
  type: String,
  default: 'center', // 默认值从 'left' 改为 'center'
}

/**
 * 全局配置卡片阴影效果
 * 默认禁用所有 Card 组件的阴影效果
 */
ElCard.props.shadow = {
  type: String,
  default: 'never', // 可选值: always / hover / never
}

/**
 * 安装 Element Plus 组件库
 * @param app - Vue 应用实例
 */
export function setupUI(app: App<Element>) {
  // 全量引入 Element Plus 组件
  app.use(ElementPlus)

  // 注意：这里使用的是全量导入
  // 如需按需导入，建议使用 unplugin-element-plus 等插件

  // 全量引入 TDesign 组件
  app.use(TDesign)
}
