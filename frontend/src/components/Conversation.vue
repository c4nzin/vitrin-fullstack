<template>
  <div class="flex h-screen">
    <div class="w-64 bg-white shadow-lg h-full p-4">
      <h3 class="text-xl font-semibold mb-4">Conversations</h3>
      <ul class="space-y-4">
        <li
          v-for="conversation in conversations"
          :key="conversation.receiverId"
          @click="selectConversation(conversation)"
          class="cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100"
          :class="{
            'bg-gray-200': selectedConversationId === conversation.receiverId,
          }"
        >
          <span>{{ conversation.receiverId }}</span>
        </li>
      </ul>
    </div>

    <div class="flex-grow bg-gray-100 p-6">
      <div
        v-if="selectedConversation"
        class="w-full max-w-2xl bg-white rounded-lg shadow-md p-6"
      >
        <h2 class="text-xl font-semibold text-gray-800">
          Chat with {{ selectedConversation.receiverId }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import useUserStore from '@/store/userStore';

export default {
  data() {
    return {
      socket: null,
      conversations: [],
      selectedConversation: null,
      selectedConversationId: null,
    };
  },
  computed: {
    async userId() {
      const userStore = useUserStore();
      await userStore.fetchUser();
      return userStore.user.data._id.toString();
    },
  },
  methods: {
    connectSocket() {
      this.socket = io('http://localhost:3000', {
        query: { userId: this.userId },
      });

      this.socket.on('connect', () => {
        this.fetchConversations();
      });

      this.socket.on('receiveConversations', (data) => {
        this.conversations = data;
      });
    },

    fetchConversations() {
      this.socket.emit('getConversations', { userId: this.userId });
    },

    selectConversation(conversation) {
      this.selectedConversation = conversation;
      this.selectedConversationId = conversation.receiverId;
    },
  },
  mounted() {
    this.connectSocket();
  },
};
</script>

<style scoped>
.messages {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.messages::-webkit-scrollbar {
  width: 8px;
}

.messages::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}
</style>
