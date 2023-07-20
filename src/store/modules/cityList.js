import axios from "axios";

//initial state
const state = {
  all: [],
  quantityError: false,
};

//mutation
const mutations = {
  pushCity(state, { city }) {
    city.favorite = false;
    state.all.push(city);
  },
  filterCity(state, { id }) {
    state.all.filter((item) => item.id === id);
  },
  changeErrorStatus(state, { status }) {
    state.quantityError = status;
  },
};

//actions
const actions = {
  async getCity({ commit, dispatch }, { lat, long }) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&lang=${"us"}&appid=${
          import.meta.env.VITE_API_WEATHER
        }`
      );
      dispatch("addCity", response.data);
      return { loading: false, error: null };
    } catch (error) {
      return { loading: false, error: error.response.data.message };
    }
  },
  addCity({ state, commit }, city) {
    if (state.all.length >= 5) {
      commit("changeErrorStatus", { status: true });
    } else {
      commit("pushCity", { city });
    }
  },
  removeCity({ state, commit }, city) {
    commit("changeErrorStatus", { status: true });
    commit("filterCity", { city: city.id });
  },
};

export default {
  state,
  mutations,
  // getters,
  actions,
};
