import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import store from "./store";
import { createRouter, createWebHistory } from "vue-router";
import SpinnerLoaderVue from "./components/SpinnerLoader.vue";
import SearchVue from "./components/Search.vue";
import CityListVue from "./components/CityList.vue";
import CityCardVue from "./components/CityCard.vue";

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
  ],
});

const app = createApp(App);
app.use(router);
app.use(store);
app.component("SpinnerLoaderVue", SpinnerLoaderVue);
app.component("Search", SearchVue);
app.component("CityList", CityListVue);
app.component("CityCard", CityCardVue);
app.mount("#app");
