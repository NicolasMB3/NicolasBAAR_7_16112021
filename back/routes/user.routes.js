const express = require("express");
const router = express.Router();
const usrCtrl = require("../controllers/user.controllers");
const auth = require("../middleware/auth");
const authPolicy = require("../middleware/authpolicy");
const multer = require("../middleware/multer-config");

// See P6 Github page to see more details
// https://github.com/NicolasMB3/NicolasBAAR_5_24092021
// Multer = Node.js middleware for handling
router.post("/signup", authPolicy.register, usrCtrl.signup);
router.post("/login", usrCtrl.login);
router.get("/accounts/", auth, usrCtrl.getAllAccounts);
router.get("/accounts/:id", auth, usrCtrl.getOneAccount);
router.delete("/accounts/:id", auth, usrCtrl.deleteAccount);
router.put("/accounts/:id", auth, multer, usrCtrl.modifyAccount);

module.exports = router;