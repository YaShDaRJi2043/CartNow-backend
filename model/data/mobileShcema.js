const mongoose = require("mongoose");
const mobileSchema = new mongoose.Schema({
  url: String,
  detailUrl: String,
  shortTitle: String,
  longTitle: String,
  mrp: Number,
  cost: Number,
  discount: String,
  description: String,
});

const mobiles = new mongoose.model("mobiles", mobileSchema);
module.exports = mobiles;
