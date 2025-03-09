/* eslint-disable */
import type { DirectivesType } from '../directives/types'

declare module 'vue' {
  interface ComponentCustomProperties extends DirectivesType {}
}

