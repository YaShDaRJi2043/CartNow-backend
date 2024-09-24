const electronics = require("../../model/data/electronicShcema");
const homekitchen = require("../../model/data/home&kitchenShcema");
const men = require("../../model/data/mensShcema");
const mobile = require("../../model/data/mobileShcema");
const women = require("../../model/data/womensSchema");

exports.allProduct = async (req, res) => {
  try {
    const dataMobile = await mobile.find({});
    const dataElectronics = await electronics.find({});
    const dataMen = await men.find({});
    const dataWomen = await women.find({});
    const dataHomeKitchen = await homekitchen.find({});

    const allProducts = [
      ...dataMobile,
      ...dataElectronics,
      ...dataMen,
      ...dataWomen,
      ...dataHomeKitchen,
    ];

    res.status(201).json(allProducts);
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
