const express = require("express");
const userRouter = new express.Router();
const controllers = require("../../Controllers/userControllers");
const authenticate = require("../../middlewere/authenticate");

//user register
userRouter.post("/register", controllers.userpost);

//user signIn
userRouter.post("/signin", controllers.signin);

//user logout
userRouter.get("/logout", authenticate, controllers.logout);

module.exports = userRouter;
