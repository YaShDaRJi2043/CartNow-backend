const electronics = require("../../model/data/electronicShcema");

exports.addElectronic = async (req, res) => {
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
    const data = new electronics({
      url,
      shortTitle,
      longTitle,
      mrp,
      cost,
      discount,
      description,
    });
    const electronicsdata = await data.save();
    res.status(201).json({ status: 201, electronicsdata });
  } catch (error) {
    res.status(404).json({ status: 404, message: "data not post" });
  }
};

exports.getElectronic = async (req, res) => {
  try {
    const electronicsdata = await electronics.find();
    res.status(201).json(electronicsdata);
  } catch (error) {
    console.log("error" + error.message);
  }
};

exports.getElectronicById = async (req, res) => {
  try {
    const { id } = req.params;

    const electronicsdata = await electronics.findById({ _id: id });
    res.status(201).json(electronicsdata);
  } catch (error) {
    res.status(404).json("error" + error.message);
  }
};

exports.updateElectronic = async (req, res) => {
  try {
    const { id } = req.params;

    const electronicsdata = await electronics.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json(electronicsdata);
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
};

exports.deleteElectronic = async (req, res) => {
  try {
    const { id } = req.params;

    const electronicsdata = await electronics.findByIdAndDelete({ _id: id });
    res.status(201).json(electronicsdata);
  } catch (error) {
    res.status(404).json({ status: 404, message: "error" });
  }
};
