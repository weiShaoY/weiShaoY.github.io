// types.ts
import type { Directive } from 'vue'

import type { useLightParamsType } from './modules/light'

export type Directives = {
  vLight: Directive<HTMLElement, useLightParamsType >
}
