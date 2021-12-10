<template>
  <v-app>
    <PageHeader />
    <v-main>
      <v-container class="my-8">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import PageHeader from '@/components/Header.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    PageHeader, 
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
