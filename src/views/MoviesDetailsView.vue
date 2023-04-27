<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import type { MovieType } from "@/types/MovieType";

export default defineComponent({
  name: "MovieDetails",
  data() {
    return {
      movie: null as MovieType | null,
      isLoading: true,
    };
  },
  mounted() {
    const movieId = this.$route.params.id.toString();
    this.fetchMovie(movieId);
  },
  methods: {
    async fetchMovie(movieId: string) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: "4789d4caefcebacc74ede26d39fe8048",
              append_to_response : 'credits'
            },
          }
        );
        this.movie = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    getImageUrl(path: string | null) {
      return path
        ? `https://image.tmdb.org/t/p/w500${path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
    },
    navigateTo(id: number) {
      window.location.href = `/actors/${id}`
    }
  },
});
</script>

<template>
  <div v-if="movie">
    <v-container fluid>
    <v-card class="mx-auto" max-width="800">
      <v-card-title class="headline">{{ movie.title }}</v-card-title>
      <v-img
      :src="getImageUrl(movie.poster_path)"
      aspect-ratio="2/1"
      class="top"
      max-height="300"
    ></v-img>
      <v-row>        
        <v-col>
          <v-card-text>
            <p class="text-caption mb-1">{{ movie.release_date }}</p>
            <p class="text-body-1 mb-3">{{ movie.overview }}</p>
            <div class="mb-3">
              <v-chip v-for="genre in movie.genres" :key="genre.id" class="mr-2">{{ genre.name }}</v-chip>
            </div>
            <div class="mb-3">
              <v-subheader>Actors</v-subheader>
              <v-row>
                <v-col cols="12" sm="6" md="4" lg="3" v-for="cast in movie.credits.cast" :key="cast.id">
                  <v-card @click="navigateTo(cast.id)">
                    <v-img :src="getImageUrl(cast.profile_path)" aspect-ratio="2/3"></v-img>
                    <v-card-title class="headline">{{ cast.name }}</v-card-title>
                    <v-card-text>{{ cast.character }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  </div>
  <div v-else>
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </div>
</template>

<style scoped>
.v-card-text {
  white-space: pre-line;
}
</style>
