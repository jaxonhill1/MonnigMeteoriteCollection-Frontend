import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

const app = createApp(App)

if (process.env.NODE_ENV === 'production') {
    app.config.devtools = false;
}

app.use(createPinia())
app.use(router)

app.mount('#app')
