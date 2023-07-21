const localData = localStorage.getItem("favoriteList");

//initial state
const state = {
  favoriteList: localData === null ? [] : JSON.parse(localData),
  favoriteOverload: false,
};

//mutation
const mutations = {
  pushFavorite(state, { city }) {
    city.favorite = true;
    state.favoriteList.push(city);
  },
  filterFavorite(state, { id }) {
    state.favoriteList = state.favoriteList.filter(
      (item) => item.city.id !== id
    );
  },
  favoriteOverloadStatus(state, { status }) {
    state.favoriteOverload = status;
  },
};

//actions
const actions = {
  addFavorite({ state, commit }, city) {
    if (state.favoriteList.length >= 5) {
      commit("favoriteOverloadStatus", { status: true });
    } else {
      commit("pushFavorite", { city });
      localStorage.setItem("favoriteList", JSON.stringify(state.favoriteList));
    }
  },
  removeFavorite({ state, commit }, city) {
    commit("favoriteOverloadStatus", { status: false });
    commit("filterFavorite", { id: city.id });
    localStorage.setItem("favoriteList", JSON.stringify(state.favoriteList));
  },
};

export default {
  state,
  mutations,
  // getters,
  actions,
};
