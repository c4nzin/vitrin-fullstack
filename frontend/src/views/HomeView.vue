<template>
  <AppSidebar>
    <TopBar />
    <CreateCard></CreateCard>
  </AppSidebar>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';
import CreateCard from '@/components/CreateCard.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import TopBar from '@/components/TopBar.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    AppSidebar,
    CreateCard,
    TopBar,
  },

  beforeMount() {
    document.title = 'Home';
  },
};
</script>
