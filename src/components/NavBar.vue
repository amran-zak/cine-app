<script lang="ts">
import { defineComponent } from 'vue'
import router from '@/router';

export default defineComponent({
  name: 'NavBar',
  data() {
    return {
      items: [
        { title: "HOME", path: "/" },
        { title: "FILMS", path: "/films" },
        { title: "ACTEURS", path: "/actors" },
      ],
    };
  },
  methods: {
    navigateTo(path: string) {
      router.push(path)
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
