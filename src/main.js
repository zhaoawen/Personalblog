import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import $ from 'jquery';
axios.defaults.baseURL = '/api'
window.jQuery = $;
window.$ = $;
createApp(App).use(store).use(router).mount('#app')

