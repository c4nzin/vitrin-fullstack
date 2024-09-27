<template>
  <div class="h-screen bg-white">
    <div class="flex h-full items-center justify-center">
      <div class="w-full max-w-md">
        <div class="flex m-3 p-3">
          <form class="space-y-5">
            <div class="flex mb-3 justify-center">
              <img src="../../assets/logo.png" class="h-40 ml-6 mb-0" />
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
