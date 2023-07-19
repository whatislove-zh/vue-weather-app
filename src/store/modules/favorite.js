//initial state
const state = {
    all: [],
  };
  
  //mutation
  const mutations = {
    addCity(state, { name }) {
      state.cityList.push({
        name,
      });
    },
    removeCity(state, { name }) {
      state.filter((item) => item.name === name);
    },
  };
  
  export default {
    state,
    mutations,
    // getters,
    // actions,
  };