<template>
    <div class="header-div">
        <div> 
            <a href="/"><img src="../assets/logo.png" ></a>
            <h3>SEARCH SONG - YOUR FAVORITE SONG AND ARTIST </h3>
        </div>
        <div> 
            <input v-model="search" type="text" :placeholder="`Rechercher ${this.songOrArtist === 'song' ? 'une musique' : 'un artiste'}...`"  
                @keyup.enter="searchMusicBrainzData" >&nbsp;
            <button @click="searchMusicBrainzData">Rechercher</button>
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
                search: '',
                infoBrute: null,
            }
        },
        $emit: ['searchInfo', 'loading', 'error'],
        props: ['songOrArtist'],
        methods: {
            searchMusicBrainzData() {
                const toastId = ref('');
                toastId.value = toast.info('Chargement en cours...',{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                let research = this.search.toLowerCase().trim().split(' ').join('+');
                let urlMusique = `https://musicbrainz.org/ws/2/recording?query=recording:"${research}" `;
                let urlArtist = `https://musicbrainz.org/ws/2/artist?query=${research}&fmt=json`;
                axios
                    .get(this.songOrArtist === "song" ? urlMusique : urlArtist)
                    .then(response => {
                        this.$emit('loading')
                        this.infoBrute = response.data
                        
                        toast.remove(toastId.value);
                        let condition = this.songOrArtist === "song" ? this.infoBrute.recordings.length === 0 : this.infoBrute.artists.length === 0;
                        if(condition) {
                            return toast.error('Aucun résultat trouvé', { position: 'bottom-right' });
                        }
                        toast.success('Chargement réussi !', { position: 'bottom-right' });
                    })
                    .catch(error => {
                        toast.remove(toastId.value);
                        this.$emit('error', this.infoBrute.error);
                        toast.error(`Une erreur est survenue lors du chargement : ${error}`, { position: 'bottom-right' });
                    })
                    .finally(() => {
                        this.$emit('searchInfo', this.songOrArtist === "song" ? this.infoBrute.recordings : this.infoBrute.artists);
                    })
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

    button, input {
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