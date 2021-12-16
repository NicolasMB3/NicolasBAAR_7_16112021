const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controllers");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// See P6 Github page to see more details
// https://github.com/NicolasMB3/NicolasBAAR_5_24092021
// Multer = Node.js middleware for handling
router.get("/", auth, postCtrl.getPost);
router.post("/", auth, multer, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/comment", auth, postCtrl.createComment);
router.delete("/comment/:id", auth, postCtrl.deleteComment);

module.exports = router;
