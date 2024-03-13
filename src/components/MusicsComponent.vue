<template>
  <HeaderComponent songOrArtist='song' @searchInfo="recept"/>

  <section>
      <div v-if="musics.length > 0">
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
              <tr
                v-for="music in musics"
                :key="music.id"
              >
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
    msToMinSec(ms) {
      let minutes = Math.floor(ms / 60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    recept(data) {
      this.musics = data;
    }
  },
  components: {
		HeaderComponent
	}
}
</script>