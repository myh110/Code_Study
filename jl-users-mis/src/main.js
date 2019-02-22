import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'
import './plugins/viewer.js'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // debugger
  // if(to.path === '/'){
  //   next({
  //     path: '/home'
  //   })
  // }else{
  //   next()
  // }
  //TODO: 页面校验登录？？？
  // if()
  /* next({
    path: '/login',
    query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
  }) */
  if(to.path  === from.path){
    next(false)
  }else{
    next();
  }

});

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
