<template>
  <div>
    <v-alert
      max-width="900"
      class="offset-md-3 mx-auto"
      color="blue darken-1"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-web"
    >
      Bienvenue sur Groupomania <span class="font-weight-black">{{ first_name }}</span> 👋
    </v-alert>
  </div>
</template>

<script>
let user = JSON.parse(localStorage.getItem('user'))
export default {
  data() {
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      UserId: user.id,
    }
  },
  methods: {
    profil(userId) {
      const router = this.$router
      setTimeout(function () {
        router.push(`/profil/${userId}`).catch(()=>{})
      }, 10)
    },
  },
}
</script>
<style lang="scss" scoped></style>
