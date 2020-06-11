
// import Vue from 'vue'
// import Router from 'vue-router'
// import defaultPage from '@/layout/default.vue'// 复用组件
// import blankPage from '@/layout/blank.vue'// login
// import Index from '@/page/index.vue'


// Vue.use(Router)

// export default new Router({
//   // mode: 'history',
//   mode: 'hash',
//   routes: [
//     {
//       path: '/',
//       name: 'default',
//       component: defaultPage,
//       redirect: '/index',
//       children: [{
//         path: 'index',
//         name: 'index',
//         component: () => import('../page/index')
//       }, {
//         path: 'changeCity',
//         name: 'changeCity',
//         component: () => import('../page/changeCity')
//       }, {
//         path: 'goods',
//         name: 'goods',
//         component: () => import("../page/goodsList"),
//         children:[
//           {
//             path: 'goods/:name',
//             name: 'goods',
//             component: () => import("../page/goodsList"),
//           }
//         ]
//       },
//       ]
//     }, {
//       path: 'blank',
//       name: 'blank',
//       component: () => import('../layout/blank'),
//       children:[
//         {
//           path:'blank/login',
//           name:'login',
//           component : () => import("../page/login")
//         },
//         {
//           path:'blank/register',
//           name:'register',
//           component : () => import("../page/register")
//         }
//       ]
//     }

//   ]
// })
import Vue from 'vue'
import Router from 'vue-router'
import defaultPage from '@/layout/default.vue'
import blankPage from '@/layout/blank.vue'
import goodsList from '@/page/goodsList.vue'
import Index from '@/page/index.vue'
import ChangeCity from '@/page/changeCity.vue'
import Login from '@/page/login.vue'
import Register from '@/page/register.vue'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'default',
      component: defaultPage,
      redirect: '/index',
      children: [{
        path: 's/:name',
        name: 'goods',
        component: goodsList
      }, {
        path: '/index',
        name: 'index',
        component: Index
      }, {
        path: '/changeCity',
        name: 'changeCity',
        component: ChangeCity
      }]
    }, {
      path: '/blank',
      name: 'blank',
      component: blankPage,
      children: [{
        path: 'login',
        name: 'login',
        component: Login
      }, {
        path: 'register',
        name: 'register',
        component: Register
      }]
    }
  ]
})

