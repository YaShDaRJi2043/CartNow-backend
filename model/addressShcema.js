const mongoose = require("mongoose");

const addressShcema = new mongoose.Schema({
  userId: {
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

const addresses = new mongoose.model("addresses", addressShcema);
module.exports = addresses;
