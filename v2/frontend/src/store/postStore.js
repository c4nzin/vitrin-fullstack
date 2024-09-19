import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
  }),
  actions: {
    async fetchPosts(id) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/tweets/${id}/tweets`,
          { withCredentials: true }
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
