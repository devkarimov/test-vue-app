import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

import store from './store'
import { API_ROOT } from './config'

axios.defaults.baseURL = API_ROOT

const app = createApp(App)

app.use(VuesticPlugin)
app.use(store)
app.mount('#app')
