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
                  @click="error = null"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="last_name"
                  label="Nom"
                  hide-details="auto"
                  autocomplete="off"
                  :rules="rules"
                  @click="error = null"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-at"
                  v-model="email"
                  label="Adresse mail"
                  hide-details="auto"
                  autocomplete="off"
                  :rules="emailValidate"
                  @click="error = null"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-lock"
                  v-model="password"
                  label="Mot de passe"
                  type="password"
                  autocomplete="off"
                  :rules="passwordValidate"
                  @click="error = null"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-alert
              dense
              text
              type="success"
              class="mx-5"
              v-if="validateForm"
            >
              {{ validateForm }}
            </v-alert>
            <v-alert
              dense
              outlined
              type="error"
              class="mx-5"
              v-if="error"
              @click="error = null"
            >
              {{ error }}
            </v-alert>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="email && password && last_name && first_name == ''" @click="register()">S'inscrire</v-btn>
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
      validateForm: "",
      rules: [
        value => !!value || 'Obligatoire',
        value => (value && value.length >= 3) || 'Minimum 3 caractères',
      ],
      emailValidate: [
        value => (value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))  || 'Merci de rentrer une addresse mail valide',
      ],
      passwordValidate: [
        value => (value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) || 'Le mots de passe doit contenir : un nombre, huits caractères et un caractère spécial',
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
        this.validateForm = "Inscription réussi, redirection à la page de connexion"
        setTimeout(function () {
          router.push("/").catch(()=>{});
        }, 2000);
      } catch (error) {
        this.error = "Merci de remplir toutes les conditions demandées"
      }
    },
    login() {
      const router = this.$router;
      setTimeout(function () {
        router.push("/").catch(()=>{});
      }, 2000);
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
