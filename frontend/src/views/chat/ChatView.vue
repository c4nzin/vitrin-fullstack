<template>
  <AppSidebar>
    <TopBar></TopBar>
    <div
      class="h-screen max-h-6xl bg-gray-100 flex justify-center items-center p-6"
    >
      <div
        class="w-screen max-w-4xl bg-white rounded-lg shadow-md p-6 flex flex-col"
      >
        <div class="border-b pb-3 mb-4">
          <h2 class="text-xl font-semibold text-gray-800">
            Chat with {{ username }}
          </h2>
          <span class="text-sm text-gray-500">Last message: </span>
        </div>

        <div class="flex-1 overflow-y-auto space-y-4 messages">
          <div v-for="message in messages" :key="message.id">
            <div
              :class="{
                'flex justify-end': message.senderId === user.data._id,
                'flex justify-start': message.senderId !== user.data._id,
              }"
            >
              <div
                :class="{
                  'bg-green-100 text-black': message.senderId === user.data._id,
                  'bg-gray-200 text-gray-800':
                    message.senderId !== user.data._id,
                }"
                class="p-4 rounded-lg max-w-xs w-fit shadow-lg"
              >
                <p>{{ message.content }}</p>
                <span
                  class="block text-xs"
                  :class="{
                    'text-black text-right': message.senderId === user.data._id,
                    'text-gray-500': message.senderId !== user.data._id,
                  }"
                >
                  {{ formatTimestamp(message.createdAt) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-4 mt-4 flex space-x-3 items-center relative">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type a message..."
            class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            @keyup.enter="sendMessage"
          />
          <span class="material-icons ml-auto p-2 hover:cursor-pointer">
            attach_file
          </span>
          <button
            @click="sendMessage"
            class="bg-green-100 text-black px-4 py-2 rounded-lg shadow-md hover:bg-green-200 focus:outline-none send-btn"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </AppSidebar>
</template>

<script>
import { io } from 'socket.io-client';
import useUserStore from '@/store/userStore';
import TopBar from '@/components/TopBar.vue';
import AppSidebar from '@/components/AppSidebar.vue';

//add newyork times font

export default {
  props: {
    receiverId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      socket: null,
      newMessage: '',
      messages: [],
      localReceiverId: '',
      username: '',
    };
  },

  computed: {
    user() {
      const userStore = useUserStore();
      return userStore.user;
    },
  },

  components: {
    TopBar,
    AppSidebar,
  },

  async created() {
    const userStore = useUserStore();
    await userStore.fetchUser();

    const userId = this.$route.params.receiverId;
    const fetchedUser = await userStore.fetchUserById(userId);
    if (fetchedUser) {
      this.localReceiverId = fetchedUser.data._id;
      this.username = fetchedUser.data.username;
    }

    this.initializeSocket();
    this.fetchMessages();
  },

  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },

  methods: {
    initializeSocket() {
      this.socket = io('http://localhost:3000', {
        query: { userId: this.user.data._id },
      });

      this.socket.on('connect', () => {
        console.log('Connected to the server:', this.socket.id);
      });

      this.socket.on('receiveMessage', (message) => {
        console.log('Received message:', message);
        this.messages.push(message);
      });

      this.socket.on('receiveMessages', (messages) => {
        console.log('All messages:', messages);
        this.messages = messages;
      });
    },

    async sendMessage() {
      if (this.newMessage.trim() === '') return;

      const messagePayload = {
        senderId: this.user.data._id,
        receiverId: this.localReceiverId,
        content: this.newMessage,
        timestamp: new Date(),
      };

      this.socket.emit('sendMessage', messagePayload);

      this.messages.push(messagePayload);
      this.newMessage = '';
    },

    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
    },

    async fetchMessages() {
      const messagePayload = {
        senderId: this.user.data._id,
        receiverId: this.localReceiverId,
      };

      this.socket.emit('getMessages', messagePayload);
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

.send-btn {
  font-family: 'Open Sans', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
