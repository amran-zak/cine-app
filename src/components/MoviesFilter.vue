<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { GenresMoviesType } from '@/types/GenderMoviesType'

export default defineComponent({
  name: 'MoviesFilter',
  data() {
    return {
      filter: String as () => 'all' | 'movie' | 'gender',
      searchText: ref(''),
      selectGender: reactive([]) as GenresMoviesType[],
    }
  },
  props: {
    genres: {
      type: Array as () => GenresMoviesType[],
      required: true
    }
  },
  mounted() {},
  computed: {},
  emits: ['set-filter', 'search-movie-by-name'],
  methods: {
    setFilter: function (filter: 'all' | 'movie' | 'gender'): void {
      if (filter === 'all') {
        this.searchText = ''
      }
      this.$emit('set-filter', filter)
    },
    searchMovieByName: function (): void {
      this.setFilter('movie')
      this.$emit('search-movie-by-name', this.searchText)
    },
    sendGenres: function (genre: GenresMoviesType, toggle: any): void {
      toggle()
      if (this.selectGender.includes(genre)) {
        this.selectGender = this.selectGender.filter((g) => g !== genre)
      } else {
        this.selectGender.push(genre)
      }
      // console.log('send-genres', genre)
      console.log('send-movie-by-name', this.selectGender)
    }
}})
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-btn variant="outlined" @click="setFilter('all')">ALL</v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchText"
            label="Rechercher par nom"
            outlined
            dense
            clearable
            @input="searchMovieByName"
            @keydown.delete="setFilter('all')"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-item-group multiple selected-class="bg-purple" v-model="selectGender">
        <div class="text-caption mb-2">Genre</div>
        <v-item v-for="genre in genres" :key="genre.id" v-slot="{ selectedClass, toggle }">
          <v-chip :class="selectedClass" @click="sendGenres(genre, toggle)">
            {{ genre.name }}
          </v-chip>
        </v-item>
      </v-item-group>
    </v-container>
  </div>
</template>
