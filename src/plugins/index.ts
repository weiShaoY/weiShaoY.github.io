import type { App as VueApp } from 'vue'

import { setElementPlus } from './setElementPlus'

import { setupLoading } from './setupLoading'

import { setupNProgress } from './setupNProgress'

import { setWelcome } from './setWelcome'

import './vite-plugin-svg-icons-ng'

export function setupPlugins(app: VueApp) {
  setWelcome()

  setupLoading()

  setupNProgress()

  setElementPlus(app)
}
