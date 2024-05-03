import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MeteoriteView from '../views/MeteoriteView.vue'
import SingleMeteoriteView from '../views/SingleMeteoriteView.vue'
import LoginView from '../views/LoginView.vue'
import LoanView from '../views/loans/LoanView.vue'

import LoanDetails from '@/views/loans/LoanDetails.vue'
import MeteoriteDetails from '@/components/MeteoriteDetails.vue'

import UpdateLoan from '@/views/loans/UpdateLoan.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    // meteorite routes --------------------------------------------------------------------

    {
      path: '/meteorites',
      name: 'meteorites',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: MeteoriteView
    },
    {
      path: '/meteorites/:id',
      name: 'single-meteorite',
      component: SingleMeteoriteView
    },
    {
      path: '/meteorites/:id',
      name: 'MeteoriteDetails',
      component: MeteoriteDetails
    },

    // login ------------------------------------------------------------------------

    {
      path: '/login',
      name: 'login',
      component: LoginView
    },

    // loans -------------------------------------------------------------------------

    {
      path: '/loans',
      name: 'loans',
      component: LoanView
    },
    {
      path: '/loans/:id',
      name: 'LoanDetails',
      component: LoanDetails
    },
    {
      path: '/loans/update/:id',
      name: 'update-loan',
      component: UpdateLoan
    },
  ]
})

export default router
