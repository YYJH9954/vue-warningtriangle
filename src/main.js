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
//引入echarts
import * as echarts from 'echarts'


const app = createApp(App)

// //配置请求根路径
app.config.globalProperties.$axios = axios
//引入echarts
app.config.globalProperties.$echarts = echarts
app
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(particles)
  .use(VueAxios, axios)
  .mount('#app')
//axios请求拦截
axios.interceptors.request.use(config => {
  if (localStorage.Token) {
    config.headers['Authorization'] = localStorage.Token
  }
  return config
})

//axios响应拦截
axios.interceptors.response.use(res => {
  return res
}), err => {
  console.log(err.response)
  Message.error(err.response.data)
}
