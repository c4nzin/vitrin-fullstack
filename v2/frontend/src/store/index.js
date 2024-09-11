// src/store/useUserStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    password: '',
  }),
  actions: {
    async login() {},
  },
});
