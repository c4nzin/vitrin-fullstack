<template>
  <AppSidebar>
    <div
      class="min-h-screen flex flex-col lg:flex-row justify-center items-center"
    >
      <TopBar />

      <div
        class="flex flex-col lg:flex-row lg:space-x-8 w-full max-w-4xl mt-8 lg:mt-0 bg-white p-6 rounded-lg shadow-md"
      >
        <form @submit.prevent="submitEdit" class="flex-1 space-y-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Edit Profile
          </h2>

          <label class="text-sm font-medium !text-gray-600">Username</label>
          <CustomInput v-model="username" :placeholder="user.data.username" />

          <label class="text-sm font-medium text-gray-600">Full Name</label>
          <CustomInput v-model="fullName" :placeholder="user.data.fullName" />

          <label class="text-sm font-medium text-gray-600">Biography</label>
          <CustomInput
            v-model="bio"
            :placeholder="user.data.bio"
            v-text="user.data.bio"
          />

          <label class="text-sm font-medium text-gray-600">Gender</label>
          <select
            v-model="gender"
            class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option :value="GenderEnum.MALE">Male</option>
            <option :value="GenderEnum.FEMALE">Female</option>
            <option :value="GenderEnum.NON_BINARY">Non-binary</option>
            <option :value="GenderEnum.NOT_KNOWN">Not Known</option>
          </select>

          <label class="text-sm font-medium text-gray-600">Website</label>
          <CustomInput
            v-model="user.data.website"
            :placeholder="user.data.website"
          />

          <div
            v-if="errorMessage"
            class="bg-red-100 text-red-700 rounded-md p-3 mt-4"
          >
            <span>{{ errorMessage }}</span>
          </div>

          <div
            v-if="successMessage"
            class="bg-green-100 text-green-700 rounded-md p-3 mt-4"
          >
            <span>{{ successMessage }}</span>
          </div>

          <CustomButton class="mt-6" text="Update Profile" />

          <div class="flex flex-col mt-6 space-y-2">
            <router-link
              :to="{ name: 'SendEmail' }"
              class="text-sm font-medium text-blue-500 hover:underline"
            >
              Update Email
            </router-link>

            <router-link
              :to="{ name: 'ChangePassword' }"
              class="text-sm font-medium text-blue-500 hover:underline"
            >
              Change Password
            </router-link>
          </div>
        </form>

        <div class="flex-1 space-y-6">
          <form
            @submit.prevent="uploadThumbnail"
            class="flex flex-col bg-gray-100 p-4 rounded-lg shadow-inner"
          >
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Update Thumbnail Photo
            </h3>
            <input
              type="file"
              @change="onFileChange"
              accept="image/*"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <CustomButton class="mt-4" text="Upload Thumbnail" />

            <div
              v-if="thumbnailErrorMessage"
              class="bg-red-100 text-red-700 rounded-md p-3 mt-4"
            >
              <span>{{ thumbnailErrorMessage }}</span>
            </div>

            <div
              v-if="thumbnailSuccessMessage"
              class="bg-green-100 text-green-700 rounded-md p-3 mt-4"
            >
              <span>{{ thumbnailSuccessMessage }}</span>
            </div>
          </form>

          <form
            @submit.prevent="uploadProfilePicture"
            class="flex flex-col bg-gray-100 p-4 rounded-lg shadow-inner"
          >
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Update Profile Picture
            </h3>
            <input
              type="file"
              @change="onFileChange"
              accept="image/*"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <CustomButton class="mt-4" text="Upload Profile Picture" />

            <div
              v-if="profilePictureErrorMessage"
              class="bg-red-100 text-red-700 rounded-md p-3 mt-4"
            >
              <span>{{ profilePictureErrorMessage }}</span>
            </div>

            <div
              v-if="profilePictureSuccessMessage"
              class="bg-green-100 text-green-700 rounded-md p-3 mt-4"
            >
              <span>{{ profilePictureSuccessMessage }}</span>
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
      profilePicture: null,
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
      profilePictureErrorMessage: '',
      profilePictureSuccessMessage: '',
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
        await axios.patch('http://localhost:3000/api/account/update', body, {
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
          'http://localhost:3000/api/account/me/thumbnail-photo',
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

    async uploadProfilePicture() {
      if (!this.file) {
        this.profilePictureErrorMessage = 'Please select a file.';
      }

      const formData = new FormData();

      formData.append('file', this.file);

      try {
        await axios.post(
          'http://localhost:3000/api/account/me/profile-photo',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );

        this.profilePictureSuccessMessage =
          'Profile picture uploaded successfully!';
      } catch (error) {
        this.profilePictureErrorMessage = 'Failed to upload profile picture!';
      }
    },
  },
};
</script>
