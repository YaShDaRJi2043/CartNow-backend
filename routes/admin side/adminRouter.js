const express = require("express");
const adminRouter = new express.Router();
const controllers = require("../../Controllers/userControllers");
const authenticate = require("../../middlewere/authenticate");

//admin register
adminRouter.post("/Adminregister", controllers.adminPost);

//admin login
adminRouter.post("/adminlogin", controllers.adminSignin);

module.exports = adminRouter;
