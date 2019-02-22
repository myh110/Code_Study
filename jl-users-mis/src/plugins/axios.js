"use strict";

import Vue from 'vue';
import axios from "axios";
import vm from '@/main'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
  
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    // console.log(response)
    if(response.data.status === 1){
      // response.data.content.msg = response.data.msg
      return response.data.body;
    }else if(response.data.status === 50001){//掉登录
      // vm.$router.push({ path: '/login', query: { redirect: encodeURIComponent(window.location.href) }})
      vm.$router.replace({ path: '/login'})
      vm.$store.dispatch("setLoginStatus", false);
      return Promise.reject(response.data)
      // return {}
    }else{
      setTimeout(() => {
        vm.$message.error(response.data.message);
      }, 0);
      return Promise.reject(response.data)
     
    }

  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
