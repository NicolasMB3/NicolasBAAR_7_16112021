<template>
  <v-container>
    <v-card class="mx-auto" max-width="900" height="400px">
    <v-img class="white--text align-end" height="150px" src="@/assets/duotone.png">
      <v-card-title>
        <v-avatar rounded size="64">
          <v-img :src="user.avatar"></v-img>
        </v-avatar>
        <span class="ml-4">{{ user.first_name }} {{ user.last_name }}</span>
      </v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">
      <span>Membre depuis: {{ dateParser(user.createdAt) }}</span>
    </v-card-subtitle>
      <v-btn
        tile
        color="success"
      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        Modifier
      </v-btn>

      <v-btn
        tile
        color="error"
      >
        <v-icon left>
          mdi-delete
        </v-icon>
        Supprimer
      </v-btn>
  </v-card>
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
