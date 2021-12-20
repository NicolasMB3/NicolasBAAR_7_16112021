<template>

  <!-- Groupomania name logIn -->
  <v-bottom-navigation color="primary" grow>
    <template v-if="$store.state.isUserLoggedIn">
      <v-btn @click="backToPostsPage">
        <span class="text-sm-body-2">Groupomania</span>
        <v-icon>mdi-web</v-icon>
      </v-btn>
    </template>

    <!-- Society name if not logIn -->
    <template v-else>
      <v-btn>
        <span class="text-sm-body-2">Groupomania</span>
        <v-icon>mdi-web</v-icon>
      </v-btn>
    </template>

    <!-- Login form -->
    <v-btn v-if="!$store.state.isUserLoggedIn" @click="navigateTo({ name: 'Login' })">
      <span class="text-sm-body-2">Connexion</span>
      <v-icon>mdi-login</v-icon>
    </v-btn>

    <!-- SignUP form -->
    <v-btn v-if="!$store.state.isUserLoggedIn" @click="navigateTo({ name: 'Signup' })">
      <span class="text-sm-body-2">S'inscrire</span>
      <v-icon>mdi-one-up</v-icon>
    </v-btn>

    <!-- Profil page -->    
    <v-btn v-if="$store.state.isUserLoggedIn" @click="profil(UserId)">
      <span class="text-sm-body-2">Profil</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <!-- Users list -->
    <v-btn v-if="$store.state.isUserLoggedIn" @click="showUsers()">
      <span class="text-sm-body-2">Utilisateurs</span>
      <v-icon>mdi-account-group</v-icon>
    </v-btn>

    <!-- LogOut -->
    <v-btn v-if="$store.state.isUserLoggedIn" @click="logout">
      <span class="text-sm-body-2">Déconnexion</span>
      <v-icon>mdi-run</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
let user = JSON.parse(localStorage.getItem("user"));
export default {
  data() {
    return {
      UserId: user.id,
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route).catch(()=>{});
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      // catch method to remove basic error with multiple click on router
      this.$router.push({name: "Login"}).catch(()=>{});
    },
    showUsers() {
      // See advance problem about this in function
      const router = this.$router;
      setTimeout(function () {
        router.push("/users").catch(()=>{});
      }, 10);
    },
    profil(userId) {
      const router = this.$router
      setTimeout(function () {
        router.push(`/profil/${userId}`).catch(()=>{});
      }, 10)
    },
    backToPostsPage() {
      const router = this.$router;
      setTimeout(function () {
        router.push("/posts").catch(()=>{});
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
