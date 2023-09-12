import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const isAuthenticated = () => {
  const authToken = localStorage.getItem('authToken'); // Replace with your actual token/key name
  return authToken !== null; // Check if the user is authenticated
};


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        // If the user is authenticated, allow access to the route
        next();
      } else {
        // If the user is not authenticated, redirect to the login page
        next('/login');
      }
    },
    children: [
      {
        path: '/add-room', // Use a dynamic parameter
        name: 'addroom',
        component: () => import('../components/CreateRoom.vue')
      },
      {
        path: '/all', // Use a dynamic parameter
        name: 'all',
        component: () => import('../components/HomeDash.vue')
      },
      {
        path: '/table', // Use a dynamic parameter
        name: 'table',
        component: () => import('../components/TableDash.vue')
      },
    ]
  },
  {
    path: '/booking/:id/update',
    name: 'update',
    component: () => import('../components/UpdateBook.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login_Page.vue')
  },
  {
    path: '/form/:roomNumber',
    name: 'form',
    props: true,
    component:() => import('../components/BookingForm.vue')
  },
  {
    path: '/updateroom/:id/:roomNumber',
    name: 'updateroom',
    component:() => import('../components/UpdateRoom.vue')
  }
]


const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
