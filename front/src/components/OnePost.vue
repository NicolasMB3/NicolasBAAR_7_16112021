<template>
  <div class="container">
    <div class="mt-3">
      <v-card class="mx-auto" color="teal darken-2" dark max-width="600">
        <div class="d-flex align-center">
          <v-avatar class="mt-2 ml-2">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <span class="ml-2">{{ message.username }} </span>
        </div>
        <div>
          <v-card-title class="d-flex justify-center">
            <span class="text-h6 font-weight-light">
              {{ message.title }}
            </span>
          </v-card-title>
          <div class="text-center" v-if="message.UserId == UserId">
            <v-icon @click="messageToEdit(index)">mdi-pencil</v-icon>
            <v-icon @click="deleteMessage(message.id)">mdi-delete</v-icon>
          </div>
          <v-card-text class="text-h5 font-weight-bold">
            {{ message.postText }}
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-row align="center" justify="end">
                <v-icon class="mr-1"> mdi-heart </v-icon>
                <!-- <span class="subheading mr-2">256</span> -->
              </v-row>
            </v-list-item>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import PostServices from "@/services/PostServices";
let user = JSON.parse(localStorage.getItem("user"));
export default {
  data() {
    return {
      message: {},
      UserId: user.id,
    };
  },
  async mounted() {
    const messageId = this.$route.params.id;
    this.message = (await PostServices.getOnePost(`${messageId}`)).data;
    // this.message = response;
    // this.$store.dispatch("setMessage", mess);
  },
};
</script>

<style scoped></style>
