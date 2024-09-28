<template>
  <TopBar />
  <div class="h-screen bg-white">
    <AppSidebar>
      <div class="flex h-full items-center justify-center">
        <div class="w-full max-w-md">
          <div class="flex m-3 p-3">
            <form class="space-y-5">
              <div class="flex mb-3 justify-center">
                <img src="../../assets/logo.png" class="h-40 ml-6 mb-0" />
              </div>
              <h1 class="text-2xl">
                Verify Your one time password that you have received
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

              <div
                v-if="successMessage"
                class="bg-green-500 text-white justify-center items-center rounded p-3 m-3"
              >
                {{ successMessage }}
              </div>

              <div
                v-if="errorMessage"
                class="bg-red-500 text-white justify-center items-center rounded p-3 m-3"
              >
                <p>Error : {{ errorMessage }}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppSidebar>
  </div>
</template>

<script>
import axios from 'axios';
import CustomButton from '@/components/Button.vue';
import CustomInput from '@/components/Input.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import TopBar from '@/components/TopBar.vue';

export default {
  data() {
    return {
      email: '',
      otpCode: '',
      errorMessage: '',
      successMessage: '',
    };
  },

  methods: {
    async verifyOtp() {
      try {
        await axios.post(
          'http://localhost:3000/api/users/update-email',
          {
            email: this.email,
            otpCode: this.otpCode,
          },
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message[0] || 'Failed to verify your otp.';
      }
    },
  },

  beforeMount() {
    document.title = 'Update Email';
  },

  components: {
    CustomButton,
    CustomInput,
    AppSidebar,
    TopBar,
  },
};
</script>

<style></style>
