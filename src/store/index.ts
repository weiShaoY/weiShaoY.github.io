import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import useAppStore from './modules/app'

import useCodeStore from './modules/code'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export {
  useAppStore,
  useCodeStore,
}

export default pinia
