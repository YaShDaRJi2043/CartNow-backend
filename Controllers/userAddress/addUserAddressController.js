const userAddresses = require("../../model/addressShcema");

exports.userAddress = async (req, res) => {
  try {
    const id = req.query.id;
    const { pin, house, area, landmark, city, state, addressType } = req.body;

    if (
      !id ||
      !pin ||
      !house ||
      !area ||
      !landmark ||
      !city ||
      !state ||
      !addressType
    ) {
      res.state(404).json({ status: 404, message: "Fill All The Details" });
    } else {
      const userAddress = new userAddresses({
        userRef: id,
        pin,
        house,
        area,
        landmark,
        city,
        state,
        addressType,
      });

      const userAddressData = await userAddress.save();
      res.status(201).json({ status: 201, userAddressData });
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
