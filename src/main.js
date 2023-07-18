import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {

      path: "/",
      component: () => import("./pages/Home.vue"),
    },
    {

      path: "/favorite",
      component: () => import("./pages/Favorite.vue"),
    },
    {

      path: "/:name",
      component: () => import("./pages/CityInfo.vue"),
    },
  ],
});

createApp(App).use(router).mount("#app");
