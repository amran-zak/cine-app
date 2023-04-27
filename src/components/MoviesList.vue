<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { MovieType } from '@/types/MovieType'
import router from '@/router'

export default defineComponent({
  name: 'MoviesList',
  data() {
    return {
      currentPage: 1,
    }
  },
  props: {
    movies: {
      type: Array as () => MovieType[],
      required: true
    },
    lengthMoviesList : {
        type : Number,
        required : true
    }
  },
  computed: {},
  emits: ['get-current-page'],
  methods: {
    getImage(path: string | null): string {
      return path
        ? `https://image.tmdb.org/t/p/w500${path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'
    },
    updateCurrentPage(page: number) {
      this.currentPage = page
      this.$emit('get-current-page', page)
    },
    navigateTo(path: string) {
      router.push(path)
    },
  }
})
</script>

<template>
  <div>
    <v-container>
      <div class="mb-3">
        <v-subheader>Movies</v-subheader>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="movie in movies" :key="movie.id">
            <v-card @click="navigateTo(`/films/${movie.id}`)">
              <v-img :src="getImage(movie.poster_path)" aspect-ratio="2/3"></v-img>
              <v-card-title class="headline">{{ movie.title }}</v-card-title>
              <!-- <v-card-text>{{ movie.overview }}</v-card-text> -->
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-pagination
        :length="Math.ceil(lengthMoviesList / 20)"
        v-model="currentPage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @click="updateCurrentPage(currentPage)"
      ></v-pagination>
    </v-container>
  </div>
</template>
