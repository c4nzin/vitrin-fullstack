<template>
  <AppSidebar>
    <div class="h-screen flex justify-center items-center">
      <TopBar />

      <div class="flex mb-2 max-w-lg">
        <div class="flex space-y-6 mb-6">
          <form @submit.prevent="submitEdit" class="justify-center">
            <label class="text-lg">Username</label>
            <CustomInput v-model="username" :placeholder="user.data.username" />

            <label class="text-lg">Full Name</label>
            <CustomInput v-model="fullName" :placeholder="user.data.fullName" />

            <label class="text-lg">Biography</label>
            <CustomInput
              v-model="bio"
              :placeholder="user.data.bio"
              v-text="user.data.bio"
            />

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
            >
              <span>{{ errorMessage }}</span>
            </div>

            <div
              v-if="successMessage"
              class="bg-green-500 text-white rounded-md justify-center items-center p-4 mt-6"
            >
              <span>{{ successMessage }}</span>
            </div>

            <CustomButton class="mt-6" text="Update Profile"></CustomButton>
          </form>

          <form @submit.prevent="uploadThumbnail" class="mt-6 h-auto">
            <label class="text-lg">Update Thumbnail Photo</label>
            <input
              type="file"
              @change="onFileChange"
              accept="image/*"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
            <CustomButton class="mt-4" text="Upload Thumbnail"></CustomButton>

            <div
              v-if="thumbnailErrorMessage"
              class="bg-red-700 text-white rounded-md flex justify-center items-center p-4 mt-4"
            >
              <span>{{ thumbnailErrorMessage }}</span>
            </div>

            <div
              v-if="thumbnailSuccessMessage"
              class="bg-green-500 text-white rounded-md justify-center items-center p-4 mt-4"
            >
              <span>{{ thumbnailSuccessMessage }}</span>
            </div>
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
      file: null,
      GenderEnum: {
        MALE: 0,
        FEMALE: 1,
        NON_BINARY: 2,
        NOT_KNOWN: 3,
      },
      errorMessage: '',
      successMessage: '',
      thumbnailErrorMessage: '',
      thumbnailSuccessMessage: '',
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
        fullName: this.fullName,
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
        this.successMessage = 'Profile updated!';
      } catch (error) {
        this.errorMessage = error.response.data.message[0];
      }
    },

    onFileChange(event) {
      this.file = event.target.files[0];
    },

    async uploadThumbnail() {
      if (!this.file) {
        this.thumbnailErrorMessage = 'Please select a file.';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      try {
        await axios.put(
          'http://localhost:3000/api/users/me/thumbnail-photo',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );

        this.thumbnailSuccessMessage = 'Thumbnail uploaded successfully!';
      } catch (error) {
        this.thumbnailErrorMessage = 'Failed to upload thumbnail.';
      }
    },
  },
};
</script>
