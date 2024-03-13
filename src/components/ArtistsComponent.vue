<template>
  <HeaderComponent songOrArtist='artist' @searchInfo="recept" />

  <section>
      <div v-if="artists.length > 0">
          <h1>Artistes</h1>
          <v-table theme="dark" class="table" hover>
            <thead>
              <tr>
                <th class="text-left">
                  Nom
                </th>
                <th class="text-left">
                  Type
                </th>
                <th class="text-left">
                  Pays
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="artist in artists"
                :key="artist.id"
              >
                  <td><a :href="`/artist/${artist.id}`">{{ artist.name }}</a></td>
                  <td><a :href="`/artist/${artist.id}`">{{ artist.type }}</a></td>
                  <td v-if="artist.area"><a :href="`/artist/${artist.id}`">{{ artist.area.name }}</a></td>
                  <td v-else><a :href="`/artist/${artist.id}`">Inconnu</a></td>
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
      artists: []
    }
  },
  methods: {
    msToMinSec(ms) {
      let minutes = Math.floor(ms / 60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    recept(data) {
      this.artists = data;
    }
  },
  components: {
		HeaderComponent
	}
}
</script>