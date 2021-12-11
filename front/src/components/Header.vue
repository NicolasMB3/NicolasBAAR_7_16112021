<template>

  <v-bottom-navigation color="primary" grow>
    <template v-if="$store.state.isUserLoggedIn">
      <v-btn @click="backToPostsPage">
        <span>Groupomania</span>
        <v-icon>mdi-web</v-icon>
      </v-btn>
    </template>

    <template v-else>
      <v-btn>
        <span>Groupomania</span>
        <v-icon>mdi-web</v-icon>
      </v-btn>
    </template>

    <v-btn v-if="!$store.state.isUserLoggedIn" @click="navigateTo({ name: 'Login' })">
      <span>Se connecter</span>
      <v-icon>mdi-login</v-icon>
    </v-btn>

    <v-btn v-if="!$store.state.isUserLoggedIn" @click="navigateTo({ name: 'Signup' })">
      <span>S'inscrire</span>
      <v-icon>mdi-one-up</v-icon>
    </v-btn>

    <v-btn v-if="$store.state.isUserLoggedIn" @click="profil(UserId)">
      <span>Mon profil</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn v-if="$store.state.isUserLoggedIn" @click="showUsers()">
      <span>Utilisateurs</span>
      <v-icon>mdi-account-group</v-icon>
    </v-btn>

    <v-btn v-if="$store.state.isUserLoggedIn" @click="logout">
      <span>Se déconnecter</span>
      <v-icon>mdi-run</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
let user = JSON.parse(localStorage.getItem("user"));
export default {
  data() {
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      UserId: user.id,
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() { // fonction pour la decconnexion de l'utilisateur
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      this.$router.push({
        name: "Login",
      });
    },
    showUsers() {
      const router = this.$router;
      setTimeout(function () {
        router.push("/users");
      }, 10);
    },
    profil(userId) {
      const router = this.$router
      setTimeout(function () {
        router.push(`/profil/${userId}`)
      }, 10)
    },
    backToPostsPage() {
      const router = this.$router;
      setTimeout(function () {
        router.push("/posts");
      }, 10);
    }
  },
};
</script>

<style lang="scss" scoped>
.v-btn:not(.v-btn--round).v-size--default {
  height: auto !important;
  background-color: white;
}
</style>
