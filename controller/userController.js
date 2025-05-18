const mongoose = require("mongoose");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { createToken } = require("../utils/token.js");

exports.searchUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("No user with this email found!");
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const decoded = await createToken({
      id: user.id,
      password: process.env.JWTPASSWORD,
    });
    res.status(201).json({
      status: "success",
      user,
      token: decoded,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.login = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (token) {
      const decoded = await jwt.verify(token, process.env.JWTPASSWORD);
      const id = decoded.id;
      const user = await User.findById(id);
      res.status(200).json({
        status: "success",
        user,
      });
    }
    const { email, password } = req.body;
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
