<template>
  <div>
    <v-container>
      <div class="mb-3">
        <v-subheader>Actors</v-subheader>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="actor in actors" :key="actor.id">
            <v-card class="max-width">
              <v-img :src="getActorAvatar(actor)" aspect-ratio="2/3" height="250px" width="200px"></v-img>
              <v-card-title class="headline">{{ actor.name }}</v-card-title>
              <v-card-text>{{ actor.popularity }}</v-card-text>

            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-pagination
        :length="100"
        v-model="currentPage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @click="updateCurrentPage(currentPage)"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref } from 'vue'
import type { ActorType } from '@/types/ActorType'
import router from '@/router'

export default defineComponent({
  name: 'ActorsList',
  data() {
    return {
      actors: [] as ActorType[],
      currentPage: 1
      
    }
  },
  mounted() {
    this.fetchActors()
  },
  methods: {
    async fetchActors() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/person/popular', {
          params: {
            api_key: '4789d4caefcebacc74ede26d39fe8048',
            language: 'fr-FR',
            page: this.currentPage
          }
        })
        this.actors = response.data.results
      } catch (error) {
        console.log(error)
      }
    },
    getActorAvatar(actor: ActorType): string {
      return actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'
    },
    updateCurrentPage(page: number) {
      this.currentPage = page
      this.fetchActors()
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
        <v-subheader>Actors</v-subheader>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="actor in actors" :key="actor.id">
            <v-card>
              <v-img :src="getActorAvatar(actor)" aspect-ratio="2/3"></v-img>
              <v-card-title class="headline">{{ actor.name }}</v-card-title>
              <v-card-text>{{ actor.popularity }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-pagination
        :length="100"
        v-model="currentPage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @click="updateCurrentPage(currentPage)"
      ></v-pagination>
    </v-container>
  </div>
</template>
