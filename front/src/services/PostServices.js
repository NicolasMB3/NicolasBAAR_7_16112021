import Api from "@/services/Api";

export default {
  getAllPosts(data) {
    return Api().get("posts/", data);
  },
  getOnePost(id, data) {
    return Api().get("posts/" + id, data);
  },
  createPost(data) {
    return Api().post("posts/", data);
  },
  modifyPost(id, data) {
    return Api().put("posts/" + id, data);
  },
  deletePost(id) {
    return Api().delete("posts/" + id);
  },
  likeOrDislikePost(id) {
    return Api().post("posts/" + id) + "/like";
  },
  createComment(data) {
    return Api().post("posts/comment", data);
  },
  deleteComment(id){
    return Api().delete("posts/comment/" + id);
  }
};
