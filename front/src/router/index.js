import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Posts from "@/components/Posts.vue";
import Profil from "@/components/Profil.vue";
import Users from "@/components/Users.vue";
import PageNotFound from "@/components/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    // Default page
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    // SignUP page
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    // Get all posts
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    // Get profil id
    path: "/profil/:id",
    name: "Profil",
    component: Profil,
  },
  {
    // Get all users
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    // Vue3 required to catchAll *
    // 404 error PageNotFound
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: PageNotFound,
    meta: {
      requiresAuth: false
    }
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
