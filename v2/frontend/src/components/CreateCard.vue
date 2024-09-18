<template>
  <section
    class="flex flex-col max-w-3xl p-5 mx-auto bg-white border rounded-lg shadow-md"
  >
    <h2 class="text-xl font-bold mb-4">Tweet Oluştur</h2>
    <div class="flex flex-col">
      <CustomInput
        v-model="tweetContent"
        placeholder="Ne düşünüyorsun?"
        class="mb-4"
      />
      <div class="flex space-x-3 mb-4">
        <button
          @click="addMedia"
          class="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          📷 Medya
        </button>
        <button
          @click="addGif"
          class="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          🎞 GIF
        </button>
        <button
          @click="addEmoji"
          class="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          😀 Emoji
        </button>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600"
          >{{ remainingCharacters }} karakter kaldı</span
        >
        <button
          @click="postTweet"
          :disabled="isTweetEmpty"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Tweetle
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import CustomInput from '@/components/Input.vue';

export default {
  name: 'CreateTweet',
  components: {
    CustomInput,
  },
  data() {
    return {
      tweetContent: '',
      maxCharacters: 280,
    };
  },
  computed: {
    remainingCharacters() {
      return this.maxCharacters - this.tweetContent.length;
    },
    isTweetEmpty() {
      return this.tweetContent.trim() === '' || this.remainingCharacters < 0;
    },
  },
  methods: {
    postTweet() {
      if (!this.isTweetEmpty) {
        console.log('Tweet gönderildi:', this.tweetContent);
        this.tweetContent = '';
      }
    },
    addMedia() {
      console.log('Medya ekle');
    },
    addGif() {
      console.log('GIF ekle');
    },
    addEmoji() {},
  },
};
</script>
