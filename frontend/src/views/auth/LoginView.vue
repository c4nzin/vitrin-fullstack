<template>
  <section class="h-screen">
    <div class="grid grid-cols-2 h-full border-0">
      <div class="flex flex-col ml-60 justify-center items-center bg-white">
        <div class="w-full max-w-md">
          <div class="justify-center flex mb-3">
            <img src="../../assets/logo.png" class="h-40 mb-0" />
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <CustomInput
              v-model="username"
              placeholder="Username"
              type="text"
            ></CustomInput>
            <CustomInput
              v-model="password"
              placeholder="Password"
              type="password"
            ></CustomInput>
            <CustomButton
              text="Log in"
              class="!bg-black hover:!bg-slate-900 transition ease-in-out delay-50"
            ></CustomButton>
          </form>

          <div
            @click="handleGoogleLogin"
            class="flex items-center justify-center bg-white border border-gray-300 rounded-lg mt-4 py-2 px-4 cursor-pointer hover:shadow-md transition-all"
          >
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              alt="Google Logo"
              class="h-8 w-8 mr-2"
            />
            <span class="text-gray-600 font-medium">Log in with Google</span>
          </div>

          <h2 class="text-sm text-right mt-4">
            If you are not a member, Please
            <a
              class="text-black bold text-sm hover:text-blue-900"
              href="/register"
              >Sign up</a
            >
            <div
              v-if="errorMessage"
              class="bg-red-700 text-white rounded-md flex justify-center items-center p-4 mt-4"
            >
              <p>{{ errorMessage }}</p>
            </div>
          </h2>
        </div>
      </div>
      <div class="flex justify-evenly bg-white text-white relative">
        <img
          src="https://w0.peakpx.com/wallpaper/394/646/HD-wallpaper-face-art-beauty-colorful-design-female-girl-words.jpg"
          class="rounded-2xl shadow-2xl shadow-black blur-md w-[600px] h-screen"
          alt=""
        />
        <h2 class="absolute bottom-1/2 text-4xl text-gray-100">
          time to dive back in!
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import CustomButton from '@/components/Button.vue';
import CustomInput from '@/components/Input.vue';
import { mapActions, mapState } from 'pinia';
import loginStore from '@/store/loginStore';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },

  setup() {
    document.title = 'Login';
  },

  methods: {
    ...mapActions(loginStore, ['login']),
    async handleLogin() {
      try {
        await this.login(this.username, this.password);
        this.$router.push({ name: 'profile' });
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message[0] ||
          'Login failed, please check your information.';
      }
    },

    handleGoogleLogin() {
      window.location.href = 'http://localhost:3000/api/auth/google';
    },
  },
  computed: {
    ...mapState(loginStore, ['errorMessage']),
  },

  components: {
    CustomButton,
    CustomInput,
  },
};
</script>
