const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
  url: String,
  detailUrl: String,
  shortTitle: String,
  longTitle: String,
  mrp: Number,
  cost: Number,
  discount: String,
  description: String,
});

const products = mongoose.model("products", productsSchema);
module.exports = products;
