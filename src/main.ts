import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'

import './assets/main.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})

const app = createApp(App)
app.use(vuetify).mount('#app')
