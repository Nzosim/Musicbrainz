<script>
import axios from 'axios';

export default {
  data() {
    return {
      errored: false,
      loading: true,
      infoBrute: null,
      search: '',
      musics: []
    }
  },
  methods: {
    /**
     * méthode searchMusic qui permet de rechercher une musique depuis l'API MusicBrainz
     */
    searchMusic() {
      // let research = this.search.split(' ').join('+');
      // let url = `https://musicbrainz.org/ws/2/recording?query=${research}&fmt=json`;
      // fetch(url)
      //   .then(response => response.json())
      //   .then(async data => {
      //     this.music = await data;
      //   })
      //   .catch(error => console.error(error));
      // console.log(this.music.recordings)
      let research = this.search.split(' ').join('+');
      let url = `https://musicbrainz.org/ws/2/recording?query=${research}&fmt=json`;
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
            this.musics = this.infoBrute.recordings
            console.log(this.infoBrute.recordings)
        })
    }
  }
}
</script>

<template>
  <div>
    <h1>Musique</h1>
    <input v-model="search" type="text" placeholder="Rechercher une musique">&nbsp;
    <button @click="searchMusic">Rechercher</button>
  </div>

  <section v-if="errored">
      <p>Désolé, nous n'avons pas pu accéder au serveur de données pour le moment, réessayez plus tard</p>
  </section>

  <section v-else>
      <div v-if="loading">Chargement en cours ...</div>

      <div v-else>
        <div v-for="music in musics" :key="music.id">
          {{ music['artist-credit'][0].name }} ** {{ music.title }}
        </div>
      </div>
  </section>
</template>

<style>

</style>