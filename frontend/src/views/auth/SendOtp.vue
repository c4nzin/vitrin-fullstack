<template>
  <!--left section-->
  <div class="h-screen bg-white">
    <div class="flex h-full justify-center items-center">
      <div class="w-full max-w-md">
        <div class="flex mb-3 justify-center">
          <img src="../../assets/logo.png" class="ml-8 mb-0" />
        </div>
        <h1 class="mb-4 text-3xl font-bold">
          Please verify your account by providing your email and you are good to
          go.
        </h1>
        <form @submit.prevent="waitBeforeRedirect">
          <div class="relative flex mb-5 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25"
              height="25"
              class="absolute left-3"
            >
              <path
                d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
            <CustomInput
              class="bg-white text-black focus:border-black shadow-sm focus:shadow-gray-300 pl-10"
              v-model="email"
              required
              placeholder="Email"
              type="text"
            ></CustomInput>
          </div>

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
      errorMessage: '',
    };
  },

  methods: {
    async sendOtpCode() {
      try {
        this.errorMessage = '';

        await axios.post('http://localhost:3000/api/otp/send-otp', {
          email: this.email,
        });
      } catch (error) {
        this.errorMessage = error.response.data.message[0];
      }
    },

    async waitBeforeRedirect(timeToRedirect = 1000) {
      await this.sendOtpCode();

      setTimeout(() => {
        this.$router.push({ name: 'Verify-Otp' });
      }, timeToRedirect);
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
