const mobile = require("../../model/data/mobileShcema");
const electronics = require("../../model/data/electronicShcema");
const men = require("../../model/data/mensShcema");
const women = require("../../model/data/womensSchema");
const homekitchen = require("../../model/data/home&kitchenShcema");

exports.getProductDetail = async (req, res) => {
  try {
    const id = req.query.id;

    let productDetailedData = await mobile.findById({ _id: id });

    if (!productDetailedData) {
      productDetailedData = await electronics.findById({ _id: id });
    }
    if (!productDetailedData) {
      productDetailedData = await men.findById({ _id: id });
    }
    if (!productDetailedData) {
      productDetailedData = await women.findById({ _id: id });
    }
    if (!productDetailedData) {
      productDetailedData = await homekitchen.findById({ _id: id });
    }

    if (productDetailedData) {
      res.status(201).json(productDetailedData);
    } else {
      res.status(404).json({ status: 404, message: "Data Not Found" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
