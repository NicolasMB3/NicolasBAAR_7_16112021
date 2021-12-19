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
    path: "/profil/:id",
    name: "Profil",
    component: Profil,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    // path: "*",
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
