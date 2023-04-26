<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
//l'import comme un type
import type { FilmType } from '../types/FilmType'

export default defineComponent({
  name: 'ListFilmsHome',
  props: {
    categorie : String
  },
  data() {
    return {
      movies: [] as Array<FilmType>
    }
  },
  mounted() {
    this.fetchMovies()
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/' + this.categorie, {
          params: {
            api_key: '4789d4caefcebacc74ede26d39fe8048'
          }
        })
        this.movies = response.data.results
      } catch (error) {
        console.error(error)
      }
    },
    getImageUrl(path: string | null) {
      return path
        ? `https://image.tmdb.org/t/p/w500${path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'
    },
    navigateTo(id: string) {
      window.location.href = `films/${id}`
    }
  }
})
</script>
<template>
  <div>
    <v-container fluid>
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="movie in movies" :key="movie.id" class="d-flex">
          <v-card
            class="mx-auto"
            max-width="344"
            variant="outlined"
            :style="'background-image: url(' + getImageUrl(movie.poster_path) + ');'"
          >
            <v-card-item>
              <div>
                <div class="text-overline mb-1">
                  {{ movie.title }}
                </div>
                <div class="text-caption descrip-show-hover">
                  {{ movie.overview }}
                  <v-card-actions>
                    <v-btn variant="outlined" @click="navigateTo(movie.id)"> show more </v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-card-item>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-container>
  </div>
</template>
<style scoped>

</style>
