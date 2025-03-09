/* eslint-disable */
import type { DirectivesType } from './src/directives/types'

declare module 'vue' {
  interface ComponentCustomProperties extends DirectivesType {}
}

