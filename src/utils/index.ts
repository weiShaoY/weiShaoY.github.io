import * as event from './event'

import * as is from './is'

import * as openWindow from './openWindow'

// 将所有模块的函数聚合到 utils 中
const utils = {
  ...is,
  ...openWindow,
  ...event,
}

export default utils
