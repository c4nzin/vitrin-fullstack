<template>
  <section
    class="flex flex-col max-w-2xl p-5 mt-10 mx-auto bg-white border rounded-lg shadow-md"
  >
    <img
      :src="user?.data?.profilePicture || null"
      class="h-12 w-12 rounded-3xl shadow-lg shadow-slate-500"
    />
    <h2 class="text-xl font-bold mb-4">Create a new tweet</h2>
    <div class="flex flex-col">
      <CustomInput
        v-model="tweetContent"
        :placeholder="`What are you up to? ` + user?.data?.username"
        class="mb-4"
      />

      <div class="flex space-x-3 mb-4">
        <button
          @click="triggerFileInput"
          class="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          📷 Media
        </button>
        <input
          type="file"
          ref="mediaInput"
          @change="addMedia"
          accept="image/*, video/*"
          style="display: none"
        />
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600"
          >{{ remainingCharacters }} characters remaining.</span
        >
        <button
          @click="postTweet"
          :disabled="isTweetEmpty"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Tweet
        </button>
      </div>
    </div>
    <div v-if="status" class="rounded-lg text-green-500">{{ status }}</div>
  </section>
</template>

<script>
import CustomInput from '@/components/Input.vue';
import useUserStore from '@/store/userStore';
import axios from 'axios';

export default {
  name: 'CreateCard',
  components: {
    CustomInput,
  },
  data() {
    return {
      tweetContent: '',
      media: null,
      maxCharacters: 280,
      status: '',
    };
  },
  computed: {
    user() {
      const store = useUserStore();

      return store.user;
    },
    remainingCharacters() {
      return this.maxCharacters - this.tweetContent.length;
    },
    isTweetEmpty() {
      return this.tweetContent.trim() === '' || this.remainingCharacters < 0;
    },
  },
  created() {
    const store = useUserStore();
    store.fetchUser();
  },
  methods: {
    async postTweet() {
      const formData = new FormData();
      formData.append('content', this.tweetContent);

      if (this.media) {
        formData.append('file', this.media);
      }

      try {
        await axios.post('http://localhost:3000/api/tweets', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.status = 'Tweet has been sent!';
      } catch (error) {
        throw new Error(error);
      }
    },

    triggerFileInput() {
      this.$refs.mediaInput.click();
    },

    addMedia(event) {
      const file = event.target.files[0];
      if (file) {
        this.media = file;
      }
    },
  },
};
</script>
