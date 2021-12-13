import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Posts from "@/components/Posts.vue";
import Post from "@/components/Post.vue";
import Profil from "@/components/Profil.vue";
import Users from "@/components/Users.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/posts/:id",
    name: "Post",
    component: Post,
  }, 
  {
    path: "/profil/:id",
    name: "Profil",
    component: Profil,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
});
export default router;
