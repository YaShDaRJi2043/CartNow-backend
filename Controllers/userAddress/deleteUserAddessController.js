const userAddresses = require("../../model/addressShcema");

exports.deleteAddress = async (req, res) => {
  try {
    const id = req.query.id;

    const deleteUserAddress = await userAddresses.findByIdAndDelete({
      _id: id,
    });
    res.status(201).json({ status: 201, deleteUserAddress });
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
