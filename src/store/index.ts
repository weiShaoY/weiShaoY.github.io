import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import useAppStore from './modules/app'

import useCodeStore from './modules/code'

import useTabBarStore from './modules/tab-bar'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export {
  useAppStore,
  useCodeStore,
  useTabBarStore,
}

export default pinia
