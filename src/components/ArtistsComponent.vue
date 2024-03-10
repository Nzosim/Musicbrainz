<template>
  <header>
    <div> 
      <a href="/"><img src="../assets/logo.png" ></a>
      <h1>SEARCH SONG - YOUR FAVORITE SONG AND ARTIST </h1>
    </div>
    <div> 
      <input v-model="search" type="text" placeholder="Rechercher un artiste...">&nbsp;
      <button @click="searchArtists">Rechercher</button>
    </div>
  </header>

  <section v-if="errored">
      <p>Désolé, nous n'avons pas pu accéder au serveur de données pour le moment, réessayez plus tard</p>
  </section>

  <section v-else>
      <div v-if="loading">Chargement en cours ...</div>

      <div v-else-if="artists.length > 0">
        <div v-if="artists.length > 0">
          <h1>Artistes</h1>
          <v-table theme="dark" class="table-artist" hover>
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
                  <td><a :href="`/artist/${artist.id}`">{{ artist.area.name }}</a></td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>

      <div v-else>
        Effectué une recherche 
      </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      errored: false,
      loading: false,
      infoBrute: null,
      search: '',
      artists: [],
    }
  },
  methods: {
    msToMinSec(ms) {
      let minutes = Math.floor(ms / 60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    /**
     * méthode searchArtists qui permet de rechercher des artiste depuis l'API MusicBrainz
     */
     searchArtists() {
      this.loading = true
      let research = this.search.toLowerCase().trim().split(' ').join('+');
      let url = `https://musicbrainz.org/ws/2/artist?query=${research}&fmt=json`;
      axios
        .get(url)
        .then(response => {
            this.infoBrute = response.data
        })
        .catch(error => {
            console.log("erreur : " + error)
            this.errored = true
        })
        .finally(() => {
          this.loading = false
          this.artists = this.infoBrute.artists;
        })
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: white;
  }
  img {
    height: 100px;
    width: auto;
  }

  header {
    display: flex;
    color: rgb(238, 238, 238);
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid white;
  }

  header div {
    padding: 10px;
  }

  button, input {
    border: 2px solid white;
    padding: 10px;
    border-radius: 5px 5px;
    color: white;
  }

  button {
    font-weight: bold;
    color: #212121;
    background: white;
  }

  .table-artist {
    padding: 10px 30px;
  }

  section h1 {
    color: white;
    padding-left: 40px;
    padding-top: 30px;
  }

</style>