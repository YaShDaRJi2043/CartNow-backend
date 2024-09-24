const express = require("express");
const addressRouter = new express.Router();
const controllers = require("../../Controllers/userControllers");
const authenticate = require("../../middlewere/authenticate");

//user add address
addressRouter.post("/address", controllers.address);

module.exports = addressRouter;
