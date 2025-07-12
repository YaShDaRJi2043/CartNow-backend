const women = require("../../model/data/womensSchema");

exports.addWomenFashion = async (req, res) => {
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
    const data = new women({
      url,
      shortTitle,
      longTitle,
      mrp,
      cost,
      discount,
      description,
    });
    const womenFashiondata = await data.save();
    res.status(201).json({ status: 201, womenFashiondata });
  } catch (error) {
    res.status(404).json({ status: 404, message: "data not post" });
  }
};

exports.getWomenFashion = async (req, res) => {
  try {
    const womenFashiondata = await women.find();
    res.status(201).json(womenFashiondata);
  } catch (error) {
    console.log("error" + error.message);
  }
};

exports.getWomenFashionById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const womenFashiondata = await women.findById({ _id: id });
    res.status(201).json(womenFashiondata);
  } catch (error) {
    res.status(404).json("error" + error.message);
  }
};

exports.updateWomenFashion = async (req, res) => {
  try {
    const { id } = req.params;

    const womenFashiondata = await women.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json(womenFashiondata);
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
};

exports.deleteWomenFashion = async (req, res) => {
  try {
    const { id } = req.params;

    const womenFashiondata = await women.findByIdAndDelete({ _id: id });
    res.status(201).json(womenFashiondata);
  } catch (error) {
    res.status(404).json({ status: 404, message: "error" });
  }
};
