import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Posts from "@/components/Posts.vue";
import OnePost from "@/components/OnePost.vue";
import Profil from "@/components/Profil.vue";
import Users from "@/components/AllUser.vue"


Vue.use(VueRouter);
// const user = JSON.parse(localStorage.getItem("user"));
// let id = user.id;

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
 
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
    name: "OnePost",
    component: OnePost,
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
  // {
  //   path: "/profil/:id",
  //   name: "Profil",
  //   component: Profil,
  // },

];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
});
export default router;
