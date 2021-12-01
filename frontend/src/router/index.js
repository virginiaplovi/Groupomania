import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
      title: 'Groupomania | Login'
    }
  },
  {
    path: '/signup',
    name: 'Register',
    component: Signup,
    meta: {
      requiresAuth: false,
      title: 'Groupomania | Signup'}
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      title: 'Groupomania | Home'
    },
    children: [
      {
        path: '/profile/:id',
        name: 'Profile',
        components: {
          a: Profile},
        meta: {
          requiresAuth: true,
          title: 'Groupomania | Profile'
        }
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

// Meta Handling
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    } else {
    next()
  }
}
else {
  next()
}
})

export default router
