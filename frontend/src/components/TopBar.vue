<template>
  <div
    class="fixed top-0 right-0 w-full flex justify-between items-center p-4 bg-white z-10"
  >
    <div class="relative left-0">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Kitap ara..."
        class="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        @keyup.enter="performSearch"
      />
    </div>

    <div class="relative">
      <img
        @click="toggleMenu"
        :src="user?.data?.profilePicture || ''"
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
import axios from 'axios';
import userStore from '@/store/userStore';

export default {
  name: 'TopBar',
  data() {
    return {
      isMenuOpen: false,
      searchQuery: '',
    };
  },
  async created() {
    const useUserStore = userStore();
    await useUserStore.fetchUser();
  },
  computed: {
    user() {
      const useUserStore = userStore();
      return useUserStore.user.data;
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    handleLogout() {
      this.toggleMenu();
      console.log('Logged out');
    },

    async performSearch() {
      try {
        const formattedQuery = encodeURIComponent(this.searchQuery.trim());
        const response = await axios.get(
          `http://localhost:3000/api/users/books/search/${formattedQuery}`
        );

        console.log(response.data.data);
        if (response.data.data) {
          this.$router.push({
            name: 'Book',
            query: { books: JSON.stringify(response.data.data) },
          });
        }
      } catch (error) {
        console.error('Error searching books:', error);
      }
    },
  },
};
</script>

<style scoped>
body {
  overflow-x: hidden;
}
</style>
