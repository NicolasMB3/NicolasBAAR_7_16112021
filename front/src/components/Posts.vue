<template>
  <div class="container">
    <Banner />
    <div v-html="error" />
    <NewPost />
    <!-- Display all post in API with v-for (loop) -->
    <v-container class="mt-6" v-for="(post, index) in posts" :key="index">
      <v-row justify="space-around">
        <v-card width="900">
          <v-img v-if="post.imageUrl" height="200px" :src="post.imageUrl">
            <v-app-bar flat color="rgba(0, 0, 0, 0)" >
              <v-toolbar-title class="text-subtitle-2 white--text pl-0">
                Posté le {{ dateParser(post.createdAt) }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
                <v-col cols="2" class="pa-0 d-flex text-center justify-end align-end" v-if="post.UserId == UserId || userAdmin === true">
                  <div class="text-center">
                    <v-menu
                      left
                      bottom
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="white">mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item>
                          <v-btn color="primary" class="mx-3" @click="messageToEdit(post)" v-if="post.UserId == UserId">
                            Editer
                          </v-btn>
                          <v-btn color="error" class="mx-3" @click="deleteMessage(post.id)">
                            Supprimer
                          </v-btn>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </v-col>
            </v-app-bar>
            <v-card-title class="white--text mt-8">
              <v-avatar size="56">
                <img
                  class="customcursor"
                  alt="user"
                  :src="post.User.avatar"
                  @click="profil(post.UserId)"
                >
              </v-avatar>
              <p class="ml-3" @click="profil(post.UserId)">
                {{ post.User.last_name }} {{ post.User.first_name }}
              </p>
            </v-card-title>
          </v-img>
          <v-img v-else height="200px" src="@/assets/banner.jpg">
            <v-app-bar flat color="rgba(0, 0, 0, 0)" >
              <v-toolbar-title class="text-subtitle-2 white--text pl-0">
                Posté le : {{ dateParser(post.createdAt) }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
                <v-col cols="2" class="pa-0 d-flex text-center justify-end align-end" v-if="post.UserId == UserId || userAdmin === true">
                  <div class="text-center">
                    <v-menu
                      left
                      bottom
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="white">mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item>
                          <v-btn color="primary" class="mx-3" @click="messageToEdit(post)" v-if="post.UserId == UserId">
                            Editer
                          </v-btn>
                          <v-btn color="error" class="mx-3" @click="deleteMessage(post.id)">
                            Supprimer
                          </v-btn>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </v-col>
            </v-app-bar>
            <v-card-title class="white--text mt-8">
              <v-avatar size="56">
                <img
                  class="customcursor"
                  alt="user"
                  :src="post.User.avatar"
                  @click="profil(post.UserId)"
                >
              </v-avatar>
              <p class="ml-3" @click="profil(post.UserId)">
                {{ post.User.last_name }} {{ post.User.first_name }}
              </p>
            </v-card-title>
          </v-img>
          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
              {{ post.User.first_name }} a écrit :
            </div>
            <div class="offset-md-1 mx-auto">
              <v-alert
                shaped
                dark
                text
                color="info"
              >
                {{ post.message }}
              </v-alert>
            </div>
            <div>
              <v-col width="900" class="d-flex justify-end">
                <v-btn @click="commentPost(post.id)" color="primary"> 
                  Écrire un commentaire
                  <v-icon
                    right
                    dark
                  >
                    mdi-border-color
                  </v-icon>
                </v-btn>
              </v-col>
            </div>
              <div v-if="post.Comments.length" >
                <v-col>
                  <v-btn
                    icon
                    color="black"
                    @click="toggleActive(index); commentShow(post, post.id)"
                  >
                    <v-icon>{{ show.includes(index) ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
                  </v-btn>
                  <span class="mx-1">{{ post.Comments.length }} commentaire(s)</span>
                </v-col>
              </div>
              <v-expand-transition>
                <div v-show="show.includes(index)">
                  <div
                    v-for="comment in post.Comments"
                    :key="comment.id"
                    class="d-flex align-center pr-4 pl-4"
                  >
                    <v-card-text>
                      <span class="profil" @click="profil(comment.UserId)">
                        <b>{{ comment.first_name }} {{ comment.last_name }}</b>
                      </span>
                      :
                      {{ comment.text }}
                    </v-card-text>
                    <v-icon v-if="comment.UserId == UserId || userAdmin === true" class="cross" color="error" @click="deleteComment(comment.id)">mdi-delete</v-icon>
                  </div>
                </div>
              </v-expand-transition>
            <div>
              <v-dialog v-model="comment" width="500">
                <v-card>
                  <v-col cols="12" sm="12">
                    <v-textarea
                      label="Message"
                      filled
                      auto-grow
                      outlined
                      rows="2"
                      row-height="15"
                      v-model="text"
                    ></v-textarea>
                  </v-col>
                  <v-divider></v-divider>
                  <v-card-actions v-if="text">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="publishComment(currentPostId)"
                    >
                      Publier
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-card-text>
        </v-card>
      </v-row>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-col cols="12" sm="12">
            <v-textarea
              label="Message"
              filled
              auto-grow
              outlined
              rows="2"
              row-height="15"
              v-model="messageEdit.message"
            ></v-textarea>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- MODIFY THIS -->
            <!-- CAUSE SOMES CRASHS -->
            <v-btn color="primary" text @click="editMessage(messageEdit.id), (dialog = false)">
              Publier
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>

import PostServices from '@/services/PostServices'
import NewPost from '@/components/NewPost.vue'
import Banner from '@/components/Banner.vue'

let user = JSON.parse(localStorage.getItem('user'))

export default {
  name: 'Post',

  data() {
    return {
      messages: [],
      dialog: false,
      // Boolean -> Array
      comment: false,  
      show: [],    
      message: null,
      file: '',
      fileName: '',
      UserId: user.id,
      userAdmin: user.isAdmin,
      first_name: user.first_name,
      last_name: user.last_name,
      messageEdit: new Object(),
      text: null,
      currentPostId: null,
      currentPost: [],
      error: null,
      sheet: false
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts
    },
  },
  mounted() {
    this.$store.dispatch('getPosts')
  },  
  components: {
    NewPost,
    Banner,
  },
  methods: {
    toggleActive(index) {
      if (this.show.includes(index)) {
        this.show = this.show.filter(entry => entry !== index);

        return; 
      }
      this.show.push(index);
    },
    commentPost(postId) {
      this.comment = true
      this.currentPostId = postId
    },
    commentShow(post, postId) {
      this.currentPostId = postId
      this.currentPost = post
    },
    uploadImage() {
      this.file = this.$refs.file.files[0]
      this.fileName = this.file.name
    },
    async publishPost() {
      try {
        const fd = new FormData()
        fd.append('message', this.message)
        fd.append('UserId', this.UserId)
        if (this.file !== null) {
          fd.append('image', this.file)
        }
        await PostServices.createPost(fd)
        location.reload(true)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    messageToEdit(post) {
      this.dialog = true
      this.messageEdit = post
    },
    async editMessage(messageId) {
      try {
        let data = {
          message: this.messageEdit.message,
        }
        const res = await PostServices.modifyPost(`${messageId}`, data)
        console.log(res)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteMessage(messageId) {
      await PostServices.deletePost(`${messageId}`)
      location.reload(true)
    },
    async publishComment(id) {
      try {
        let data = {
          text: this.text,
          UserId: this.UserId,
          PostId: id,
          first_name: this.first_name,
          last_name: this.last_name,
        }
        const response = await PostServices.createComment(data)
        console.log(response)
        this.comment = false
        this.currentPostId = null
        location.reload(true)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteComment(commentId) {
      await PostServices.deleteComment(`${commentId}`)
      location.reload(true)
    },
    dateParser(num) {
      // Display LocalTime in profil page
      let options = {
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
      let timestamp = Date.parse(num)
      let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

      return date.toString()
    },
    profil(userId) {
      const router = this.$router
      // Get router for profil ID
      setTimeout(function () {
        router.push(`/profil/${userId}`).catch(()=>{})
      }, 10)
    },
  },
}
</script>

<style lang="scss" scoped>
.cross, .ml-3, .customcursor {
  cursor: pointer;
}
</style>