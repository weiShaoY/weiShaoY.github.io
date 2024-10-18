import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

/**
 * UnoCSS 配置文件
 */
export default defineConfig({
/**
 * @description 定义全局主题设置，供规则或组件之间共享
 * @property {object} colors 配置颜色变量
 * @property {string} colors.primary 定义主色调为 #FEC451
 */
  theme: {
    colors: {
      primary: '#FEC451',
    },
  },

  /**
   * @description 预定义的样式快捷方式，可直接在模板中通过类名使用
   */
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['flex-center', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['text-ellipsis', 'truncate'],
  ],

  /**
   * @description 自定义生成 CSS 工具的规则，后定义的规则优先级更高
   * @example /^bc-(.+)$/ 将 `bc-颜色值` 转换为对应的 border-color 样式
   */
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
  ],

  /**
   * @description UnoCSS 使用的转换器，处理高级指令与变体组合
   */
  transformers: [
    /**
     * 支持 `@apply` 等指令的转换器
     * @see https://github.com/unocss/unocss#transformer-directives
     */
    transformerDirectives(),

    /**
     * 允许通过逗号分隔的语法同时应用多个变体
     * @see https://github.com/unocss/unocss#transformer-variantgroup
     */
    transformerVariantGroup(),
  ],

  /**
   * @description UnoCSS 使用的预设
   */
  presets: [
    /**
     * UnoCSS 的核心预设
     * @see https://github.com/unocss/unocss#preset-uno
     */
    presetUno(),

    /**
     * 属性化预设，允许通过 HTML 属性直接应用样式
     * @see https://github.com/unocss/unocss#preset-attributify
     */
    presetAttributify(),

    /**
     * 图标预设，支持通过类名插入 SVG 图标
     * @param {object} options - 预设选项
     * @param {number} options.scale - 图标的缩放比例
     * @see https://github.com/unocss/unocss#preset-icons
     */
    presetIcons({
      scale: 1.2,
    }),

    /**
     * 排版预设，提供优化的排版样式
     * @see https://github.com/unocss/unocss#preset-typography
     */
    presetTypography(),

    /**
     * Google Web Fonts 预设，自动生成 Web 字体相关的 CSS
     * @param {object} options - 预设字体配置
     * @param {object} options.fonts - 定义字体家族
     * @param {string} options.fonts.sans - 无衬线字体
     * @param {string} options.fonts.serif - 衬线字体
     * @param {string} options.fonts.mono - 等宽字体
     * @see https://github.com/unocss/unocss#preset-webfonts
     */
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],

  /**
   * @description 确保特定的类名始终包含在生成的 CSS 中，即使未在模板中明确使用
   * @example 使用这些类名来应用默认的排版样式
   */
  // safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
