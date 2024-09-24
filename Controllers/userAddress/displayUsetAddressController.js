const userAddresses = require("../../model/addressShcema");

exports.displayAddress = async (req, res) => {
  try {
    const id = req.query.id;

    const displayUserAddress = await userAddresses.find({ userRef: id });
    res.status(201).json({ status: 201, displayUserAddress });
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
