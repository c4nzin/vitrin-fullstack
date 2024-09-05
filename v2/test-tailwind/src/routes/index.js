import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "../components/HelloWorld.vue";

export const routes = [{ path: "/about", component: HomeView }];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
