import axios from 'axios';

const namespaced = true;

const state = {
  user: {},
  isLoggedIn: false,
};

const getters = {
  user: (state) => state.user,
  isLoggedIn: (state) => state.isLoggedIn,
};

const actions = {
  async loginUser({ dispatch }, user) {
    await axios.post('http://localhost:3000/api/auth/login', user);
    await dispatch('fetchUser');
  },

  async fetchUser({ commit }) {
    await axios.get('/user').then(({ data }) => commit('setUser', data));
  },
};

const mutations = {
  setUser(state, user) {
    state.isLoggedIn = true;
    state.user = user;
  },
  logoutUserState(state) {
    state.isLoggedIn = false;
    state.user = {};
  },
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
