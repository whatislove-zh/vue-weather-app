import { createStore } from "vuex";
import cityList from "./modules/cityList";
import favorite from "./modules/favorite";

export default createStore({
  modules: {
    cityList,
    favorite,
  },
});
