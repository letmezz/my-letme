import Vue from "vue";
import Vuex from "vuex";
import storage from "@/storage/storage.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse:false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    username:''
  },
  mutations: {
    modifyCollapse(state){
      //修改collapse的值
      state.isCollapse = !state.isCollapse
      console.log(state.isCollapse)
      sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))//HTML5本地储存
    },
    SET_TOKEN(state,token){
      state.token = token;
      sessionStorage.setItem(token,JSON.parse(state.token));
      console.log(token)
    },
    SET_USERNAME(state,username){
        state.username = username;
        sessionStorage.setItem(username,JSON.parse(state.username))
        console.log(username + 'username存储')
    },
    DEL_TOKEN(state,token){
      state.token = '';
      sessionStorage.removeItem("token");    //删除token
    }
  },
  actions: {},
  modules: {
    
  }
});
