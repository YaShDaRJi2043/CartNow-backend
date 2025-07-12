const mens = require("../../model/data/mensShcema");

exports.addMenFashion = async (req, res) => {
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
    const data = new mens({
      url,
      shortTitle,
      longTitle,
      mrp,
      cost,
      discount,
      description,
    });
    const menFashiondata = await data.save();
    res.status(201).json({ status: 201, menFashiondata });
  } catch (error) {
    res.status(404).json({ status: 404, message: "data not post" });
  }
};

exports.getMenFashion = async (req, res) => {
  try {
    const menFashiondata = await mens.find();
    res.status(201).json(menFashiondata);
  } catch (error) {
    console.log("error" + error.message);
  }
};

exports.getMenFashionById = async (req, res) => {
  try {
    const { id } = req.params;

    const menFashiondata = await mens.findById({ _id: id });
    res.status(201).json(menFashiondata);
  } catch (error) {
    res.status(404).json("error" + error.message);
  }
};

exports.updateMenFashion = async (req, res) => {
  try {
    const { id } = req.params;

    const menFashiondata = await mens.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(menFashiondata);
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
};

exports.deleteMenFashion = async (req, res) => {
  try {
    const { id } = req.params;

    const menFashiondata = await mens.findByIdAndDelete({ _id: id });
    res.status(201).json(menFashiondata);
  } catch (error) {
    res.status(404).json({ status: 404, message: "error" });
  }
};
