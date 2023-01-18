/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import axios from "axios";
axios.defaults.headers.common["app-id"] = "63c537201542c3539aae6c8a";
axios.defaults.baseURL = 'https://dummyapi.io/data/v1';

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
