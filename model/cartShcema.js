const mongoose = require("mongoose");

const cartShcema = new mongoose.Schema({
  productId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
});

const carts = new mongoose.model("carts", cartShcema);
module.exports = carts;
