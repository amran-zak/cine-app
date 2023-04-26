import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import FilmsPage from '../views/FilmsPage.vue'
import DetailFilmPage from '../views/DetailFilmPage.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/films',
      name: 'films',
      component: FilmsPage
    },
    {
      path: '/films/:id',
      name: 'detail-film',
      component: DetailFilmPage
    }
  ]
})

export default router
