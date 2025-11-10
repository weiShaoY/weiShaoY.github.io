import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './modules/admin'

export * from './modules/admin'

export * from './modules/command'

export * from './modules/garage'

export * from './modules/table'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export default pinia
