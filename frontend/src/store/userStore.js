import axios from 'axios';
import { defineStore } from 'pinia';
import config from '@/config/index';

export default defineStore('user', {
  state: () => ({
    user: null,
    followers: [],
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

    async fetchFollowers(id) {
      try {
        const response = await axios.get(
          `${config.BACKEND_URL}${id}/followers`,
          { withCredentials: true }
        );

        this.followers = response.data.data;
      } catch (error) {
        throw new Error(
          'Something went wrong while fetching followers.',
          error
        );
      }
    },
  },

  getters: {
    fetchAllFollowers: (state) => state.followers,
  },
});
