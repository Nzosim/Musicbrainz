<template>
  <header>
    <div> 
      <a href="/"><img src="../assets/logo.png" ></a>
      <h1>SEARCH SONG - YOUR FAVORITE SONG AND ARTIST </h1>
    </div>
    <div> 
      <input v-model="search" type="text" placeholder="Rechercher une musique...">&nbsp;
      <button @click="searchMusic">Rechercher</button>
    </div>
  </header>

  <section v-if="errored">
      <p>Désolé, nous n'avons pas pu accéder au serveur de données pour le moment, réessayez plus tard</p>
  </section>

  <section v-else>
      <div v-if="loading">Chargement en cours ...</div>

      <div v-else-if="musics.length > 0">
        <div v-if="musics.length > 0">
          <h1>Musique</h1>
          <v-table theme="dark" class="table-music" hover>
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
      musics: [],
    }
  },
  methods: {
    msToMinSec(ms) {
      let minutes = Math.floor(ms / 60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    /**
     * méthode searchMusic qui permet de rechercher une musique depuis l'API MusicBrainz
     */
    searchMusic() {
      this.loading = true
      let research = this.search.toLowerCase().trim().split(' ').join('+');
      let url = `https://musicbrainz.org/ws/2/recording?query=recording:"${research}" `;
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
          this.musics = this.infoBrute.recordings;
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

  .table-music {
    padding: 10px 30px;
  }

  section h1 {
    color: white;
    padding-left: 40px;
    padding-top: 30px;
  }

</style>