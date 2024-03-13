<template>
    <HeaderComponent songOrArtist='song' />

    <div class="not-found">
        <h1>Page non trouvée</h1>
        <RouterLink to="/" class="not-found-button">Retour à l'accueil</RouterLink>

        <h2>Erreur #404</h2>
    </div>
</template>

<script>
    // Import du header de la page
    import HeaderComponent from './HeaderComponent.vue'

    export default {
        components: {
            HeaderComponent 
        }
    }
</script>

<style scoped>
    .not-found {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 100px;
    }

    .not-found-button {
        border: 2px solid rgb(192, 192, 192);
        border-radius: 5px 5px;
        color: rgb(192, 192, 192);
        font-weight: bold;
        color: #212121;
        background: rgb(192, 192, 192);
        margin: 5px 0;
        padding: 5px;
    }

    h1, h2 {
        color: rgb(192, 192, 192);
    }
</style>