import type { App } from 'vue';
import axios, { type AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials : true
});

export default {
    install: (app: App) => {
    app.config.globalProperties.$axios = {...axiosInstance};
  },
};
