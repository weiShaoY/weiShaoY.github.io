import type { App } from 'vue'

import useAnimatedText from './modules/animated-text'

import useCanvasLoading from './modules/canvas-loading'

import useCopy from './modules/copy'

import useLight from './modules/light'

export default {
  install(app: App) {
    app.directive('animatedText', useAnimatedText)
    app.directive('canvasLoading', useCanvasLoading)
    app.directive('copy', useCopy)
    app.directive('light', useLight)
  },
}
