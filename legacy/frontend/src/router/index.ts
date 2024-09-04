import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import { AUTH } from './router.constants'
import VerifyOtpView from '@/views/VerifyOtpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: `${AUTH}/register`,
      name: 'register',
      component: RegisterView
    },
    {
      path: `${AUTH}/login`,
      name: 'login',
      component: LoginView
    }, {
      path : `${AUTH}/verify-otp`,
      name : "verify-otp",
      component : VerifyOtpView
    }
  ]
})

export default router
