const homekitchens = require("../../model/data/home&kitchenShcema");

exports.addHomeKitchen = async (req, res) => {
  const { url, shortTitle, longTitle, mrp, cost, discount, description } =
    req.body;

  try {
    if (
      !url ||
      !shortTitle ||
      !longTitle ||
      !mrp ||
      !cost ||
      !discount ||
      !description
    ) {
      res.status(404).json({ status: 404, message: "fill all the data" });
    }
    const data = new homekitchens({
      url,
      shortTitle,
      longTitle,
      mrp,
      cost,
      discount,
      description,
    });
    const homekitchensdata = await data.save();
    res.status(201).json({ status: 201, homekitchensdata });
  } catch (error) {
    res.status(404).json({ status: 404, message: "data not post" });
  }
};

exports.getHomeKitchen = async (req, res) => {
  try {
    const homekitchensdata = await homekitchens.find();
    res.status(201).json(homekitchensdata);
  } catch (error) {
    console.log("error" + error.message);
  }
};

exports.getHomeKitchenById = async (req, res) => {
  try {
    const { id } = req.params;

    const homekitchensdata = await homekitchens.findById({ _id: id });
    res.status(201).json(homekitchensdata);
  } catch (error) {
    res.status(404).json("error" + error.message);
  }
};

exports.updateHomeKitchen = async (req, res) => {
  try {
    const { id } = req.params;

    const homekitchensdata = await homekitchens.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json(homekitchensdata);
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
};

exports.deleteHomeKitchen = async (req, res) => {
  try {
    const { id } = req.params;

    const homekitchensdata = await homekitchens.findByIdAndDelete({ _id: id });
    res.status(201).json(homekitchensdata);
  } catch (error) {
    res.status(404).json({ status: 404, message: "error" });
  }
};
