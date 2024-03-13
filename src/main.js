import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toasity from 'vue3-toastify';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(Vue3Toasity);

app.mount('#app')
