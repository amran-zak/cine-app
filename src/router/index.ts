import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomeView.vue'
import FilmsPage from '../views/FilmsPage.vue'
import DetailFilmPage from '../views/MoviesDetailsView.vue'
import ActorDetails from '../views/ActorDetailsView.vue'
import ActorsList from '../views/ActorListView.vue'



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
    },
    {
      path: '/actors',
      name: 'actors',
      component: ActorsList
    },
    {
      path: '/actors/:id',
      name: 'detail-actor',
      component: ActorDetails
    }
  ]
})

export default router
