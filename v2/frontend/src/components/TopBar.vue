<template>
  <div
    class="fixed top-0 right-0 w-full flex justify-between items-center p-4 bg-white z-10"
  >
    <div class="relative left-0">
      <input
        type="text"
        placeholder="Search..."
        class="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <svg
        class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
        />
      </svg>
    </div>
    <a href="#" class="text-black hover:underline">
      <img
        :src="user.data.profilePicture"
        alt="Profile"
        class="w-10 h-10 rounded-full border-2 border-black"
      />
    </a>
  </div>
</template>

<script>
import userStore from '@/store/userStore';

export default {
  name: 'TopBar',
  async created() {
    const useUserStore = userStore();
    await useUserStore.fetchUser();
  },

  computed: {
    user() {
      const useUserStore = userStore();
      return useUserStore.user;
    },
  },
};
</script>
