<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { GenresMoviesType } from '@/types/GenderMoviesType'

export default defineComponent({
  name: 'MoviesFilter',
  data() {
    return {
      filter: String as () => 'all' | 'movie' | 'gender',
      searchText: ref(''),
      selectGenderModel: reactive([]) as GenresMoviesType[]
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
  emits: ['set-filter', 'search-movie-by-name', 'search-movie-by-gender'],
  methods: {
    setFilter: function (filter: 'all' | 'movie' | 'gender'): void {
      if (filter === 'all') {
        this.searchText = ''
        this.selectGenderModel = []
      }
      this.$emit('set-filter', filter)
    },
    searchMovieByName: function (): void {
      this.setFilter('movie')
      this.$emit('search-movie-by-name', this.searchText)
    },
    sendGenres: function (toggle: any): void {
      toggle()
      this.setFilter('gender')
      this.$emit('search-movie-by-gender', this.selectGenderModel)
    }
  }
})
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
      <v-item-group multiple selected-class="bg-purple" v-model="selectGenderModel">
        <div class="text-caption mb-2">Genre</div>
        <v-item v-for="genre in genres" :key="genre.id" v-slot="{ selectedClass, toggle }">
          <v-chip :class="selectedClass" @click="sendGenres(toggle)">
            {{ genre.name }}
          </v-chip>
        </v-item>
      </v-item-group>
    </v-container>
  </div>
</template>
