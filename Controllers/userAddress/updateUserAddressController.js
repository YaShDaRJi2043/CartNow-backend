const userAddresses = require("../../model/addressShcema");

exports.updateAddress = async (req, res) => {
  try {
    const id = req.query.id;

    const updatedAddress = await userAddresses.updateOne(
      { userRef: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json({ status: 201, updatedAddress });
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
