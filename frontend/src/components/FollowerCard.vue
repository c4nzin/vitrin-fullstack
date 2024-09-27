<template>
  <div
    class="follower-card border rounded p-4 shadow-lg flex items-center space-x-4"
  >
    <img
      :src="follower.profilePicture || defaultProfilePic"
      class="w-16 h-16 rounded-full border"
      alt="Follower profile picture"
    />
    <div>
      <h3 class="text-lg font-semibold">{{ follower.fullName }}</h3>
      <p class="text-gray-500">@{{ follower.username }}</p>
      <p class="text-sm text-gray-400">{{ follower.bio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    follower: {
      type: Object,
      required: true,
    },
  },
  computed: {
    defaultProfilePic() {
      return 'https://via.placeholder.com/150';
    },
  },
};
</script>

<style scoped>
.follower-card {
  transition: transform 0.3s;
}
.follower-card:hover {
  transform: scale(1.05);
}
</style>
