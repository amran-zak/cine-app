<!-- eslint-disable vue/no-export-in-script-setup -->
<script setup lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue"

defineComponent({
  name: 'App',
  components: {
    NavBar
  },
});
</script>

<template>
  <v-app>
    <NavBar/>
    <v-main style="background-color: black; color: white;">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
