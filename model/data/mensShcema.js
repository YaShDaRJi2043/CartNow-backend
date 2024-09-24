const mongoose = require("mongoose");
const mensSchema = new mongoose.Schema({
  url: String,
  detailUrl: String,
  shortTitle: String,
  longTitle: String,
  mrp: Number,
  cost: Number,
  discount: String,
  description: String,
});

const men = new mongoose.model("mens", mensSchema);
module.exports = men;
