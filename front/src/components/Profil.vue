<template>
  <v-container>
    <v-card
    class="mx-auto my-6"
    max-width="900"
  >
      <v-img
        height="250"
        src="@/assets/duotone.png"
      ></v-img>

      <v-card-title>
        <v-avatar rounded size="64">
          <v-img :src="user.avatar"></v-img>
        </v-avatar>
        <span class="ml-4">{{ user.first_name }} {{ user.last_name }}</span>
      </v-card-title>

      <v-card-text>
        <div class="my-2 text-subtitle-1">
          <v-alert
            dense
            text
            type="success"
          >
            Membre depuis : {{ dateParser(user.createdAt) }}
          </v-alert>
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>📌Action/information sur le compte</v-card-title>

      <v-card-text>
        <v-alert
          dense
          text
          type="info"
        >
      <span>{{ user.first_name }} {{ user.last_name }} est un : </span>
        <template v-if="user.isAdmin">
          <v-icon color="primary" small>mdi-gavel</v-icon>
          <span class="ml-1" color="primary">Administrateur</span>
        </template>
        <template v-else>
          <v-icon color="green" small>mdi-account</v-icon>
          <span class="ml-1" color="primary">Utilisateur</span>
        </template>
        </v-alert>
      </v-card-text>

      <v-alert
        dense
        text
        type="success"
        class="mx-10"
        v-if="deleteMessage"
      >
        {{ deleteMessage }}
      </v-alert>

      <v-card-actions class="d-flex justify-center mb-2 flex-wrap">
        <v-btn color="error" v-if="user.id == UserId || userAdmin === true" class="mx-3" @click="deleteAccount">
          Supprimer le compte
        </v-btn>

        <v-btn color="primary" v-if="user.id == UserId" class="mx-3" @click="editTheName()">
          Éditer le compte
        </v-btn>

        <v-btn color="primary" v-if="user.id == UserId || userAdmin === true" class="mx-3" @click="elementToEdit">
          Changer de photo
        </v-btn>
      </v-card-actions>

      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-col cols="12" sm="12">
            <input
              type="file"
              ref="file"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Choisir une nouvelle photo"
              prepend-icon="mdi-camera"
              label="Avatar"
              name="image"
              @change="uploadImage"
            />
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="updateUser(), (dialog = false)"
            >
              Valider
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editname" width="500">
        <v-card>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="usernameEdit.first_name"
              label="Changer mon prénom"
              required
              :rules="inputRules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12">
            <v-text-field
              v-model="usernameEdit.last_name"
              label="Changer mon nom"
              required
              :rules="inputRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="password"
              label="Changer mon mot de passe"
              required
              :rules="inputPasswordRules"
            ></v-text-field>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="updateTheName(usernameEdit), (editname = false)"
            >
              Valider
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import UserServices from "@/services/UserServices";
import PostServices from "@/services/PostServices";
let user = JSON.parse(localStorage.getItem("user"));

export default {
  data() {
    return {
      dialog: false,
      editname: false,
      inputRules: [
        (v) => v.length >= 3 || "minimum 3 caractères", //les règles sur l'input
      ],
      inputPasswordRules: [
        (v) => v.length >= 6 || "minimum 6 caractères", //les règles sur l'input
      ],
      id: "",
      user: "",
      UserId: user.id,
      userAdmin: user.isAdmin,
      last_name: "",
      first_name: "",
      password: "",
      file: "",
      message: {},
      deleteMessage: "",
      usernameEdit: new Object(),
    };
  },

  computed: {},

  async mounted() {
    const messageId = this.$route.params.id;
    this.message = (await PostServices.getAllPosts(`${messageId}`)).data;
    try {
      this.id = this.$route.params.id;
      const response = await UserServices.getOneUser(this.id);
      this.user = response.data;
      console.log(this.user);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async deleteAccount() {
      this.id = this.$route.params.id;
      await UserServices.deleteAccount(this.id);
      this.deleteMessage = "Suppression du compte confirmé, redirection ..."
      const router = this.$router;
      const store = this.$store;
      setTimeout(function () {
        store.dispatch("setToken", null);
        store.dispatch("setUser", null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        router.push({name: "Login"}).catch(()=>{});
        this.$store.state.isUserLoggedIn = false;
      }, 2000);
    },
    async updateUser() {
      try {
        let data = new FormData();
        if (this.file !== null) {
          data.append("image", this.file);
        }
        this.id = this.$route.params.id;
        await UserServices.updateUser(this.id, data);
        location.reload(true);
      } catch (error) {
        console.log(error);
      }
    },
    elementToEdit() {
      this.dialog = true;
    },
    editTheName() {
      this.editname = true;
      this.usernameEdit = this.user;
    },
    async updateTheName() {
      try {
        let data = {
          first_name: this.usernameEdit.first_name,
          last_name: this.usernameEdit.last_name,
          password: this.password,
        };
        this.id = this.$route.params.id;
        const res = await UserServices.updateUser(this.id, data);
        console.log(res);
        location.reload(true);
      } catch (error) {
        console.log(error);
      }
    },
    uploadImage() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    backToPostsPage() {
      const router = this.$router;
      setTimeout(function () {
        router.push("/posts").catch(()=>{});
      }, 10);
    },

    dateParser(num) {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      let timestamp = Date.parse(num);
      let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

      return date.toString();
    },
  },
};
</script>
<style lang="scss" scoped>
.v-card__actions > .v-btn.v-btn {
    margin-bottom: 1.5rem;
}
</style>
