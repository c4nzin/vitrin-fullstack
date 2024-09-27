<template>
  <AppSidebar>
    <div class="followers-list p-6">
      <TopBar />

      <h2 class="text-2xl font-bold mb-4 mt-6">Followers</h2>
      <div v-if="followers.length === 0" class="text-center text-gray-500">
        No followers available
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FollowerCard
          v-for="follower in followers"
          :key="follower._id"
          :follower="follower"
        />
      </div>
    </div>
  </AppSidebar>
</template>

<script>
import useStore from '@/store/userStore';
import FollowerCard from '@/components/FollowerCard.vue';
import TopBar from '@/components/TopBar.vue';
import AppSidebar from '@/components/AppSidebar.vue';

export default {
  components: {
    FollowerCard,
    TopBar,
    AppSidebar,
  },
  computed: {
    followers() {
      const store = useStore();
      return store.fetchAllFollowers.data;
    },
  },
  async created() {
    const store = useStore();
    await store.fetchUser();
    if (store.user && store.user._id) {
      await store.fetchFollowers(store.user._id);
    }
  },
};
</script>

<style scoped>
.followers-list {
  max-width: 1000px;
  margin: auto;
}
</style>
