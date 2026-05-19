import { createApp } from 'vue'
import StelluxUI from 'stellux-ui'
import App from './App.vue'

const app = createApp(App)
app.use(StelluxUI)
app.mount('#app')
