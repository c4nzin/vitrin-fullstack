<template>
  <div
    class="max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg mt-10"
  >
    <div class="flex items-center p-4">
      <img
        class="w-10 h-10 rounded-full"
        :src="user.profilePicture"
        alt="User avatar"
      />
      <div class="ml-3">
        <p class="text-sm font-semibold text-gray-800">
          {{ user.username }}
        </p>
        <p class="text-xs text-gray-500">@{{ user?.username }}</p>
      </div>
    </div>
    <p class="px-4 pb-2 text-gray-800">{{ post.content }}</p>
    <div v-if="post.media" class="px-4 pb-2">
      <img
        class="w-full h-auto object-cover rounded-lg max-h-60"
        :src="post.media"
        alt="Post media"
      />
    </div>
    <div class="flex justify-between items-center px-4 py-2 text-gray-600">
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M5 8c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3S5 9.654 5 8zm7 3a2 2 0 114 0 2 2 0 01-4 0zm-8 5h14c0-4-3-6-7-6s-7 2-7 6z"
          />
        </svg>
        <span>61</span>
      </div>
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M17.207 8.207a1 1 0 00-1.414 0L11 12.793l-4.793-4.793a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l6-6a1 1 0 000-1.414z"
          />
        </svg>
        <span>12</span>
      </div>
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M2.8 4.2A1 1 0 014 3.6h12a1 1 0 010 2H4a1 1 0 01-1.2-.4l-1.5-2a1 1 0 010-1.2l1.5-2zM17 16V6h-1v10h1zm-6 2a2 2 0 100-4 2 2 0 000 4z"
          />
        </svg>
        <span>6.2K</span>
      </div>
    </div>
  </div>
</template>

<script>
import { usePostStore } from '@/store/postStore';
import useUserStore from '@/store/userStore';

export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    user() {
      const userStore = useUserStore();

      return userStore.user.data;
    },
  },
  created() {
    usePostStore();
    useUserStore();
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .max-w-2xl {
    max-width: 100%;
  }
  img {
    max-width: 100%;
  }
}
</style>
