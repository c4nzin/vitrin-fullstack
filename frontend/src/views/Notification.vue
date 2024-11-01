<template>
  <div class="min-h-screen flex flex-col">
    <TopBar></TopBar>
    <div class="flex flex-1">
      <AppSidebar></AppSidebar>
      <div class="flex-1 flex items-center justify-center">
        <div class="bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
          <div
            class="flex items-center justify-between border-b border-gray-300 pb-2 mb-4"
          >
            <h2 class="text-xl font-semibold">Notifications</h2>
            <div class="flex space-x-4"></div>
          </div>
          <ul>
            <li
              v-for="(notification, index) in notifications"
              :key="index"
              class="flex items-center justify-between p-3 border-b border-gray-300 hover:bg-gray-100"
            >
              <div class="flex items-start space-x-3">
                <div class="text-2xl text-gray-500">👾</div>
                <div>
                  <p class="text-gray-800">{{ notification.message }}</p>
                  <span class="text-gray-500 text-sm">{{
                    notification.date
                  }}</span>
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  class="text-green-500 hover:text-green-700"
                  @click="acceptFriendRequest(notification.userId)"
                >
                  Accept
                </button>
                <button
                  class="text-red-500 hover:text-red-700"
                  @click="rejectFriendRequest(notification.userId)"
                >
                  Reject
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';
import TopBar from '@/components/TopBar.vue';
import axios from 'axios';
import useUserStore from '@/store/userStore';
import { io } from 'socket.io-client';

export default {
  components: {
    AppSidebar,
    TopBar,
  },
  data() {
    return {
      notifications: [],
      socket: null,
    };
  },
  mounted() {
    this.fetchUserAndNotifications();
    this.initializeSocket();
  },
  computed: {
    user() {
      const userStore = useUserStore();
      return userStore.user || {};
    },
  },
  methods: {
    async initializeSocket() {
      if (!this.user.data || !this.user.data._id) return;
      this.socket = io('http://localhost:3000', {
        query: { userId: this.user.data._id },
      });

      this.socket.on('all-notifications', (data) => {
        this.notifications.push(data);
        console.log('New Notification:', data);
      });
    },
    async acceptFriendRequest(id) {
      try {
        await axios.post(
          `http://localhost:3000/api/users/${id}/accept-friend`,
          null,
          {
            withCredentials: true,
          }
        );

        this.fetchNotifications();
      } catch (error) {
        console.error('Error accepting friend request:', error);
      }
    },
    async rejectFriendRequest(id) {
      try {
        await axios.delete(
          `http://localhost:3000/api/users/${id}/reject-friend`
        );

        this.fetchNotifications();
      } catch (error) {
        console.error('Error rejecting friend request:', error);
      }
    },
    async fetchUserAndNotifications() {
      const userStore = useUserStore();
      await userStore.fetchUser();
      this.fetchNotifications();
    },
    async fetchNotifications() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/notifications',
          {
            withCredentials: true,
          }
        );

        this.notifications = response.data.data;
        console.log(this.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },
  },
};
</script>
