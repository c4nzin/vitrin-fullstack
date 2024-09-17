<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4">
    <div class="flex items-center mb-4">
      <img
        :src="post.authorAvatar"
        alt="Author's avatar"
        class="w-10 h-10 rounded-full mr-3"
      />
      <div class="font-semibold text-gray-800">{{ post.author }}</div>
    </div>
    <div class="mb-4">
      <p class="text-gray-700">{{ post.content }}</p>
      <img
        v-if="post.media"
        :src="post.media"
        alt="Post media"
        class="mt-2 rounded-lg w-full max-h-60 object-cover"
      />
    </div>
    <div class="flex items-center">
      <button
        @click="likePost"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    likePost() {
      this.$emit('like', this.post);
    },
  },
};
</script>
