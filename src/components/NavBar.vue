<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar',
  data() {
    return {
      items: [
        { title: "HOME", path: "/" },
        { title: "FILMS", path: "films" },
        { title: "SERIES", path: "series" },
        { title: "ACTEURS", path: "acteurs" },
      ],
    };
  },
  methods: {
    navigateTo(path: string) {
      window.location.href = path;
    },
  },
})
</script>
<template>
  <div>
    <v-app-bar app color="primary" dark class="fixed-top">
      <v-toolbar color="black" dark>
        <v-toolbar-title @click="navigateTo('/')">CINE-APP🎦</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-for="(item, index) in items" :key="index" @click="navigateTo(item.path)">{{ item.title }}</v-btn>
      </v-toolbar>
    </v-app-bar>
  </div>
</template>
<style scoped></style>
