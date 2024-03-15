<!-- 
	ArtistInfoComponent est une page qui permet d'afficher les informations d'un artiste en fonction de l'id de l'artiste'
 -->
<template>
	<HeaderComponent songOrArtist='artist' />

	<section v-if="errored">
		<p>Désolé, nous n'avons pas pu accéder au serveur de données pour le moment, réessayez plus tard</p>
	</section>

	<section v-else>
		<div v-if="loading">Chargement en cours ...</div>

		<div v-else>
			<div class="artist-info">
				<h1>{{ artist.name }}</h1>
				<p class="first-p">
					Type : {{ artist.type }}
				</p>
				<p>Pays : {{ artist.area.name }}</p>
				<p v-if="artist.tags.length > 0">Tags : {{ artist.tags.map(tag => tag.name).join(', ') }}</p>
				<p v-if="artist['begin-area']">Lieu de naissance : {{ artist['begin-area'].name }}</p>
				<p v-if="artist['life-span'].begin">Date de naissance : {{ artist['life-span'].begin }}</p>
				<p v-if="artist['life-span'].end">Date de décès : {{ artist['life-span'].end }}</p>
				<h1 v-if="artist.releases.length > 0" class="album">Albums </h1>
				<v-expansion-panels v-for="release in artist.releases" :key="release.id" class="w-75 mb-1">
					<v-expansion-panel class="bg-blue-grey-darken-4 ml-15">
						<v-expansion-panel-title expand-icon="mdi-menu-down">
							<v-row no-gutters>
								<v-col class="d-flex justify-start" cols="4">
									{{ release.title }}
								</v-col>
								<v-col class="d-flex justify-start" cols="4">
									{{ release.date }}
								</v-col>
								<v-col class="d-flex justify-start" cols="2">
									{{ release.media[0]['track-count'] }} morceaux
								</v-col>
							</v-row>
						</v-expansion-panel-title>
						<v-expansion-panel-text>
							<h1>Musiques</h1>
							<div v-for="music in musicParAlbum[release.id]" :key="music.id">
								<div v-if="music.tracks.length > 0" v-for="track in music.tracks" :key="track.id">
									<p>{{ track.title }}</p>
								</div>
								<h2 v-else>Musique non accessible</h2>

							</div>
						</v-expansion-panel-text>
					</v-expansion-panel>
				</v-expansion-panels>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';
import HeaderComponent from './HeaderComponent.vue'

export default {
	data() {
		return {
			id: this.$route.params.id, // id de l'artiste récupéré dans l'url
			errored: false,
			loading: true,
			artist: [],
			musicParAlbum: []
		}
	},
	/**
	 * Récupère les informations de l'artiste en fonction de l'id de l'artiste
	 * à la création du composant
	 * @param {String} id - l'id de l'artiste
	 */
	created() {
		let url = `https://musicbrainz.org/ws/2/artist/${this.id}?inc=aliases+recordings+releases+tags+ratings&fmt=json`;
		axios
			.get(url)
			.then(response => {
				this.artist = response.data
			})
			.catch(error => {
				this.errored = true
			})
			.finally(() => {
				this.loading = false
				// On récupère ici les albums de l'artiste en supprimant les doublons
				let uniqueReleases = [];
				this.artist.releases.forEach(release => {
					if (!uniqueReleases.some(uniqueRelease => uniqueRelease.title === release.title)) {
						uniqueReleases.push(release);
					}
				});
				this.artist.releases = uniqueReleases;

				// On récupère ici les musiques de chaque album
				this.artist.releases.forEach(release => {
					let url = `https://musicbrainz.org/ws/2/release/${release.id}?inc=recordings&fmt=json`;
					axios
						.get(url)
						.then(response => {
							// On stocke les musiques de chaque album dans un objet musicParAlbum avec comme clé l'id de l'album
							this.musicParAlbum[release.id] = response.data.media
						})
						.catch(error => {
							console.log(error)
						})
				})
			})
	},
	methods: {
		/**
		 * Convertit les millisecondes en minutes et secondes
		 * @param {Number} ms - les millisecondes à convertir
		 */
		msToMinSec(ms) {
			if(!ms) return 'Inconnu'; // si la durée est inconnue
			let minutes = Math.floor(ms / 60000);
			let seconds = ((ms % 60000) / 1000).toFixed(0);
			return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
		}
	},
	components: {
		HeaderComponent
	}
}
</script>

<style scoped>
p {
	margin-left: 40px;
	color: rgb(192, 192, 192);
}

h1 {
	margin-bottom: 15px;
}
</style>