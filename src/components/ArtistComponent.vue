<script>
import axios from 'axios';

export default {
  data() {
        return {
            errored: false,
            loading: true,
            infoBrute: null,
            info: null
        }
    },
    created() {
        axios
            .get("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then(response => {
                this.infoBrute = response.data
                this.loading = false
            })
            .catch(error => {
                console.log("erreur : " + error)
                this.loading = false
                this.errored = true
            })
            .finally(() => {
                // méthode qui est appelé quand le callback d'une promesse est terminé
                // resolve ou reject, cela évite de duppliquer du code dans le then et le catch
                this.loading = false
            })
    }
}
</script>

<template>
  <!-- <div>
    <h1>Artiste</h1>
    <nav>
        
      </nav>
  </div> -->
  <h1>Méthode de workflow avec Axios</h1>
    
    <div id="container">
        
        <section v-if="errored">
            <p>Désolé, nous n'avons pas pu accéder au serveur de données pour le moment, réessayez plus tard</p>
        </section>

        <section v-else>
            <div v-if="loading">Chargement en cours ...</div>

            <div v-else>
                <h3>Valeur du Bitcoin</h3>
                <p>La valeur du Bitcoin est de :</p>
                <p>United States Dollar : {{infoBrute.bpi.USD.rate}} $</p>
                <p>Euro : {{infoBrute.bpi.EUR.rate}} €</p>
                <p>British Pound Sterling : {{infoBrute.bpi.GBP.rate}} £</p>
                
            </div>
        </section>

    </div>
</template>

<style>

</style>
