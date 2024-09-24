const mongoose = require("mongoose");
const womensSchema = new mongoose.Schema({
  url: String,
  detailUrl: String,
  shortTitle: String,
  longTitle: String,
  mrp: Number,
  cost: Number,
  discount: String,
  description: String,
});

const women = new mongoose.model("women", womensSchema);
module.exports = women;
