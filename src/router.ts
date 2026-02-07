import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './HomePage.vue'
import ModulePage from './ModulePage.vue'

const router = createRouter({
  history: createWebHistory('/foundryvtt-modules/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/module/:id',
      name: 'module',
      component: ModulePage
    }
  ]
})

export default router
