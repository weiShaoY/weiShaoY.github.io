import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './modules/admin'

export * from './modules/command'

export * from './modules/garage'

export * from './modules/setting'

export * from './modules/table'

export * from './modules/tool'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export default pinia
