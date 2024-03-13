<!-- 
	Home page du site web, permet de choisir entre chercher un artiste ou une musique et affiche également 
	la barre de recherche pour effectuer une recherche de musique.
 -->
<template>
	<HeaderComponent songOrArtist='song' />

	<div class="home">
		<div>
			<h1>SEARCH SONG</h1>
			<nav>
				<RouterLink to="/artist" class="btn">Chercher un artiste</RouterLink>
				<RouterLink to="/music" class="btn">Chercher une musique</RouterLink>
			</nav>
		</div>
		<img src="../assets/homepage.png">
	</div>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue'

export default {
	components: {
		HeaderComponent
	}
}
</script>

<style scoped>
img {
	width: 500px;
}

.home {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 50px;
}

.btn {
	border: 2px solid rgb(192, 192, 192);
	border-radius: 5px 5px;
	color: rgb(192, 192, 192);
	font-weight: bold;
	color: #212121;
	background: rgb(192, 192, 192);
	margin: 5px 0;
	padding: 5px;
}

.btn:hover {
	background: #212121;
	color: rgb(192, 192, 192);
}

h1 {
	color: rgb(192, 192, 192);
}

nav {
	display: flex;
	flex-direction: column;
}

@media screen and (max-width: 950px) {
	.home {
		flex-direction: column;
	}
}

@media screen and (max-width: 460px) {
	img {
		width: 300px;
	}
}
</style>