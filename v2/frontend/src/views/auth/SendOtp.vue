<template>
  <!--left section-->
  <div class="h-screen bg-white">
    <div class="flex h-full justify-center items-center">
      <div class="w-full max-w-md">
        <div class="flex mb-3 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-10 h-10 text-blue-500"
          >
            <path
              d="M23.954 4.569c-.885.392-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.173-1.555-3.591-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .386.043.762.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.423.722-.666 1.561-.666 2.475 0 1.71.87 3.216 2.188 4.099-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.316 0-.624-.03-.927-.087.626 1.955 2.444 3.379 4.6 3.42-1.68 1.318-3.808 2.104-6.102 2.104-.396 0-.788-.023-1.175-.068 2.179 1.397 4.768 2.211 7.557 2.211 9.054 0 14-7.504 14-14 0-.213-.005-.425-.015-.636.964-.695 1.8-1.562 2.46-2.549z"
            />
          </svg>
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
              class="bg-white text-black focus:border-cyan-400 shadow-sm focus:shadow-cyan-300 pl-10"
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

        await axios.post('http://localhost:3000/api/auth/send-otp', {
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
