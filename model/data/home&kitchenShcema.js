const mongoose = require("mongoose");
const homekitchenSchema = new mongoose.Schema({
  url: String,
  detailUrl: String,
  shortTitle: String,
  longTitle: String,
  mrp: Number,
  cost: Number,
  discount: String,
  description: String,
});

const homekitchen = new mongoose.model("homekitchens", homekitchenSchema);
module.exports = homekitchen;
