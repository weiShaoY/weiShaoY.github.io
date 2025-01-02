import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './modules/app'

export * from './modules/blog'

export * from './modules/garage'

export * from './modules/test'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export default pinia
