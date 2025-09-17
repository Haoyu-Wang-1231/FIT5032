import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseLogin from '../views/FirebaseLogin.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import LogoutView from '@/views/LogoutView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/firebaseLogin',
    name: 'FirebaseLogin',
    component: FirebaseLogin
  },
  {
    path: '/firebaseRegister',
    name: 'FirebaseRegister',
    component: FirebaseRegisterView
  },{
    path: '/addBook',
    name: 'AddBook',
    component: AddBookView
  },{
    path: '/logout',
    name: 'Logout',
    component: LogoutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router