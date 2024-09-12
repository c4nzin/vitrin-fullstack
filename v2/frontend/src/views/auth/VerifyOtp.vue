<template>
  <div class="h-screen bg-white">
    <div class="flex h-full items-center justify-center">
      <div class="w-full max-w-md">
        <div class="flex m-3 p-3">
          <form class="space-y-5">
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
            <h1 class="text-2xl">
              Verify Your one time password that you have received. By doing
              this you'll able to login your account.
            </h1>
            <CustomInput
              placeholder="Email"
              v-model="email"
              input-type="email"
            ></CustomInput>
            <CustomInput
              placeholder="One Time Password"
              v-model="otpCode"
              input-type="text"
            ></CustomInput>

            <CustomButton
              text="Submit"
              @click.prevent="verifyOtp"
            ></CustomButton>

            <p>
              If you facing with any problem please contact with us via using
              <span class="underline">our support team.</span>
            </p>
          </form>

          <div
            v-if="errorMessage"
            class="bg-red-500 text-white justify-center items-center rounded p-3 m-3"
          >
            <p>Error : {{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CustomButton from '@/components/Button.vue';
import CustomInput from '@/components/Input.vue';

export default {
  data() {
    return {
      email: '',
      otpCode: '',
      errorMessage: '',
    };
  },

  methods: {
    async verifyOtp() {
      try {
        await axios.post('http://localhost:3000/api/auth/verify-otp', {
          email: this.email,
          otpCode: this.otpCode,
        });
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message[0] || 'Failed to verify your otp.';
      }
    },
  },

  beforeMount() {
    document.title = 'Verify Otp';
  },

  components: {
    CustomButton,
    CustomInput,
  },
};
</script>

<style></style>
