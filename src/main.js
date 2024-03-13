import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/global.css'
import request from './request/request'
import global_msg from './utils/global'

const app = createApp(App)

app.config.globalProperties.$http = request
app.config.globalProperties.$global_msg= global_msg

app.use(router)
app.use(ElementPlus)
app.mount('#app')
