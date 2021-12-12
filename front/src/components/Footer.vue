<template>
<v-footer
   padless="padless"
>
   <v-card
      flat
      tile
      width="100%"
      class="blue darken-1 text-center"
   >
      <v-card-text>
         <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
         >
         <v-icon color="white" size="24px">
            {{ icon }}
         </v-icon>
         </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
         {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
      </v-card-text>
   </v-card>
</v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ]
    }),
  }
</script>

<style lang="scss" scoped></style>
