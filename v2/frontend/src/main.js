import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import './index.css';
import { axiosClient, AxiosKey } from './plugins';
import { createPinia } from 'pinia';

const requireComponent = require.context('./components', true, /\.vue$/);

const app = createApp(App);

app.config.globalProperties.$axios = { ...axiosClient };

const pinia = createPinia();

app.provide(AxiosKey, axiosClient);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');

  app.component(componentName, componentConfig.default || componentConfig);
});

app.use(pinia);
app.use(router);
app.mount('#app');
