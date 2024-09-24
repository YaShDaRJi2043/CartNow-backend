const datas = require("../../model/useShcema");
const mobile = require("../../model/data/mobileShcema");
const electronics = require("../../model/data/electronicShcema");
const men = require("../../model/data/mensShcema");
const women = require("../../model/data/womensSchema");
const homekitchen = require("../../model/data/home&kitchenShcema");

exports.productAddToCart = async (req, res) => {
  try {
    const id = req.query.id;

    const findUser = await datas.findOne({ _id: req.userId });

    if (findUser) {
      let findProductData = await mobile.findById({ _id: id });

      if (!findProductData) {
        findProductData = await electronics.findById({ _id: id });
      }
      if (!findProductData) {
        findProductData = await men.findById({ _id: id });
      }
      if (!findProductData) {
        findProductData = await women.findById({ _id: id });
      }
      if (!findProductData) {
        findProductData = await homekitchen.findById({ _id: id });
      }

      if (findProductData) {
        const CartDatas = await findUser.carts;
        const alreadyProductAddToCart = CartDatas.find(
          (product) => product._id.toString() === findProductData._id.toString()
        );

        if (alreadyProductAddToCart) {
          res
            .status(404)
            .json({ status: 404, message: "Product Already Added Into Cart" });
        } else {
          await findUser.addcartdata(findProductData);
          await findUser.save();
          res.status(201).json(findUser.carts);
        }
      } else {
        res.status(404).json({ status: 404, message: "Product Not Found" });
      }
    } else {
      res.status(404).json({ status: 404, message: "User Not Found" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
