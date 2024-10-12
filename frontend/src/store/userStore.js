import axios from 'axios';
import { defineStore } from 'pinia';
import config from '@/config/index';

export default defineStore('user', {
  state: () => ({
    user: null,
    followers: [],
    users: [],
  }),

  actions: {
    async fetchUser() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/account/me',
          {
            withCredentials: true,
          }
        );

        this.user = response.data;
      } catch (error) {
        throw new Error('Something went wrong while fetching user');
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
        throw new Error('Something went wrong while fetching followers.');
      }
    },

    async fetchUserById(id) {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/auth/fetch-user',
          {
            params: { id },
            withCredentials: true,
          }
        );

        return response.data;
      } catch (error) {
        console.error('Error fetching user by id:', error);
        throw new Error('Something went wrong while fetching user by id.');
      }
    },
  },

  getters: {
    fetchAllFollowers: (state) => state.followers,
    fetchAllUsers: (state) => state.users,
  },
});
