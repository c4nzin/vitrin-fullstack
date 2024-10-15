<template>
  <TopBar></TopBar>

  <AppSidebar>
    <div class="flex h-screen pt-6">
      <div class="w-80 bg-white shadow-lg h-full p-4">
        <div class="mb-4">
          <div class="flex justify-between mt-2 text-sm text-gray-500">
            <span>Sort by</span>
            <select class="text-blue-600">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <ul class="space-y-4">
          <li
            v-for="conversation in conversations"
            :key="conversation.otherUserId"
            @click="selectConversation(conversation)"
            class="cursor-pointer flex items-center p-4 rounded-xl transition duration-200 hover:bg-green-200 max-w-fit max-h-fit"
            :class="{
              'bg-gray-200':
                selectedConversationId === conversation.otherUserId,
            }"
          >
            <img
              class="rounded-full w-12 h-12 object-cover mr-4 shadow-sm shadow-black"
              :src="conversation.profilePicture"
              alt="Profile Picture"
            />
            <small class="text-gray-500 p-2">{{
              formatDate(conversation._doc.createdAt)
            }}</small>
            <div class="flex-grow">
              <div class="flex justify-between items-center">
                <span class="font-semibold text-base"
                  >@{{ conversation.username }}</span
                >
              </div>
              <p class="text-gray-500 text-sm">
                {{ conversation._doc.content }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div class="flex-grow bg-gray-100 p-6">
        <div
          v-if="selectedConversation"
          class="w-full max-w-2xl bg-white rounded-lg shadow-md p-6"
        >
          <h2 class="text-xl font-semibold text-gray-800">
            Chat with {{ selectedConversation.otherUserId }}
          </h2>
        </div>
      </div>
    </div>
  </AppSidebar>
</template>

<script>
import io from 'socket.io-client';
import useUserStore from '@/store/userStore';
import TopBar from './TopBar.vue';
import AppSidebar from './AppSidebar.vue';

export default {
  data() {
    return {
      socket: null,
      conversations: [],
      selectedConversation: null,
      selectedConversationId: null,
      userId: '',
    };
  },
  mounted() {
    this.fetchUserAndConnectSocket();
  },

  components: {
    TopBar,
    AppSidebar,
  },

  methods: {
    async fetchUserAndConnectSocket() {
      const userStore = useUserStore();
      await userStore.fetchUser();
      this.userId = userStore.user.data._id.toString();

      if (this.userId) {
        this.connectSocket();
      }
    },

    connectSocket() {
      this.socket = io('http://localhost:3000', {
        query: { userId: this.userId },
      });

      this.socket.on('connect', () => {
        this.fetchConversations();
      });

      this.socket.on('receiveConversations', (data) => {
        console.log(data);
        this.conversations = data.map((conversation) => {
          return {
            ...conversation,
            profilePicture: conversation.profilePhoto,
            username: conversation.username,
          };
        });
      });
    },

    fetchConversations() {
      this.socket.emit('getConversations', { userId: this.userId });
    },

    selectConversation(conversation) {
      this.selectedConversation = conversation;
      this.selectedConversationId = conversation.otherUserId;

      this.$router.push(`/conversation/${conversation.otherUserId}`);
    },

    formatDate(date) {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
      };
      return new Date(date).toLocaleString('en-US', options);
    },
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
