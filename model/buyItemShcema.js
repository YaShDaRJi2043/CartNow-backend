const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const buyItemSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    items: {
      type: [itemSchema],
      required: true,
      validate: [(arr) => arr.length > 0, "At least one item is required"],
    },
    deliveryAddress: {
      house: { type: String, required: true },
      area: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pin: { type: String, required: true },
      country: { type: String, default: "India" },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BuyItem", buyItemSchema);
