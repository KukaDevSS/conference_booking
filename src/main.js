import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import axios  from 'axios'

// Vue.config.productionTip = false;

createApp(App).use(router).mount('#app')
