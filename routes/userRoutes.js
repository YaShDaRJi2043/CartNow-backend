const express = require("express");
const authenticate = require("../middlewere/authenticate");
const {
  getCurrentLoginUserDetail,
} = require("../Controllers/User/loginUserDetailedController");
const { userLogin } = require("../Controllers/User/loginUserController");
const { userRegister } = require("../Controllers/User/registerUserController");
const { userLogout } = require("../Controllers/User/logoutUserController");
const userRoutes = new express.Router();

userRoutes.post("/userLogin", userLogin);

userRoutes.post("/userRegister", userRegister);

userRoutes.get("/logout", authenticate, userLogout);

userRoutes.get(
  "/getCurrentLoginUserDetail",
  authenticate,
  getCurrentLoginUserDetail
);

module.exports = userRoutes;
