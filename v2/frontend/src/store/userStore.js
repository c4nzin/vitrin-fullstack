import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:3000/api/users/me', {
          withCredentials: true,
        });

        this.user = response.data;
      } catch (error) {
        throw new Error('Something went wrong while fetching user', error);
      }
    },
  },
});
