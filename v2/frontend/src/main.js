import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './index.css';
import { axiosClient, AxiosKey } from './plugins';
import AppSidebar from './components/AppSidebar.vue';
import Button from './components/Button.vue';
import Input from './components/Input.vue';
import { createPinia } from 'pinia';

const app = createApp(App);

app.config.globalProperties.$axios = { ...axiosClient };

// library.add(faUserSecret); //fix this soon.
const pinia = createPinia();

app.provide(AxiosKey, axiosClient);

app.component('AppSideBar', AppSidebar);
app.component('CustomButton', Button);
app.component('CustomInput', Input);

// app.component('font awesome icon bla', FontAwesomeIcon);

app.use(pinia);
app.use(router).mount('#app');
