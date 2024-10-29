import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import useAppStore from './modules/app'

import useCodeStore from './modules/code'

import useHomeStore from './modules/home'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export {
  useAppStore,
  useCodeStore,
  useHomeStore,
}

export default pinia
