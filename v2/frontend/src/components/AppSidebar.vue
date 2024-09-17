<template>
  <div class="flex">
    <div class="fixed w-64 h-screen bg-white">
      <div class="p-4 mt-16">
        <h1 class="text-xl text-black font-bold mb-6">Menu</h1>
        <ul>
          <li class="mb-4">
            <a
              href="#"
              class="flex items-center px-4 py-2 text-sm text-black rounded-md hover:bg-slate-100"
            >
              <span>Dashboard</span>
            </a>
          </li>
          <li class="mb-4">
            <a
              href="#"
              class="flex items-center px-4 py-2 text-sm text-black hover:bg-slate-100"
            >
              <span>Movies</span>
            </a>
          </li>
          <li class="mb-4">
            <a
              href="#"
              class="flex items-center px-4 py-2 text-sm text-black hover:bg-slate-100"
            >
              <span>Series</span>
            </a>
          </li>
          <li class="mb-4">
            <a
              href="#"
              class="flex items-center px-4 py-2 text-sm text-black hover:bg-slate-100"
            >
              <span>Books</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content (Slot) -->
    <div class="ml-64 flex-grow p-4 mt-16">
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
/* Stil tanımlamaları */
</style>
