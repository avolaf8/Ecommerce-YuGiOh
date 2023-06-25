import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Checkout from '../views/Checkout.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    }
  ]
})

router.beforeEach((to, from, next)=>{
  const isLogin = !!localStorage.getItem('access_token')
  if(isLogin && to.path === '/checkout'){
    next()
  } else if(isLogin && (to.path === '/login' || to.path === '/register')){
    next('/')
  } else if(!isLogin && to.path == '/detail'){
    next('/')
  }else{
    next()
  }
})

export default router
