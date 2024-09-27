import { defineStore } from 'pinia';
import axios from 'axios';
import config from '@/config/index';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
  }),
  actions: {
    async fetchPosts(id) {
      try {
        const response = await axios.get(
          `${config.BACKEND_URL}users/tweets/${id}/tweets`,
          {
            withCredentials: true,
          }
        );

        this.posts = response.data.data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    },
  },
  getters: {
    allPosts: (state) => state.posts,
  },
});
