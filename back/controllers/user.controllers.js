const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Model : SignUp
exports.signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hash,
    });

    await user.save();

    res.status(201).json({
      UserId: user.id,
      token: jwt.sign({ UserId: user.id }, `${process.env.JWT_RAND_SECRET}`, {
        expiresIn: "24h",
      }),
    });
  } catch (error) {
    res.status(400).json({ error: "Cet e-mail est déjà utilisé" });
  }
};

// Model : SignIn
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    res.status(200).json({
      UserId: user.id,
      token: jwt.sign({ UserId: user.id }, `${process.env.JWT_RAND_SECRET}`, {
        expiresIn: "24h",
      }),
      user,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Model : delete user
exports.deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user.avatar !== null) {
      const filename = user.avatar.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        User.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Utilisateur supprimé" });
      });
    } else {
      User.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "utilisateur supprimé" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

// Model : display all users
exports.getAllAccounts = async (req, res, next) => {
  try {
    const allAccounts = await User.findAll({
    });
    res.status(200).json(allAccounts);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// Model : display one user
exports.getOneAccount = async (req, res, next) => {
  try {
    const userParams = req.params;

    const userFound = await User.findOne({
      where: { id: userParams.id },
    });
    res.status(200).json(userFound);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Model : modify account
exports.modifyAccount = async (req, res, next) => {
  try {
    let newPhoto;
    let user = await User.findOne({ where: { id: req.params.id } });

    if (req.file && user.avatar) {
      newPhoto = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      const filename = user.avatar.split("/images/")[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) console.log(err);
        else {
          console.log(`Deleted file: images/${filename}`);
        }
      });
    } else if (req.file) {
      newPhoto = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    if (newPhoto) {
      user.avatar = newPhoto;
    }
    if (req.body.first_name) {
      user.first_name = req.body.first_name;
    }
    if (req.body.last_name) {
      user.last_name = req.body.last_name;
    }
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const newUser = await user.save({
      fields: ["first_name", "last_name", "avatar", "password"],
    });
    res.status(200).json({
      user: newUser,
      messageRetour: "Votre profil a bien été modifié",
    });
  } catch (error) {
    return res.status(500).send({ error: "Server error, please contact administrator" });
  }
};
