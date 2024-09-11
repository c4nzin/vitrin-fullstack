import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/views/auth/RegisterView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import UserProfile from '@/views/user/UserProfile.vue';
import SendOtp from '@/views/auth/SendOtp.vue';

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
    name: 'login',
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
    name: 'Profile',
    component: UserProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/send-otp',
    name: 'send-otp',
    component: SendOtp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!document.cookie.includes('sessionId=');

//   if (
//     to.matched.some((record) => record.meta.requiresAuth) &&
//     !isAuthenticated
//   ) {
//     next({ name: 'Login' });
//   } else {
//     next();
//   }
// });

export default router;
