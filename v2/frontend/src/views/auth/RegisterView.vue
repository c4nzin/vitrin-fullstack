<template>
  <section class="h-screen">
    <!-- eslint-disable -->
    <div class="grid grid-cols-2 h-full border-b-0">
      <div class="flex mb-2 justify-center items-center bg-white">
        <div class="w-full max-w-md">
          <div class="flex justify-center mb-3">
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
          <form @submit.prevent="handleRegister()" class="space-y-4">
            <div>
              <input
                v-model="username"
                type="text"
                placeholder="Username"
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:font-bold"
              />
            </div>
            <div>
              <input
                v-model="email"
                type="email"
                placeholder="Email address"
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:font-bold"
              />
            </div>
            <div>
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:font-bold"
              />
            </div>
            <div>
              <button
                type="submit"
                class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-800 text-lg"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p class="text-sm text-gray-500 mt-4">
            By signing up, you agree that you accept our
            <a href="#" class="text-blue-500">Terms of Use</a>
          </p>
          <p class="mt-4 text-sm">Already a member? <a href="#" class="text-blue-500">Login</a></p>
          <h2 class="mt-4 text-lg text-white" v-if="errorMessage">{{ errorMessage }}</h2>
        </div>
      </div>

      <div class="bg-blue-500 flex justify-center items-center text-white">
        <h1 class="text-3xl font-bold text-5xl" id="slug">
          Have you miss the old twitter? So do i.
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

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
      } catch (error) {
        this.errorMessage = error.response.message;
        console.log(this.errorMessage);
        throw new Error(error);
      }
    },
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
