import type { App } from 'vue'

import ElementPlus, { ElCard, ElTable } from 'element-plus'

// import 'element-plus/dist/index.css'

// import 'element-plus/theme-chalk/dark/css-vars.css'

/**
 * 组件默认配置
 */
const COMPONENT_CONFIG = {
  /**
   * 表格配置
   */
  table: {
    /**
     * 列对齐方式
     */
    align: 'center',
  },

  /**
   * 卡片配置
   */
  card: {
    /**
     * 阴影效果
     */
    shadow: 'never',
  },
} as const

/**
 * 配置 Element Plus 组件默认属性
 * @description 设置表格和卡片的全局默认配置
 */
function setupComponentDefaults(): void {
  // 配置表格列对齐方式
  ElTable.TableColumn.props.align = {
    /**
     * 属性类型
     */
    type: String,

    /**
     * 默认值
     */
    default: COMPONENT_CONFIG.table.align,
  }

  // 配置卡片阴影效果
  ElCard.props.shadow = {
    /**
     * 属性类型
     */
    type: String,

    /**
     * 默认值
     */
    default: COMPONENT_CONFIG.card.shadow,
  }
}

/**
 * 安装并配置 Element Plus 组件库
 * @description 设置组件默认配置并安装 Element Plus
 * @param app - Vue 应用实例
 * @throws {Error} 当初始化失败时抛出错误
 */
export function setupUI(app: App<Element>): void {
  try {
    // 设置组件默认配置
    setupComponentDefaults()

    // 安装 Element Plus
    app.use(ElementPlus)
  }
  catch (error) {
    console.error('Element Plus 初始化失败:', error)
    throw error
  }
}
