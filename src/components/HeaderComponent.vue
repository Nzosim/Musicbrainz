<!-- 
    Header component présent sur toutes les pages de l'application il permet de faire une recherche de musique ou d'artiste
 -->
<template>
    <div class="header-div">
        <div>
            <a href="/"><img src="../assets/logo.png"></a>
            <h3>SEARCH SONG - YOUR FAVORITE SONG AND ARTIST </h3>
        </div>
        <div>
            <input v-model="search" type="text"
                :placeholder="`Rechercher ${this.songOrArtist === 'song' ? 'une musique' : 'un artiste'}...`"
                @keyup.enter="redirect" 
            >&nbsp;
            <button @click="redirect">Rechercher</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref } from "vue";

export default {
    data() {
        return {
            search: '', // recherche dans la barre de recherche
            infoBrute: null, // information brute de la recherche
        }
    },
    /**
     * @emits updateInfo - émet un événement pour mettre à jour les informations de recherche
     * il est utilisé lorsque la recherche n'est pas effectué depuis la page MusicsComponent ou ArtistsComponent
     */
    $emit: ['updateInfo'],
    /**
     * songOrArtist - props qui permet de savoir si la recherche est pour une musique ou un artiste
     */
    props: ['songOrArtist'],
    methods: {
        /**
         * Redirige l'utilisateur vers la page de recherche de musique ou d'artiste en fonction 
         * du props et de la recherche effectuée
         * @param {String} search - la recherche effectuée
         * @emits updateInfo - émet un événement pour mettre à jour les informations de recherche
         */
        redirect() {
            this.searchMusicBrainzData(this.search).then(searchInfo => {
                localStorage.setItem('searchInfo', JSON.stringify(searchInfo));
                const route = this.songOrArtist === "song" ? '/music' : '/artist';
                this.$router.push(route);
                this.$emit('updateInfo');
            });
        },
        /**
         * Recherche les informations sur MusicBrainz en fonction de la recherche effectuée
         * @param {String} searchQuery - la recherche à effectuer
         * @returns {Promise} - une promesse avec les informations de recherche
         */
        searchMusicBrainzData(searchQuery) {
            return new Promise((resolve, reject) => {
                // définition de toastId et affichache du toast de chargement, les toast sont les notifications qui apparaissent à l'écran
                const toastId = ref('');
                toastId.value = toast.info('Chargement en cours...', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                // formatage de la recherche pour l'URL de l'API
                let research = searchQuery.toLowerCase().trim().split(' ').join('+');
                let urlMusique = `https://musicbrainz.org/ws/2/recording?query=recording:"${research}" `;
                let urlArtist = `https://musicbrainz.org/ws/2/artist?query=${research}&fmt=json`;

                // requête à l'API MusicBrainz
                axios
                    .get(this.songOrArtist === "song" ? urlMusique : urlArtist) // si c'est une recherche de musique on utilise l'URL de musique sinon on utilise l'URL d'artiste
                    .then(response => {
                        this.infoBrute = response.data

                        // on retire le toast de chargement 
                        toast.remove(toastId.value);
                        // si aucune information n'est trouvée on affiche un toast d'erreur, sinon on affiche un toast de succès
                        let condition = this.songOrArtist === "song" ? this.infoBrute.recordings.length === 0 : this.infoBrute.artists.length === 0;
                        if (condition) {
                            return toast.error('Aucun résultat trouvé', { position: 'bottom-right' });
                        }
                        toast.success('Chargement réussi !', { position: 'bottom-right' });

                        // on retourne les informations de recherche
                        resolve(this.songOrArtist === "song" ? this.infoBrute.recordings : this.infoBrute.artists);
                    })
                    .catch(error => {
                        // en cas d'erreur on retire le toast de chargement et on affiche un toast d'erreur
                        toast.remove(toastId.value);
                        toast.error(`Une erreur est survenue lors du chargement : ${error}`, { position: 'bottom-right' });
                        reject(error);
                    })
            });
        }
    },

}
</script>

<style scoped>
div {
    display: flex;
    color: rgb(192, 192, 192);
    justify-content: space-between;
}

.header-div {
    padding: 10px;
    border-bottom: 1px solid white;
}

img {
    height: 80px;
    width: auto;
}

button,
input {
    margin: 20px;
    padding: 0 10px;
    height: 50%;
    border: 2px solid rgb(192, 192, 192);
    border-radius: 5px 5px;
    color: rgb(192, 192, 192);
}

button {
    margin-left: 0;
    font-weight: bold;
    color: #212121;
    background: rgb(192, 192, 192);
}

h3 {
    padding: 25px;
}

@media screen and (max-width: 1150px) {
    h3 {
        display: none;
    }
}

@media screen and (max-width: 550px) {
    button {
        display: none;
    }
}
</style>