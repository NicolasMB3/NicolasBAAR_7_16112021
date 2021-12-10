<template>
  <v-card
    max-width="800"
    elevation="2"
    class="mx-auto d-flex align-center rounded-xl"
    color="blue lighten-4"
  >
  <v-row class="d-flex flex-md-row justify-center">
    <v-col class="pa-4 d-flex align-center">
      <img class="rounded-xl" src="../assets/icon-above-font.png" alt="" />
    </v-col>
    <v-col class="ma-2 pa-4">
      <v-toolbar
        class="d-flex justify-center rounded-xl"
        elevation="0"
        dense
        color="white"
      >
        <v-toolbar-title>Créer un compte</v-toolbar-title>
      </v-toolbar>
      <div class="mt-4 mr-4 ml-4">
        <v-text-field
          v-model="first_name"
          label="Prénom"
          hide-details="auto"
          autocomplete="off"
        ></v-text-field>
        <v-text-field
          v-model="last_name"
          label="Nom"
          hide-details="auto"
          autocomplete="off"
        ></v-text-field>         
        <v-text-field
          v-model="email"
          label="Email"
          hide-details="auto"
          autocomplete="off"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Mot de passe"
          type="password"
          autocomplete="off"
        ></v-text-field>

        <!-- <p v-if="loginError">{{ loginError }}</p>
      <p v-if="loginSuccessful">Login Successful</p> -->
        <div class="error" v-html="error" />
        <br />
        <v-row align="center" justify="space-around">
          
          <v-btn
            class="btn align-self-center ma-2 rounded-xl"
            color="white"
            @click="register"
          >
            Valider
          </v-btn>
          
        </v-row>
        <br />
        <span>Si tu as déjà un compte, <a @click="login">connecte-toi.</a></span>
      </div>
    </v-col>
    </v-row>
  </v-card>
</template>

<script>
import AuthServices from "@/services/AuthServices";
export default {
  data() {
    return {
      last_name: "",
      first_name:"",
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        await AuthServices.signup({          
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        });
        // this.$store.dispatch("setToken", response.data.token);
        // this.$store.dispatch("setUser", response.data.UserId);

        const router = this.$router;
        setTimeout(function () {
          router.push("/");
        }, 10);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    login() {
      const router = this.$router;
      setTimeout(function () {
        router.push("/");
      }, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  color: #D32F2F;
  font-weight: bold;
  // text-decoration: underline;
  font-size: 2rem;
  font-display: roboto;
}

.btn {
  color: #D32F2F;
  font-weight: bold;
  text-decoration: underline;
}

img {
  width: 95%;
  height: auto;
}

.v-application a{
  color: #01579B;
  text-decoration: underline;
  font-weight: bold;
}
</style>
