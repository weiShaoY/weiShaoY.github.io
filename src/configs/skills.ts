import cssSvg from '@/assets/svgs/tech/css.svg'

import gitSvg from '@/assets/svgs/tech/git.svg'

import htmlSvg from '@/assets/svgs/tech/html.svg'

import javaScriptSvg from '@/assets/svgs/tech/javaScript.svg'

import nodeSvg from '@/assets/svgs/tech/node.svg'

import piniaSvg from '@/assets/svgs/tech/pinia.svg'

import reactSvg from '@/assets/svgs/tech/react.svg'

import tailwindCssSvg from '@/assets/svgs/tech/tailwindCss.svg'

import threeJsSvg from '@/assets/svgs/tech/threeJs.svg'

import typeScriptSvg from '@/assets/svgs/tech/typeScript.svg'

import unocssSvg from '@/assets/svgs/tech/unocss.svg'

import vueSvg from '@/assets/svgs/tech/vue.svg'

/**
 * 技术栈项目类型定义
 */
export type SkillsItemType = {

  /** 技术名称 */
  name: string

  /** 图标名称（用于 Svg） */
  icon: string

  /** 图片路径（用于 image 标签的 src 属性） */
  image: string

  /** 文档链接 */
  document: string
}

/**
 * 技术栈配置类型
 */
export type SkillsConfig = {
  html: SkillsItemType
  css: SkillsItemType
  javaScript: SkillsItemType
  typeScript: SkillsItemType
  node: SkillsItemType
  react: SkillsItemType
  vue: SkillsItemType
  tailwindCss: SkillsItemType
  unocss: SkillsItemType
  threeJs: SkillsItemType
  git: SkillsItemType
  pinia: SkillsItemType
}

/**
 * 技术栈配置
 */
export const skillsConfig: SkillsConfig = {
  html: {
    name: 'HTML',
    icon: 'tech-html',
    image: htmlSvg,
    document: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML',
  },
  css: {
    name: 'CSS',
    icon: 'tech-css',
    image: cssSvg,
    document: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS',
  },
  javaScript: {
    name: 'JavaScript',
    icon: 'tech-javaScript',
    image: javaScriptSvg,
    document: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
  },
  typeScript: {
    name: 'TypeScript',
    icon: 'tech-typeScript',
    image: typeScriptSvg,
    document: 'https://www.typescriptlang.org/zh/',
  },
  node: {
    name: 'Node.js',
    icon: 'tech-node',
    image: nodeSvg,
    document: 'https://nodejs.org/en/',
  },
  react: {
    name: 'React',
    icon: 'tech-react',
    image: reactSvg,
    document: 'https://zh-hans.react.dev/',
  },
  vue: {
    name: 'Vue.js',
    icon: 'tech-vue',
    image: vueSvg,
    document: 'https://cn.vuejs.org/',
  },
  tailwindCss: {
    name: 'Tailwind CSS',
    icon: 'tech-tailwindCss',
    image: tailwindCssSvg,
    document: 'https://tailwindcss.com/docs/installation',
  },
  unocss: {
    name: 'UnoCSS',
    icon: 'tech-unocss',
    image: unocssSvg,
    document: 'https://unocss-cn.pages.dev/',
  },
  threeJs: {
    name: 'Three.js',
    icon: 'tech-threeJs',
    image: threeJsSvg,
    document: 'https://threejs.org/',
  },
  git: {
    name: 'Git',
    icon: 'tech-git',
    image: gitSvg,
    document: 'https://git-scm.com/',
  },
  pinia: {
    name: 'Pinia',
    icon: 'tech-pinia',
    image: piniaSvg,
    document: 'https://pinia.vuejs.org/zh/',
  },
} as const

/**
 * 获取技术栈项目
 * @param key 技术栈键名
 * @returns 技术栈项目
 */
export function getSkillsItem<K extends keyof SkillsConfig>(key: K): SkillsConfig[K] {
  return skillsConfig[key]
}

/**
 * 获取所有技术栈项目
 * @returns 技术栈项目数组
 */
export function getAllSkillsItems(): SkillsItemType[] {
  return Object.values(skillsConfig)
}

/**
 * 根据名称查找技术栈项目
 * @param name 技术名称
 * @returns 技术栈项目或 undefined
 */
export function findSkillsByName(name: string): SkillsItemType | undefined {
  return getAllSkillsItems().find(item =>
    item.name.toLowerCase() === name.toLowerCase(),
  )
}
