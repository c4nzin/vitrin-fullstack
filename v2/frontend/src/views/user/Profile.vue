<template>
  <AppSidebar>
    <TopBar />
    <section class="h-screen">
      <div class="flex mb-2 justify-center h-full items-center bg-white">
        <div
          class="w-[1000px] h-screen mt-0 bg-white border-4 rounded drop-shadow-2xl shadow-black"
        >
          <div class="flex w-full h-64 relative rounded">
            <img
              class="w-full rounded"
              src="https://c4.wallpaperflare.com/wallpaper/390/7/649/cartoon-gun-minigun-illustration-wallpaper-preview.jpg"
              alt="background image"
            />
            <div
              class="flex items-center space-x-4 absolute bottom-[-70px] ml-10"
            >
              <img
                :src="user.data.profilePicture"
                class="w-40 h-40 rounded-full border-4"
                alt="profile image"
              />
            </div>
          </div>

          <div class="flex flex-col items-center mt-6">
            <div class="text-2xl font-semibold">
              {{ exampleUserData.fullName }}
            </div>
            <div class="text-xl text-gray-500">
              @{{ user ? user.data.username : 'Loading...' }}
            </div>
            <div class="text-lg text-gray-400 mt-1">
              Joined at {{ convertTime().month }} {{ convertTime().year }}
            </div>
          </div>

          <div class="flex justify-center items-center space-x-4 mt-8 mx-10">
            <CustomButton
              class="text-sm py-2 px-4 !text-black !bg-white !border-2 hover:!bg-slate-300 font-bold"
              text="Edit Profile"
            />
            <CustomButton
              class="text-sm py-2 px-4 !text-black !bg-white !border-2 hover:!bg-slate-300 font-bold"
              text="Statistics"
            />
          </div>

          <div class="flex justify-evenly items-center mt-10">
            <div class="text-center">
              <div class="text-2xl font-semibold">{{ statistics.posts }}</div>
              <div class="text-sm text-gray-500">Post</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-semibold">
                {{ statistics.movies }}
              </div>
              <div class="text-sm text-gray-500">Movie</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-semibold">
                {{ statistics.series }}
              </div>
              <div class="text-sm text-gray-500">Serie</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-semibold">{{ statistics.books }}</div>
              <div class="text-sm text-gray-500">Book</div>
            </div>
          </div>
        </div>
      </div>
      <section class="h-full">post section</section>
    </section>
  </AppSidebar>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';
import CustomButton from '@/components/Button.vue';
import TopBar from '@/components/TopBar.vue';
import userStore from '@/store/userStore';
import getMonthsUtil from '@/utils/get-months.util';

export default {
  components: {
    AppSidebar,
    TopBar,
    CustomButton,
  },
  data() {
    return {
      exampleUserData: {
        username: 'silentwarrior',
        fullName: 'Can Sön',
      },
      statistics: {
        posts: 120,
        movies: 30,
        series: 3,
        books: 1200,
      },
    };
  },
  async created() {
    const useUserStore = userStore();
    await useUserStore.fetchUser();
  },
  computed: {
    user() {
      const useUserStore = userStore();
      return useUserStore.user;
    },
  },
  methods: {
    convertTime() {
      const date = new Date(Date.now());
      return {
        year: date.getFullYear(),
        month: getMonthsUtil(),
      };
    },
  },
};
</script>
