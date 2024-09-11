import { defineStore } from 'pinia';
import axios from 'axios';

export default defineStore('user', {
  state: () => ({
    username: '',
    password: '',
  }),

  actions: {
    async login(username, password) {
      try {
        await axios.post(
          'http://localhost:3000/api/auth/login',
          {
            username,
            password,
          },
          { withCredentials: true }
        );
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
