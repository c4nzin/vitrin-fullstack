<template>
  <AppSidebar>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Explore</h1>
      <div class="space-y-6">
        <div
          v-for="post in posts"
          :key="post._id"
          class="border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          <div class="flex items-start mb-4">
            <img
              v-if="post.authorDetails && post.authorDetails.profilePicture"
              :src="post.authorDetails.profilePicture"
              alt="Author's Profile"
              class="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <span class="font-semibold text-lg">
                {{
                  post.authorDetails
                    ? post.authorDetails.username
                    : 'Unknown User'
                }}
              </span>
              <span class="text-gray-500 text-sm block"
                >@{{
                  post.authorDetails
                    ? post.authorDetails.username
                    : 'unknownuser'
                }}</span
              >
            </div>
          </div>
          <p class="mb-2 text-gray-800">{{ post.content }}</p>
          <img
            v-if="post.media"
            :src="post.media"
            alt="Post Media"
            class="media-image rounded-lg mb-2"
          />
          <div class="flex justify-between text-gray-600 text-sm">
            <span>{{ post.likes }} likes</span>
            <span>{{ new Date(post.createdAt).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </AppSidebar>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
    };
  },
  components: {
    AppSidebar,
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/api/explore', {
          withCredentials: true,
        });
        this.posts = response.data.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

.border {
  border: 1px solid #e2e8f0;
}

.hover\:shadow-xl:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.media-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
}
</style>
