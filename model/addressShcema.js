const mongoose = require("mongoose");

const addressShcema = new mongoose.Schema({
  userRef: {
    type: String,
    require: true,
  },

  pin: {
    type: Number,
    require: true,
  },

  house: {
    type: String,
    require: true,
  },

  area: {
    type: String,
    require: true,
  },

  landmark: {
    type: String,
    require: true,
  },

  city: {
    type: String,
    require: true,
  },

  state: {
    type: String,
    require: true,
  },

  addressType: {
    type: String,
    require: true,
  },
});

const userAddresses = new mongoose.model("userAddress", addressShcema);
module.exports = userAddresses;
