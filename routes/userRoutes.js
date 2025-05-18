const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
router.post("/create", userController.signUp);
router.post("/search", userController.searchUser);
router.post("/login", userController.login);
module.exports = router;
