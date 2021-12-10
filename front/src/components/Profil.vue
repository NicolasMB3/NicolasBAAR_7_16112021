<template>
  <v-container>
    <v-card
      max-width="800"
      elevation="2"
      class="mx-auto rounded-xl"
      color="blue lighten-4"
    >
      <div>
        <v-toolbar
          class="d-flex rounded-t-xl"
          elevation="0"
          dense
          color="blue darken-4"
        >
          <v-col>
            <v-toolbar-title v-if="user.id == UserId">
              Bienvenue, {{ user.first_name }} {{ user.last_name }}
            </v-toolbar-title>
            <v-toolbar-title v-else>
              Profil de {{ user.first_name }} {{ user.last_name }}
            </v-toolbar-title>
          </v-col>
          <v-btn
            text
            @click="editTheName()"
            v-if="user.id == UserId || userAdmin === true"
          >
            <v-icon class="mx-2" color="grey lighten-1">mdi-pencil</v-icon>
            <span>Modifier</span>
          </v-btn>

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
        </v-toolbar>
      </div>
      <div class="d-flex flex-column-reverse flex-md-row justify-center">
        <div class="d-flex mt-4">
          <v-col class="d-flex flex-column align-center pa-5">
            <span v-if="user.id == UserId" class="mb-2">
              Votre photo de profil
            </span>
            <span v-else class="mb-2">Photo de profil</span>
            <div class="d-flex flex-column">
              <v-avatar rounded size="176" class="profile" color="grey" >
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
              <v-btn
                text
                @click="elementToEdit"
                v-if="user.id == UserId || userAdmin === true"
              >
                <v-icon class="mx-2" color="light-blue darken-4">
                  mdi-pencil
                </v-icon>
                <span>Modifier</span>
              </v-btn>
            </div>
            <v-dialog v-model="dialog" width="500">
              <v-card>
                <v-col cols="12" sm="12">
                  <input
                    type="file"
                    ref="file"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
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
          </v-col>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-col>
            <span v-if="user.id == UserId">
              Vous êtes membre depuis: {{ dateParser(user.createdAt) }}
            </span>
            <span v-else>Membre depuis: {{ dateParser(user.createdAt) }}</span>
          </v-col>
        </div>
      </div>
      <div>
        <v-col>
          <br />
          <v-row
            v-if="user.id == UserId || userAdmin === true"
            align="center"
            justify="space-around"
          >
            <v-btn
              class="btn align-self-center ma-2 rounded-xl"
              color="red darken-1"
              @click="deleteAccount"
            >
              Supprimer mon compte
            </v-btn>
          </v-row>
        </v-col>
      </div>
    </v-card>
    <div class="d-flex justify-center pa-4 ma-4">
      <v-btn @click="backToPostsPage" class="ma-2" color="blue darken-4" dark>
        <v-icon dark left> mdi-arrow-left </v-icon>
        Retour à la page des messages
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import UserServices from "@/services/UserServices";

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
      usernameEdit: new Object(),
    };
  },

  computed: {},

  async mounted() {
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
      const router = this.$router;
      setTimeout(function () {
        router.push("/");
      }, 10);
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
        router.push("/posts");
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
.v-toolbar__title {
  color: white;
  font-weight: bold;

  font-size: 1.1rem;
  font-display: roboto;
}

.btn {
  color: white;
  font-weight: bold;
  text-decoration: underline;
}

img {
  width: 95%;
  height: auto;
}

.v-application a {
  color: #01579b;
  text-decoration: underline;
  font-weight: bold;
}
</style>
