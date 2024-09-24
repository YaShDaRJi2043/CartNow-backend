const datas = require("../../model/useShcema");

exports.productDisplayOfCart = async (req, res) => {
  try {
    const findUser = await datas.findOne({ _id: req.userId });
    const CartProducts = findUser.carts;
    res.status(201).json(CartProducts);
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
