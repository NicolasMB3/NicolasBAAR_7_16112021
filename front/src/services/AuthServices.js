import Api from "@/services/Api";

export default {
  signup(data) {
    return Api().post("auth/signup", data);
  },
  login(data) {
    return Api().post("auth/login", data);
  },
};
