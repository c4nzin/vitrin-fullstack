<template>
  <div class="flex">
    <div
      v-if="!isLoggedIn"
      class="fixed w-64 h-screen mt-36 bg-white shadow-lg"
    >
      <div class="p-4 mt-8">
        <ul class="space-y-4">
          <!-- Register -->
          <li>
            <router-link
              :to="{ name: 'Register' }"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons mr-4">person_add</span>
              Register
            </router-link>
          </li>
          <!-- Login -->
          <li>
            <router-link
              :to="{ name: 'Login' }"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons mr-4">login</span>
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="isLoggedIn" class="fixed w-64 h-screen mt-36 bg-white shadow-lg">
      <div class="p-4 mt-8">
        <ul class="space-y-4">
          <li>
            <router-link
              :to="{ name: 'home' }"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons mr-4">home</span>
              Home
            </router-link>
          </li>

          <li>
            <router-link
              to="#"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons">books</span>
              Books
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons mr-4">search</span>
              Explore
            </router-link>
          </li>

          <li>
            <router-link
              to="#"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons">messages</span>
              Messages
            </router-link>
          </li>

          <li>
            <router-link
              to="#"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons pr-4">notifications</span>
              Notifications
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons mr-4">local_movies</span>
              Movies
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons mr-4">tv</span>
              Series
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'profile' }"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons mr-4">person</span>
              Profile
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="isLoggedIn" class="ml-64 flex-grow p-4 mt-8">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import useUserStore from '@/store/userStore';

export default {
  name: 'AppSidebar',

  data() {
    return {
      userStore: useUserStore(),
    };
  },

  computed: {
    isLoggedIn() {
      return !!this.userStore.user;
    },
  },

  mounted() {
    this.userStore.fetchUser();
  },
};
</script>

<style scoped>
.material-icons {
  font-size: 24px;
}
</style>
