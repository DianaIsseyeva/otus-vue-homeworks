import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);
store.dispatch('initializeCart');
app.use(router);
app.use(store);

app.mount('#app');
