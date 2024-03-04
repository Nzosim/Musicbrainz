<script>
export default {
  data() {
    return {
      search: '',
      music: []
    }
  },
  methods: {
    /**
     * méthode searchMusic qui permet de rechercher une musique depuis l'API MusicBrainz
     */
    searchMusic() {
      let url = `https://musicbrainz.org/ws/2/recording?query=${this.search}&fmt=json`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.music = data.recordings;
          console.log(this.music);
        })
        .catch(error => console.error(error));
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

  <div v-if="music.length > 0" v-for="test in music">
    {{ test.title }} {{ test.first-release-date }}
  </div>
</template>

<style>

</style>
