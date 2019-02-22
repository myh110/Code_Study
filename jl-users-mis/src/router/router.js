import Vue from 'vue'
import Router from 'vue-router'
// import menus from "@/config/menus.js";

Vue.use(Router)

//整理路由配置的结构（所有路由权限）
// function generate() {
//   //TODO: 此处获取角色
//   let currentRole = 'admin';
//   let model = menus[currentRole];

//   return getRoute(model);
// }

// function getRoute(modes) {
//   let routes = [];
//   for (let item in modes) {
//     if (modes[item].subLink && modes[item].subLink.length > 0) {
//       routes = routes.concat(getRoute(modes[item].subLink));
//     } else {
//       routes.push(modes[item]);
//     }
//   }
//   return routes;
// }

const home = r => require.ensure([], () => r(require('@/components/pages/Home')), 'home');
// const about = r => require.ensure([], () => r(require('@/components/pages/About')), 'about')
// const navPage = r => require.ensure([], () => r(require('@/components/common/nav-page')), 'navPage')
const login = r => require.ensure([], () => r(require('@/components/pages/Login')), 'login')
// const create = r => require.ensure([], () => r(require('@/components/pages/CreateJl')), 'create')
const create = r => require.ensure([], () => r(require('@/components/pages/create/CreateJl')), 'create')


const router = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '主页',
      keepAlive: true
    },

    children: []
  },
  {
    path: '/create',
    name: 'create',
    component: create,
    meta: {
      title: '创建接龙',
    }, 
    children: []
  },
]

export default new Router({
  // mode: 'history',
  // base: '/app/',
  routes: router,
  // 跳转到顶部 || 浏览器 前进返回 跳转到记录位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
				from.meta.savedPosition = document.documentElement.scrollTop;
			}
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})