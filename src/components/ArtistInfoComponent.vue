<template>
    <a href="/">Home</a>
    <section v-if="errored">
      <p>Désolé, nous n'avons pas pu accéder au serveur de données pour le moment, réessayez plus tard</p>
    </section>

    <section v-else>
        <div v-if="loading">Chargement en cours ...</div>

        <div v-else>
            https://musicbrainz.org/ws/2/artist/{{id}}?inc=aliases+recordings+releases+tags+ratings&fmt=json
        </div>
    </section>
</template> 

<script>
import axios from 'axios';

export default {
    data() {
        return {
            id: this.$route.params.id,
            errored: false,
            loading: true,
            artist: [],
        }
    },
    created() {
      let url = `https://musicbrainz.org/ws/2/artist/${this.id}?inc=aliases+recordings+releases+tags+ratings&fmt=json`;
      axios
        .get(url)
        .then(response => {
            this.artist = response.data
        })
        .catch(error => {
            console.log("erreur : " + error)
            this.errored = true
        })
        .finally(() => {
          this.loading = false
        })
    }
}
</script>