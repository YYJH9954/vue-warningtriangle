import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
//引入全局变量
import './assets/global.css'
//引入离子模板
import particles from "particles.vue3";
//icon
import './assets/iconfont/iconfont.js'
import './assets/iconfont/icon.css'
//引入axios
import VueAxios from 'vue-axios'
import axios from 'axios'

const app = createApp(App)

// //配置请求根路径
app.config.globalProperties.$axios = axios
// axios.defaults.baseURL = "http://localhost:3000/"

app
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(particles)
  .use(VueAxios, axios)
  .mount('#app')
