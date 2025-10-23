import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseLogin from '../views/FirebaseLogin.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import LogoutView from '@/views/LogoutView.vue'
import GetBooksView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'

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
  },{
    path: '/getBooksCount',
    name: 'GetBooksCount',
    component: GetBooksView
  },{
    path: '/weatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },{
    path: '/countBookAPI',
    name: 'CountBookAPI',
    component:CountBookAPI
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router