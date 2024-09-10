<template>
  <!--left section-->
  <div class="h-screen bg-white">
    <div class="flex h-full justify-center items-center">
      <div class="w-full max-w-md">
        <h1 class="mb-4 text-3xl font-bold">
          Please to verify your account provide your email and you are good to
          go.
        </h1>
        <form>
          <CustomInput
            class="bg-white text-black focus:border-cyan-400 shadow-sm focus:shadow-cyan-300"
            v-model="email"
            placeholder="Email"
            type="text"
          ></CustomInput>
        </form>
        <CustomButton
          @click.prevent="sendOtpCode"
          class="mt-5"
          text="Send Otp"
        ></CustomButton>

        <h2 class="mt-5 justify-between">
          After you request otp code, you'll immediately redirect to otp
          verification page.
          <span class="underline font-medium"
            >Please check your email inbox we'll send otp code to your
            address.</span
          >
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
    };
  },

  methods: {
    async sendOtpCode() {
      try {
        await axios.post('http://localhost:3000/api/auth/send-otp', {
          email: this.email,
        });
      } catch (error) {
        throw new Error(error);
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
