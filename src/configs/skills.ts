import cssSvg from '@/assets/svgs/tech/css.svg'

import gitSvg from '@/assets/svgs/tech/git.svg'

import htmlSvg from '@/assets/svgs/tech/html.svg'

import javaScriptSvg from '@/assets/svgs/tech/javaScript.svg'

import nodeSvg from '@/assets/svgs/tech/node.svg'

import piniaSvg from '@/assets/svgs/tech/pinia.svg'

import pythonSvg from '@/assets/svgs/tech/python.svg'

import reactSvg from '@/assets/svgs/tech/react.svg'

import tailwindCssSvg from '@/assets/svgs/tech/tailwindCss.svg'

import threeJsSvg from '@/assets/svgs/tech/threeJs.svg'

import typeScriptSvg from '@/assets/svgs/tech/typeScript.svg'

import vueSvg from '@/assets/svgs/tech/vue.svg'

/**
 * 技术栈键名
 */
export type SkillKey = 'html' | 'css' | 'javaScript' | 'typeScript' | 'node' | 'react' | 'vue' | 'tailwindCss' | 'threeJs' | 'git' | 'pinia' | 'python'

/**
 * 技术栈项目类型定义
 */
export type SkillItem = {

  /** 唯一键 */
  key: SkillKey

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
 * 技术栈映射类型
 */
export type SkillsMap = Record<SkillKey, SkillItem>

/**
 * 技术栈列表
 */
export const skillsList = [
  {
    key: 'html',
    name: 'HTML',
    icon: 'tech-html',
    image: htmlSvg,
    document: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML',
  },
  {
    key: 'css',
    name: 'CSS',
    icon: 'tech-css',
    image: cssSvg,
    document: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS',
  },
  {
    key: 'javaScript',
    name: 'JavaScript',
    icon: 'tech-javaScript',
    image: javaScriptSvg,
    document: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
  },
  {
    key: 'typeScript',
    name: 'TypeScript',
    icon: 'tech-typeScript',
    image: typeScriptSvg,
    document: 'https://www.typescriptlang.org/zh/',
  },
  {
    key: 'node',
    name: 'Node.js',
    icon: 'tech-node',
    image: nodeSvg,
    document: 'https://nodejs.org/en/',
  },
  {
    key: 'react',
    name: 'React',
    icon: 'tech-react',
    image: reactSvg,
    document: 'https://zh-hans.react.dev/',
  },
  {
    key: 'vue',
    name: 'Vue.js',
    icon: 'tech-vue',
    image: vueSvg,
    document: 'https://cn.vuejs.org/',
  },
  {
    key: 'tailwindCss',
    name: 'Tailwind CSS',
    icon: 'tech-tailwindCss',
    image: tailwindCssSvg,
    document: 'https://tailwindcss.com/docs/installation',
  },
  {
    key: 'threeJs',
    name: 'Three.js',
    icon: 'tech-threeJs',
    image: threeJsSvg,
    document: 'https://threejs.org/',
  },
  {
    key: 'git',
    name: 'Git',
    icon: 'tech-git',
    image: gitSvg,
    document: 'https://git-scm.com/',
  },
  {
    key: 'pinia',
    name: 'Pinia',
    icon: 'tech-pinia',
    image: piniaSvg,
    document: 'https://pinia.vuejs.org/zh/',
  },
  {
    key: 'python',
    name: 'Python',
    icon: 'tech-python',
    image: pythonSvg,
    document: 'https://www.python.org/',
  },
] as const satisfies readonly SkillItem[]

/**
 * 技术栈映射
 */
export const skillsMap = Object.fromEntries(
  skillsList.map(item => [item.key, item]),
) as SkillsMap

/**
 * 兼容旧命名
 */
export const skillsConfig = skillsMap

/**
 * 获取技术栈项目
 * @param key 技术栈键名
 * @returns 技术栈项目
 */
export function getSkillByKey<K extends SkillKey>(key: K): SkillsMap[K] {
  return skillsMap[key]
}

/**
 * 获取所有技术栈项目
 * @returns 技术栈项目数组
 */
export function getAllSkillsItems(): SkillItem[] {
  return [...skillsList]
}

/**
 * 根据名称查找技术栈项目
 * @param name 技术名称
 * @returns 技术栈项目或 undefined
 */
export function findSkillsByName(name: string): SkillItem | undefined {
  return skillsList.find(item =>
    item.name.toLowerCase() === name.toLowerCase(),
  )
}
