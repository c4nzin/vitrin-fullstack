<template>
  <AppSidebar>
    <CreateCard></CreateCard>
  </AppSidebar>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import AppSidebar from '@/components/AppSidebar.vue';
import CreateCard from '@/components/CreateCard.vue';
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
