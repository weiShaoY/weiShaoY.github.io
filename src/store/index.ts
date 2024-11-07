import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import useAppStore from './modules/app'

import useCodeStore from './modules/code'

import useHomeStore from './modules/home'

import useTestStore from './modules/test'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export {
  useAppStore,
  useCodeStore,
  useHomeStore,
  useTestStore,
}

export default pinia
