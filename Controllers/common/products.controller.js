const electronics = require("../../model/data/electronicShcema");
const homekitchen = require("../../model/data/home&kitchenShcema");
const men = require("../../model/data/mensShcema");
const mobile = require("../../model/data/mobileShcema");
const women = require("../../model/data/womensSchema");

exports.getAllProduct = async (req, res) => {
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

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await mobile.findById(id);
    if (!product) product = await electronics.findById(id);
    if (!product) product = await men.findById(id);
    if (!product) product = await women.findById(id);
    if (!product) product = await homekitchen.findById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ status: 404, message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Server error: " + error.message });
  }
};
