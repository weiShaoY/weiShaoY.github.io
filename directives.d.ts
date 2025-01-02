/* eslint-disable */
import type { Directives } from './src/directives/types'

declare module 'vue' {
  interface ComponentCustomProperties extends Directives {}
}

