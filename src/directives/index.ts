import type { App, Directive } from 'vue'

import animatedText from './modules/animated-text'

import canvasLoading from './modules/canvas-loading'

import copy from './modules/copy'

import debounce from './modules/debounce'

import light from './modules/light'

import throttle from './modules/throttle'

import vWaterMarker from './modules/waterMarker'

const directivesList: { [key: string]: Directive } = {
  animatedText,
  canvasLoading,
  copy,
  debounce,
  light,
  throttle,
  vWaterMarker,
}

export default {
  install(app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  },
}
