<template>
    <HeaderComponent songOrArtist='song'/>

    <section v-if="errored">
      <p>Désolé, nous n'avons pas pu accéder au serveur de données pour le moment, réessayez plus tard</p>
    </section>

    <section v-else>
        <div v-if="loading">Chargement en cours ...</div>

        <div v-else>
            <div class="music-info">
                <h1>{{ music.title }}</h1>
                <p class="first-p">
                    Artiste :
                    <RouterLink :to="`/artist/${music['artist-credit'][0]['artist']['id']}`" class="btn">{{ music['artist-credit'][0]['artist']['name'] }}</RouterLink>
                </p>
                <p>Durée : {{ msToMinSec(music.length) }}</p>
                <p>Album : {{ music['releases'][0]['title'] }}</p>
                <p>Date de sortie : {{ music['releases'][0]['date'] }}</p>
                <p>Pays de sortie : {{ music['releases'][0]['release-events'][0]['area']['name'] }}</p>
            </div>
        </div>
    </section>
</template> 

<script>
import HeaderComponent from './HeaderComponent.vue'
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
    },
    components: {
		HeaderComponent
	}
}
</script>

<style scoped>
    h1 {
        padding: 0;
        color: rgb(192, 192, 192);
    }
    
    .music-info {
        margin: 30px;
        color: rgb(192, 192, 192);
    }

    .first-p {
        margin-top: 25px;
    }

    .btn {
        color: black;
        background: white;
        padding: 3px;
        border-radius: 5px;
    }
</style>