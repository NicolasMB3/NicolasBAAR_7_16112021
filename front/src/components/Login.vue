<template>
  <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-alert
        border="top"
        color="blue"
        elevation="6"
        prepend-icon="mdi-lock"
        type="success">
          Pas encore de compte ? 
          <span @click="signup">
            Enregistrez-vous ici
          </span>
        </v-alert>
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Se connecter 👋</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="login"
                    label="Adresse mail"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Mot de passe"
                    type="password"
                    v-model="password"
                  ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="email && password == ''" @click="login">Se connecter</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
  </v-layout>
</template>

<script>

import AuthServices from "@/services/AuthServices";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthServices.login({
          email: this.email,
          password: this.password,
        });
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", response.data.token);

        console.log(response);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUserId", response.data.UserId);
        const router = this.$router;
        setTimeout(function () {
          router.push("/posts");
          location.reload(true);
        }, 10);
      } catch (error) {
        console.log(error);
      }
    },
    signup() {
      const router = this.$router;
      setTimeout(function () {
        router.push("/signup");
      }, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  color: rgb(255, 255, 255);
  cursor: pointer;
}
</style>
