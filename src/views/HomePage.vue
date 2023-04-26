<script lang="ts">
import { defineComponent } from 'vue'
import ListFilmsHome from '../components/ListFilmsHome.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    ListFilmsHome
  }
})
</script>
<template>
  <v-container fluid>
    <v-img
      src="https://occ-0-56-55.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABer7SeWc6FvkBqWtk61GwL7rshAEVCOARQZVTEJGnLXykYBlO4nbbr6gs7M650BjULuaN6hucXKr5xY2iqPAajrxXd70HawdJeuD.jpg"
      aspect-ratio="2/1"
      class="top"
      cover
      max-height="300"
    ></v-img>
    
    <v-container fluid>
      <h1>trending</h1>
      <ListFilmsHome categorie='trending/movie/week'/>
    </v-container>
    <v-container fluid>
      <h1>TV Shows</h1>
      <ListFilmsHome categorie='trending/tv/week'/>
    </v-container>
    <v-container fluid>
      <h1>Popular Movies</h1>
      <ListFilmsHome categorie='movie/popular'/>
    </v-container>
  </v-container>
</template>
<style scoped></style>
