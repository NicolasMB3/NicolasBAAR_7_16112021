<template>
  <v-app>
    <v-img
      src="./assets/duotone.png"
      max-height="75"
      class="grey darken-4 d-flex align-center">
      <v-img width="226" class="ml-6" src="./assets/groupomania.svg"></v-img>
    </v-img>
    <Header />
    <v-main>
      <v-container class="my-8">
        <router-view/>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',

  data: () => ({
  }),
  components: {
    Header, 
    Footer,
  },
  methods: {
    ...mapActions([
      'fetchAccessToken'
    ]),
  },
  created() {
    this.fetchAccessToken();
  }
};
</script>

<style lang="scss" scoped>
</style>
