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
				<p>Date de naissance : {{ artist['life-span'].begin }}</p>
				<p v-if="artist['life-span'].end">Date de décès : {{ artist['life-span'].end }}</p>
				<h1 class="album">Albums </h1>
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
							<div v-for="music in musicParAlbum.media[0].tracks" :key="music.id">
								{{ music.title }} - {{ msToMinSec(music.length) }}
								<br>
								"{{ music.recording.disambiguation }}

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
			id: this.$route.params.id,
			errored: false,
			loading: true,
			artist: [],
			musicParAlbum: []
		}
	},
	created() {
		let url = `https://musicbrainz.org/ws/2/artist/${this.id}?inc=aliases+recordings+releases+tags+ratings&fmt=json`;
		axios
			.get(url)
			.then(response => {
				this.artist = response.data
				console.log(response.data)
			})
			.catch(error => {
				console.log("erreur : " + error)
				this.errored = true
			})
			.finally(() => {
				this.loading = false
				let uniqueReleases = [];
				this.artist.releases.forEach(release => {
					if (!uniqueReleases.some(uniqueRelease => uniqueRelease.title === release.title)) {
						uniqueReleases.push(release);
					}
				});
				this.artist.releases = uniqueReleases;

				this.artist.releases.forEach(release => {
					let url = `https://musicbrainz.org/ws/2/release/${release.id}?inc=recordings&fmt=json`;
					axios
						.get(url)
						.then(response => {
							this.musicParAlbum = response.data
						})
				})
			})
	},
	components: {
		HeaderComponent
	}
}
</script>

<style>
p {
	margin-left: 40px;
	color: rgb(192, 192, 192);
}

.album {
	margin-bottom: 15px;
}
</style>