import { defineStore } from 'pinia';

export default defineStore('userStore', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
});
