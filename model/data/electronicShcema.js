const mongoose = require("mongoose");
const electronicsSchema = new mongoose.Schema({
  url: String,
  detailUrl: String,
  shortTitle: String,
  longTitle: String,
  mrp: Number,
  cost: Number,
  discount: String,
  description: String,
});

const electronics = new mongoose.model("electronics", electronicsSchema);
module.exports = electronics;
