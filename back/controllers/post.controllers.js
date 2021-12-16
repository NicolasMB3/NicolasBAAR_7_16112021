const { Post } = require("../models");
const { User } = require("../models");
const { Comment } = require("../models");
const fs = require("fs");

// Display all messages
exports.getPost = async (req, res, next) => {
  try {
    const allPosts = await Post.findAll({
      include: [
        { model: User, attributes: ["first_name", "avatar", "last_name"] },
        { model: Comment, attributes: ["id", "text", "first_name", "last_name", "UserId"] },
      ],
    });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// Display one message
exports.getOnePost = async (req, res, next) => {
  try {
    const postParams = req.params;

    const postFound = await Post.findOne({
      where: { id: postParams.id },
    });
    res.status(200).json(postFound);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Write new message
exports.createPost = async (req, res, next) => {
  try {
    let image;
    const user = await User.findOne({
      attributes: ["first_name", "avatar", "last_name", "id"],
      where: { id: req.body.UserId },
    });
    if (user !== null) {
      if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
      } else {
        image = null;
      }
      const post = await Post.create({
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name"],
          },
        ],
        message: req.body.message,
        imageUrl: image,
        UserId: user.id,
      });
      res.status(201).json({ post: post, message: "Message deleted" });
    } else {
      res.status(400).send({ error: "Erreur " });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// Modify message
exports.updatePost = async (req, res, next) => {
  try {
    let newImage;
    let post = await Post.findOne({ where: { id: req.params.id } });

    if (req.file) {
      newImage = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) console.log(err);
          else {
            console.log(`Deleted file: images/${filename}`);
          }
        });
      }
    }
    if (req.body.message) {
      post.message = req.body.message;
    }
    post.imageUrl = newImage;
    const newPost = await post.save({
      fields: ["message", "imageUrl"],
    });
    res.status(200).json({ newPost: newPost, message: "Message edited" });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// Delete message
exports.deletePost = async (req, res, next) => {
  try {
    const postFound = await Post.findOne({
      where: { id: req.params.id },
    });
    if (postFound.imageUrl != null) {
      const filename = postFound.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } });
      });
      res.status(200).json({ message: "Your message has been deleted" });
    } else {
      await Post.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Your message has been deleted" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Add new commentary
exports.createComment = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.body.UserId } });
    const post = await Post.findOne({ where: { id: req.body.PostId } });
    const comment = new Comment({
      UserId: user.id,
      PostId: post.id,
      text: req.body.text,
      first_name:req.body.first_name,
      last_name:req.body.last_name
    });
    comment.save();
    res.status(200).json({
      ...comment,
      User: { first_name: user.first_name, last_name: user.last_name },
    });
    console.log(post, user);
  } catch (error) {
    res.status(404).json({ error:"Bad request" });
  }
};

// Delete commentary
exports.deleteComment = (req, res, next) => {
  try {
    Comment.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Comment has been deleted" });
  } catch (error) {
    res.status(400).json({ message:"Bad request" });
  }
};

