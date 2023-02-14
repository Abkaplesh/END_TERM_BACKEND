const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../../modal/token");
const Validator = require("validator");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const asyncHandler = require("express-async-handler");

const User = require("../../modal/userschema");

router.post("/admin_login", (req, res) => {
  const { email, password } = req.body;
  const mail = req.body.email
    ? {
        email: {
          $regex: req.body.email,
          $options: "i",
        },
      }
    : {};

  User.findOne({
    ...mail,
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch && user && user.isAdmin == true) {
        res.json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(401);
        throw new Error("Invalid email or password");
      }
    });
  });
});

const reAuthUser = asyncHandler(async (req, res) => {
  const user = req.user; //await User.findOne({ email })

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, "secret");

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

router.route("/access-token").get(protect, reAuthUser);

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    "secret",
    {
      expiresIn: "30d",
    }
  );
};

module.exports = router;
