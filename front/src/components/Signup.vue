<template>
  <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-alert
        border="top"
        color="blue"
        elevation="6"
        prepend-icon="mdi-lock"
        type="success">
          Déjà un compte ? 
          <span @click="login">
            Connectez-vous ici
          </span>
        </v-alert>
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>S'inscrire 👋</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="first_name"
                  label="Prénom"
                  hide-details="auto"
                  autocomplete="off"
                  :rules="rules"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="last_name"
                  label="Nom"
                  hide-details="auto"
                  autocomplete="off"
                  :rules="rules"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-at"
                  v-model="email"
                  label="Adresse mail"
                  hide-details="auto"
                  autocomplete="off"
                  :rules="rules"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-lock"
                  v-model="password"
                  label="Mot de passe"
                  type="password"
                  autocomplete="off"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="email && password && last_name && first_name == ''" @click="register">S'inscrire</v-btn>
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
      last_name: "",
      first_name:"",
      email: "",
      password: "",
      error: null,
      rules: [
        value => !!value || 'Obligatoire',
        value => (value && value.length >= 3) || 'Minimum 3 caractères',
      ]
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
span {
  color: rgb(255, 255, 255);
  cursor: pointer;
}
</style>
