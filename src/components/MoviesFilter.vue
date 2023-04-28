<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { GenresMoviesType } from '@/types/GenderMoviesType'
import { FilterEnum } from '@/types/enums'

export default defineComponent({
  name: 'MoviesFilter',
  data() {
    return {
      filter: FilterEnum,
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
    setFilter: function (filter: FilterEnum): void {
      if (filter === this.filter.ALL) {
        this.searchText = ''
        this.selectGenderModel = []
      }
      this.$emit('set-filter', filter)
    },
    searchMovieByName: function (): void {
      this.setFilter(this.filter.MOVIE)
      this.$emit('search-movie-by-name', this.searchText)
    },
    sendGenres: function (toggle: () => void): void {
      toggle()
      this.setFilter(this.filter.GENDER)
      this.$emit('search-movie-by-gender', this.selectGenderModel)
    }
  }
})
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-btn variant="outlined" @click="setFilter(filter.ALL)">ALL</v-btn>
          <v-btn variant="outlined" @click="setFilter(filter.TRENDING)">TRENDING</v-btn>
          <v-btn variant="outlined" @click="setFilter(filter.POPULAR)">POPULAR</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="searchText"
            label="Rechercher par nom"
            outlined
            dense
            clearable
            @input="searchMovieByName"
            @keydown.delete="setFilter(filter.ALL)"
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
