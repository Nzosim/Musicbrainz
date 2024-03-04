import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import PageNotFound from '@/components/PageNotFound.vue'
import ArtistComponent from '@/components/ArtistComponent.vue'
import MusicComponent from '@/components/MusicComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: PageNotFound
    },
    {
      path: '/artist',
      name: 'artist',
      component: ArtistComponent
    },
    {
      path: '/music',
      name: 'music',
      component: MusicComponent
    }
  ]
})

export default router
