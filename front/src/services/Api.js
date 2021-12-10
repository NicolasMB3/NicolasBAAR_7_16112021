import axios from "axios";
import store from "../store";

export default () => {
  return axios.create({
    baseURL: `http://localhost:5000/api/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
