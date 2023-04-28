

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import type { MovieType } from "@/types/MovieType";
import router from '@/router';

export default defineComponent({
  name: 'ListFilmsHome',
  props: {
    categorie : String
  },
  data() {
    return {
      movies: [] as Array<MovieType>,
      showDescription: false
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
        console.log(response)
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
    navigateTo(path: string) {
      router.push(path)
    },
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
                  {{ movie.name? movie.name : movie.title }}
                </div>
                <div class="text-caption">
                  <p class="descrip-show-hover" v-if="showDescription">{{ movie.overview }}</p>
                  <v-card-actions>
                    <v-btn variant="outlined" @click="navigateTo(`/films/${movie.id}`)"> show more </v-btn>
                  </v-card-actions>
                  <p class="descrip-show-hover" v-if="showDescription">{{ movie.overview }}</p>
                  <v-divider class="my-3"></v-divider>
                  <div class="d-flex align-center">
                    <v-rating v-model="movie.rating" class="mr-2"></v-rating>
                    <div class="text-body-2 grey--text">{{ movie.vote_average }}/10</div>
                  </div>
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
.descrip-show-hover {
  display: none;
}
.show-description {
  display: block;
}
.descrip-show-hover:hover + .show-description {
  display: block;
}
</style>
