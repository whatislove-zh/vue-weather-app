import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: () => import("./pages/Home.vue"),
    },
    {
      name: "Favorite",
      path: "/favorite",
      component: () => import("./pages/Favorite.vue"),
    },
    {
      name: "Favorite",
      path: "/:name",
      component: () => import("./pages/CityInfo.vue"),
    },
  ],
});

createApp(App).use(router).mount("#app");
