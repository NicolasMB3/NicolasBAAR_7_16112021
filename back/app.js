const express = require("express");
const app = express();
const db = require("./models");
const path = require("path");
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  // Ajout de header sur la réponse, * (tout le monde) à accès à l'origin de l'API
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Ajout de header sur la réponse, * (tout le monde) à accès à certain headers et méthodes de l'API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Sync() method an drop existing tables and re-sync database
db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
