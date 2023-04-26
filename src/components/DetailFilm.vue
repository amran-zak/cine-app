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
              api_key: "your_api_key_here",
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
  },
});
</script>

<template>
  <div v-if="movie">
    <v-container>
      <v-card>
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <v-img :src="getImageUrl(movie.poster_path)" width="100%" />
          </v-col>
          <v-col cols="12" md="8">
            <v-card-title class="headline">{{ movie.title }}</v-card-title>
            <v-card-subtitle class="grey--text">{{ movie.release_date }}</v-card-subtitle>
            <v-card-text class="my-4">{{ movie.overview }}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn href="#" text>Cast</v-btn>
              <v-btn href="#" text>Reviews</v-btn>
              <v-btn href="#" text>Similar movies</v-btn>
            </v-card-actions>
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
