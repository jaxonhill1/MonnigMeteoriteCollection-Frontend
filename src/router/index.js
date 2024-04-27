import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MeteoriteView from '../views/MeteoriteView.vue'
import SingleMeteorite from '../views/SingleMeteorite.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
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
      component: SingleMeteorite
    },
  ]
})

export default router
