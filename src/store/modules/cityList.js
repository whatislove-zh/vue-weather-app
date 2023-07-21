import axios from "axios";

//initial state
const state = {
  all: [],
  statusInfo: {
    loading: true,
    error: null,
  },
  quantityError: false,
};

//mutation
const mutations = {
  pushCity(state, { city }) {
    city.favorite = false;
    state.all.push(city);
  },
  filterCity(state, { id }) {
    state.all = state.all.filter((item) => item.city.id !== id);
  },
  changeErrorStatus(state, { status }) {
    state.quantityError = status;
  },
  setStatus(state, { loading, error }) {
    state.statusInfo = { loading, error };
  },
};

//actions
const actions = {
  async getCity({ commit, dispatch }, { lat, long }) {
    try {
      commit("setStatus", { loading: true, error: null });
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&lang=${"us"}&appid=${
          import.meta.env.VITE_API_WEATHER
        }`
      );
      //setTimeout(() => { //розкоментувати щоб побачити що лоадер дійсно є, бо дані надто швидко приходять
      dispatch("addCity", response.data);
      commit("setStatus", { loading: false, error: null });
      //}, 6000);
    } catch (error) {
      console.log({ error });
      commit("setStatus", {
        loading: false,
        error: error.response?.data?.message,
      });
    }
  },
  addCity({ state, commit }, city) {
    const isCity = state.all.find((el) => el.city.id === city.city.id);
    console.log(isCity);
    if (state.all.length >= 5 || isCity !== undefined) {
      commit("changeErrorStatus", { status: true });
    } else {
      commit("pushCity", { city });
    }
  },
  removeCity({ state, commit }, city) {
    commit("filterCity", { id: city.id });
    commit("changeErrorStatus", { status: true });
  },
};

export default {
  state,
  mutations,
  // getters,
  actions,
};
