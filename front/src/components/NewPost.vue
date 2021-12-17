<template>
  <v-card max-width="900" class="offset-md-3 mx-auto">
    <v-card-title class="text-h5 font-weight-regular blue darken-1 white--text">
      Écrire un nouveau message 📜
    </v-card-title>
    <v-card-text>
      <v-subheader class="pa-0">
        Comment se passe votre journée ?
      </v-subheader>
      <div class="d-flex justify-center mt-4">
        <v-textarea
          label="Décrivez nous votre journée"
          auto-grow
          outlined
          rows="1"
          row-height="15"
          cols="500"
          class="mx-0"
          v-model="message"
        >
        </v-textarea>
      </div>
      <div class="d-flex justify-center">
        <v-btn color="success" @click="$refs.file.click()">
          Ajouter une image (optionnel)
        </v-btn>
        <input
          v-show="false"
          ref="file"
          type="file"
          label="sel"
          accept="image/png, image/jpeg,
              image/bmp, image/gif"
          name="image"
          @change="onFileChange"
        />
      </div>
      <div id="preview">
        <img v-if="url" :src="url" />
      </div>
      <!-- Disable button if message is empty -->
      <v-row v-if="message">
        <v-col class="d-flex justify-end">
          <v-btn v-if="url" depressed color="primary" class="btn align-self-center" @click.prevent.stop="uploadImage(); publishPost()">
            Envoyer le message
          </v-btn>
          <v-btn v-else depressed color="primary" class="btn align-self-center" @click.prevent.stop="publishPost()">
            Envoyer le message
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import PostServices from "@/services/PostServices";
let user = JSON.parse(localStorage.getItem("user"));
export default {
  data() {
    return {
      file: "",
      fileName: "",
      UserId: user.id,
      message: null,
      url: null
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    uploadImage() {
      this.file = this.$refs.file.files[0];
      this.fileName = this.file.name;
    },
    async publishPost() {
      const fd = new FormData();
      fd.append("message", this.message);
      fd.append("UserId", this.UserId);
      if (this.file !== null) {
        fd.append("image", this.file);
      }
      await PostServices.createPost(fd);
      location.reload(true);
    },
  },
};
</script>
<style lang="scss" scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  margin: 2rem 2rem 2rem 2rem;
  max-width: 80%;
  max-height: 500px;
  border-radius: 15px;
}
</style>
