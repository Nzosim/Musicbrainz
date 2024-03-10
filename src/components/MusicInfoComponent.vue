<template>
    <a href="/">Home</a>
    <section v-if="errored">
      <p>Désolé, nous n'avons pas pu accéder au serveur de données pour le moment, réessayez plus tard</p>
    </section>

    <section v-else>
        <div v-if="loading">Chargement en cours ...</div>

        <div v-else>
            <div>
                <h1>{{ music.title }}</h1>
                <p>{{ msToMinSec(music.length) }}</p>
                <p>{{ music['artist-credit'][0]['artist']['name'] }}</p>
                <p>{{ music['releases'][0]['title'] }}</p>
                <p>{{ music['releases'][0]['date'] }}</p>
                <p>{{ music['releases'][0]['release-events'][0]['area']['name'] }}</p>
            </div>
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
            music: [],
        }
    },
    created() {
      let url = `https://musicbrainz.org/ws/2/recording/${this.id}?inc=artists+releases&fmt=json`;
      axios
        .get(url)
        .then(response => {
            this.music = response.data
        })
        .catch(error => {
            console.log("erreur : " + error)
            this.errored = true
        })
        .finally(() => {
          this.loading = false
          console.log(this.music)
        })
    },
    methods: {
        msToMinSec(ms) {
            let minutes = Math.floor(ms / 60000);
            let seconds = ((ms % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        },
    }
}
</script>