<template>
  <AppSidebar>
    <CreateCard></CreateCard>
  </AppSidebar>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';
import CreateCard from '@/components/CreateCard.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    AppSidebar,
    CreateCard,
  },

  beforeMount() {
    document.title = 'Home';
  },
};
</script>
