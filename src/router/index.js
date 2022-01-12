import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login'
import store from "../store"
import Main from '../components/Main'
import Comment from '../pages/Comment'
import ArticleDetail from '../pages/ArticleDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      },
      {
        path: '/articleDetail',
        name: 'ArticleDetail',
        component: ArticleDetail
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('route', to, from);
  if(to.path != '/login'){
    if(store.state.token){
      return next();
    }else {
      return next('/login');
    }
  }else {
    return next();
  }
})

export default router
