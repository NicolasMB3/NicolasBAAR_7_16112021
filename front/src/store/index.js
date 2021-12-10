import Vue from "vue";
import Vuex from "vuex";

import UserServices from "@/services/UserServices";
import PostServices from "@/services/PostServices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: {},
    UserId: null,
    isUserLoggedIn: false,
    message: [],
    posts: [],
    
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setUserId(state, UserId) {
      state.UserId = UserId;
    },
    setMessage(state, message) {
      state.message = message;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_USER_ID(state, user) {
      state.user = user;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUserId({ commit }, UserId) {
      commit("setUserId", UserId);
    },
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },

    fetchAccessToken({ commit }) {
      commit("setToken", localStorage.getItem("accessToken"));
      
    },
    setMessage({ commit }, message) {
      commit("setMessage", message);
    },
    
    getOneUser({ commit }) {
      let id = this.$route.params.id;
      const response = UserServices.getOneUser(id);
      const user = response.data;
      commit("SET_USER_ID", user);
      console.log(response);
    },
    async getPosts({ commit }) {
      const response = await PostServices.getAllPosts();
      const posts = response.data.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
      commit("SET_POSTS", posts);
      console.log(response);
    },
  },
  modules: {},
});
