<template>
  <v-app>
    <v-img
      src="./assets/duotone.png"
      max-height="75"
      class="grey darken-4 d-flex align-center">
      <v-img width="226" class="ml-6" src="./assets/groupomania.svg"></v-img>
    </v-img>
    <PageHeader />
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
import PageHeader from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    PageHeader, 
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
