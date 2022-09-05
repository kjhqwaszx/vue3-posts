import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import funcPlugins from '@/plugins/func';
import objPlugins from '@/plugins/obj';
import person from '@/plugins/person';

const app = createApp(App);
app.use(funcPlugins);
app.use(objPlugins, { name: 'Kyobo' });

app.use(person, { name: '교보생명' });

app.use(router).mount('#app');

import 'bootstrap/dist/js/bootstrap.js';

// console.log('VITE_APP_API_URL', import.meta.env.VITE_APP_API_URL);
