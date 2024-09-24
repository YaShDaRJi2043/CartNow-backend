const express = require("express");
const {
  userAddress,
} = require("../Controllers/userAddress/addUserAddressController");
const {
  displayAddress,
} = require("../Controllers/userAddress/displayUsetAddressController");
const {
  deleteAddress,
} = require("../Controllers/userAddress/deleteUserAddessController");
const {
  updateAddress,
} = require("../Controllers/userAddress/updateUserAddressController");
const userAddressRoutes = new express.Router();

userAddressRoutes.post("/addUserAddress", userAddress);

userAddressRoutes.get("/displayUserAddress", displayAddress);

userAddressRoutes.delete("/deleteUserAddress", deleteAddress);

userAddressRoutes.put("/updateUserAddress", updateAddress);

module.exports = userAddressRoutes;
