<script lang="ts">
import axios from 'axios'
import { defineComponent, ref } from 'vue'
import type { ActorType } from '@/types/ActorType'

export default defineComponent({
  name: 'ActorsList',
  props: {
    filter: {
      type: String as () => 'all' | 'actorName' | 'Movie',
      required: true
    }
  },
  data() {
    return {
      actors: [] as ActorType[],
      movies: [] as { id: number; title: string }[],
      searchText: ref(''),
      selectedMovie: null as { id: number; title: string } | null,
      pagination: {
        page: 1,
        itemsPerPage: 10,
        sortBy: ['name'],
        descending: false
      },
      headers: [
        { text: 'Acteur', value: 'actor' },
        { text: 'Films', value: 'movies' }
      ]
    }
  },
  mounted() {
    this.fetchActors()
  },
  computed: {
    filteredActors(): ActorType[] {
      let filteredActors = this.actors
      if (this.searchText) {
        const searchTextLower = this.searchText.toLowerCase()
        filteredActors = filteredActors.filter(
          (actor) => actor.name.toLowerCase().indexOf(searchTextLower) !== -1
        )
      }
      if (this.selectedMovie) {
        filteredActors = filteredActors.filter((actor) =>
          actor.movie_credits.cast.some((movie) => movie.id === this.selectedMovie?.id)
        )
      }
      return filteredActors
    }
  },
  emits: ['set-filter', 'actor-name'],
  methods: {
    async fetchActors() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/person/popular', {
          params: {
            api_key: '4789d4caefcebacc74ede26d39fe8048',
            language: 'fr-FR',
            page: this.pagination.page
          }
        })
        this.actors = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async fetchFilms() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: '4789d4caefcebacc74ede26d39fe8048',
            language: 'fr-FR',
          },
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },
    getActorAvatar(actor: ActorType): string {
      return actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'
    },
    setFilter: function (filter: 'all' | 'actorName' | 'movies'): void {
      this.$emit('set-filter', filter)
    },
     actorName : function(): void {
      this.setFilter('actorName');
      this.$emit('actor-name', this.searchText.valueOf)
    }
  }
})
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-btn
          variant="outlined" @click="setFilter('all')"
          >ALL</v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchText"
            label="Rechercher par nom"
            outlined
            dense
            clearable
            @keydown.enter="actorName"
        @keydown.delete="setFilter('all')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="selectedMovie"
            :items="movies"
            item-text="title"
            item-value="id"
            label="Rechercher par film"
            outlined
            dense
            clearable
          ></v-autocomplete>
        </v-col>
      </v-row>
      
    </v-container>
  </div>
</template>


