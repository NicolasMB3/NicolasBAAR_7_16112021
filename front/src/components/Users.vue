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
        <v-tooltip bottom>
          <template v-if="user.id == UserId || userAdmin === true" v-slot:activator="{ on, attrs }">
            <v-icon color="error" left @click="deleteAccount(user.id)" v-bind="attrs" v-on="on"> mdi-delete </v-icon>
          </template>
          <span>Supprimer le profil</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon left @click="profil(user.id)" v-bind="attrs" v-on="on"> mdi-account </v-icon>
          </template>
          <span>Afficher le profil</span>
        </v-tooltip>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import UserServices from "@/services/UserServices.js";
let user = JSON.parse(localStorage.getItem("user"));

export default {
  data() {
    return {
      users: "",
      UserId: user.id,
      userAdmin: user.isAdmin,
    };
  },
  async mounted() {
    this.users = (await UserServices.getAllUsers()).data;
    console.log(this.users);
  },
  methods: {
    async deleteAccount(id) {
      await UserServices.deleteAccount(id);
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