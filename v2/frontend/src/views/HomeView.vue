<template>
  <div class="home" id="app">
    <AppSidebar />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import AppSidebar from '@/components/AppSidebar.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    AppSidebar,
  },

  beforeMount() {
    document.title = 'Home';
  },
};
</script>
