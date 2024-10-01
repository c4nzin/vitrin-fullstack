<template>
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
                Please provide otp code and new password to save your account.
              </h1>
              <CustomInput
                placeholder="One Time Password (OTP)"
                v-model="otpCode"
                input-type="text"
              ></CustomInput>

              <CustomInput
                placeholder="Email"
                v-model="email"
                input-type="email"
              ></CustomInput>

              <CustomInput
                placeholder="New Password"
                v-model="newPassword"
                input-type="password"
              ></CustomInput>

              <CustomButton
                text="Submit"
                @click.prevent="changePassword"
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

export default {
  data() {
    return {
      newPassword: '',
      otpCode: '',
      email: '',
      errorMessage: '',
      successMessage: '',
    };
  },

  methods: {
    async changePassword() {
      try {
        await axios.post('http://localhost:3000/api/users/reset-password', {
          otpCode: this.otpCode,
          newPassword: this.newPassword,
          email: this.email,
        });

        this.successMessage = 'Password has been changed!';
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || 'Failed to change your password.';
      }
    },
  },

  beforeMount() {
    document.title = 'Change Password';
  },

  components: {
    CustomButton,
    CustomInput,
    // AppSidebar,
    // TopBar,
  },
};
</script>
