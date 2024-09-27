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

    <div class="relative">
      <img
        @click="toggleMenu"
        :src="user?.data?.profilePicture"
        alt="Profile"
        class="w-10 h-10 rounded-full border-2 border-black cursor-pointer"
      />
      <div
        v-if="isMenuOpen"
        class="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-20"
      >
        <ul class="py-1">
          <li>
            <router-link
              :to="{ name: 'EditProfile' }"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
              @click="toggleMenu"
            >
              <span class="material-icons mr-3">edit</span>
              Edit Profile
            </router-link>
          </li>

          <li>
            <router-link
              :to="{ name: 'notifications' }"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
              @click="toggleMenu"
            >
              <span class="material-icons mr-3">notifications</span>
              Notifications
            </router-link>
          </li>
          <li>
            <button
              @click="handleLogout"
              class="flex items-center w-full text-left px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons mr-3">logout</span>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import userStore from '@/store/userStore';

export default {
  name: 'TopBar',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  async created() {
    const useUserStore = userStore();
    await useUserStore.fetchUser();
  },
  computed: {
    user() {
      const useUserStore = userStore();
      console.log(useUserStore.user.data.profilePicture);
      return useUserStore.user.data;
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    //TODO : add logout feature
    handleLogout() {
      this.toggleMenu();
      console.log('Logged out');
    },
  },
};
</script>

<style scoped>
body {
  overflow-x: hidden;
}
</style>
