const mobiles = require("../../model/data/mobileShcema");

exports.addMobile = async (req, res) => {
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
    const data = await mobiles({
      url,
      shortTitle,
      longTitle,
      mrp,
      cost,
      discount,
      description,
    });
    const mobilesdata = await data.save();
    res.status(201).json({ status: 201, mobilesdata });
  } catch (error) {
    res.status(404).json({ status: 404, message: "data not post" });
  }
};

exports.getMobile = async (req, res) => {
  try {
    const mobilesdata = await mobiles.find();
    res.status(201).json(mobilesdata);
  } catch (error) {
    console.log("error" + error.message);
  }
};

exports.getMobileById = async (req, res) => {
  try {
    const { id } = req.params;

    const mobilesdata = await mobiles.findById({ _id: id });
    res.status(201).json(mobilesdata);
  } catch (error) {
    res.status(404).json("error" + error.message);
  }
};

exports.updateMobile = async (req, res) => {
  try {
    const { id } = req.params;

    const mobilesdata = await mobiles.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(mobilesdata);
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
};

exports.deleteMobile = async (req, res) => {
  try {
    const { id } = req.params;

    const mobilesdata = await mobiles.findByIdAndDelete({ _id: id });
    res.status(201).json(mobilesdata);
  } catch (error) {
    res.status(404).json({ status: 404, message: "error" });
  }
};
