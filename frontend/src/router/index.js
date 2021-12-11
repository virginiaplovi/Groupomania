import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import OnePost from '../views/OnePost.vue'
import EditPost from '../views/EditPost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      isLog: true,
      requiresAuth: false,
      title: 'Groupomania | Login'
    }
  },
  {
    path: '/signup',
    name: 'Register',
    component: Signup,
    meta: {
      isLog: true,
      requiresAuth: false,
      title: 'Groupomania | Signup'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      title: 'Groupomania | Home'
    },
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
      title: 'Groupomania | Profile'
    }
  },
  {
    path: '/post/:id',
    name: 'OnePost',
    component: OnePost,
    meta: {
      requiresAuth: true,
      title: 'Groupomania | Post'
    }
  },
  {
    path: '/edit/:id',
    name: 'EditPost',
    component: EditPost,
    meta: {
      requiresAuth: true,
      title: 'Groupomania | Edit your Post'
    },
  },

]

const router = new VueRouter({
  routes
})

// Meta Handling
//check if not log redirect to login page
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
//if islog redirect to home page
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLog)) {
    if (localStorage.getItem('jwt')) {
      next({
        path: '/home',
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
