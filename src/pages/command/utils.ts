import { allDataJson, kvListJson } from './data'

const allData = ref<{ [key: string]: any }>(allDataJson)

const kvLists = ref<{ [key: string]: any }>(kvListJson)

/**
 *  获取模块标题
 */
export function getModuleName(moduleKey: string) {
  if (allData.value[moduleKey]) {
    return allData.value[moduleKey].moduleName.replace(/[(（].*?[)）]/g, '')
  }
  else {
    return ''
  }
}

/**
 *  获取每项标题
 */
export function getName(moduleKey: string, index: number) {
  if (kvLists.value[moduleKey] && kvLists.value[moduleKey][index]) {
    return kvLists.value[moduleKey][index].name
  }

  return ''
}

/**
 *  获取每项数据
 */
export function getValue(moduleKey: string, index: number) {
  if (kvLists.value[moduleKey] && kvLists.value[moduleKey][index]) {
    return kvLists.value[moduleKey][index].value
  }

  return ''
}

/**
 *  获取模块子标题
 */
export function getSubtModuleName(moduleKey: string) {
  if (allData.value[moduleKey]) {
    const regex = /（([^）]*)）|\(([^)]*)\)/

    const match = allData.value[moduleKey].moduleName.match(regex)

    const contentInsideBrackets = match ? match[1] : ''

    return contentInsideBrackets
  }
  else {
    return ''
  }
}
