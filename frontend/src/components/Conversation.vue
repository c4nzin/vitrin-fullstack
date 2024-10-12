<template>
  <TopBar></TopBar>
  <AppSidebar>
    <div class="flex h-screen pt-6">
      <div class="w-64 bg-white shadow-lg h-full p-4">
        <h3 class="text-xl font-semibold mb-4">Conversations</h3>
        <ul class="space-y-6 flex-col">
          <li
            v-for="conversation in conversations"
            :key="conversation.otherUserId"
            @click="selectConversation(conversation)"
            class="cursor-pointer p-y-4 rounded-2xl hover:bg-gray-100 border-solid border-2"
            :class="{
              'bg-gray-200':
                selectedConversationId === conversation.otherUserId,
            }"
          >
            <img
              class="rounded-2xl w-12 max-w-12 max-h-12 flex items-center"
              :src="conversation.profilePicture"
              alt="asdads"
            />
            <span class="rounded-lg block mt[-12]"
              >@{{ conversation.username }}</span
            >

            <span class="block"
              >Last Message: {{ conversation._doc.content }}</span
            >
            <small class="text-gray-500" text-xs>{{
              formatDate(conversation._doc.createdAt)
            }}</small>
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
      users: [],
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
        this.fetchUsers();
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
        this.conversations = data;
      });
    },

    fetchConversations() {
      this.socket.emit('getConversations', { userId: this.userId });

      this.socket.on('receiveConversations', async (data) => {
        this.conversations = [];

        for (const conversation of data) {
          const user = await useUserStore().fetchUserById(
            conversation.otherUserId
          );

          //might be change in advance because this is just hardcoded.
          conversation.username = user.data.username;
          conversation.profilePicture = user.data.profilePicture;

          this.conversations.push(conversation);
        }

        console.log(this.conversations);
      });
    },

    async fetchUsers() {
      const userStore = useUserStore();

      this.socket.on('receiveConversations', (data) => {
        this.conversations = data;

        this.conversations.forEach(async (data) => {
          const user = await userStore.fetchUserById(data.otherUserId);

          this.users.push(user);
        });
      });
    },

    selectConversation(conversation) {
      this.selectedConversation = conversation;
      this.selectedConversationId = conversation.otherUserId;

      this.$router.push(`/chat/${conversation.otherUserId}`);
    },

    formatDate(date) {
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
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
