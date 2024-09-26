import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/views/auth/RegisterView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import SendOtp from '@/views/auth/SendOtp.vue';
import VerifyOtp from '@/views/auth/VerifyOtp.vue';
import Profile from '@/views/user/Profile.vue';
import EditProfile from '@/views/user/EditProfile.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    name: 'Register',
    path: '/register',
    component: RegisterView,
    meta: {
      title: 'Register Page',
    },
  },
  {
    name: 'Login',
    path: '/login',
    component: LoginView,
    meta: {
      title: 'Login Page',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/user/edit',
    name: 'edit-profile',
    component: EditProfile,
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: '/send-otp',
    name: 'send-otp',
    component: SendOtp,
  },
  {
    path: '/verify-otp',
    name: 'Verify-Otp',
    component: VerifyOtp,
  },
  {
    path: '/user/me',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!document.cookie.includes('sessionId=');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
