import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import './index.css';
import { axiosClient, AxiosKey } from './plugins';
import { createPinia } from 'pinia';
import { registerComponents } from './utils/register-components';

const app = createApp(App);

app.config.globalProperties.$axios = { ...axiosClient };

const pinia = createPinia();

app.provide(AxiosKey, axiosClient);

registerComponents(app);

app.use(router);
app.use(pinia);
app.mount('#app');
