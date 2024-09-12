<template>
  <div class="h-screen">
    <div class="grid grid-cols-2">
      <div class="w-full max-w-md" id="left-side">
        <div class="flex justify-center items-center m-3 p-3">
          <form class="space-y-4">
            <CustomInput
              placeholder="Email"
              v-model="email"
              input-type="email"
            ></CustomInput>
            <CustomInput
              placeholder="OtpCode"
              v-model="otpCode"
              input-type="text"
            ></CustomInput>

            <CustomButton
              text="Verify Otp"
              @click.prevent="verifyOtp"
            ></CustomButton>
          </form>

          <div
            v-if="errorMessage"
            class="bg-red-500 text-white justify-center items-center rounded p-3 m-3"
          >
            <p>Error : {{ errorMessage }}</p>
          </div>
        </div>
      </div>
      <div class="h-screen flex justify-center items-center"></div>
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

  components: {
    CustomButton,
    CustomInput,
  },
};
</script>

<style></style>
