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
                v-if="user.data"
                :src="user.data.profilePicture || pushProfilePhoto"
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
              @{{ user.data ? user.data.username : 'Loading...' }}
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
              <div class="text-2xl font-semibold">
                {{ user.data.follower.length }}
              </div>
              <div class="text-sm text-gray-500">Followers</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-semibold">
                {{ user.data.follow.length }}
              </div>
              <div class="text-sm text-gray-500">Followings</div>
            </div>
          </div>
        </div>
      </div>
      <section class="h-full mt-8 mx-10">
        <div v-if="posts.length === 0" class="text-center text-gray-500">
          No posts available
        </div>
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </section>
    </section>
  </AppSidebar>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';
import CustomButton from '@/components/Button.vue';
import TopBar from '@/components/TopBar.vue';
import PostCard from '@/components/PostCard.vue';
import userStore from '@/store/userStore';
import { usePostStore } from '@/store/postStore';
import getMonthsUtil from '@/utils/get-months.util';

export default {
  components: {
    AppSidebar,
    TopBar,
    CustomButton,
    PostCard,
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
      },
    };
  },
  async created() {
    const postStore = usePostStore();
    const useUserStore = userStore();

    await useUserStore.fetchUser();
    await postStore.fetchPosts(useUserStore.user.data._id);
    await useUserStore.fetchFollowers(useUserStore.user.data._id);

    this.posts = postStore.allPosts;
  },
  computed: {
    user() {
      const useUserStore = userStore();
      // console.log(useUserStore.user.data.follower);
      return useUserStore.user;
    },

    //errorları engellemek için geçici sonra bunu kaldır unutma!!!
    pushProfilePhoto() {
      return 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=';
    },

    posts() {
      const postStore = usePostStore();
      console.log(postStore.posts);
      return postStore.allPosts;
    },

    //not working rn
    followers() {
      const followers = userStore();
      console.log(followers.fetchAllFollowers);
      return followers.fetchAllFollowers;
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
