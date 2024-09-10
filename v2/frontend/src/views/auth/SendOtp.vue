<template>
  <!--left section-->
  <div class="h-screen bg-white">
    <div class="flex h-full justify-center items-center">
      <div class="w-full max-w-md">
        <h1 class="mb-4 text-3xl font-bold">
          Please verify your account by providing your email and you are good to
          go.
        </h1>
        <form @submit.prevent="sendOtpCode">
          <CustomInput
            class="bg-white text-black focus:border-cyan-400 shadow-sm focus:shadow-cyan-300"
            v-model="email"
            required
            placeholder="Email"
            type="text"
          ></CustomInput>

          <div
            v-if="errorMessage"
            class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
          >
            <p>{{ errorMessage }}</p>
          </div>

          <CustomButton class="mt-5" text="Send Otp"></CustomButton>
        </form>

        <h2 class="mt-5 justify-between">
          After you request the OTP code, you'll be immediately redirected to
          the OTP verification page.
          <span class="underline font-medium">
            Please check your email inbox as we'll send the OTP code to your
            address.
          </span>
        </h2>
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
      email: '',
      errorMessage: '', // Hata mesajı için
    };
  },

  methods: {
    async sendOtpCode() {
      try {
        this.errorMessage = '';

        await axios.post('http://localhost:3000/api/auth/send-otp', {
          email: this.email,
        });
      } catch (error) {
        this.errorMessage = error.response.data.message[0]; //getting the first error message from my beatiful backend
      }
    },
  },

  components: {
    CustomInput,
    CustomButton,
  },

  beforeMount() {
    document.title = 'Send Otp';
  },
};
</script>
