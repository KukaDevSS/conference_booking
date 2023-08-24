import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/room/:roomNumber', // Use a dynamic parameter
    name: 'room',
    props: true,
    component: () => import('../views/Room1.vue')
  },
  {
    path: '/dashboard', // Use a dynamic parameter
    name: 'dashboard',
    component: () => import('../components/Dashbroad.vue'),
    children: [
      {
        path: '/add-room', // Use a dynamic parameter
        name: 'addroom',
        component: () => import('../components/CreateRoom.vue')
      },
    ]
  },
  
  
  // {
  //   path: '/room',
  //   name: 'room',
  //   props: true,
  //   component: () => import('../views/Room1.vue')
  // },
  // {
  //   path: '/room2',
  //   name: 'room2',
  //   component: () => import('../views/Room2.vue')
  // },
  // {
  //   path: '/room3',
  //   name: 'room3',
  //   component: () => import('../views/Room3.vue')
  // },
  {
    path: '/room1/bookform',
    name: 'bookform',
    component: () => import('../components/BookForm.vue')
  },
]


const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
