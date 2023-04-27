<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import type { ActorType } from '@/types/ActorType'

export default defineComponent({
  name: 'ActorsList',
  data() {
    return {
      movies: [] as { id: number; title: string }[],
      searchText: '',
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
  props: {
    actors: {
      type: Array as () => ActorType[],
      required: true
    }
  },
  methods: {
    getActorAvatar(actor: ActorType): string {
      return actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'
    },
    navigateTo(id: number) {
      window.location.href = `/actors/${id}`
    }
  }
})
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchText"
            label="Rechercher par nom"
            outlined
            dense
            clearable
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
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="actors"
            :search="searchText"
            :footer-props="{ itemsPerPageOptions: [10, 20, 30], showCurrentPage: true }"
            v-model:pagination="pagination"
            hide-default-footer
          >
            <template v-slot:actor="props">
              <v-avatar :size="40" :src="getActorAvatar(props.item)"></v-avatar>
              <span class="ml-2">{{ props.item.name }}</span>
            </template>
            <template v-slot:movie="props">
              <span v-for="movie in props.item.movie_credits.cast" :key="movie.id" class="mr-2">
                {{ movie.title }}
              </span>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>
