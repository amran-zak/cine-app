<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import type { ActorType } from '@/types/ActorType'
import type { MovieType } from '@/types/MovieType'

export default defineComponent({
  name: 'ActorDetails',
  data() {
    return {
      actor: {} as ActorType,
      movies: [] as Array<MovieType>
    }
  },
  mounted() {
    this.fetchActor()
    this.fetchMovies()
  },
  methods: {
    async fetchActor() {
      try {
        const actorId = this.$route.params.id
        const response = await axios.get(`https://api.themoviedb.org/3/person/${actorId}`, {
          params: {
            api_key: '4789d4caefcebacc74ede26d39fe8048'
          }
        })
        this.actor = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchMovies() {
      try {
        const actorId = this.$route.params.id
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}/movie_credits`,
          {
            params: {
              api_key: '4789d4caefcebacc74ede26d39fe8048'
            }
          }
        )
        this.movies = response.data.cast
      } catch (error) {
        console.error(error)
      }
    },
    getImageUrl(path: string | null) {
      return path
        ? `https://image.tmdb.org/t/p/w500${path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'
    },
    navigateTo(id: number) {
      window.location.href = `/films/${id}`
    }
  }
})
</script>

<template>
  <v-container>
    <v-card class="mx-auto bg-black">
      <v-card-title class="headline">{{ actor.name }}</v-card-title>
      <v-row>
        <v-col cols="12" md="4">
          <v-img :src="getImageUrl(actor.profile_path)" aspect-ratio="2/3"></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-card-text>
            <p class="text-caption mb-1">{{ actor.birthday }}</p>
            <p class="text-caption mb-1">{{ actor.place_of_birth }}</p>
            <p class="text-body-1 mb-3">{{ actor.biography }}</p>
          </v-card-text>
        </v-col>
      </v-row>
      <div class="mb-6">
        <v-subheader>Movies</v-subheader>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="movie in movies" :key="movie.id">
            <v-card @click="navigateTo(movie.id)">
              <v-img :src="getImageUrl(movie.poster_path)" aspect-ratio="2/3"></v-img>
              <div class="text-overline mb-1">
                {{ movie.title }}
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>
