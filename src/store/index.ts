import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './modules/blog'

export * from './modules/blog'

export * from './modules/command'

export * from './modules/garage'

export * from './modules/wxChat'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export default pinia
