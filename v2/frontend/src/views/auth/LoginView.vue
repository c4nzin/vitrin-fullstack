<template>
  <section class="h-screen">
    <!-- first section-->
    <!-- eslint-disable -->

    <div class="grid grid-cols-2 h-full border-0">
      <div class="flex flex-col justify-center items-center bg-white">
        <div class="w-full max-w-md">
          <div class="justify-center flex mb-3">
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

          <!--Form side-->
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
            <CustomButton text="Log in"></CustomButton>
          </form>
          <h2 class="text-sm text-right mt-4">
            If you are not a member, Please
            <a
              class="text-blue-500 text-sm hover:text-blue-950"
              href="/register"
              >Sign up</a
            >
            <div
              v-if="errorMessage"
              class="bg-red-700 text-white rounded-md flex justify-center items-center p-4"
            >
              <p>{{ errorMessage }}</p>
            </div>
          </h2>
        </div>
      </div>
      <!--second section-->
      <div class="flex justify-center bg-blue-500 text-white">
        <img
          src="../../assets/login-background.jpeg"
          class="rounded border-t- flex-col max-w-full max-h-[1000px]"
          alt=""
        />
      </div>
    </div>
  </section>
</template>

<script>
import CustomButton from '@/components/Button.vue';
import CustomInput from '@/components/Input.vue';
import { mapActions, mapState } from 'pinia';
import userStore from '@/store/userStore';

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
    ...mapActions(userStore, ['login']),
    async handleLogin() {
      try {
        await this.login(this.username, this.password);
        this.$router.push({ name: 'Profile' });
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message[0] ||
          'Login failed please check your information has given';
      }
    },
  },
  computed: {
    ...mapState(userStore, ['errorMessage']),
  },

  components: {
    CustomButton,
    CustomInput,
  },
};
</script>
