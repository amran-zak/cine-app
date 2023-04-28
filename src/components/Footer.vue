<script lang="ts">import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterView',
  data: () => ({
    links: ['Home', 'About Us', 'Team', 'Films', 'Contact Us']
  })
})
</script>

<template>
  <v-footer class="bg-black">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link }}
      </v-btn>

      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>CINE-APP🎦</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style></style>
