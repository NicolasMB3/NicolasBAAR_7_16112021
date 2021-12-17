<template>
  <div>
    <v-alert
      max-width="900"
      class="offset-md-3 mx-auto"
      dismissible
      color="blue darken-1"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-web"
    >
      Liste d'utilisateurs enregistrés
    </v-alert>
    <v-card
      max-width="900"
      class="card d-flex align-center offset-md-3 mx-auto mb-4"
      border="left"
      colored-border
      v-for="(user, index) in users"
      :key="index"
    >
      <v-col class="d-flex align-center ">
        <v-avatar class="ma-4">
          <img :src="user.avatar" alt="" />
        </v-avatar>
        <h2 class="font-weight-light">
          <a @click="profil(user.id)">
             {{ user.first_name }} {{ user.last_name }}
          </a>
        </h2>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex flex-row-reverse">
        <v-tooltip v-if="user.id == UserId && userAdmin === false" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="error" left @click="deleteAccount(user.id); snackbar = true" v-bind="attrs" v-on="on"> mdi-delete </v-icon>
          </template>
          <span>Supprimer le profil</span>
        </v-tooltip>
        <v-tooltip v-if="userAdmin === true" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="error" left @click="deleteAccountAdmin(user.id); snackbar = true" v-bind="attrs" v-on="on"> mdi-delete </v-icon>
          </template>
          <span>Supprimer le profil (admin)</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon left @click="profil(user.id)" v-bind="attrs" v-on="on"> mdi-account </v-icon>
          </template>
          <span>Afficher le profil</span>
        </v-tooltip>
      </v-col>
    </v-card>

    <v-snackbar 
      v-model="snackbar"
      absolute
      bottom
      color="success"
      outlined
    >
      <template v-if="deleteMessage != ''">
        {{ deleteMessage }}
      </template>
      <template v-else>
        {{ deleteMessageAdmin }}
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import UserServices from "@/services/UserServices";
let user = JSON.parse(localStorage.getItem("user"));

export default {
  data() {
    return {
      users: "",
      UserId: user.id,
      userAdmin: user.isAdmin,
      snackbar: false,
      deleteMessageAdmin: "",
      deleteMessage: ""
    };
  },
  async mounted() {
    this.users = (await UserServices.getAllUsers()).data;
    console.log(this.users);
  },
  methods: {
    async deleteAccount(id) {
      await UserServices.deleteAccount(id);
      this.deleteMessage = "Suppression du compte confirmée, redirection ..."
      // See advance problem about this in function
      const router = this.$router;
      const store = this.$store;
      setTimeout(function () {
        store.dispatch("setToken", null);
        store.dispatch("setUser", null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        router.push({name: "Login"}).catch(()=>{});
        this.$store.state.isUserLoggedIn = false;
      }, 2500);
    },
    async deleteAccountAdmin(id) {
      await UserServices.deleteAccount(id);
      this.deleteMessageAdmin = "Suppression du compte confirmée, actualisation ..."
      setTimeout(function () {
        location.reload(true);
      }, 10);
    },
    profil(userId) {
      const router = this.$router;
      setTimeout(function () {
        router.push(`/profil/${userId}`);
      }, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>