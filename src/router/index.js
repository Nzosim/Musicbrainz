import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import PageNotFound from '@/components/PageNotFound.vue'
import MusicsComponent from '@/components/MusicsComponent.vue'
import MusicInfoComponent from '@/components/MusicInfoComponent.vue'
import ArtistsComponent from '@/components/ArtistsComponent.vue'
import ArtistInfoComponent from '@/components/ArtistInfoComponent.vue'

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
      path: '/music',
      name: 'music',
      component: MusicsComponent
    },
    {
      path: '/artist',
      name: 'artist',
      component: ArtistsComponent
    },
    {
      path: '/music/:id',
      name: 'music-info',
      component: MusicInfoComponent
    },
    {
      path: '/artist/:id',
      name: 'artist-info',
      component: ArtistInfoComponent
    }
  ]
})

export default router
