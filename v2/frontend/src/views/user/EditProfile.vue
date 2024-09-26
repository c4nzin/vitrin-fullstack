<template>
  <AppSidebar>
    <div class="h-screen flex justify-center items-center">
      <TopBar />

      <img src="../../assets/logo.png" class="justify-center mb-6" />

      <div class="flex mb-2 max-w-md">
        <div class="flex space-y-6 mb-6">
          <form @submit.prevent="submitEdit" class="justify-center">
            <label class="text-lg">Username</label>
            <CustomInput v-model="username" :placeholder="user.data.username" />

            <label class="text-lg">Biography</label>
            <CustomInput v-model="bio" placeholder="Bio" />

            <label class="text-lg">Gender</label>
            <select
              v-model="gender"
              class="block w-full px-4 py-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option :value="GenderEnum.MALE">Male</option>
              <option :value="GenderEnum.FEMALE">Female</option>
              <option :value="GenderEnum.NON_BINARY">Non-binary</option>
              <option :value="GenderEnum.NOT_KNOWN">Not Known</option>
            </select>

            <label class="text-lg">Website</label>
            <CustomInput
              v-model="user.data.website"
              :placeholder="user.data.website"
            />

            <div
              v-if="errorMessage"
              class="bg-red-700 text-white rounded-md flex justify-center items-center p-4"
            ></div>

            <CustomButton class="mt-6" text="Update Profile"></CustomButton>
          </form>
        </div>
      </div>
    </div>
  </AppSidebar>
</template>

<script>
import CustomInput from '@/components/Input.vue';
import CustomButton from '@/components/Button.vue';
import TopBar from '@/components/TopBar.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import userStore from '@/store/userStore';

import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      fullName: '',
      gender: '',
      bio: '',
      GenderEnum: {
        MALE: 0,
        FEMALE: 1,
        NON_BINARY: 2,
        NOT_KNOWN: 3,
      },

      errorMessage: '',
    };
  },

  components: {
    CustomInput,
    CustomButton,
    TopBar,
    AppSidebar,
  },

  async created() {
    const useUserStore = userStore();
    await useUserStore.fetchUser();
    this.gender = this.user.data.gender;
  },

  computed: {
    user() {
      const useUserStore = userStore();
      return useUserStore.user;
    },
  },

  methods: {
    async submitEdit() {
      const requestBody = {
        username: this.username,
        bio: this.bio,
        website: this.website,
        gender: this.gender,
      };

      const body = Object.keys(requestBody).reduce((acc, key) => {
        if (requestBody[key]) {
          acc[key] = requestBody[key];
        }

        return acc;
      }, {});

      try {
        await axios.patch('http://localhost:3000/api/users/update', body, {
          withCredentials: true,
        });
      } catch (error) {
        this.errorMessage = error.response?.data?.message[0];
      }
    },
  },
};
</script>
