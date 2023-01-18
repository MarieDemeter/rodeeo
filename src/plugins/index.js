/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import 'bootstrap-vue'

import '@/styles/custom.scss'

export function registerPlugins(app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
}
