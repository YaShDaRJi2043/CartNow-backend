const users = require("../../../model/useShcema");
const electronics = require("../../../model/data/electronicShcema");
const homekitchens = require("../../../model/data/home&kitchenShcema");
const mens = require("../../../model/data/mensShcema");
const mobiles = require("../../../model/data/mobileShcema");
const women = require("../../../model/data/womensSchema");
const carts = require("../../../model/cartShcema");

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const productId = req.query.id;
    const userId = req.userId;

    const existingCartItem = await carts.findOne({ userId, productId });
    if (existingCartItem) {
      return res
        .status(409)
        .json({ status: 409, message: "Product Already in Cart" });
    }

    const newCartItem = new carts({ userId, productId });
    await newCartItem.save();

    res.status(201).json({ message: "Product added to cart" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Server Error: " + error.message });
  }
};

//get cart products
exports.getCart = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User Not Found" });
    }

    const cartItems = await carts.find({ userId });

    const productModels = [mobiles, electronics, mens, women, homekitchens];

    const detailedCartItems = [];

    for (const item of cartItems) {
      let product = null;

      for (const model of productModels) {
        product = await model.findById(item.productId);
        if (product) break;
      }

      if (product) {
        detailedCartItems.push({
          _id: item._id,
          userId: item.userId,
          productId: item.productId,
          productDetails: product,
        });
      }
    }

    res.status(200).json(detailedCartItems);
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Server Error: " + error.message });
  }
};

//delete cart
exports.deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const userId = req.userId;

    const deletedItem = await carts.findOneAndDelete({ _id: cartId, userId });

    if (!deletedItem) {
      return res
        .status(404)
        .json({ status: 404, message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Server Error: " + error.message });
  }
};
