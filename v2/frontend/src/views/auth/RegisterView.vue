<template>
  <section class="h-screen">
    <!-- eslint-disable -->
    <div class="grid grid-cols-2">
      <div class="flex mb-2 justify-center items-center ml-60 bg-white">
        <div class="w-full max-w-md">
          <div class="flex justify-center ml-8">
            <img src="../../assets/logo.png" class="h-40 mb-0" />
          </div>
          <form @submit.prevent="handleRegister" class="space-y-4">
            <CustomInput
              v-model="username"
              inputType="text"
              placeholder="Username"
            ></CustomInput>

            <CustomInput
              v-model="email"
              inputType="email"
              placeholder="Email"
            ></CustomInput>

            <CustomInput
              v-model="password"
              inputType="password"
              placeholder="Password"
            ></CustomInput>

            <CustomButton
              text="Sign Up"
              class="!bg-black hover:!bg-slate-900 transition ease-in-out delay-50"
            ></CustomButton>
          </form>

          <p class="text-sm text-gray-500 mt-4">
            By signing up, you agree that you accept our
            <a href="#" class="text-blue-900">Terms of Use</a>
          </p>
          <p class="mt-4 text-sm">
            Already a member?
            <router-link to="/login" class="text-blue-900">Login</router-link>
          </p>
          <h2 class="mt-4 text-lg text-white" v-if="errorMessage">
            {{ errorMessage }}
          </h2>
        </div>
      </div>

      <div
        class="bg-white flex justify-evenly items-center text-white relative"
      >
        <img
          src="https://static.vecteezy.com/system/resources/previews/030/635/433/non_2x/an-image-showcasing-a-beautifully-crafted-mosaic-artwork-against-a-textured-background-with-space-for-text-vertical-format-background-image-generative-ai-photo.jpg"
          class="rounded-2xl shadow-2xl shadow-black blur-md w-[600px] h-screen"
          alt=""
        />
        <h1 class="text-3xl font-bold absolute" id="slug">
          Welcome to Next generation book application.
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import CustomButton from '@/components/Button.vue';
import CustomInput from '@/components/Input.vue';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: '',
    };
  },

  methods: {
    async handleRegister() {
      try {
        await axios.post('http://localhost:3000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: 'Login' });
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || 'An error occurred';
        console.log(this.errorMessage);
      }
    },
  },

  components: {
    CustomButton,
    CustomInput,
  },

  mounted() {
    document.title = 'Register';
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

#slug {
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
