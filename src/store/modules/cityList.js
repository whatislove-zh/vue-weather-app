//initial state
const state = {
  all: [],
  quantityError: false,
};

//mutation
const mutations = {
  pushCity(state, { city }) {
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
