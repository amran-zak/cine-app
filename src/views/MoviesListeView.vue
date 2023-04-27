<script lang="ts">
import { defineComponent } from 'vue'
import MoviesList from '@/components/MoviesList.vue'
import MoviesFilter from '@/components/MoviesFilter.vue'
import type { MovieType } from '@/types/MovieType'
import type { GenresMoviesType } from '@/types/GenderMoviesType'
import axios from 'axios'

export default defineComponent({
  name: 'MoviesListView',
  components: {
    MoviesList,
    MoviesFilter
  },
  data() {
    return {
      movies: [] as MovieType[],
      currentPage: 1,
      total_results: 0,
      genres: [] as GenresMoviesType[]
    }
  },
  mounted() {
    this.fetchMovies()
    this.fetchGenreMovies()
  },
  methods: {
    async fetchGenreMovies() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: '4789d4caefcebacc74ede26d39fe8048'
          }
        })
        this.genres = response.data.genres
      } catch (error) {
        console.log(error)
      }
    },

    async fetchMovies() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: '4789d4caefcebacc74ede26d39fe8048',
            language: 'fr-FR',
            page: this.currentPage
          }
        })
        this.movies = response.data.results
        this.total_results = response.data.total_results
      } catch (error) {
        console.log(error)
      }
    },
    async fetchMoviesByName(searchText: string) {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: '4789d4caefcebacc74ede26d39fe8048',
            language: 'fr-FR',
            page: this.currentPage,
            query: searchText
          }
        })
        this.movies = response.data.results
        this.total_results = response.data.total_results
      } catch (error) {
        console.log(error)
      }
    },
    async fetchMoviesByGender(selectedGenres: Number[]) {
      try {
        const filterGenre = selectedGenres?.map((g) => this.genres[g as number].id).join('|') ?? []
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: '4789d4caefcebacc74ede26d39fe8048',
            language: 'fr-FR',
            page: this.currentPage,
            with_genres: filterGenre
          }
        })
        this.movies = response.data.results
        this.total_results = response.data.total_results
      } catch (error) {
        console.log(error)
      }
    },

    getCurrentPage(page: number) {
      this.currentPage = page
      this.fetchMovies()
    },
    setfilter(filter: string) {
      if (filter === 'all') {
        this.fetchMovies()
      }
    },
    searchMovieByName(name: string) {
      this.fetchMoviesByName(name)
    },
    searchMovieByGender(genres: Number[]) {
      this.fetchMoviesByGender(genres)
    }
  }
})
</script>
<template>
  <v-content>
    <v-container fluid>
      <MoviesFilter
        @set-filter="setfilter"
        @search-movie-by-name="searchMovieByName"
        :genres="genres"
        @search-movie-by-gender="searchMovieByGender"
      ></MoviesFilter>
      <MoviesList
        :movies="movies"
        @get-current-page="getCurrentPage"
        :lengthMoviesList="total_results"
      ></MoviesList>
    </v-container>
  </v-content>
</template>
<style scoped></style>
