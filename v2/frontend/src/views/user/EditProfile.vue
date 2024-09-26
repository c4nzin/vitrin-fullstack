<template>
  <div class="h-screen">
    <div class="grid mb-2 grid-cols-2 justify-center">
      <div class="items-center justify-center h-screen w-screen bg-red-500">
        <!--lOGO -->

        <div class="flex flex-row space-y-6 w-full justify-center grid-cols-2">
          <form @submit.prevent="submitEdit">
            <label class="text-lg">Username</label>
            <CustomInput placeholder="username" />

            <label class="text-lg">Username</label>
            <CustomInput placeholder="username" v-model="username" />

            <label class="text-lg">Name</label>
            <CustomInput placeholder="username" v-model="fullName" />

            <label class="text-lg">Email</label>
            <CustomInput
              placeholder="exampe@gmail.com"
              type="email"
              v-model="email"
            />

            <label class="text-lg">Username</label>
            <CustomInput placeholder="username" />

            <
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from '@/components/Input.vue';
import CustomButton from '@/components/Button.vue';
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      fullName: '',
    };
  },

  components: {
    CustomInput,
    CustomButton,
  },

  methods: {
    async submitEdit() {
      const respnose = await axios.patch('http://localhost:3000/api/users/me');
    },
  },
};
</script>
