import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import useAppStore from './models/app'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export {
  useAppStore,
}

export default pinia
