<!-- 
  MusicsComponent.vue est un composant qui affiche les musiques en fonction de la recherche effectuée
 -->
<template>
  <!-- Header, l'event updateInfo permet de récupérer les données lorsque la recherche provient d'une autre page -->
  <HeaderComponent songOrArtist='song' @updateInfo="fetchSearchInfo" />

  <section>
    <div v-if="musics && musics.length > 0">
      <h1>Musique</h1>
      <v-table theme="dark" class="table" hover>
        <thead>
          <tr>
            <th class="text-left">
              Titre
            </th>
            <th class="text-left">
              Artiste
            </th>
            <th class="text-left">
              Date de sortie
            </th>
            <th class="text-left">
              Durée
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="music in musics" :key="music.id">
            <td><a :href="`/music/${music.id}`">{{ music.title }}</a></td>
            <td><a :href="`/music/${music.id}`">{{ music['artist-credit'][0].name }}</a></td>
            <td><a :href="`/music/${music.id}`">{{ music['first-release-date'] }}</a></td>
            <td><a :href="`/music/${music.id}`">{{ msToMinSec(music.length) }}</a></td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <div v-else class="no-search">
      <img src="../assets/loupe.png" alt="image d'une loupe qui représente la recherche">
      <h1>Effectuez une recherche dans la barre de recherche</h1>
    </div>
  </section>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue'

export default {
  data() {
    return {
      musics: []
    }
  },
  methods: {
    /**
     * Convertit les millisecondes en minutes et secondes
     */
    msToMinSec(ms) {
      let minutes = Math.floor(ms / 60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    /**
     * Récupère les informations de recherche dans le localStorage
     * les informations de recherche sont stockées dans le localStorage lorsqu'une recherche est effectuée
     * car nous changons de page et qu'il n'est pas possible de passer des données dans l'url
     */
    fetchSearchInfo() {
      this.musics = JSON.parse(localStorage.getItem('searchInfo'));
      localStorage.removeItem('searchInfo');
    }
  },
  components: {
    HeaderComponent
  },
  /**
   * Récupère les informations de recherche lors du montage du composant
   */
  mounted() {
    this.fetchSearchInfo(); 
  }
}
</script>