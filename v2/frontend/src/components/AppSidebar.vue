<template>
  <div class="flex">
    <div class="fixed w-64 h-screen bg-white shadow-2xl shadow-slate-300">
      <div class="p-4 mt-32">
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
              <span class="material-icons mr-4">search</span>
              Explore
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
              <span class="material-icons mr-4">local_movies</span>
              Movies
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              class="flex items-center px-4 py-2 text-base text-gray-800 rounded-md hover:bg-gray-100"
            >
              <span class="material-icons mr-4">mail</span>
              Messages
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

    <div class="ml-64 flex-grow p-4 mt-8">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar',
};
</script>

<style scoped>
.material-icons {
  font-size: 24px;
}
</style>
